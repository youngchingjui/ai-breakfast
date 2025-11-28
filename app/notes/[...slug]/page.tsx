import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { getAllMeetings, listMeetingVersions, readNote } from '@/lib/notes'

export async function generateStaticParams() {
  return getAllMeetings().map((n) => ({ slug: n.slug }))
}

function deriveDateDisplayFromSlug(slug: string[]): string | undefined {
  if (slug.length >= 3) {
    const [y, m, d] = slug
    if (/^\d{4}$/.test(y) && /^\d{2}$/.test(m) && /^\d{2}$/.test(d)) {
      return new Date(`${y}-${m}-${d}T00:00:00Z`).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
    }
  }
  return undefined
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  // Meeting-level title
  const dateDisplay = deriveDateDisplayFromSlug(slug)
  const title = dateDisplay ? `Notes for ${dateDisplay}` : 'Notes'
  return { title }
}

export default async function NotePage({ params, searchParams }: { params: Promise<{ slug: string[] }>, searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const { slug } = await params
  const query = (await (searchParams || Promise.resolve({}))) || {}

  // Ensure we only use date slug [y,m,d]
  const dateSlug = slug.slice(0, 3) as [string, string, string]
  const versions = listMeetingVersions(dateSlug)

  // Decide selected version
  const versionParamRaw = query.version
  const versionParam = Array.isArray(versionParamRaw) ? versionParamRaw[0] : versionParamRaw
  let selected = versions[0]
  if (typeof versionParam === 'string') {
    const found = versions.find(v => v.name === versionParam)
    if (found) selected = found
  }

  const data = selected ? readNote(selected.slug) : null

  if (!data) {
    return (
      <div className="space-y-4">
        <Link href="/notes" className="button">← Back to Notes</Link>
        <p className="text-destructive">Note not found.</p>
      </div>
    )
  }

  const showTabs = versions.length > 1
  const baseHref = `/notes/${dateSlug.join('/')}`

  return (
    <article className="space-y-6">
      <div>
        <Link href="/notes" className="button">← Back to Notes</Link>
      </div>

      {showTabs && (
        <div className="flex gap-2 border-b border-border pb-2">
          {versions.map((v) => {
            const href = `${baseHref}?version=${encodeURIComponent(v.name)}`
            const isActive = v.name === selected.name
            return (
              <Link
                key={v.name}
                href={href}
                className={`px-3 py-1 rounded-t text-sm ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground hover:bg-muted/80'}`}
              >
                {v.name}
              </Link>
            )
          })}
        </div>
      )}

      <div className="container-prose">
        <ReactMarkdown rehypePlugins={[rehypeSlug]}>{data.content}</ReactMarkdown>
      </div>
      <div>
        <Link href="/notes" className="button">← Back to Notes</Link>
      </div>
    </article>
  )
}


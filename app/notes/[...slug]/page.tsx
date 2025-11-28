import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { getAllNotes, getMeetings, readNote } from '@/lib/notes'

export async function generateStaticParams() {
  const all = getAllNotes()
  const params: { slug: string[] }[] = []
  const seen = new Set<string>()

  // Version-specific pages
  for (const n of all) {
    const key = n.slug.join('/')
    if (!seen.has(key)) {
      params.push({ slug: n.slug })
      seen.add(key)
    }
  }

  // Base meeting pages (YYYY/MM/DD)
  const meetings = getMeetings()
  for (const m of meetings) {
    const key = m.baseSlug.join('/')
    if (!seen.has(key)) {
      params.push({ slug: m.baseSlug })
      seen.add(key)
    }
  }

  return params
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

function stripFrontMatter(input: string): string {
  let s = input
  // strip BOM if present
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1)
  // if content starts with a YAML front matter block, remove it
  if (/^---\s*\r?\n/.test(s)) {
    const m = s.match(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n)?/)
    if (m) return s.slice(m[0].length)
  }
  return s
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const data = readNote(slug)

  let title: string | undefined
  if (data) {
    const firstHeading = data.content.split(/\r?\n/).find((line) => /^\s*#\s+/.test(line))
    if (firstHeading) {
      const m = firstHeading.replace(/^\s*#\s+/, '').trim()
      const numMatch = m.match(/#\s*(\d+)/)
      if (numMatch) {
        title = `Notes for Breakfast #${numMatch[1]}`
      } else {
        title = m
      }
    }
  }

  if (!title) {
    const dateDisplay = deriveDateDisplayFromSlug(slug)
    title = dateDisplay ? `Notes for ${dateDisplay}` : 'Notes'
  }

  return { title }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params

  // Determine meeting base slug and available versions
  const baseSlug = slug.slice(0, 3)
  const all = getAllNotes()
  const versions = all.filter((n) => n.slug[0] === baseSlug[0] && n.slug[1] === baseSlug[1] && n.slug[2] === baseSlug[2])

  // Order versions by version label (4th slug segment) then by path for stability
  versions.sort((a, b) => {
    const av = a.slug[3] || ''
    const bv = b.slug[3] || ''
    if (av && bv) return av.localeCompare(bv)
    if (av) return 1
    if (bv) return -1
    return a.path.localeCompare(b.path)
  })

  // Determine selected version
  const selectedVersionName = slug[3]
  let selected = versions[0]
  if (selectedVersionName) {
    const match = versions.find((v) => v.slug[3] === selectedVersionName)
    if (match) selected = match
  } else if (!versions.length) {
    // If there are no explicit versions (e.g., single note placed directly at base), try reading base
    // Note: readNote below will already fallback to first found version if any exists
  }

  // Read the markdown for the selected note (or base slug if no versions exist)
  const data = readNote(selected ? selected.slug : baseSlug)
  if (!data) {
    return (
      <div className="space-y-4">
        <Link href="/notes" className="button">← Back to Notes</Link>
        <p className="text-destructive">Note not found.</p>
      </div>
    )
  }

  const content = stripFrontMatter(data.content)

  const hasMultipleVersions = versions.length > 1

  return (
    <article className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Link href="/notes" className="button">← Back to Notes</Link>
        {hasMultipleVersions && (
          <nav className="flex items-center gap-2 border rounded-md p-1 bg-card text-sm">
            {versions.map((v) => {
              const label = v.slug[3] || 'default'
              const href = `/notes/${[...baseSlug, label].join('/')}`
              const active = selected && (v.slug.join('/') === selected.slug.join('/'))
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    `px-3 py-1.5 rounded ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-foreground'}`
                  }
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
      <div className="container-prose">
        <ReactMarkdown rehypePlugins={[rehypeSlug]}>{content}</ReactMarkdown>
      </div>
      <div>
        <Link href="/notes" className="button">← Back to Notes</Link>
      </div>
    </article>
  )
}


import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { getAllNotes, readNote } from '@/lib/notes'

export async function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }))
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

  const { slug } = await params;
  const data = readNote(slug)
  if (!data) {
    return (
      <div className="space-y-4">
        <Link href="/notes" className="button">← Back to Notes</Link>
        <p className="text-destructive">Note not found.</p>
      </div>
    )
  }

  return (
    <article className="space-y-6">
      <div>
        <Link href="/notes" className="button">← Back to Notes</Link>
      </div>
      <div className="container-prose">
        <ReactMarkdown rehypePlugins={[rehypeSlug]}>{data.content}</ReactMarkdown>
      </div>
      <div>
        <Link href="/notes" className="button">← Back to Notes</Link>
      </div>
    </article>
  )
}


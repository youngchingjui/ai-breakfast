import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { getAllNotes, readNote } from '@/lib/notes'

export async function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const data = readNote(slug)

  // Try to extract a meeting number from the first H1 in the markdown
  let coreTitle: string | null = null
  if (data) {
    const h1Match = data.content.match(/^#\s*(.+)$/m)
    if (h1Match) {
      const heading = h1Match[1].trim()
      const numMatch = heading.match(/#(\d+)/)
      if (numMatch) {
        coreTitle = `Notes for Breakfast #${numMatch[1]}`
      } else {
        // Fallback to using the heading text directly if it looks reasonable
        coreTitle = heading
      }
    }
  }

  if (!coreTitle) {
    // Fallback to a date-like label from the slug
    let display = slug.join('-')
    if (slug.length >= 3) {
      const [y, m, d] = slug
      if (/^\d{4}$/.test(y) && /^\d{2}$/.test(m) && /^\d{2}$/.test(d)) {
        display = `${y}-${m}-${d}`
      }
    }
    coreTitle = `Notes for Breakfast ${display}`
  }

  return { title: coreTitle }
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
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
      <div>
        <Link href="/notes" className="button">← Back to Notes</Link>
      </div>
    </article>
  )
}


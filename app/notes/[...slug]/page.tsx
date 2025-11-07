import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getAllNotes, readNote } from '@/lib/notes'

export async function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }))
}

export default function NotePage({ params }: { params: { slug: string[] } }) {
  const data = readNote(params.slug)
  if (!data) {
    return (
      <div className="space-y-4">
        <Link href="/notes" className="button">← Back to Notes</Link>
        <p className="text-red-300">Note not found.</p>
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


import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { getAllNotes, readNote } from '@/lib/notes'

export async function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }))
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


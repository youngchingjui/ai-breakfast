import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import { getAllBriefs, readBrief } from '@/lib/briefs'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return getAllBriefs().map((b) => ({ slug: b.slug }))
}

function stripFrontMatter(input: string): string {
  let s = input
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1)
  if (/^---\s*\r?\n/.test(s)) {
    const m = s.match(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n)?/)
    if (m) return s.slice(m[0].length)
  }
  return s
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = readBrief(slug)
  if (!data) return { title: 'AI Brief' }

  const description = `A short, sourced roundup of recent AI developments — ${data.item.dateDisplay ?? data.item.title}.`
  return {
    title: data.item.title,
    description,
    openGraph: {
      title: `${data.item.title} | AI Breakfast`,
      description,
      type: 'article',
    },
  }
}

export default async function BriefPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = readBrief(slug)

  if (!data) {
    return (
      <div className="space-y-4">
        <Link href="/briefs" className="button">← Back to AI Briefs</Link>
        <p className="text-destructive">Brief not found.</p>
      </div>
    )
  }

  const content = stripFrontMatter(data.content)

  return (
    <article className="space-y-6">
      <Link href="/briefs" className="button">← Back to AI Briefs</Link>
      {data.item.dateDisplay && (
        <p className="text-sm text-muted-foreground font-mono uppercase tracking-wide">
          {data.item.dateDisplay}
        </p>
      )}
      <div className="container-prose">
        <ReactMarkdown rehypePlugins={[rehypeSlug]}>{content}</ReactMarkdown>
      </div>
      <div>
        <Link href="/briefs" className="button">← Back to AI Briefs</Link>
      </div>
    </article>
  )
}

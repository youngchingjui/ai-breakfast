import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllBriefs } from '@/lib/briefs'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'AI Briefs',
  description: 'Short, sourced roundups of recent AI developments worth knowing — from the AI Breakfast Shanghai community.',
}

export default function BriefsIndex() {
  const briefs = getAllBriefs()
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">AI Briefs</h1>
        <p className="text-muted-foreground max-w-prose">
          Short, sourced roundups of recent AI developments worth knowing — for
          people who use AI. Every line links to its source.
        </p>
      </div>
      {briefs.length === 0 ? (
        <p className="text-muted-foreground">No briefs yet.</p>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {briefs.map((b) => {
            const href = `/briefs/${b.slug}`
            return (
              <li key={href} className="p-4 hover:bg-muted transition-colors">
                <Link href={href} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">{b.title}</span>
                    {b.dateDisplay && (
                      <span className="text-sm text-muted-foreground">{b.dateDisplay}</span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">Read →</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

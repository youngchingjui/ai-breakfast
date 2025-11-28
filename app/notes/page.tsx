import Link from 'next/link'
import type { Metadata } from 'next'
import { getMeetings } from '@/lib/notes'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Notes',
}

export default function NotesIndex() {
  const meetings = getMeetings()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notes</h1>
      {meetings.length === 0 ? (
        <p className="text-muted-foreground">No notes found yet.</p>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {meetings.map((m) => {
            const href = `/notes/${m.baseSlug.join('/')}`
            return (
              <li key={href} className="p-4 hover:bg-muted transition-colors">
                <Link href={href} className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">{m.title}</span>
                    {m.dateDisplay && (
                      <span className="text-sm text-muted-foreground">{m.dateDisplay}</span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">View →</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}


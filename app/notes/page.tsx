import Link from 'next/link'
import { getAllNotes } from '@/lib/notes'

export const dynamic = 'force-static'

export default function NotesIndex() {
  const notes = getAllNotes()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notes</h1>
      {notes.length === 0 ? (
        <p className="text-muted-foreground">No notes found yet.</p>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border overflow-hidden">
          {notes.map((n) => {
            const href = `/notes/${n.slug.join('/')}`
            return (
              <li key={href} className="p-4 hover:bg-muted transition-colors">
                <Link href={href} className="flex items-center justify-between">
                  <span className="font-medium">{n.display}</span>
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


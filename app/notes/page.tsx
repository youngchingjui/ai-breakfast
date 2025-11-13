import Link from 'next/link'
import { getAllNotes } from '@/lib/notes'

export const dynamic = 'force-static'

export const metadata = {
  title: 'Notes',
}

export default function NotesIndex() {
  const notes = getAllNotes()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notes</h1>
      {notes.length === 0 ? (
        <p className="text-gray-400">No notes found yet.</p>
      ) : (
        <ul className="divide-y divide-white/10 rounded-lg border border-white/10 overflow-hidden">
          {notes.map((n) => {
            const href = `/notes/${n.slug.join('/')}`
            return (
              <li key={href} className="p-4 hover:bg-white/5">
                <Link href={href} className="flex items-center justify-between">
                  <span className="font-medium">{n.display}</span>
                  <span className="text-sm text-gray-400">View →</span>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}


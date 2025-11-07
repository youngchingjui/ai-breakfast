import fs from 'node:fs'
import path from 'node:path'

const NOTES_ROOT = path.join(process.cwd(), 'notes')

export type NoteItem = {
  slug: string[]
  path: string
  display: string
}

function isDir(p: string) {
  try { return fs.statSync(p).isDirectory() } catch { return false }
}

function isFile(p: string) {
  try { return fs.statSync(p).isFile() } catch { return false }
}

export function getAllNotes(): NoteItem[] {
  const results: NoteItem[] = []
  if (!isDir(NOTES_ROOT)) return results

  // Recursively find any notes.md files
  function walk(current: string, parts: string[]) {
    const entries = fs.readdirSync(current)
    for (const entry of entries) {
      const full = path.join(current, entry)
      if (isDir(full)) {
        walk(full, [...parts, entry])
      } else if (entry.toLowerCase() === 'notes.md') {
        const rel = path.relative(NOTES_ROOT, full)
        const rawParts = rel.split(path.sep)
        const slug = rawParts.slice(0, -1) // drop filename

        // Build a display label, e.g., 2025-11-06 if parts look like dates
        let display = slug.join('-')
        if (slug.length >= 3) {
          const [y, m, d] = slug
          if (/^\d{4}$/.test(y) && /^\d{2}$/.test(m) && /^\d{2}$/.test(d)) {
            display = `${y}-${m}-${d}`
          }
        }

        results.push({
          slug,
          path: full,
          display,
        })
      }
    }
  }

  walk(NOTES_ROOT, [])

  // Sort newest first by display if ISO date, otherwise by path
  results.sort((a, b) => b.display.localeCompare(a.display))
  return results
}

export function readNote(slug: string[]): { content: string, absolutePath: string } | null {
  const possible = [
    path.join(NOTES_ROOT, ...slug, 'notes.md'),
    path.join(NOTES_ROOT, ...slug) + '.md',
  ]
  for (const p of possible) {
    if (isFile(p)) {
      const content = fs.readFileSync(p, 'utf8')
      return { content, absolutePath: p }
    }
  }
  return null
}


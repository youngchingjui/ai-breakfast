import fs from 'node:fs'
import path from 'node:path'

const NOTES_ROOT = path.join(process.cwd(), 'notes')

export type NoteItem = {
  slug: string[]
  path: string
  title: string
  dateISO?: string
  dateDisplay?: string
}

function isDir(p: string) {
  try { return fs.statSync(p).isDirectory() } catch { return false }
}

function isFile(p: string) {
  try { return fs.statSync(p).isFile() } catch { return false }
}

function deriveDateFromSlug(slug: string[]): { iso?: string, display?: string } {
  if (slug.length >= 3) {
    const [y, m, d] = slug
    if (/^\d{4}$/.test(y) && /^\d{2}$/.test(m) && /^\d{2}$/.test(d)) {
      const iso = `${y}-${m}-${d}`
      const display = new Date(`${y}-${m}-${d}T00:00:00Z`).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
      return { iso, display }
    }
  }
  return {}
}

function parseTitleFromFile(filePath: string): string | undefined {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split(/\r?\n/)
    for (const line of lines) {
      const m = line.match(/^\s*#\s+(.+?)\s*$/)
      if (m) return m[1].trim()
    }
  } catch {}
  return undefined
}

export function getAllNotes(): NoteItem[] {
  const results: NoteItem[] = []
  if (!isDir(NOTES_ROOT)) return results

  // Recursively find any notes.md files
  function walk(current: string) {
    const entries = fs.readdirSync(current)
    for (const entry of entries) {
      const full = path.join(current, entry)
      if (isDir(full)) {
        walk(full)
      } else if (entry.toLowerCase() === 'notes.md') {
        const rel = path.relative(NOTES_ROOT, full)
        const rawParts = rel.split(path.sep)
        const slug = rawParts.slice(0, -1) // drop filename

        const title = parseTitleFromFile(full) || `Notes for ${slug.join('/')}`
        const { iso: dateISO, display: dateDisplay } = deriveDateFromSlug(slug)

        results.push({
          slug,
          path: full,
          title,
          dateISO,
          dateDisplay,
        })
      }
    }
  }

  walk(NOTES_ROOT)

  // Sort newest first by ISO date, then by path
  results.sort((a, b) => {
    if (a.dateISO && b.dateISO) return b.dateISO.localeCompare(a.dateISO)
    if (a.dateISO) return -1
    if (b.dateISO) return 1
    return b.path.localeCompare(a.path)
  })
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


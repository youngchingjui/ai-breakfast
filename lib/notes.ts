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

export type NoteVersion = {
  name: string // version folder name (e.g., gpt51) or 'default'
  slug: string[] // full slug to the concrete notes.md
  path: string // absolute file path to notes.md
  title?: string
}

export type MeetingItem = {
  slug: [string, string, string] // [yyyy, mm, dd]
  dateISO?: string
  dateDisplay?: string
  title: string
  versions: NoteVersion[]
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

function parseFrontMatterTitleAndDate(filePath: string): { title?: string, iso?: string, display?: string } {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1) // strip BOM
    if (!/^---\s*\n/.test(content)) return {}

    const end = content.indexOf('\n---')
    if (end === -1) return {}

    const block = content.slice(4, end) // after initial '---\n'
    const lines = block.split(/\r?\n/)
    let title: string | undefined
    let dateRaw: string | undefined

    for (const line of lines) {
      const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+?)\s*$/)
      if (!m) continue
      const key = m[1].toLowerCase()
      let val = m[2].trim()
      // strip surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
        val = val.slice(1, -1)
      }
      if (key === 'title') title = val
      if (key === 'date') dateRaw = val
    }

    let iso: string | undefined
    let display: string | undefined
    if (dateRaw) {
      const parsed = parseFrontMatterDate(dateRaw)
      iso = parsed?.iso
      display = parsed?.display
    }

    return { title, iso, display }
  } catch {
    return {}
  }
}

function parseFrontMatterDate(input: string): { iso: string, display: string } | undefined {
  // Accept formats like 'November 20, 2025' or 'Nov 20, 2025'
  const months = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
  } as Record<string, number>

  const m = input.trim().match(/^(\w+)\s+(\d{1,2}),\s*(\d{2,4})$/i)
  if (!m) return undefined
  const monthName = m[1].toLowerCase()
  const month = months[monthName]
  if (!month) return undefined
  const day = parseInt(m[2]!, 10)
  let year = parseInt(m[3]!, 10)
  if (year < 100) year += 2000

  // Build UTC date to avoid TZ drift
  const d = new Date(Date.UTC(year, month - 1, day))
  const iso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
  const display = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  return { iso, display }
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

        const { title: fmTitle, iso: fmISO, display: fmDisplay } = parseFrontMatterTitleAndDate(full)
        const title = fmTitle || parseTitleFromFile(full) || `Notes for ${slug.join('/')}`

        let dateISO = fmISO
        let dateDisplay = fmDisplay
        if (!dateISO || !dateDisplay) {
          const derived = deriveDateFromSlug(slug)
          dateISO ||= derived.iso
          dateDisplay ||= derived.display
        }

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

export function getAllMeetings(): MeetingItem[] {
  const notes = getAllNotes()
  // Group by date (yyyy-mm-dd) using first three slug segments
  const grouped = new Map<string, NoteItem[]>()
  for (const n of notes) {
    if (n.slug.length >= 3) {
      const key = n.slug.slice(0, 3).join('-')
      const arr = grouped.get(key)
      if (arr) arr.push(n); else grouped.set(key, [n])
    }
  }

  const meetings: MeetingItem[] = []
  for (const [key, items] of grouped.entries()) {
    // Determine date parts from key
    const [y, m, d] = key.split('-') as [string, string, string]
    const dateISO = `${y}-${m}-${d}`
    const dateDisplay = new Date(`${dateISO}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

    // Build versions: if slug has exactly 3 parts -> name 'default'; if >3 -> name is part[3]
    const versions: NoteVersion[] = items.map((it) => {
      const name = it.slug.length > 3 ? it.slug[3]! : 'default'
      return { name, slug: it.slug, path: it.path, title: it.title }
    })

    // Prefer a clean title from any version; use the first one's title
    const title = items[0]?.title || `Notes for ${dateDisplay}`

    meetings.push({ slug: [y, m, d], dateISO, dateDisplay, title, versions })
  }

  // Sort by date desc (key already yyyy-mm-dd)
  meetings.sort((a, b) => {
    if (a.dateISO && b.dateISO) return b.dateISO.localeCompare(a.dateISO)
    if (a.dateISO) return -1
    if (b.dateISO) return 1
    return b.slug.join('/').localeCompare(a.slug.join('/'))
  })

  return meetings
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

export function listMeetingVersions(dateSlug: [string, string, string]): NoteVersion[] {
  const [y, m, d] = dateSlug
  const baseDir = path.join(NOTES_ROOT, y, m, d)
  const versions: NoteVersion[] = []

  // Versionless case
  const direct = path.join(baseDir, 'notes.md')
  if (isFile(direct)) {
    const { title } = parseFrontMatterTitleAndDate(direct)
    versions.push({ name: 'default', slug: [y, m, d], path: direct, title })
  }

  // Versioned subfolders
  if (isDir(baseDir)) {
    const entries = fs.readdirSync(baseDir)
    for (const entry of entries) {
      const candidate = path.join(baseDir, entry, 'notes.md')
      if (isFile(candidate)) {
        const { title } = parseFrontMatterTitleAndDate(candidate)
        versions.push({ name: entry, slug: [y, m, d, entry], path: candidate, title })
      }
    }
  }

  // Sort versions by name, but keep 'default' first if present
  versions.sort((a, b) => {
    if (a.name === 'default') return -1
    if (b.name === 'default') return 1
    return a.name.localeCompare(b.name)
  })

  return versions
}


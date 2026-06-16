import fs from 'node:fs'
import path from 'node:path'

const BRIEFS_ROOT = path.join(process.cwd(), 'briefs')

export type BriefItem = {
  slug: string
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

function parseFrontMatterDate(input: string): { iso: string, display: string } | undefined {
  const months = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
    jan: 1, feb: 2, mar: 3, apr: 4, jun: 6, jul: 7, aug: 8, sep: 9, sept: 9, oct: 10, nov: 11, dec: 12,
  } as Record<string, number>

  const m = input.trim().match(/^(\w+)\s+(\d{1,2}),\s*(\d{2,4})$/i)
  if (!m) return undefined
  const month = months[m[1].toLowerCase()]
  if (!month) return undefined
  const day = parseInt(m[2]!, 10)
  let year = parseInt(m[3]!, 10)
  if (year < 100) year += 2000

  const d = new Date(Date.UTC(year, month - 1, day))
  const iso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
  const display = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  return { iso, display }
}

function parseFrontMatter(filePath: string): { title?: string, iso?: string, display?: string } {
  try {
    let content = fs.readFileSync(filePath, 'utf8')
    if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1) // strip BOM
    if (!/^---\s*\n/.test(content)) return {}

    const end = content.indexOf('\n---')
    if (end === -1) return {}

    const block = content.slice(4, end)
    let title: string | undefined
    let dateRaw: string | undefined

    for (const line of block.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.+?)\s*$/)
      if (!m) continue
      const key = m[1].toLowerCase()
      let val = m[2].trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith('\'') && val.endsWith('\''))) {
        val = val.slice(1, -1)
      }
      if (key === 'title') title = val
      if (key === 'date') dateRaw = val
    }

    const parsed = dateRaw ? parseFrontMatterDate(dateRaw) : undefined
    return { title, iso: parsed?.iso, display: parsed?.display }
  } catch {
    return {}
  }
}

export function getAllBriefs(): BriefItem[] {
  if (!isDir(BRIEFS_ROOT)) return []

  const results: BriefItem[] = []
  for (const entry of fs.readdirSync(BRIEFS_ROOT)) {
    if (!entry.toLowerCase().endsWith('.md')) continue
    const full = path.join(BRIEFS_ROOT, entry)
    if (!isFile(full)) continue

    const slug = entry.replace(/\.md$/i, '')
    const { title, iso, display } = parseFrontMatter(full)
    results.push({
      slug,
      path: full,
      title: title || slug,
      dateISO: iso,
      dateDisplay: display,
    })
  }

  // Newest first by ISO date, then by slug
  results.sort((a, b) => {
    if (a.dateISO && b.dateISO) return b.dateISO.localeCompare(a.dateISO)
    if (a.dateISO) return -1
    if (b.dateISO) return 1
    return b.slug.localeCompare(a.slug)
  })
  return results
}

export function readBrief(slug: string): { content: string, item: BriefItem } | null {
  // Reject path traversal; slugs are simple filenames
  if (!/^[A-Za-z0-9_-]+$/.test(slug)) return null

  const full = path.join(BRIEFS_ROOT, `${slug}.md`)
  if (!isFile(full)) return null

  const content = fs.readFileSync(full, 'utf8')
  const { title, iso, display } = parseFrontMatter(full)
  return {
    content,
    item: { slug, path: full, title: title || slug, dateISO: iso, dateDisplay: display },
  }
}

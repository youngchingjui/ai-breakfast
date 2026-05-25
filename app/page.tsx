import Link from "next/link"

const GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/embed?src=c_c4644bf2c1238c621372c1f3f24b313d3092cabc9d2dd88351592d1d04dad8b2%40group.calendar.google.com&ctz=Asia%2FShanghai"

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">AI Breakfast — Shanghai</h1>
        <p className="text-muted-foreground max-w-prose">
          Join us for a casual roundtable meetup over breakfast to discuss the
          latest in AI. This week: <strong>Local-first RAG</strong> — Paul Ropel
          walks us through retrieval-augmented generation that runs entirely on
          your own machine.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What to expect</h2>
            <ul className="list-disc pl-5 text-foreground space-y-2">
              <li>
                <strong>8:00–8:30</strong> — Introductions & lightning updates
              </li>
              <li>
                <strong>8:30+</strong> — Demos and open discussion
              </li>
              <li>Show off something you&apos;ve built (with or without AI)</li>
              <li>Peer feedback, troubleshooting & collaboration</li>
              <li>Exploring interesting AI workflows, tools and hacks</li>
            </ul>
            <p className="text-muted-foreground">
              <strong>Ideal for</strong>: managers, practitioners, enthusiasts,
              team leaders looking to upskill or integrate AI in workflows
            </p>
          </div>

          <aside className="rounded-lg border border-border p-4 bg-card space-y-3">
            <div className="text-sm text-muted-foreground">Next meetup</div>
            <div className="text-lg font-semibold">Thu May 28 | 8–10am</div>
            <div className="space-y-1 text-foreground">
              <div className="font-medium">BAKER&SPICE</div>
              <div>1717 West Nanjing Road, Wheelock Square</div>
              <div className="text-sm text-muted-foreground">
                南京西路1717号 会德丰国际广场南院首层101号商铺
              </div>
              <div className="text-muted-foreground text-sm">
                (Look for room in back)
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={GOOGLE_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="button text-sm">
                View Calendar
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Previous notes</h2>
          <Link href="/notes" className="button">
            Browse all notes →
          </Link>
        </div>
      </section>
    </div>
  )
}

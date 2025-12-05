import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative space-y-10">
      {/* colorful backdrop accents */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-400 to-orange-300 opacity-25 blur-3xl"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-72 w-72 rounded-full bg-gradient-to-tr from-sky-400 via-emerald-400 to-yellow-300 opacity-20 blur-3xl"
      />

      <section className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-fuchsia-600 via-rose-500 to-orange-500 bg-clip-text text-transparent">
            AI Breakfast — Shanghai
          </span>
        </h1>
        <p className="text-muted-foreground max-w-prose text-lg">
          Join us for a casual roundtable meetup over breakfast to discuss the latest in AI.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What to expect</h2>
            <ul className="list-disc space-y-2 pl-5 text-foreground">
              <li>Short lightning updates — "Here's what I'm trying / struggling with in AI"</li>
              <li>Peer discussion & troubleshooting</li>
              <li>Exploring interesting AI workflows, tools and hacks</li>
              <li>Open time for co-working, collaborating, networking</li>
            </ul>
            <p className="text-muted-foreground">
              <strong>Ideal for</strong>: managers, practitioners, enthusiasts, team leaders looking to upskill or integrate AI in workflows
            </p>
          </div>

          {/* gradient framed next meetup card */}
          <div className="rounded-xl bg-gradient-to-r from-fuchsia-500 via-rose-400 to-orange-300 p-[1px] shadow-sm">
            <aside className="space-y-2 rounded-lg border border-border bg-card p-4 backdrop-blur">
              <div className="text-sm text-muted-foreground">Next meetup</div>
              <div className="text-lg font-semibold">Thu Dec 11 | 9–10:30am</div>
              <div className="space-y-1 text-foreground">
                <div className="font-medium">BAKER&SPICE</div>
                <div>1717 West Nanjing Road, Wheelock Square</div>
                <div>南京西路1717号 会德丰国际广场南院首层101号商铺</div>
                <div className="text-muted-foreground">(Look for long table in the back)</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-border pt-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Previous notes</h2>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-400 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Browse all notes →
          </Link>
        </div>
      </section>
    </div>
  )
}


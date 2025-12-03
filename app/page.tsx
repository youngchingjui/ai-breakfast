import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-xl border border-border p-8 space-y-6">
        {/* soft vibrant background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-fuchsia-500/20 via-sky-400/20 to-amber-400/20 blur-3xl" />

        <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-600 via-sky-500 to-amber-500 bg-clip-text text-transparent">
          AI Breakfast — Shanghai
        </h1>
        <p className="text-muted-foreground max-w-prose">
          Join us for a casual roundtable meetup over breakfast to discuss the latest in AI.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What to expect</h2>
            <ul className="list-disc pl-5 text-foreground space-y-2">
              <li>Short lightning updates — "Here's what I'm trying / struggling with in AI"</li>
              <li>Peer discussion & troubleshooting</li>
              <li>Exploring interesting AI workflows, tools and hacks</li>
              <li>Open time for co-working, collaborating, networking</li>
            </ul>
            <p className="text-muted-foreground"><strong>Ideal for</strong>: managers, practitioners, enthusiasts, team leaders looking to upskill or integrate AI in workflows</p>
          </div>

          <aside className="relative rounded-lg border border-border p-4 bg-card space-y-2 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-fuchsia-500 before:via-emerald-500 before:to-amber-400">
            <div className="text-sm text-muted-foreground">Next meetup</div>
            <div className="text-lg font-semibold">Thu Nov 13 | 8–9am</div>
            <div className="space-y-1 text-foreground">
              <div className="font-medium">BAKER&SPICE</div>
              <div>1717 West Nanjing Road, Wheelock Square</div>
              <div>南京西路1717号 会德丰国际广场南院首层101号商铺</div>
              <div className="text-muted-foreground">(Look for long table in the back)</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Previous notes</h2>
          <Link href="/notes" className="button border-transparent bg-gradient-to-r from-fuchsia-500/10 via-sky-400/10 to-amber-400/10 hover:from-fuchsia-500/20 hover:via-sky-400/20 hover:to-amber-400/20">
            Browse all notes →
          </Link>
        </div>
      </section>
    </div>
  )
}


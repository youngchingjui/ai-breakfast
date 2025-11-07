import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">AI Breakfast — Shanghai</h1>
        <p className="text-gray-300 max-w-prose">
          Join us for a casual roundtable meetup over breakfast to discuss the latest in AI.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">What to expect</h2>
            <ul className="list-disc pl-5 text-gray-200 space-y-2">
              <li>Short lightning updates — “Here’s what I’m trying / struggling with in AI”</li>
              <li>Peer discussion & troubleshooting</li>
              <li>Exploring interesting AI workflows, tools and hacks</li>
              <li>Open time for co-working, collaborating, networking</li>
            </ul>
            <p className="text-gray-300"><strong>Ideal for</strong>: managers, practitioners, enthusiasts, team leaders looking to upskill or integrate AI in workflows</p>
          </div>

          <aside className="rounded-lg border border-white/10 p-4 bg-white/5 space-y-2">
            <div className="text-sm text-gray-300">Next meetup</div>
            <div className="text-lg font-semibold">Thu Nov 13 | 8–9am</div>
            <div className="space-y-1">
              <div className="font-medium">BAKER&SPICE</div>
              <div>1717 West Nanjing Road, Wheelock Square</div>
              <div>南京西路1717号 会德丰国际广场南院首层101号商铺</div>
              <div className="text-gray-400">(Look for long table in the back)</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Previous notes</h2>
          <Link href="/notes" className="button">Browse all notes →</Link>
        </div>
      </section>
    </div>
  )
}


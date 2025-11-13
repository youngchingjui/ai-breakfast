import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: {
    default: 'AI Breakfast | Shanghai',
    template: '%s | AI Breakfast',
  },
  description: 'Weekly AI Breakfast meetup in Shanghai — every Thursday at Baker & Spice, Wheelock Square.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="border-b border-white/10">
          <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold">AI Breakfast Shanghai</Link>
            <nav className="flex items-center gap-3 text-sm text-gray-300">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/notes" className="hover:underline">Notes</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">
          {children}
        </main>
        <footer className="mx-auto max-w-3xl px-4 py-8 text-sm text-gray-400">
          <p>Hosted every Thursday at Baker & Spice — Wheelock Square, 1717 West Nanjing Road. 南京西路1717号 会德丰国际广场南院首层101号商铺</p>
        </footer>
      </body>
    </html>
  );
}


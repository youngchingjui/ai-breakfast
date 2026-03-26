import './globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Montserrat, Merriweather, Ubuntu_Mono } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-serif',
  display: 'swap',
})

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-breakfast.vercel.app'),
  title: {
    default: 'AI Breakfast | Shanghai',
    template: '%s | AI Breakfast',
  },
  description: 'Weekly AI Breakfast meetup in Shanghai — every Thursday at Baker & Spice, Wheelock Square.',
  openGraph: {
    type: 'website',
    siteName: 'AI Breakfast Shanghai',
    description: 'Weekly AI Breakfast meetup in Shanghai — every Thursday at Baker & Spice, Wheelock Square.',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${merriweather.variable} ${ubuntuMono.variable}`}>
      <body className="min-h-screen">
        <header className="border-b border-border">
          <div className="mx-auto max-w-2xl px-5 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">AI Breakfast Shanghai</Link>
            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <Link href="/notes" className="hover:text-foreground transition-colors">Notes</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-5 py-10">
          {children}
        </main>
        <footer className="mx-auto max-w-2xl px-5 py-10 text-sm text-muted-foreground">
          <p>Hosted every Thursday at Baker & Spice — Wheelock Square, 1717 West Nanjing Road. 南京西路1717号 会德丰国际广场南院首层101号商铺</p>
        </footer>
      </body>
    </html>
  );
}


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
    <html lang="en" className={`${montserrat.variable} ${merriweather.variable} ${ubuntuMono.variable}`}>
      <body className="min-h-screen">
        <header className="border-b border-border">
          <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold">AI Breakfast Shanghai</Link>
            <nav className="flex items-center gap-3 text-sm text-muted-foreground">
              <Link href="/" className="hover:underline hover:text-foreground">Home</Link>
              <Link href="/notes" className="hover:underline hover:text-foreground">Notes</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-8">
          {children}
        </main>
        <footer className="mx-auto max-w-3xl px-4 py-8 text-sm text-muted-foreground">
          <nav className="flex items-center gap-3">
            <Link href="/" className="hover:underline hover:text-foreground">Home</Link>
            <span aria-hidden="true">•</span>
            <Link href="/notes" className="hover:underline hover:text-foreground">Notes</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}


import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notion Clone',
  description: 'Lightweight Notion-like editor with pages and blocks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen grid" style={{ gridTemplateRows: '48px 1fr' }}>
          <header className="flex items-center justify-between border-b border-border bg-surface px-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">✦</span>
              <span className="font-semibold">Notion Clone</span>
            </div>
            <div className="text-sm text-muted">Local-only demo</div>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}

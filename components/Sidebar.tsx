"use client"

import { useStore } from '../lib/store'
import Link from 'next/link'
import { cn } from '../lib/utils'

export function Sidebar({ currentId }: { currentId?: string }) {
  const { pages, rootPageIds, addPage, renamePage, setCurrent, deletePage } = useStore()

  return (
    <aside className="h-full border-r border-border bg-sidebar p-3 overflow-y-auto">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm text-muted">Pages</div>
        <button className="btn" onClick={() => addPage()}>+ New</button>
      </div>
      <nav className="space-y-1">
        {rootPageIds.map((id) => {
          const page = pages[id]
          return (
            <div key={id} className={cn('group', currentId === id && 'bg-[#141922] rounded-md')}>
              <Link href={`/p/${id}`} className={cn('sidebar-item')}
                    onClick={() => setCurrent(id)}>
                <span className="flex-1 truncate">{page.title || 'Untitled'}</span>
                <span className="opacity-0 group-hover:opacity-100 text-muted text-xs">Open</span>
              </Link>
              <div className="flex gap-2 pl-2 pb-1">
                <button
                  className="btn px-2 py-1 text-xs"
                  onClick={() => renamePage(id, prompt('Rename page', page.title) ?? page.title)}
                >Rename</button>
                <button
                  className="btn px-2 py-1 text-xs"
                  onClick={() => { if (confirm('Delete page?')) deletePage(id) }}
                >Delete</button>
              </div>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

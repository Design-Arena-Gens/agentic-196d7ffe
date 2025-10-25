"use client"

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useStore } from '../lib/store'
import { BlockRenderer } from './blocks/BlockRenderer'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { persist } from '../lib/state'

export function Editor({ pageId }: { pageId: string }) {
  const { pages, addBlock, setCurrent } = useStore()
  const page = pages[pageId]

  useEffect(() => {
    setCurrent(pageId)
  }, [pageId, setCurrent])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addBlock(pageId)
    }
    if (e.key === 'Tab') {
      // prevent focus change; simple indent feature would require block-level focus tracking; skipping for MVP
      e.preventDefault()
    }
  }, [addBlock, pageId])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const ids = page.blockIds
    const oldIndex = ids.indexOf(String(active.id))
    const newIndex = ids.indexOf(String(over.id))
    if (oldIndex === -1 || newIndex === -1) return
    useStore.setState((s) => {
      const updated = arrayMove(s.pages[pageId].blockIds, oldIndex, newIndex)
      const next = { ...s, pages: { ...s.pages, [pageId]: { ...s.pages[pageId], blockIds: updated } } }
      persist(next)
      return next
    })
  }

  if (!page) return null

  return (
    <main className="h-full overflow-y-auto">
      <div className="mx-auto max-w-3xl px-8 py-10">
        <input
          className="w-full bg-transparent text-3xl font-semibold outline-none mb-6 placeholder:text-muted"
          value={page.title}
          onChange={(e) => useStore.getState().renamePage(pageId, e.target.value)}
          placeholder="Untitled"
        />
        <DndContext sensors={sensors} onDragEnd={onDragEnd}>
          <SortableContext items={page.blockIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-1" onKeyDown={onKeyDown}>
              {page.blockIds.map((bid) => (
                <BlockRenderer key={bid} pageId={pageId} id={bid} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <button className="btn mt-6" onClick={() => addBlock(pageId)}>+ Add block</button>
      </div>
    </main>
  )
}

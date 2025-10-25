"use client"

import { useStore } from '../../lib/store'
import { cn } from '../../lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function BlockRenderer({ id, pageId }: { id: string, pageId: string }) {
  const { blocks, updateBlockText, setBlockType, deleteBlock } = useStore()
  const block = blocks[id]

  if (!block) return null

  const placeholder = block.type === 'h1' ? 'Heading 1' : block.type === 'h2' ? 'Heading 2' : 'Type something...'

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  const style: React.CSSProperties = { transform: CSS.Translate.toString(transform), transition }

  return (
    <div ref={setNodeRef} style={style} className={cn('group flex items-start gap-2', isDragging && 'dragging')} {...attributes}>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <select
          className="input w-28"
          value={block.type}
          onChange={(e) => setBlockType(id, e.target.value as any)}
        >
          <option value="text">Text</option>
          <option value="h1">H1</option>
          <option value="h2">H2</option>
          <option value="quote">Quote</option>
          <option value="todo">Todo</option>
        </select>
      </div>
      <div className="flex-1" style={{ paddingLeft: `${(block.indent ?? 0) * 20}px` }}>
        {block.type === 'todo' ? (
          <label className="flex items-start gap-2 py-1">
            <input type="checkbox" checked={!!block.checked} onChange={(e) => useStore.getState().toggleTodo(id, e.target.checked)} />
            <input
              className={cn('w-full bg-transparent outline-none', block.checked && 'line-through text-muted')}
              value={block.text}
              placeholder="To-do"
              onChange={(e) => updateBlockText(id, e.target.value)}
            />
          </label>
        ) : (
          <input
            className={cn('w-full bg-transparent outline-none py-1',
              block.type === 'h1' && 'text-2xl font-bold',
              block.type === 'h2' && 'text-xl font-semibold',
              block.type === 'quote' && 'italic text-muted')}
            value={block.text}
            placeholder={placeholder}
            onChange={(e) => updateBlockText(id, e.target.value)}
          />
        )}
      </div>
      <button
        className="opacity-0 group-hover:opacity-100 text-muted text-xs"
        onClick={() => deleteBlock(pageId, id)}
      >Del</button>
      <button className="opacity-0 group-hover:opacity-100 text-muted text-xs" {...listeners}>Drag</button>
    </div>
  )
}

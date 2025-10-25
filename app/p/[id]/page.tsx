"use client"

import { useParams } from 'next/navigation'
import { Sidebar } from '../../../components/Sidebar'
import { Editor } from '../../../components/Editor'
import { useStoreInit } from '../../../lib/store'

export default function Page() {
  const params = useParams<{ id: string }>()
  useStoreInit()

  return (
    <div className="grid grid-cols-[280px_1fr] h-screen">
      <Sidebar currentId={params.id} />
      <Editor pageId={params.id} />
    </div>
  )
}

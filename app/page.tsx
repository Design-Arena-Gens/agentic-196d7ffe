"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getInitialState } from '../lib/state'

export default function IndexPage() {
  const router = useRouter()
  useEffect(() => {
    const state = getInitialState()
    const firstPageId = state.rootPageIds[0]
    router.replace(`/p/${firstPageId}`)
  }, [router])
  return null
}

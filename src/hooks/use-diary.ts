"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type DiaryEntry = {
  id: string
  text: string
  author: string
  created_at: string
}

export function useDiary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("diary_entries")
        .select("*")
        .order("created_at", { ascending: false })
      setEntries(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (text: string, author: string) => {
    const { data, error } = await supabase
      .from("diary_entries")
      .insert({ text, author })
      .select()
      .single()
    if (!error && data) setEntries(prev => [data, ...prev])
  }

  const remove = async (id: string) => {
    await supabase.from("diary_entries").delete().eq("id", id)
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  return { entries, loading, add, remove }
}

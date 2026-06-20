"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type SomedayItem = { id: string; text: string; created_at: string }

export function useSomeday() {
  const [items, setItems] = useState<SomedayItem[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("someday_items")
        .select("*")
        .order("created_at", { ascending: false })
      setItems(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (text: string) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase
      .from("someday_items")
      .insert({ text, user_id: user.id })
      .select()
      .single()
    if (!error && data) setItems(prev => [data, ...prev])
  }

  const remove = async (id: string) => {
    await supabase.from("someday_items").delete().eq("id", id)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return { items, loading, add, remove }
}

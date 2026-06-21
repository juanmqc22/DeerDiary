"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type SharedTask = {
  id: string
  title: string
  done: boolean
  who: string
  project_id: string | null
  created_at: string
}

export function useSharedTasks() {
  const [tasks, setTasks] = useState<SharedTask[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("shared_tasks")
        .select("*")
        .order("created_at", { ascending: false })
      setTasks(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (title: string, who: string, project_id?: string | null) => {
    const { data, error } = await supabase
      .from("shared_tasks")
      .insert({ title, who, done: false, project_id: project_id ?? null })
      .select()
      .single()
    if (!error && data) setTasks(prev => [data, ...prev])
  }

  const toggle = async (id: string, done: boolean) => {
    await supabase.from("shared_tasks").update({ done }).eq("id", id)
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t))
  }

  const remove = async (id: string) => {
    await supabase.from("shared_tasks").delete().eq("id", id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return { tasks, loading, add, toggle, remove }
}

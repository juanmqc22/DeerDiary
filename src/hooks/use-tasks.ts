"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Task = {
  id: string; title: string; context: string
  area: string; area_color: string; done: boolean
  project_id: string | null; due_date: string | null
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false })
      setTasks(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (task: Omit<Task, "id" | "done" | "due_date" | "project_id"> & { project_id?: string | null }) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase
      .from("tasks")
      .insert({ ...task, user_id: user.id })
      .select()
      .single()
    if (!error && data) setTasks(prev => [data, ...prev])
  }

  const toggle = async (id: string, done: boolean) => {
    await supabase.from("tasks").update({ done }).eq("id", id)
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done } : t))
  }

  const remove = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return { tasks, loading, add, toggle, remove }
}

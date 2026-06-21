"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type SharedProject = {
  id: string
  title: string
  who: string
  outcome: string
  created_at: string
}

export function useSharedProjects() {
  const [projects, setProjects] = useState<SharedProject[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("shared_projects")
        .select("*")
        .order("created_at", { ascending: false })
      setProjects(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (title: string, who: string, outcome: string) => {
    const { data, error } = await supabase
      .from("shared_projects")
      .insert({ title, who, outcome })
      .select()
      .single()
    if (!error && data) setProjects(prev => [data, ...prev])
  }

  const update = async (id: string, fields: Partial<Pick<SharedProject, "title" | "who" | "outcome">>) => {
    await supabase.from("shared_projects").update(fields).eq("id", id)
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...fields } : p))
  }

  const remove = async (id: string) => {
    await supabase.from("shared_projects").delete().eq("id", id)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return { projects, loading, add, update, remove }
}

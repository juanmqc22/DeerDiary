"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Project = {
  id: string
  title: string
  area: string
  area_color: string
  outcome: string | null
  created_at: string
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })
      setProjects(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (project: Omit<Project, "id" | "created_at">) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...project, user_id: user.id })
      .select()
      .single()
    if (!error && data) setProjects(prev => [data, ...prev])
  }

  const remove = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return { projects, loading, add, remove }
}

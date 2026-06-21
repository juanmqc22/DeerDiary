"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Project = {
  id: string
  title: string
  area: string
  area_color: string
  outcome: string
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
        .select("id, title, area, area_color, outcome, created_at")
        .order("created_at", { ascending: false })
      setProjects(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (project: { title: string; area: string; area_color: string; outcome: string }) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase
      .from("projects")
      .insert({ ...project, user_id: user.id })
      .select("id, title, area, area_color, outcome, created_at")
      .single()
    if (!error && data) setProjects(prev => [data, ...prev])
  }

  const remove = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return { projects, loading, add, remove }
}

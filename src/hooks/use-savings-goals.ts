"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type SavingsGoal = {
  id: string
  label: string
  current: number
  target: number
  color: string
}

export function useSavingsGoals() {
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("savings_goals")
        .select("*")
        .order("created_at", { ascending: true })
      setGoals(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const add = async (goal: Omit<SavingsGoal, "id">) => {
    const { data, error } = await supabase
      .from("savings_goals")
      .insert(goal)
      .select()
      .single()
    if (!error && data) setGoals(prev => [...prev, data])
  }

  const updateAmount = async (id: string, current: number) => {
    await supabase.from("savings_goals").update({ current }).eq("id", id)
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current } : g))
  }

  const remove = async (id: string) => {
    await supabase.from("savings_goals").delete().eq("id", id)
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  return { goals, loading, add, updateAmount, remove }
}

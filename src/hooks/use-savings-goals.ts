"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type SavingsGoal = {
  id: string
  label: string
  current_amount: number
  target_amount: number
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

  const add = async (goal: { label: string; target_amount: number; color: string }) => {
    const { data, error } = await supabase
      .from("savings_goals")
      .insert({ label: goal.label, target_amount: goal.target_amount, color: goal.color, current_amount: 0 })
      .select()
      .single()
    if (!error && data) setGoals(prev => [...prev, data])
  }

  const updateAmount = async (id: string, current_amount: number) => {
    await supabase.from("savings_goals").update({ current_amount }).eq("id", id)
    setGoals(prev => prev.map(g => g.id === id ? { ...g, current_amount } : g))
  }

  const remove = async (id: string) => {
    await supabase.from("savings_goals").delete().eq("id", id)
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  return { goals, loading, add, updateAmount, remove }
}

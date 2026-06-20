"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Transaction = {
  id: string
  date: string
  description: string
  amount: number
  type: "entrada" | "saída"
  category: string
  who: string
  created_at: string
}

export function useTransactions(month: number, year: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const from = `${year}-${String(month + 1).padStart(2, "0")}-01`
      const lastDay = new Date(year, month + 1, 0).getDate()
      const to = `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .gte("date", from)
        .lte("date", to)
        .order("date", { ascending: false })
      setTransactions(data ?? [])
      setLoading(false)
    }
    load()
  }, [month, year])

  const add = async (tx: Omit<Transaction, "id" | "created_at">) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert(tx)
      .select()
      .single()
    if (!error && data) setTransactions(prev => [data, ...prev])
  }

  const remove = async (id: string) => {
    await supabase.from("transactions").delete().eq("id", id)
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  return { transactions, loading, add, remove }
}

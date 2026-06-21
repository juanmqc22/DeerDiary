"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type Transaction = {
  id: string
  tx_date: string
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
        .gte("tx_date", from)
        .lte("tx_date", to)
        .order("tx_date", { ascending: false })
      setTransactions(data ?? [])
      setLoading(false)
    }
    load()
  }, [month, year])

  const add = async (tx: { description: string; amount: number; type: "entrada" | "saída"; category: string; who: string }) => {
    const { data: { user } } = await supabase.auth.getUser()
    const today = new Date().toISOString().slice(0, 10)
    const { data, error } = await supabase
      .from("transactions")
      .insert({ ...tx, tx_date: today, created_by: user?.id })
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

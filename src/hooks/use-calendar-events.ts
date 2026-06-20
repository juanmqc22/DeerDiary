"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type CalendarEvent = {
  id: string
  title: string
  date: string
  time: string | null
  color: string
  created_at: string
}

export function useCalendarEvents(month: number, year: number) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const from = `${year}-${String(month + 1).padStart(2, "0")}-01`
      const lastDay = new Date(year, month + 1, 0).getDate()
      const to = `${year}-${String(month + 1).padStart(2, "0")}-${lastDay}`
      const { data } = await supabase
        .from("calendar_events")
        .select("*")
        .gte("date", from)
        .lte("date", to)
        .order("date", { ascending: true })
      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [month, year])

  const add = async (event: Omit<CalendarEvent, "id" | "created_at">) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const { data, error } = await supabase
      .from("calendar_events")
      .insert({ ...event, user_id: user.id })
      .select()
      .single()
    if (!error && data) setEvents(prev => [...prev, data].sort((a, b) => a.date.localeCompare(b.date)))
  }

  const remove = async (id: string) => {
    await supabase.from("calendar_events").delete().eq("id", id)
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return { events, loading, add, remove }
}

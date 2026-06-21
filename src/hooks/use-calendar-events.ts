"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export type CalendarEvent = {
  id: string
  title: string
  event_date: string
  event_time: string | null
  color: string
  who: string
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
        .gte("event_date", from)
        .lte("event_date", to)
        .order("event_date", { ascending: true })
      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [month, year])

  const add = async (event: { title: string; event_date: string; event_time: string | null; color: string; who: string }) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from("calendar_events")
      .insert({ ...event, created_by: user?.id })
      .select()
      .single()
    if (!error && data) setEvents(prev => [...prev, data].sort((a, b) => a.event_date.localeCompare(b.event_date)))
  }

  const remove = async (id: string) => {
    await supabase.from("calendar_events").delete().eq("id", id)
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return { events, loading, add, remove }
}

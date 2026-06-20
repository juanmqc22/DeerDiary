"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

const EMAIL_MAP: Record<string, { label: string; emoji: string; color: string; who: "baby" | "juan" }> = {
  "biamarmelo27@gmail.com": { label: "Baby", emoji: "🌸", color: "var(--dusty-rose)", who: "baby" },
  "juanmqc01@gmail.com": { label: "Juan", emoji: "🌊", color: "var(--sky-blue)", who: "juan" },
}

export function useCurrentUser() {
  const [identity, setIdentity] = useState<typeof EMAIL_MAP[string] | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setEmail(user.email)
        setIdentity(EMAIL_MAP[user.email] ?? null)
      }
    })
  }, [])

  return { identity, email }
}

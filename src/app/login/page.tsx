"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { GrowingPlant } from "@/components/ui/growing-plant"

const USERS = {
  baby: { email: "biamarmelo27@gmail.com", label: "Baby", emoji: "🌸", color: "var(--dusty-rose)", bg: "linear-gradient(135deg, #c97d7d, #e8845a)" },
  juan: { email: "juanmqc01@gmail.com", label: "Juan", emoji: "🌊", color: "var(--sky-blue)", bg: "linear-gradient(135deg, #7aa3c9, #9b8bc4)" },
}

function LoginForm() {
  const searchParams = useSearchParams()
  const preselect = searchParams.get("user") as "baby" | "juan" | null
  const hasError = searchParams.get("error") === "auth"

  const [who, setWho] = useState<"baby" | "juan">(preselect ?? "baby")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(hasError ? "Link inválido. Tente novamente." : "")
  const [magicSent, setMagicSent] = useState(false)

  const user = USERS[who]
  const supabase = createClient()

  const loginWithPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithPassword({ email: user.email, password })
    if (error) {
      setError("Senha incorreta. Tente o link mágico abaixo.")
    }
    setLoading(false)
  }

  const sendMagicLink = async () => {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithOtp({
      email: user.email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    })
    if (error) setError(error.message)
    else setMagicSent(true)
    setLoading(false)
  }

  if (magicSent) {
    return (
      <div className="text-center">
        <p className="text-5xl mb-4">📬</p>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--warm-brown)" }}>
          Verifique seu email!
        </h2>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
          Enviamos um link para <strong>{user.email}</strong>.<br />
          Clique no link para entrar.
        </p>
        <button onClick={() => setMagicSent(false)} className="mt-6 text-xs underline"
          style={{ color: "var(--muted-foreground)" }}>
          Voltar
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Seletor de usuário */}
      <div className="flex gap-3 mb-6">
        {(["baby", "juan"] as const).map(u => (
          <button key={u} onClick={() => { setWho(u); setPassword(""); setError("") }}
            className="flex-1 py-3 rounded-2xl flex flex-col items-center gap-1 transition-all border-2"
            style={{
              borderColor: who === u ? USERS[u].color : "var(--card-border)",
              background: who === u ? USERS[u].color + "15" : "var(--muted)",
            }}>
            <span className="text-xl">{USERS[u].emoji}</span>
            <span className="text-sm font-semibold" style={{ color: who === u ? USERS[u].color : "var(--muted-foreground)" }}>
              {USERS[u].label}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={loginWithPassword} className="space-y-3">
        <div>
          <p className="text-xs mb-1.5 font-medium" style={{ color: "var(--muted-foreground)" }}>Email</p>
          <div className="w-full px-3 py-2.5 rounded-xl text-sm"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            {user.email}
          </div>
        </div>

        <div>
          <p className="text-xs mb-1.5 font-medium" style={{ color: "var(--muted-foreground)" }}>Senha</p>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }}
          />
        </div>

        {error && (
          <p className="text-xs text-center px-2 py-2 rounded-xl"
            style={{ background: "var(--dusty-rose)15", color: "var(--dusty-rose)" }}>
            {error}
          </p>
        )}

        <button type="submit" disabled={loading || !password}
          className="w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: user.bg }}>
          {loading ? "Entrando..." : `Entrar como ${user.label} ${user.emoji}`}
        </button>
      </form>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px" style={{ background: "var(--card-border)" }} />
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>ou</span>
        <div className="flex-1 h-px" style={{ background: "var(--card-border)" }} />
      </div>

      <button onClick={sendMagicLink} disabled={loading}
        className="w-full py-3 rounded-2xl text-sm font-medium border-2 transition-all hover:opacity-80 disabled:opacity-50"
        style={{ borderColor: "var(--card-border)", color: "var(--muted-foreground)", background: "var(--muted)" }}>
        ✉️ Receber link mágico por email
      </button>
    </>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: "linear-gradient(160deg, #fdf6ee 0%, #f5e0c8 60%, #e8c9a8 100%)" }}>

      {/* Plantas decorativas */}
      <div className="absolute bottom-0 left-0 opacity-15 pointer-events-none" style={{ transform: "scale(2) translateX(-20%) translateY(20%)" }}>
        <GrowingPlant progress={100} color="#8b5e3c" size={120} />
      </div>
      <div className="absolute bottom-0 right-0 opacity-15 pointer-events-none" style={{ transform: "scale(2.5) translateX(25%) translateY(20%)" }}>
        <GrowingPlant progress={80} color="#d4a547" size={120} />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="12" fill="#8b5e3c" />
              <path d="M20 31 C20 31 9 23 9 16 C9 11.8 12.2 9 16 9 C18 9 19.7 9.9 20 10.8 C20.3 9.9 22 9 24 9 C27.8 9 31 11.8 31 16 C31 23 20 31 20 31Z"
                fill="white" opacity="0.92" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>DearDiary</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Quem é você?</p>
        </div>

        {/* Card de login */}
        <div className="rounded-3xl p-6" style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
          <Suspense fallback={<div className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>Carregando...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Bell, Moon, Globe, ChevronRight, LogOut, Heart, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/hooks/use-current-user"

type Stats = {
  doneTasks: number
  activeGoals: number
  diaryEntries: number
  transactions: number
  calendarEvents: number
  completedGoals: number
}

function useProfileStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const [
        { count: doneTasks },
        { count: activeGoals },
        { count: diaryEntries },
        { count: transactions },
        { count: calendarEvents },
        { data: goals },
      ] = await Promise.all([
        supabase.from("tasks").select("*", { count: "exact", head: true }).eq("done", true),
        supabase.from("savings_goals").select("*", { count: "exact", head: true }),
        supabase.from("diary_entries").select("*", { count: "exact", head: true }),
        supabase.from("transactions").select("*", { count: "exact", head: true }),
        supabase.from("calendar_events").select("*", { count: "exact", head: true }),
        supabase.from("savings_goals").select("current_amount, target_amount"),
      ])

      const completedGoals = (goals ?? []).filter(
        (g: { current_amount: number; target_amount: number }) => g.current_amount >= g.target_amount && g.target_amount > 0
      ).length

      setStats({
        doneTasks: doneTasks ?? 0,
        activeGoals: activeGoals ?? 0,
        diaryEntries: diaryEntries ?? 0,
        transactions: transactions ?? 0,
        calendarEvents: calendarEvents ?? 0,
        completedGoals,
      })
    }
    load()
  }, [])

  return stats
}

type Achievement = { emoji: string; label: string; unlocked: boolean }

function buildAchievements(stats: Stats): Achievement[] {
  return [
    { emoji: "✅", label: "Primeira tarefa", unlocked: stats.doneTasks >= 1 },
    { emoji: "⭐", label: "10 tarefas feitas", unlocked: stats.doneTasks >= 10 },
    { emoji: "🏆", label: "30 tarefas feitas", unlocked: stats.doneTasks >= 30 },
    { emoji: "🌱", label: "Primeira meta", unlocked: stats.activeGoals >= 1 },
    { emoji: "🌳", label: "Meta concluída", unlocked: stats.completedGoals >= 1 },
    { emoji: "📖", label: "Diário do casal", unlocked: stats.diaryEntries >= 1 },
    { emoji: "💰", label: "Finança registrada", unlocked: stats.transactions >= 1 },
    { emoji: "📅", label: "Agenda organizada", unlocked: stats.calendarEvents >= 1 },
  ]
}

export default function ProfilePage() {
  const router = useRouter()
  const { identity } = useCurrentUser()
  const stats = useProfileStats()
  const [notifications, setNotifications] = useState(true)
  const [sundayReminder, setSundayReminder] = useState(true)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  const avatarInitial = identity?.who === "juan" ? "J" : "B"
  const avatarGradient = identity?.who === "juan"
    ? "linear-gradient(135deg, var(--sky-blue), var(--lavender))"
    : "linear-gradient(135deg, var(--dusty-rose), var(--soft-orange))"

  const achievements = stats ? buildAchievements(stats) : []
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      {/* Avatar + info */}
      <div className="flex flex-col items-center mb-8 pt-2">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg"
            style={{ background: avatarGradient }}>
            {avatarInitial}
          </div>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>
          {identity ? `${identity.label} ${identity.emoji}` : "..."}
        </h1>

        {/* Stats reais */}
        <div className="flex gap-3 mt-4">
          <div className="flex flex-col items-center px-4 py-2 rounded-2xl" style={{ background: "var(--muted)" }}>
            <span className="text-xl font-bold" style={{ color: "var(--soft-orange)" }}>
              ✅ {stats?.doneTasks ?? "—"}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>tarefas feitas</span>
          </div>
          <div className="flex flex-col items-center px-4 py-2 rounded-2xl" style={{ background: "var(--muted)" }}>
            <span className="text-xl font-bold" style={{ color: "var(--golden)" }}>
              🌱 {stats?.activeGoals ?? "—"}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>metas ativas</span>
          </div>
          <div className="flex flex-col items-center px-4 py-2 rounded-2xl" style={{ background: "var(--muted)" }}>
            <span className="text-xl font-bold" style={{ color: "var(--sage)" }}>
              📖 {stats?.diaryEntries ?? "—"}
            </span>
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>entradas no diário</span>
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
            <Star size={14} className="inline mr-1" style={{ color: "var(--golden)" }} />
            Conquistas
          </h2>
          <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
            {unlockedCount}/{achievements.length}
          </span>
        </div>
        {stats === null ? (
          <p className="text-sm text-center py-4" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {achievements.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
                style={{
                  background: c.unlocked ? "var(--muted)" : "transparent",
                  opacity: c.unlocked ? 1 : 0.3,
                }}>
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-[9px] text-center leading-tight" style={{ color: "var(--muted-foreground)" }}>
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Configurações */}
      <Card className="mb-4">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Configurações</h2>
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--muted)] transition-colors">
            <div className="flex items-center gap-3">
              <Bell size={17} style={{ color: "var(--muted-foreground)" }} />
              <span className="text-sm" style={{ color: "var(--foreground)" }}>Notificações</span>
            </div>
            <button onClick={() => setNotifications(n => !n)}
              className="w-10 h-6 rounded-full transition-all relative"
              style={{ background: notifications ? "var(--soft-orange)" : "var(--card-border)" }}>
              <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
                style={{ left: notifications ? "calc(100% - 22px)" : "2px" }} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--muted)] transition-colors">
            <div className="flex items-center gap-3">
              <Moon size={17} style={{ color: "var(--muted-foreground)" }} />
              <div>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>Revisão de domingo</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Lembrete às 10h</p>
              </div>
            </div>
            <button onClick={() => setSundayReminder(n => !n)}
              className="w-10 h-6 rounded-full transition-all relative"
              style={{ background: sundayReminder ? "var(--soft-orange)" : "var(--card-border)" }}>
              <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
                style={{ left: sundayReminder ? "calc(100% - 22px)" : "2px" }} />
            </button>
          </div>

          <button className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full">
            <div className="flex items-center gap-3">
              <Globe size={17} style={{ color: "var(--muted-foreground)" }} />
              <span className="text-sm" style={{ color: "var(--foreground)" }}>Idioma</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
              <span className="text-sm">Português</span>
              <ChevronRight size={15} />
            </div>
          </button>

          <button className="flex items-center justify-between p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full">
            <div className="flex items-center gap-3">
              <Heart size={17} style={{ color: "var(--dusty-rose)" }} />
              <span className="text-sm" style={{ color: "var(--foreground)" }}>Conta do casal</span>
            </div>
            <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
              <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-white"
                  style={{ background: "var(--dusty-rose)" }}>B</div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-white"
                  style={{ background: "var(--sky-blue)" }}>J</div>
              </div>
              <ChevronRight size={15} />
            </div>
          </button>
        </div>
      </Card>

      <button onClick={handleLogout}
        className="w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-80"
        style={{ color: "var(--dusty-rose)", background: "var(--dusty-rose)" + "15" }}>
        <LogOut size={16} />
        Sair da conta
      </button>
    </div>
  )
}

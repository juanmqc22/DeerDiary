"use client"

import { Card } from "@/components/ui/card"
import { GrowingPlant } from "@/components/ui/growing-plant"
import { Bell, Moon, Globe, ChevronRight, LogOut, Heart, Star } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [sundayReminder, setSundayReminder] = useState(true)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      {/* Avatar + info */}
      <div className="flex flex-col items-center mb-8 pt-2">
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--dusty-rose), var(--soft-orange))" }}>
            B
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-xs text-white shadow"
            style={{ background: "var(--warm-brown)" }}>
            ✏️
          </button>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>Baby</h1>
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Estrategista de Mídia Social ✨</p>

        {/* Streak + conquistas */}
        <div className="flex gap-3 mt-4">
          <div className="flex flex-col items-center px-4 py-2 rounded-2xl"
            style={{ background: "var(--muted)" }}>
            <span className="text-xl font-bold" style={{ color: "var(--soft-orange)" }}>🔥 7</span>
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>dias seguidos</span>
          </div>
          <div className="flex flex-col items-center px-4 py-2 rounded-2xl"
            style={{ background: "var(--muted)" }}>
            <span className="text-xl font-bold" style={{ color: "var(--golden)" }}>⭐ 24</span>
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>tarefas feitas</span>
          </div>
          <div className="flex flex-col items-center px-4 py-2 rounded-2xl"
            style={{ background: "var(--muted)" }}>
            <span className="text-xl font-bold" style={{ color: "var(--sage)" }}>🌱 3</span>
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>metas ativas</span>
          </div>
        </div>
      </div>

      {/* Fazenda pessoal */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Minha fazenda</h2>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>3 plantas ativas</span>
        </div>
        <div className="flex justify-around items-end">
          {[
            { label: "Pós-grad", progress: 20, color: "#7a9e7e" },
            { label: "Bem-estar", progress: 70, color: "#e8845a" },
            { label: "Carreira", progress: 45, color: "#9b8bc4" },
          ].map(p => (
            <div key={p.label} className="flex flex-col items-center gap-1">
              <GrowingPlant progress={p.progress} color={p.color} size={64} />
              <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{p.label}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Conquistas */}
      <Card className="mb-4">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
          <Star size={14} className="inline mr-1" style={{ color: "var(--golden)" }} />
          Conquistas
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: "🌱", label: "Primeira meta", unlocked: true },
            { emoji: "🔥", label: "7 dias seguidos", unlocked: true },
            { emoji: "📖", label: "Diário do casal", unlocked: true },
            { emoji: "🕊️", label: "Revisão dominical", unlocked: true },
            { emoji: "🌳", label: "Meta concluída", unlocked: false },
            { emoji: "💰", label: "Meta financeira", unlocked: false },
            { emoji: "⭐", label: "30 tarefas", unlocked: false },
            { emoji: "🌸", label: "Fazenda completa", unlocked: false },
          ].map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-1 p-2 rounded-xl"
              style={{ background: c.unlocked ? "var(--muted)" : "transparent", opacity: c.unlocked ? 1 : 0.35 }}>
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-[9px] text-center leading-tight" style={{ color: "var(--muted-foreground)" }}>
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Configurações */}
      <Card className="mb-4">
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>Configurações</h2>
        <div className="flex flex-col gap-1">
          {/* Notificações */}
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

          {/* Lembrete de domingo */}
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

          {/* Idioma */}
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

          {/* Casal */}
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

      {/* Sair */}
      <button onClick={handleLogout} className="w-full py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-all hover:opacity-80"
        style={{ color: "var(--dusty-rose)", background: "var(--dusty-rose)" + "15" }}>
        <LogOut size={16} />
        Sair da conta
      </button>
    </div>
  )
}

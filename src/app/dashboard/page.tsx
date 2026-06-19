"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, ChevronRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const focus = [
  { id: 1, title: "Enviar relatório mensal — cliente A", context: "@computador", done: false },
  { id: 2, title: "Ligar para a coordenadora do programa", context: "@ligações", done: false },
  { id: 3, title: "Compras da semana", context: "@recados", done: false },
]

const todayEvents = [
  { time: "09:00", title: "Reunião de alinhamento", color: "var(--lavender)" },
  { time: "14:00", title: "Culto — Sociedade de Socorro", color: "var(--sage)" },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

export default function Dashboard() {
  const [actions, setActions] = useState(focus)
  const toggle = (id: number) => setActions(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
  const done = actions.filter(a => a.done).length
  const isSunday = new Date().getDay() === 0

  return (
    <div className="space-y-8">

      {/* Saudação */}
      <div className="pt-2">
        <p className="text-xs capitalize tracking-wide" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--warm-brown)" }}>
          {greeting()}, Baby 🌸
        </h1>
      </div>

      {/* Foco do dia */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Foco de hoje
          </h2>
          {done > 0 && (
            <span className="text-xs font-semibold" style={{ color: "var(--sage)" }}>
              {done}/{actions.length} ✓
            </span>
          )}
        </div>

        <Card className="divide-y overflow-hidden">
          {actions.map(action => (
            <button key={action.id} onClick={() => toggle(action.id)}
              className="flex items-center gap-3 p-4 w-full text-left hover:bg-[var(--muted)] transition-colors">
              {action.done
                ? <CheckCircle2 size={18} style={{ color: "var(--sage)", flexShrink: 0 }} />
                : <Circle size={18} style={{ color: "var(--card-border)", flexShrink: 0 }} />
              }
              <span className={`text-sm flex-1 leading-snug ${action.done ? "line-through" : ""}`}
                style={{ color: action.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                {action.title}
              </span>
            </button>
          ))}
        </Card>

        <Link href="/tasks"
          className="flex items-center justify-center gap-1 mt-2 py-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}>
          Ver todas as ações <ChevronRight size={12} />
        </Link>
      </section>

      {/* Compromissos — só aparece se tiver algo */}
      {todayEvents.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: "var(--muted-foreground)" }}>
            Compromissos
          </h2>
          <div className="space-y-2">
            {todayEvents.map((ev, i) => (
              <Card key={i} className="flex items-center gap-3 p-3.5">
                <span className="text-xs font-mono font-bold w-11 flex-shrink-0" style={{ color: ev.color }}>
                  {ev.time}
                </span>
                <div className="w-0.5 h-4 rounded-full flex-shrink-0" style={{ background: ev.color }} />
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{ev.title}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Inbox — discreto, só o badge */}
      <Link href="/inbox">
        <div className="flex items-center justify-between py-3 px-1 border-b transition-opacity hover:opacity-70"
          style={{ borderColor: "var(--card-border)" }}>
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>Inbox</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: "var(--soft-orange)" }}>4</span>
            <ChevronRight size={14} style={{ color: "var(--card-border)" }} />
          </div>
        </div>
      </Link>

      {/* Banner domingo — discreto */}
      {isSunday && (
        <Link href="/review">
          <Card className="flex items-center justify-between p-4 hover:opacity-90 transition-opacity"
            style={{ background: "var(--sage)15", borderColor: "var(--sage)40" }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>Revisão de domingo 🕊️</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Um momento só seu. Com calma.</p>
            </div>
            <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} />
          </Card>
        </Link>
      )}

    </div>
  )
}

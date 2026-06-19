"use client"

import { Card } from "@/components/ui/card"
import { GrowingPlant } from "@/components/ui/growing-plant"
import { CheckCircle2, Circle, Clock, Users, ChevronRight, Inbox as InboxIcon } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const todayEvents = [
  { time: "09:00", title: "Reunião de alinhamento", color: "var(--lavender)" },
  { time: "14:00", title: "Culto — Sociedade de Socorro", color: "var(--sage)" },
]

const nextActions = [
  { id: 1, title: "Enviar relatório mensal — cliente A", context: "@computador", done: false },
  { id: 2, title: "Ligar para a coordenadora do programa", context: "@ligações", done: false },
  { id: 3, title: "Compras da semana", context: "@recados", done: false },
]

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

export default function Dashboard() {
  const [actions, setActions] = useState(nextActions)
  const toggle = (id: number) => setActions(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
  const isSunday = new Date().getDay() === 0

  return (
    <div className="space-y-5">
      {/* Saudação */}
      <div>
        <p className="text-xs capitalize tracking-wide" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-2xl font-bold mt-0.5" style={{ color: "var(--warm-brown)" }}>
          {greeting()}, Baby 🌸
        </h1>
      </div>

      {/* Banner domingo */}
      {isSunday && (
        <Link href="/review">
          <Card className="flex items-center justify-between p-4 hover:scale-[1.01] transition-transform"
            style={{ background: "linear-gradient(135deg, #7a9e7e18, #d4a54718)", borderColor: "var(--sage)" }}>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--warm-brown)" }}>É domingo! 🕊️</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Hora da revisão semanal</p>
            </div>
            <ChevronRight size={18} style={{ color: "var(--muted-foreground)" }} />
          </Card>
        </Link>
      )}

      {/* Inbox badge */}
      <Link href="/inbox">
        <Card className="flex items-center gap-3 p-3 hover:scale-[1.01] transition-transform cursor-pointer">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--soft-orange)" }}>
            <InboxIcon size={16} color="white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Inbox</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>4 itens para processar</p>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full text-white flex-shrink-0"
            style={{ background: "var(--soft-orange)" }}>4</span>
        </Card>
      </Link>

      {/* Compromissos de hoje */}
      {todayEvents.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"
            style={{ color: "var(--muted-foreground)" }}>
            <Clock size={11} /> Compromissos de hoje
          </h2>
          <div className="space-y-2">
            {todayEvents.map((ev, i) => (
              <Card key={i} className="flex items-center gap-3 p-3">
                <span className="text-xs font-mono font-bold w-11 flex-shrink-0" style={{ color: ev.color }}>
                  {ev.time}
                </span>
                <div className="w-0.5 h-5 rounded-full flex-shrink-0" style={{ background: ev.color }} />
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{ev.title}</span>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Próximas ações */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Próximas ações
          </h2>
          <Link href="/next-actions" className="text-xs font-medium hover:underline"
            style={{ color: "var(--soft-orange)" }}>
            Ver todas →
          </Link>
        </div>
        <Card className="divide-y" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
          {actions.map(action => (
            <button key={action.id} onClick={() => toggle(action.id)}
              className="flex items-center gap-3 p-3 w-full text-left hover:bg-[var(--muted)] transition-colors first:rounded-t-xl last:rounded-b-xl">
              {action.done
                ? <CheckCircle2 size={17} style={{ color: "var(--sage)", flexShrink: 0 }} />
                : <Circle size={17} style={{ color: "var(--card-border)", flexShrink: 0 }} />
              }
              <span className={`text-sm flex-1 ${action.done ? "line-through" : ""}`}
                style={{ color: action.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                {action.title}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full hidden sm:block flex-shrink-0"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                {action.context}
              </span>
            </button>
          ))}
        </Card>
      </section>

      {/* Aguardando */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"
          style={{ color: "var(--muted-foreground)" }}>
          <Users size={11} /> Aguardando resposta
        </h2>
        <Card className="divide-y">
          {[
            { title: "Proposta enviada — cliente B", who: "Cliente B", since: "há 2 dias", color: "var(--lavender)" },
            { title: "Aprovação do relatório", who: "Gerente", since: "hoje", color: "var(--golden)" },
          ].map((w, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: w.color }}>
                {w.who[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate" style={{ color: "var(--foreground)" }}>{w.title}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.who} · {w.since}</p>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* Fazenda resumo */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Fazenda de metas
          </h2>
          <Link href="/goals" className="text-xs font-medium hover:underline"
            style={{ color: "var(--soft-orange)" }}>
            Ver todas →
          </Link>
        </div>
        <Card className="p-4">
          <div className="flex justify-around items-end">
            {[
              { label: "Pós-grad", progress: 20, color: "#7a9e7e" },
              { label: "Finanças", progress: 55, color: "#d4a547" },
              { label: "Bem-estar", progress: 70, color: "#e8845a" },
            ].map(g => (
              <div key={g.label} className="flex flex-col items-center gap-1.5">
                <GrowingPlant progress={g.progress} color={g.color} size={64} />
                <span className="text-[10px] font-medium" style={{ color: "var(--muted-foreground)" }}>{g.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}

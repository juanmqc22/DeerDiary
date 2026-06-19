"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Clock, Users, Inbox as InboxIcon, ChevronRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const todayEvents = [
  { time: "09:00", title: "Reunião de alinhamento", color: "var(--lavender)" },
  { time: "14:00", title: "Culto — Sociedade de Socorro", color: "var(--sage)" },
]

const nextActions = [
  { id: 1, title: "Enviar relatório mensal — cliente A", context: "@computador", area: "Trabalho", areaColor: "var(--lavender)", done: false },
  { id: 2, title: "Ligar para a coordenadora do programa", context: "@ligações", area: "Pós-grad", areaColor: "var(--golden)", done: false },
  { id: 3, title: "Compras da semana", context: "@recados", area: "Casa", areaColor: "var(--dusty-rose)", done: false },
]

function getGreeting() {
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
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm capitalize" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-0.5" style={{ color: "var(--warm-brown)" }}>
          {getGreeting()}, Baby 🌸
        </h1>
      </div>

      {/* Banner de domingo */}
      {isSunday && (
        <Link href="/review">
          <div className="mb-4 p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: "linear-gradient(135deg, var(--sage)30, var(--golden)20)", border: "1px solid var(--sage)40" }}>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--warm-brown)" }}>É domingo! 🕊️</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Hora da sua revisão semanal</p>
            </div>
            <ChevronRight size={18} style={{ color: "var(--muted-foreground)" }} />
          </div>
        </Link>
      )}

      {/* Inbox badge */}
      <Link href="/inbox">
        <div className="mb-4 p-3 rounded-2xl flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
          style={{ background: "var(--muted)", border: "1px solid var(--card-border)" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--soft-orange)" }}>
            <InboxIcon size={17} color="white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Inbox</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>4 itens para processar</p>
          </div>
          <ChevronRight size={16} style={{ color: "var(--muted-foreground)" }} />
        </div>
      </Link>

      {/* Hoje — compromissos */}
      {todayEvents.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
            <Clock size={11} className="inline mr-1" />Compromissos de hoje
          </h2>
          <div className="flex flex-col gap-2">
            {todayEvents.map((ev, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
                <span className="text-xs font-mono font-semibold w-10 flex-shrink-0" style={{ color: ev.color }}>
                  {ev.time}
                </span>
                <div className="w-px h-5 rounded-full" style={{ background: ev.color }} />
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{ev.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next actions prioritárias */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Próximas ações
          </h2>
          <Link href="/next-actions" className="text-xs hover:underline" style={{ color: "var(--soft-orange)" }}>
            Ver todas
          </Link>
        </div>
        <Card className="p-1">
          {actions.map(action => (
            <button key={action.id} onClick={() => toggle(action.id)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full text-left">
              {action.done
                ? <CheckCircle2 size={17} style={{ color: "var(--sage)", flexShrink: 0 }} />
                : <Circle size={17} style={{ color: "var(--card-border)", flexShrink: 0 }} />
              }
              <span className={`text-sm flex-1 ${action.done ? "line-through" : ""}`}
                style={{ color: action.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                {action.title}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full hidden sm:block"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                {action.context}
              </span>
            </button>
          ))}
        </Card>
      </div>

      {/* Aguardando */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>
          <Users size={11} className="inline mr-1" />Aguardando resposta
        </h2>
        <Card>
          {[
            { title: "Proposta enviada — cliente B", who: "Cliente B", since: "há 2 dias" },
            { title: "Aprovação do relatório", who: "Gerente", since: "hoje" },
          ].map((w, i) => (
            <div key={i} className="flex items-center gap-3 p-3">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: "var(--sky-blue)" }}>
                {w.who[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{w.title}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{w.who} · {w.since}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { GrowingPlant } from "@/components/ui/growing-plant"
import { CheckCircle2, Circle, Plus, Flame, Star } from "lucide-react"
import { useState } from "react"

const dimensions = [
  { id: "work", name: "Trabalho", emoji: "💼", color: "var(--lavender)", tasks: 4, done: 2 },
  { id: "posgrad", name: "Pós-grad", emoji: "🎓", color: "var(--golden)", tasks: 3, done: 0 },
  { id: "church", name: "Igreja", emoji: "🕊️", color: "var(--sage)", tasks: 2, done: 1 },
  { id: "home", name: "Casa", emoji: "🏡", color: "var(--dusty-rose)", tasks: 5, done: 3 },
  { id: "me", name: "Eu", emoji: "🌸", color: "var(--soft-orange)", tasks: 2, done: 0 },
]

const upcomingTasks = [
  { id: 1, title: "Enviar relatório de mídia", done: false, dim: "Trabalho", color: "var(--lavender)" },
  { id: 2, title: "Pesquisar programas de pós-grad", done: false, dim: "Pós-grad", color: "var(--golden)" },
  { id: 3, title: "Preparar aula dominical", done: true, dim: "Igreja", color: "var(--sage)" },
  { id: 4, title: "Compras da semana", done: false, dim: "Casa", color: "var(--dusty-rose)" },
]

const goals = [
  { label: "Pós-graduação", progress: 20, color: "#7a9e7e" },
  { label: "Reserva financeira", progress: 55, color: "#d4a547" },
  { label: "Bem-estar", progress: 70, color: "#e8845a" },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

export default function Dashboard() {
  const [tasks, setTasks] = useState(upcomingTasks)
  const toggle = (id: number) =>
    setTasks(t => t.map(tk => tk.id === id ? { ...tk, done: !tk.done } : tk))
  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm capitalize" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-1" style={{ color: "var(--warm-brown)" }}>
          {getGreeting()}, Baby 🌸
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Você tem 8 tarefas abertas hoje. Uma de cada vez 💛
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
        {[
          { icon: <Flame size={18} style={{ color: "var(--soft-orange)" }} />, value: "7", label: "dias seguidos", color: "var(--soft-orange)" },
          { icon: <CheckCircle2 size={18} style={{ color: "var(--sage)" }} />, value: "6", label: "esta semana", color: "var(--sage)" },
          { icon: <Star size={18} style={{ color: "var(--golden)" }} />, value: "3", label: "metas ativas", color: "var(--golden)" },
        ].map((s, i) => (
          <Card key={i} className="flex items-center gap-2 md:gap-3 p-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--muted)" }}>{s.icon}</div>
            <div className="min-w-0">
              <p className="text-xl md:text-2xl font-bold leading-none" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] md:text-xs mt-0.5 leading-tight" style={{ color: "var(--muted-foreground)" }}>{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2 flex flex-col gap-4 md:gap-6">

          {/* Dimensões */}
          <div>
            <h2 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              Dimensões da vida
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {dimensions.map(dim => (
                <Card key={dim.id} className="cursor-pointer hover:scale-[1.02] transition-transform p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">{dim.emoji}</span>
                      <span className="font-semibold text-xs" style={{ color: "var(--foreground)" }}>{dim.name}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ background: dim.color + "22", color: dim.color }}>
                      {dim.tasks - dim.done}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${(dim.done / dim.tasks) * 100}%`, background: dim.color }} />
                  </div>
                  <p className="text-[10px] mt-1" style={{ color: "var(--muted-foreground)" }}>
                    {dim.done}/{dim.tasks} feitas
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Tarefas */}
          <div>
            <h2 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              Tarefas de hoje
            </h2>
            <Card>
              <div className="flex flex-col gap-1">
                {tasks.map(task => (
                  <button key={task.id} onClick={() => toggle(task.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors text-left w-full">
                    {task.done
                      ? <CheckCircle2 size={17} style={{ color: "var(--sage)", flexShrink: 0 }} />
                      : <Circle size={17} style={{ color: "var(--card-border)", flexShrink: 0 }} />
                    }
                    <span className={`text-sm flex-1 ${task.done ? "line-through" : ""}`}
                      style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                      {task.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full hidden sm:block"
                      style={{ background: task.color + "22", color: task.color }}>
                      {task.dim}
                    </span>
                  </button>
                ))}
                <button className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors w-full"
                  style={{ color: "var(--muted-foreground)" }}>
                  <Plus size={15} />
                  <span className="text-sm">Adicionar tarefa</span>
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="flex flex-col gap-4">
          {/* Inbox rápido */}
          <div>
            <h2 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              O que está na cabeça?
            </h2>
            <Card>
              <textarea
                placeholder="Capture aqui qualquer pensamento... ✨"
                className="w-full text-sm resize-none outline-none bg-transparent"
                style={{ color: "var(--foreground)", minHeight: 70 }}
              />
              <button className="w-full mt-2 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "var(--soft-orange)" }}>
                Salvar no inbox
              </button>
            </Card>
          </div>

          {/* Fazenda de metas com plantas SVG */}
          <div>
            <h2 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              Fazenda de metas
            </h2>
            <Card>
              <div className="flex justify-around items-end py-2">
                {goals.map(goal => (
                  <div key={goal.label} className="flex flex-col items-center gap-1">
                    <GrowingPlant progress={goal.progress} color={goal.color} size={60} />
                    <span className="text-[10px] text-center font-medium leading-tight"
                      style={{ color: "var(--muted-foreground)", maxWidth: 56 }}>
                      {goal.label}
                    </span>
                    <span className="text-[10px] font-bold" style={{ color: goal.color }}>
                      {goal.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

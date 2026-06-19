"use client"

import { Card } from "@/components/ui/card"
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
      <div className="mb-8">
        <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--warm-brown)" }}>
          {getGreeting()}, Baby 🌸
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Você tem 8 tarefas abertas hoje. Vai uma de cada vez 💛
        </p>
      </div>

      {/* Streak + Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "var(--muted)" }}>
            <Flame size={20} style={{ color: "var(--soft-orange)" }} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--soft-orange)" }}>7</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>dias seguidos</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "var(--muted)" }}>
            <CheckCircle2 size={20} style={{ color: "var(--sage)" }} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--sage)" }}>6</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>tarefas esta semana</p>
          </div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: "var(--muted)" }}>
            <Star size={20} style={{ color: "var(--golden)" }} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: "var(--golden)" }}>3</p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>metas ativas</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Dimensões */}
        <div className="col-span-2">
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Dimensões da vida
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {dimensions.map(dim => (
              <Card key={dim.id} className="cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{dim.emoji}</span>
                    <span className="font-semibold text-sm" style={{ color: "var(--foreground)" }}>{dim.name}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: dim.color + "22", color: dim.color }}>
                    {dim.tasks - dim.done} abertas
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{
                      width: `${(dim.done / dim.tasks) * 100}%`,
                      background: dim.color
                    }} />
                </div>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  {dim.done}/{dim.tasks} concluídas
                </p>
              </Card>
            ))}
          </div>

          {/* Tarefas do dia */}
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Tarefas de hoje
          </h2>
          <Card>
            <div className="flex flex-col gap-2">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggle(task.id)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--muted)] transition-colors text-left w-full"
                >
                  {task.done
                    ? <CheckCircle2 size={18} style={{ color: "var(--sage)", flexShrink: 0 }} />
                    : <Circle size={18} style={{ color: "var(--card-border)", flexShrink: 0 }} />
                  }
                  <span className={`text-sm flex-1 ${task.done ? "line-through" : ""}`}
                    style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                    {task.title}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: task.color + "22", color: task.color }}>
                    {task.dim}
                  </span>
                </button>
              ))}
              <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--muted)] transition-colors w-full mt-1"
                style={{ color: "var(--muted-foreground)" }}>
                <Plus size={16} />
                <span className="text-sm">Adicionar tarefa</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Coluna direita */}
        <div className="flex flex-col gap-4">
          {/* Inbox rápido */}
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              O que está na cabeça?
            </h2>
            <Card>
              <textarea
                placeholder="Capture aqui qualquer pensamento... ✨"
                className="w-full text-sm resize-none outline-none bg-transparent"
                style={{ color: "var(--foreground)", minHeight: 80 }}
              />
              <button className="w-full mt-2 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: "var(--soft-orange)" }}>
                Salvar no inbox
              </button>
            </Card>
          </div>

          {/* Metas — plantas crescendo */}
          <div>
            <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              Fazenda de metas 🌱
            </h2>
            <div className="flex flex-col gap-2">
              {[
                { label: "Pós-graduação", emoji: "🌳", progress: 20, color: "var(--sage)" },
                { label: "Reserva financeira", emoji: "🌾", progress: 55, color: "var(--golden)" },
                { label: "Saúde & bem-estar", emoji: "🌻", progress: 70, color: "var(--soft-orange)" },
              ].map(goal => (
                <Card key={goal.label} className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span>{goal.emoji}</span>
                    <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{goal.label}</span>
                    <span className="ml-auto text-xs" style={{ color: "var(--muted-foreground)" }}>{goal.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${goal.progress}%`, background: goal.color }} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

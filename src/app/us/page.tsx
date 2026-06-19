"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Plus, TrendingUp, BookHeart } from "lucide-react"
import { useState } from "react"

const sharedTasks = [
  { id: 1, title: "Renovar seguro do carro", done: false, who: "J" },
  { id: 2, title: "Jantar de aniversário — reserva", done: true, who: "B" },
  { id: 3, title: "Pesquisar planos de saúde", done: false, who: "BJ" },
  { id: 4, title: "Ligar para a imobiliária", done: false, who: "J" },
]

const finances = {
  income: 8500,
  expenses: 5200,
  categories: [
    { name: "Moradia", amount: 2200, color: "var(--lavender)", pct: 42 },
    { name: "Alimentação", amount: 1100, color: "var(--golden)", pct: 21 },
    { name: "Transporte", amount: 650, color: "var(--sky-blue)", pct: 13 },
    { name: "Lazer", amount: 480, color: "var(--dusty-rose)", pct: 9 },
    { name: "Outros", amount: 770, color: "var(--muted-foreground)", pct: 15 },
  ],
  goals: [
    { label: "Viagem de fim de ano ✈️", current: 1200, target: 5000, color: "var(--soft-orange)" },
    { label: "Reserva de emergência 🏦", current: 8000, target: 15000, color: "var(--sage)" },
  ]
}

const diaryEntries = [
  { date: "18 Jun", text: "Tivemos o melhor jantar. Simples, mas cheio de risadas. 💛", author: "B" },
  { date: "15 Jun", text: "Passeio no parque depois da igreja. Estava lindo.", author: "J" },
]

export default function UsPage() {
  const [tasks, setTasks] = useState(sharedTasks)
  const [tab, setTab] = useState<"tarefas" | "contas" | "diario">("tarefas")

  const toggle = (id: number) =>
    setTasks(t => t.map(tk => tk.id === id ? { ...tk, done: !tk.done } : tk))

  const balance = finances.income - finances.expenses

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "var(--dusty-rose)" }}>B</div>
          <span className="text-2xl">🤍</span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "var(--sky-blue)" }}>J</div>
        </div>
        <h1 className="text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>Nós dois</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Tudo que é de vocês juntos 🏡</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 rounded-2xl" style={{ background: "var(--muted)" }}>
        {(["tarefas", "contas", "diario"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all"
            style={{
              background: tab === t ? "var(--card)" : "transparent",
              color: tab === t ? "var(--warm-brown)" : "var(--muted-foreground)",
              boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {t === "tarefas" ? "✅ Tarefas" : t === "contas" ? "💰 Contas" : "📖 Diário"}
          </button>
        ))}
      </div>

      {/* Tarefas */}
      {tab === "tarefas" && (
        <div className="animate-fade-in">
          <Card>
            <div className="flex flex-col gap-2">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggle(task.id)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors text-left w-full"
                >
                  {task.done
                    ? <CheckCircle2 size={18} style={{ color: "var(--sage)", flexShrink: 0 }} />
                    : <Circle size={18} style={{ color: "var(--card-border)", flexShrink: 0 }} />
                  }
                  <span className={`text-sm flex-1 ${task.done ? "line-through" : ""}`}
                    style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                    {task.title}
                  </span>
                  <div className="flex gap-1">
                    {task.who.includes("B") && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: "var(--dusty-rose)" }}>B</div>
                    )}
                    {task.who.includes("J") && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                        style={{ background: "var(--sky-blue)" }}>J</div>
                    )}
                  </div>
                </button>
              ))}
              <button className="flex items-center gap-2 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full"
                style={{ color: "var(--muted-foreground)" }}>
                <Plus size={16} />
                <span className="text-sm">Adicionar tarefa do casal</span>
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Contas */}
      {tab === "contas" && (
        <div className="animate-fade-in grid grid-cols-2 gap-4">
          {/* Resumo */}
          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted-foreground)" }}>Junho 2026</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>Receitas</span>
                <span className="font-semibold" style={{ color: "var(--sage)" }}>
                  R$ {finances.income.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>Despesas</span>
                <span className="font-semibold" style={{ color: "var(--dusty-rose)" }}>
                  R$ {finances.expenses.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="h-px my-1" style={{ background: "var(--card-border)" }} />
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Saldo</span>
                <span className="font-bold text-lg" style={{ color: balance >= 0 ? "var(--sage)" : "var(--dusty-rose)" }}>
                  R$ {balance.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          </Card>

          {/* Categorias */}
          <Card>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--muted-foreground)" }}>Por categoria</h3>
            <div className="flex flex-col gap-2">
              {finances.categories.map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "var(--foreground)" }}>{cat.name}</span>
                    <span style={{ color: "var(--muted-foreground)" }}>R$ {cat.amount.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Metas financeiras */}
          <div className="col-span-2">
            <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              <TrendingUp size={14} className="inline mr-1" />
              Metas financeiras
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {finances.goals.map(goal => (
                <Card key={goal.label}>
                  <p className="text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>{goal.label}</p>
                  <div className="h-3 rounded-full overflow-hidden mb-1" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-full"
                      style={{ width: `${(goal.current / goal.target) * 100}%`, background: goal.color }} />
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: "var(--muted-foreground)" }}>
                    <span>R$ {goal.current.toLocaleString("pt-BR")}</span>
                    <span>R$ {goal.target.toLocaleString("pt-BR")}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Diário */}
      {tab === "diario" && (
        <div className="animate-fade-in">
          <Card className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <BookHeart size={18} style={{ color: "var(--dusty-rose)" }} />
              <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Nova entrada</h3>
            </div>
            <textarea
              placeholder="O que aconteceu de bom hoje? Um momento, uma lembrança... 🌿"
              className="w-full text-sm resize-none outline-none bg-transparent"
              style={{ color: "var(--foreground)", minHeight: 80 }}
            />
            <button className="mt-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
              style={{ background: "var(--dusty-rose)" }}>
              Guardar memória 💛
            </button>
          </Card>

          <div className="flex flex-col gap-3">
            {diaryEntries.map((entry, i) => (
              <Card key={i} className="border-l-4"
                style={{ borderLeftColor: entry.author === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                    style={{ background: entry.author === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
                    {entry.author}
                  </div>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{entry.date}</span>
                </div>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{entry.text}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

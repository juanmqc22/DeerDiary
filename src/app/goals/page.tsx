"use client"

import { Card } from "@/components/ui/card"

const goals = [
  {
    id: 1, emoji: "🌳", label: "Pós-graduação", scope: "Baby",
    scopeColor: "var(--dusty-rose)", description: "Inscrição e início do programa",
    current: 2, target: 10, unit: "etapas", color: "var(--sage)",
    milestones: ["Pesquisar programas ✅", "Preparar documentos", "Enviar inscrição", "Entrevista"],
  },
  {
    id: 2, emoji: "🌾", label: "Reserva de emergência", scope: "Casal",
    scopeColor: "var(--golden)", description: "6 meses de despesas guardados",
    current: 8000, target: 15000, unit: "reais", color: "var(--golden)",
    milestones: ["R$ 5.000 ✅", "R$ 8.000 ✅", "R$ 12.000", "R$ 15.000"],
  },
  {
    id: 3, emoji: "✈️", label: "Viagem de fim de ano", scope: "Casal",
    scopeColor: "var(--golden)", description: "Viagem de sonho para fechar o ano",
    current: 1200, target: 5000, unit: "reais", color: "var(--soft-orange)",
    milestones: ["Escolher destino ✅", "Poupar R$ 2.000", "Comprar passagens", "Planejar roteiro"],
  },
  {
    id: 4, emoji: "🌻", label: "Bem-estar & saúde", scope: "Baby",
    scopeColor: "var(--dusty-rose)", description: "Hábitos que cuidam de mim",
    current: 14, target: 20, unit: "semanas", color: "var(--soft-orange)",
    milestones: ["1 mês de rotina ✅", "2 meses seguidos", "Hábito consolidado"],
  },
  {
    id: 5, emoji: "📖", label: "Leitura anual", scope: "Juan",
    scopeColor: "var(--sky-blue)", description: "12 livros esse ano",
    current: 5, target: 12, unit: "livros", color: "var(--lavender)",
    milestones: ["3 livros ✅", "6 livros", "9 livros", "12 livros"],
  },
]

function getPlantStage(pct: number) {
  if (pct < 25) return "🌱"
  if (pct < 50) return "🌿"
  if (pct < 75) return "🌳"
  return "🎉"
}

export default function GoalsPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>Fazenda de Metas 🌱</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Cada meta é uma plantação. Cuide e veja crescer. 🌾
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {goals.map(goal => {
          const pct = Math.round((goal.current / goal.target) * 100)
          const stage = getPlantStage(pct)

          return (
            <Card key={goal.id} className="hover:scale-[1.02] transition-transform cursor-pointer">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: "var(--muted)" }}>
                    {stage}
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--foreground)" }}>{goal.label}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{goal.description}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{ background: goal.scopeColor + "22", color: goal.scopeColor }}>
                  {goal.scope}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: "var(--muted-foreground)" }}>
                    {goal.current.toLocaleString("pt-BR")} / {goal.target.toLocaleString("pt-BR")} {goal.unit}
                  </span>
                  <span className="font-semibold" style={{ color: goal.color }}>{pct}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: goal.color }} />
                </div>
              </div>

              {/* Milestones */}
              <div className="flex flex-col gap-1">
                {goal.milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: m.includes("✅") ? goal.color : "var(--card-border)" }} />
                    <span className="text-xs" style={{ color: m.includes("✅") ? "var(--muted-foreground)" : "var(--foreground)" }}>
                      {m.replace(" ✅", "")}
                      {m.includes("✅") && <span className="ml-1">✅</span>}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )
        })}

        {/* Card de adicionar */}
        <Card className="flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform border-dashed"
          style={{ borderColor: "var(--card-border)", minHeight: 180 }}>
          <span className="text-3xl mb-2">🌱</span>
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Nova meta</p>
          <p className="text-xs mt-1" style={{ color: "var(--card-border)" }}>Plante uma nova semente</p>
        </Card>
      </div>
    </div>
  )
}

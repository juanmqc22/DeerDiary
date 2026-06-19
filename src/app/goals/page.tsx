"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { GrowingPlant } from "@/components/ui/growing-plant"
import { Plus } from "lucide-react"

const goals = [
  {
    id: 1, label: "Pós-graduação", scope: "Baby", scopeColor: "var(--dusty-rose)",
    description: "Inscrição e início do programa",
    current: 2, target: 10, unit: "etapas", color: "#7a9e7e",
    milestones: ["Pesquisar programas ✅", "Preparar documentos", "Enviar inscrição", "Entrevista"],
  },
  {
    id: 2, label: "Reserva de emergência", scope: "Casal", scopeColor: "var(--golden)",
    description: "6 meses de despesas guardados",
    current: 8000, target: 15000, unit: "reais", color: "#d4a547",
    milestones: ["R$ 5.000 ✅", "R$ 8.000 ✅", "R$ 12.000", "R$ 15.000"],
  },
  {
    id: 3, label: "Viagem de fim de ano", scope: "Casal", scopeColor: "var(--golden)",
    description: "Viagem de sonho para fechar o ano",
    current: 1200, target: 5000, unit: "reais", color: "#e8845a",
    milestones: ["Escolher destino ✅", "Poupar R$ 2.000", "Comprar passagens", "Planejar roteiro"],
  },
  {
    id: 4, label: "Bem-estar & saúde", scope: "Baby", scopeColor: "var(--dusty-rose)",
    description: "Hábitos que cuidam de mim",
    current: 14, target: 20, unit: "semanas", color: "#e8845a",
    milestones: ["1 mês de rotina ✅", "2 meses seguidos", "Hábito consolidado"],
  },
]

function stageLabel(pct: number) {
  if (pct < 15) return "Semente plantada"
  if (pct < 35) return "Brotando!"
  if (pct < 60) return "Crescendo"
  if (pct < 85) return "Quase lá!"
  return "Floresceu! 🌸"
}

export default function GoalsPage() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Fazenda de Metas"
        subtitle="Cuide e veja crescer 🌾"
        action={
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            <Plus size={15} /> Nova meta
          </button>
        }
      />

      <div className="space-y-3">
        {goals.map(goal => {
          const pct = Math.round((goal.current / goal.target) * 100)
          return (
            <Card key={goal.id} className="flex gap-4 items-start">
              {/* Planta */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <GrowingPlant progress={pct} color={goal.color} size={72} />
                <span className="text-[9px] text-center font-medium leading-tight"
                  style={{ color: goal.color, maxWidth: 64 }}>
                  {stageLabel(pct)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    {goal.label}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                    style={{ background: goal.scopeColor + "20", color: goal.scopeColor }}>
                    {goal.scope}
                  </span>
                </div>
                <p className="text-xs mb-2.5" style={{ color: "var(--muted-foreground)" }}>
                  {goal.description}
                </p>

                {/* Barra de progresso */}
                <div className="mb-2.5">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: "var(--muted-foreground)" }}>
                      {goal.current.toLocaleString("pt-BR")} / {goal.target.toLocaleString("pt-BR")} {goal.unit}
                    </span>
                    <span className="font-bold" style={{ color: goal.color }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: goal.color }} />
                  </div>
                </div>

                {/* Milestones */}
                <div className="space-y-1">
                  {goal.milestones.map((m, i) => {
                    const done = m.includes("✅")
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: done ? goal.color : "var(--card-border)" }} />
                        <span className="text-xs" style={{ color: done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                          {m.replace(" ✅", "")}{done ? " ✅" : ""}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          )
        })}

        <button
          className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:opacity-70"
          style={{ border: "2px dashed var(--card-border)", color: "var(--muted-foreground)" }}>
          <span className="text-xl">🌱</span>
          <span className="text-sm">Plantar nova meta</span>
        </button>
      </div>
    </div>
  )
}

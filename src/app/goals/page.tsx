"use client"

import { Card } from "@/components/ui/card"
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
  {
    id: 5, label: "Leitura anual", scope: "Juan", scopeColor: "var(--sky-blue)",
    description: "12 livros esse ano",
    current: 5, target: 12, unit: "livros", color: "#9b8bc4",
    milestones: ["3 livros ✅", "6 livros", "9 livros", "12 livros"],
  },
]

function getPlantLabel(pct: number) {
  if (pct < 15) return "Semente plantada 🌰"
  if (pct < 35) return "Brotando! 🌱"
  if (pct < 60) return "Crescendo forte 🌿"
  if (pct < 85) return "Quase lá! 🌳"
  return "Floresceu! 🌸"
}

export default function GoalsPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>
          Fazenda de Metas
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Cada meta é uma plantação. Cuide e veja crescer. 🌾
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {goals.map(goal => {
          const pct = Math.round((goal.current / goal.target) * 100)

          return (
            <Card key={goal.id} className="hover:scale-[1.01] transition-transform cursor-pointer">
              <div className="flex gap-4">
                {/* Planta SVG */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <GrowingPlant progress={pct} color={goal.color} size={80} />
                  <span className="text-[10px] text-center mt-1 font-medium"
                    style={{ color: goal.color, maxWidth: 70 }}>
                    {getPlantLabel(pct)}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-semibold text-sm leading-tight" style={{ color: "var(--foreground)" }}>
                      {goal.label}
                    </p>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                      style={{ background: goal.scopeColor + "22", color: goal.scopeColor }}>
                      {goal.scope}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>
                    {goal.description}
                  </p>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "var(--muted-foreground)" }}>
                        {goal.current.toLocaleString("pt-BR")} / {goal.target.toLocaleString("pt-BR")} {goal.unit}
                      </span>
                      <span className="font-bold" style={{ color: goal.color }}>{pct}%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: goal.color }} />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="flex flex-col gap-1">
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
              </div>
            </Card>
          )
        })}

        {/* Nova meta */}
        <Card className="flex flex-col items-center justify-center cursor-pointer hover:scale-[1.01] transition-transform border-dashed"
          style={{ borderColor: "var(--card-border)", minHeight: 160 }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2"
            style={{ background: "var(--muted)" }}>
            <Plus size={22} style={{ color: "var(--muted-foreground)" }} />
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Nova meta</p>
          <p className="text-xs mt-1" style={{ color: "var(--card-border)" }}>Plante uma nova semente</p>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { Plus, ChevronRight, Circle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const projects = [
  {
    id: "posgrad", title: "Inscrição na pós-graduação", area: "Pós-grad", areaColor: "var(--golden)",
    outcome: "Aceita em um programa até dezembro",
    nextAction: "Ligar para a coordenadora do programa",
    nextContext: "@ligações",
    actions: 4, done: 1, active: true,
  },
  {
    id: "client-report", title: "Relatório trimestral — cliente A", area: "Trabalho", areaColor: "var(--lavender)",
    outcome: "Relatório entregue e aprovado até sexta",
    nextAction: "Enviar relatório mensal — cliente A",
    nextContext: "@computador",
    actions: 3, done: 2, active: true,
  },
  {
    id: "content-calendar", title: "Calendário de conteúdo — julho", area: "Trabalho", areaColor: "var(--lavender)",
    outcome: "30 posts planejados e aprovados",
    nextAction: "Criar estrutura do calendário no Notion",
    nextContext: "@computador",
    actions: 5, done: 0, active: true,
  },
  {
    id: "home-org", title: "Organização do apartamento", area: "Casa", areaColor: "var(--dusty-rose)",
    outcome: "Cada cômodo organizado e com sistema de manutenção",
    nextAction: "Organizar armário do quarto",
    nextContext: "@casa",
    actions: 6, done: 3, active: true,
  },
  {
    id: "health", title: "Rotina de saúde consistente", area: "Eu", areaColor: "var(--soft-orange)",
    outcome: "3x na academia por semana por 3 meses seguidos",
    nextAction: "Agendar avaliação física",
    nextContext: "@ligações",
    actions: 3, done: 1, active: false,
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"active" | "all">("active")

  const shown = filter === "active" ? projects.filter(p => p.active) : projects

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>
          Projetos
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Resultados que precisam de mais de uma ação. 📁
        </p>
      </div>

      {/* Filtro */}
      <div className="flex gap-2 mb-4 p-1 rounded-2xl w-fit" style={{ background: "var(--muted)" }}>
        {(["active", "all"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: filter === f ? "var(--card)" : "transparent",
              color: filter === f ? "var(--warm-brown)" : "var(--muted-foreground)",
              boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>
            {f === "active" ? "Ativos" : "Todos"}
          </button>
        ))}
      </div>

      {/* Projetos */}
      <div className="flex flex-col gap-3">
        {shown.map(project => {
          const pct = Math.round((project.done / project.actions) * 100)
          return (
            <Card key={project.id} className="hover:scale-[1.005] transition-transform">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: project.areaColor + "20", color: project.areaColor }}>
                      {project.area}
                    </span>
                    {!project.active && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                        pausado
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                    {project.title}
                  </h3>
                </div>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: project.areaColor }}>
                  {pct}%
                </span>
              </div>

              {/* Resultado desejado */}
              <p className="text-xs mb-3 italic" style={{ color: "var(--muted-foreground)" }}>
                → {project.outcome}
              </p>

              {/* Progress */}
              <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: project.areaColor }} />
              </div>

              {/* Próxima ação */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl"
                style={{ background: "var(--muted)" }}>
                <Circle size={13} style={{ color: "var(--soft-orange)", flexShrink: 0 }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                    {project.nextAction}
                  </p>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--card)", color: "var(--muted-foreground)" }}>
                  {project.nextContext}
                </span>
              </div>
            </Card>
          )
        })}

        {/* Novo projeto */}
        <button className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:opacity-80 border-dashed"
          style={{ border: "2px dashed var(--card-border)", color: "var(--muted-foreground)" }}>
          <Plus size={16} />
          <span className="text-sm">Novo projeto</span>
        </button>
      </div>
    </div>
  )
}

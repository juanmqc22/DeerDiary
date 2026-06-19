"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { Circle, Plus } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: "posgrad", title: "Inscrição na pós-graduação", area: "Pós-grad", areaColor: "var(--golden)",
    outcome: "Aceita em um programa até dezembro",
    nextAction: "Ligar para a coordenadora do programa", nextContext: "@ligações",
    actions: 4, done: 1,
  },
  {
    id: "report", title: "Relatório trimestral — cliente A", area: "Trabalho", areaColor: "var(--lavender)",
    outcome: "Relatório entregue e aprovado até sexta",
    nextAction: "Enviar relatório mensal — cliente A", nextContext: "@computador",
    actions: 3, done: 2,
  },
  {
    id: "content", title: "Calendário de conteúdo — julho", area: "Trabalho", areaColor: "var(--lavender)",
    outcome: "30 posts planejados e aprovados",
    nextAction: "Criar estrutura do calendário no Notion", nextContext: "@computador",
    actions: 5, done: 0,
  },
  {
    id: "home", title: "Organização do apartamento", area: "Casa", areaColor: "var(--dusty-rose)",
    outcome: "Cada cômodo com sistema de manutenção",
    nextAction: "Organizar armário do quarto", nextContext: "@casa",
    actions: 6, done: 3,
  },
]

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"active" | "all">("active")

  return (
    <div className="space-y-5">
      <PageHeader
        title="Projetos"
        subtitle="Resultados que precisam de mais de uma ação"
        action={
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            <Plus size={15} /> Novo
          </button>
        }
      />

      {/* Filtro */}
      <div className="flex gap-1.5 p-1 rounded-xl w-fit" style={{ background: "var(--muted)" }}>
        {(["active", "all"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: filter === f ? "var(--card)" : "transparent",
              color: filter === f ? "var(--warm-brown)" : "var(--muted-foreground)",
              boxShadow: filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>
            {f === "active" ? "Ativos" : "Todos"}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-3">
        {projects.map(project => {
          const pct = Math.round((project.done / project.actions) * 100)
          return (
            <Card key={project.id}>
              {/* Área + título */}
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: project.areaColor + "20", color: project.areaColor }}>
                    {project.area}
                  </span>
                  <h3 className="text-sm font-semibold mt-1.5" style={{ color: "var(--foreground)" }}>
                    {project.title}
                  </h3>
                </div>
                <span className="text-sm font-bold flex-shrink-0" style={{ color: project.areaColor }}>
                  {pct}%
                </span>
              </div>

              {/* Resultado desejado */}
              <p className="text-xs mb-3 pl-0.5" style={{ color: "var(--muted-foreground)" }}>
                → {project.outcome}
              </p>

              {/* Progress */}
              <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: project.areaColor }} />
              </div>

              {/* Próxima ação */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl"
                style={{ background: "var(--muted)" }}>
                <Circle size={13} style={{ color: "var(--soft-orange)", flexShrink: 0 }} />
                <p className="text-xs flex-1 font-medium" style={{ color: "var(--foreground)" }}>
                  {project.nextAction}
                </p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--card)", color: "var(--muted-foreground)" }}>
                  {project.nextContext}
                </span>
              </div>
            </Card>
          )
        })}

        <button
          className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 transition-all hover:opacity-70"
          style={{ border: "2px dashed var(--card-border)", color: "var(--muted-foreground)" }}>
          <Plus size={16} />
          <span className="text-sm">Novo projeto</span>
        </button>
      </div>
    </div>
  )
}

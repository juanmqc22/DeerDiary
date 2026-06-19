"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { CheckCircle2, Circle, Plus } from "lucide-react"
import { useState } from "react"

type Action = { id: number; title: string; done: boolean; context: string; area: string; areaColor: string }

const allActions: Action[] = [
  { id: 1, title: "Enviar relatório mensal — cliente A", context: "@computador", area: "Trabalho", areaColor: "var(--lavender)", done: false },
  { id: 2, title: "Revisar métricas do Instagram", context: "@computador", area: "Trabalho", areaColor: "var(--lavender)", done: false },
  { id: 3, title: "Ligar para a coordenadora do programa", context: "@ligações", area: "Pós-grad", areaColor: "var(--golden)", done: false },
  { id: 4, title: "Visitar irmã da ala", context: "@recados", area: "Igreja", areaColor: "var(--sage)", done: false },
  { id: 5, title: "Compras da semana", context: "@recados", area: "Casa", areaColor: "var(--dusty-rose)", done: false },
  { id: 6, title: "Pagar conta de luz", context: "@computador", area: "Casa", areaColor: "var(--dusty-rose)", done: false },
  { id: 7, title: "Agendar dermatologista", context: "@ligações", area: "Eu", areaColor: "var(--soft-orange)", done: true },
  { id: 8, title: "Academia esta semana (3x)", context: "@casa", area: "Eu", areaColor: "var(--soft-orange)", done: false },
]

const contexts = ["@computador", "@ligações", "@recados", "@casa", "@leitura"]

export default function NextActionsPage() {
  const [actions, setActions] = useState(allActions)
  const [context, setContext] = useState<string | null>(null)
  const [showDone, setShowDone] = useState(false)

  const toggle = (id: number) => setActions(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const filtered = actions.filter(a => {
    if (!showDone && a.done) return false
    if (context && a.context !== context) return false
    return true
  })

  const grouped = filtered.reduce((acc, a) => {
    if (!acc[a.context]) acc[a.context] = []
    acc[a.context].push(a)
    return acc
  }, {} as Record<string, Action[]>)

  const doneCount = actions.filter(a => a.done).length
  const pending = actions.filter(a => !a.done).length

  return (
    <div className="space-y-5">
      <PageHeader
        title="Próximas Ações"
        subtitle={`${pending} ações abertas`}
        action={
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            <Plus size={15} /> Nova
          </button>
        }
      />

      {/* Filtro de contexto */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 pb-1 min-w-max">
          <button
            onClick={() => setContext(null)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: context === null ? "var(--foreground)" : "var(--muted)",
              color: context === null ? "white" : "var(--muted-foreground)",
            }}>
            Todos
          </button>
          {contexts.map(c => (
            <button key={c}
              onClick={() => setContext(ctx => ctx === c ? null : c)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: context === c ? "var(--foreground)" : "var(--muted)",
                color: context === c ? "white" : "var(--muted-foreground)",
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Lista agrupada por contexto */}
      {Object.keys(grouped).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(grouped).map(([ctx, acts]) => (
            <section key={ctx}>
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"
                style={{ color: "var(--muted-foreground)" }}>
                <span className="px-2 py-0.5 rounded-full"
                  style={{ background: "var(--muted)" }}>{ctx}</span>
                <span>{acts.length}</span>
              </h2>
              <Card className="divide-y overflow-hidden">
                {acts.map(action => (
                  <button key={action.id} onClick={() => toggle(action.id)}
                    className="flex items-center gap-3 p-3 w-full text-left hover:bg-[var(--muted)] transition-colors">
                    {action.done
                      ? <CheckCircle2 size={17} style={{ color: "var(--sage)", flexShrink: 0 }} />
                      : <Circle size={17} style={{ color: "var(--card-border)", flexShrink: 0 }} />
                    }
                    <span className={`text-sm flex-1 ${action.done ? "line-through" : ""}`}
                      style={{ color: action.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                      {action.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:block"
                      style={{ background: action.areaColor + "20", color: action.areaColor }}>
                      {action.area}
                    </span>
                  </button>
                ))}
              </Card>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Tudo feito neste contexto!
          </p>
        </div>
      )}

      {/* Toggle concluídas */}
      <button onClick={() => setShowDone(s => !s)}
        className="w-full py-2 text-xs text-center rounded-xl hover:bg-[var(--muted)] transition-colors"
        style={{ color: "var(--muted-foreground)" }}>
        {showDone ? "Ocultar" : "Mostrar"} concluídas ({doneCount})
      </button>
    </div>
  )
}

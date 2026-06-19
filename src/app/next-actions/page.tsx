"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Plus } from "lucide-react"
import { useState } from "react"

type Action = {
  id: number; title: string; done: boolean
  context: string; area: string; areaColor: string
}

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

const contexts = ["Todos", "@computador", "@ligações", "@recados", "@casa", "@leitura"]
const areas = ["Todas", "Trabalho", "Pós-grad", "Igreja", "Casa", "Eu"]

export default function NextActionsPage() {
  const [actions, setActions] = useState(allActions)
  const [context, setContext] = useState("Todos")
  const [area, setArea] = useState("Todas")
  const [showDone, setShowDone] = useState(false)

  const toggle = (id: number) => setActions(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const filtered = actions.filter(a => {
    if (!showDone && a.done) return false
    if (context !== "Todos" && a.context !== context) return false
    if (area !== "Todas" && a.area !== area) return false
    return true
  })

  const grouped = filtered.reduce((acc, a) => {
    const key = a.context
    if (!acc[key]) acc[key] = []
    acc[key].push(a)
    return acc
  }, {} as Record<string, Action[]>)

  const doneCount = actions.filter(a => a.done).length

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>
          Próximas Ações
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          O que fazer agora, filtrado pelo contexto certo. ⚡
        </p>
      </div>

      {/* Filtros contexto */}
      <div className="mb-2 overflow-x-auto">
        <div className="flex gap-1.5 pb-1 min-w-max">
          {contexts.map(c => (
            <button key={c} onClick={() => setContext(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: context === c ? "var(--foreground)" : "var(--muted)",
                color: context === c ? "white" : "var(--muted-foreground)",
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros área */}
      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-1.5 pb-1 min-w-max">
          {areas.map(a => (
            <button key={a} onClick={() => setArea(a)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: area === a ? "var(--soft-orange)" : "transparent",
                color: area === a ? "white" : "var(--muted-foreground)",
                border: area === a ? "none" : "1px solid var(--card-border)",
              }}>
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Agrupado por contexto */}
      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([ctx, acts]) => (
          <div key={ctx}>
            <h2 className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-2"
              style={{ color: "var(--muted-foreground)" }}>
              <span className="px-2 py-0.5 rounded-full text-[10px]"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                {ctx}
              </span>
              <span>{acts.length} ação{acts.length !== 1 ? "ões" : ""}</span>
            </h2>
            <Card className="p-1">
              {acts.map(action => (
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
                  <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: action.areaColor + "20", color: action.areaColor }}>
                    {action.area}
                  </span>
                </button>
              ))}
            </Card>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-3xl mb-2">✅</p>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Tudo feito neste contexto!
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4"
        style={{ borderTop: "1px solid var(--card-border)" }}>
        <button onClick={() => setShowDone(s => !s)} className="text-xs"
          style={{ color: "var(--muted-foreground)" }}>
          {showDone ? "Ocultar" : "Mostrar"} concluídas ({doneCount})
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
          style={{ background: "var(--soft-orange)" }}>
          <Plus size={13} /> Nova ação
        </button>
      </div>
    </div>
  )
}

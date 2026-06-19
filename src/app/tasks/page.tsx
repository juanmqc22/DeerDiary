"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { CheckCircle2, Circle, Plus, FolderOpen } from "lucide-react"
import { useState } from "react"

type Tab = "actions" | "projects"

const actions = [
  { id: 1, title: "Enviar relatório mensal — cliente A", context: "@computador", area: "Trabalho", areaColor: "var(--lavender)", done: false },
  { id: 2, title: "Revisar métricas do Instagram", context: "@computador", area: "Trabalho", areaColor: "var(--lavender)", done: false },
  { id: 3, title: "Ligar para a coordenadora do programa", context: "@ligações", area: "Pós-grad", areaColor: "var(--golden)", done: false },
  { id: 4, title: "Visitar irmã da ala", context: "@recados", area: "Igreja", areaColor: "var(--sage)", done: false },
  { id: 5, title: "Compras da semana", context: "@recados", area: "Casa", areaColor: "var(--dusty-rose)", done: false },
  { id: 6, title: "Pagar conta de luz", context: "@computador", area: "Casa", areaColor: "var(--dusty-rose)", done: false },
  { id: 7, title: "Agendar dermatologista", context: "@ligações", area: "Eu", areaColor: "var(--soft-orange)", done: true },
]

const projects = [
  {
    id: "posgrad", title: "Inscrição na pós-graduação", area: "Pós-grad", areaColor: "var(--golden)",
    outcome: "Aceita em um programa até dezembro",
    nextAction: "Ligar para a coordenadora do programa", nextContext: "@ligações",
    total: 4, done: 1,
  },
  {
    id: "report", title: "Relatório trimestral — cliente A", area: "Trabalho", areaColor: "var(--lavender)",
    outcome: "Relatório entregue e aprovado até sexta",
    nextAction: "Enviar relatório mensal — cliente A", nextContext: "@computador",
    total: 3, done: 2,
  },
  {
    id: "content", title: "Calendário de conteúdo — julho", area: "Trabalho", areaColor: "var(--lavender)",
    outcome: "30 posts planejados e aprovados",
    nextAction: "Criar estrutura do calendário no Notion", nextContext: "@computador",
    total: 5, done: 0,
  },
  {
    id: "home", title: "Organização do apartamento", area: "Casa", areaColor: "var(--dusty-rose)",
    outcome: "Cada cômodo com sistema de manutenção",
    nextAction: "Organizar armário do quarto", nextContext: "@casa",
    total: 6, done: 3,
  },
]

const contexts = ["@computador", "@ligações", "@recados", "@casa"]

export default function TasksPage() {
  const [tab, setTab] = useState<Tab>("actions")
  const [items, setItems] = useState(actions)
  const [context, setContext] = useState<string | null>(null)
  const [showDone, setShowDone] = useState(false)

  const toggle = (id: number) => setItems(a => a.map(x => x.id === id ? { ...x, done: !x.done } : x))

  const filtered = items.filter(a => {
    if (!showDone && a.done) return false
    if (context && a.context !== context) return false
    return true
  })

  const grouped = filtered.reduce((acc, a) => {
    if (!acc[a.context]) acc[a.context] = []
    acc[a.context].push(a)
    return acc
  }, {} as Record<string, typeof actions>)

  const pending = items.filter(a => !a.done).length
  const doneCount = items.filter(a => a.done).length

  return (
    <div className="space-y-5">
      <PageHeader
        title="Tarefas"
        subtitle={tab === "actions" ? `${pending} ações abertas` : `${projects.length} projetos ativos`}
        action={
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            <Plus size={15} /> {tab === "actions" ? "Nova ação" : "Novo projeto"}
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
        {([
          { id: "actions", label: "Ações" },
          { id: "projects", label: "Projetos" },
        ] as { id: Tab; label: string }[]).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: tab === t.id ? "var(--card)" : "transparent",
              color: tab === t.id ? "var(--warm-brown)" : "var(--muted-foreground)",
              boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Ações */}
      {tab === "actions" && (
        <div className="space-y-5">
          {/* Filtros de contexto */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-1 min-w-max">
              <button onClick={() => setContext(null)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: !context ? "var(--foreground)" : "var(--muted)",
                  color: !context ? "white" : "var(--muted-foreground)",
                }}>
                Todos
              </button>
              {contexts.map(c => (
                <button key={c} onClick={() => setContext(ctx => ctx === c ? null : c)}
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

          {Object.keys(grouped).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(grouped).map(([ctx, acts]) => (
                <section key={ctx}>
                  <p className="text-xs font-semibold mb-2 flex items-center gap-2"
                    style={{ color: "var(--muted-foreground)" }}>
                    <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--muted)" }}>{ctx}</span>
                  </p>
                  <Card className="divide-y overflow-hidden">
                    {acts.map(action => (
                      <button key={action.id} onClick={() => toggle(action.id)}
                        className="flex items-center gap-3 p-3.5 w-full text-left hover:bg-[var(--muted)] transition-colors">
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
            <div className="text-center py-12">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Tudo feito!</p>
            </div>
          )}

          <button onClick={() => setShowDone(s => !s)}
            className="w-full py-2 text-xs rounded-xl hover:bg-[var(--muted)] transition-colors"
            style={{ color: "var(--muted-foreground)" }}>
            {showDone ? "Ocultar" : "Mostrar"} concluídas ({doneCount})
          </button>
        </div>
      )}

      {/* Projetos */}
      {tab === "projects" && (
        <div className="space-y-3">
          {projects.map(p => {
            const pct = Math.round((p.done / p.total) * 100)
            return (
              <Card key={p.id}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: p.areaColor + "20", color: p.areaColor }}>
                      {p.area}
                    </span>
                    <h3 className="text-sm font-semibold mt-1.5" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                  </div>
                  <span className="text-sm font-bold flex-shrink-0" style={{ color: p.areaColor }}>{pct}%</span>
                </div>
                <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>→ {p.outcome}</p>
                <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "var(--muted)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: p.areaColor }} />
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: "var(--muted)" }}>
                  <Circle size={12} style={{ color: "var(--soft-orange)", flexShrink: 0 }} />
                  <p className="text-xs flex-1" style={{ color: "var(--foreground)" }}>{p.nextAction}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--card)", color: "var(--muted-foreground)" }}>
                    {p.nextContext}
                  </span>
                </div>
              </Card>
            )
          })}
          <button className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ border: "2px dashed var(--card-border)", color: "var(--muted-foreground)" }}>
            <FolderOpen size={16} /> Novo projeto
          </button>
        </div>
      )}
    </div>
  )
}

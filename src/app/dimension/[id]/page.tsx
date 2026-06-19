"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Plus, ArrowLeft, Filter } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { use } from "react"

const dimensionData: Record<string, {
  name: string; emoji: string; color: string; description: string;
  contexts: string[]; tasks: { id: number; title: string; done: boolean; context: string; priority: "alta" | "média" | "baixa" }[]
}> = {
  work: {
    name: "Trabalho", emoji: "💼", color: "var(--lavender)", description: "Estratégia de mídia e clientes",
    contexts: ["Todos", "@relatórios", "@reuniões", "@criação", "@clientes"],
    tasks: [
      { id: 1, title: "Enviar relatório mensal — cliente A", done: false, context: "@relatórios", priority: "alta" },
      { id: 2, title: "Criar calendário de conteúdo junho", done: false, context: "@criação", priority: "alta" },
      { id: 3, title: "Reunião de alinhamento — equipe", done: true, context: "@reuniões", priority: "média" },
      { id: 4, title: "Revisar métricas do Instagram", done: false, context: "@relatórios", priority: "média" },
      { id: 5, title: "Proposta para novo cliente", done: false, context: "@clientes", priority: "baixa" },
    ]
  },
  posgrad: {
    name: "Pós-graduação", emoji: "🎓", color: "var(--golden)", description: "Pesquisa e processo de inscrição",
    contexts: ["Todos", "@pesquisa", "@documentos", "@prazos"],
    tasks: [
      { id: 1, title: "Listar programas de interesse", done: true, context: "@pesquisa", priority: "alta" },
      { id: 2, title: "Verificar requisitos de inscrição", done: false, context: "@pesquisa", priority: "alta" },
      { id: 3, title: "Organizar histórico escolar", done: false, context: "@documentos", priority: "média" },
      { id: 4, title: "Escrever carta de intenção", done: false, context: "@documentos", priority: "baixa" },
    ]
  },
  church: {
    name: "Igreja", emoji: "🕊️", color: "var(--sage)", description: "Chamados e crescimento espiritual",
    contexts: ["Todos", "@chamado", "@estudo", "@serviço"],
    tasks: [
      { id: 1, title: "Preparar aula dominical", done: true, context: "@chamado", priority: "alta" },
      { id: 2, title: "Leitura das escrituras — diário", done: false, context: "@estudo", priority: "média" },
      { id: 3, title: "Visitar irmã da ala", done: false, context: "@serviço", priority: "média" },
    ]
  },
  home: {
    name: "Casa", emoji: "🏡", color: "var(--dusty-rose)", description: "Lar e organização doméstica",
    contexts: ["Todos", "@compras", "@limpeza", "@organização"],
    tasks: [
      { id: 1, title: "Compras da semana", done: false, context: "@compras", priority: "alta" },
      { id: 2, title: "Organizar armário do quarto", done: true, context: "@organização", priority: "média" },
      { id: 3, title: "Limpar banheiros", done: true, context: "@limpeza", priority: "média" },
      { id: 4, title: "Pagar conta de luz", done: false, context: "@organização", priority: "alta" },
      { id: 5, title: "Comprar presente para a mãe", done: false, context: "@compras", priority: "baixa" },
    ]
  },
  me: {
    name: "Eu", emoji: "🌸", color: "var(--soft-orange)", description: "Cuidado, saúde e crescimento pessoal",
    contexts: ["Todos", "@saúde", "@lazer", "@aprendizado"],
    tasks: [
      { id: 1, title: "Academia 3x essa semana", done: false, context: "@saúde", priority: "alta" },
      { id: 2, title: "Agendar dermatologista", done: false, context: "@saúde", priority: "média" },
      { id: 3, title: "Terminar livro atual", done: false, context: "@lazer", priority: "baixa" },
    ]
  }
}

const priorityColors = {
  alta: "var(--dusty-rose)",
  média: "var(--golden)",
  baixa: "var(--sage)",
}

export default function DimensionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const dim = dimensionData[id] ?? dimensionData["work"]

  const [tasks, setTasks] = useState(dim.tasks)
  const [context, setContext] = useState("Todos")

  const toggle = (taskId: number) =>
    setTasks(t => t.map(tk => tk.id === taskId ? { ...tk, done: !tk.done } : tk))

  const filtered = context === "Todos" ? tasks : tasks.filter(t => t.context === context)
  const done = tasks.filter(t => t.done).length
  const pct = Math.round((done / tasks.length) * 100)

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Voltar */}
      <Link href="/dashboard" className="inline-flex items-center gap-1.5 mb-5 text-sm hover:opacity-70 transition-opacity"
        style={{ color: "var(--muted-foreground)" }}>
        <ArrowLeft size={15} /> Voltar
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: dim.color + "25" }}>
          {dim.emoji}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>{dim.name}</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{dim.description}</p>
        </div>
      </div>

      {/* Progress */}
      <Card className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            {done} de {tasks.length} tarefas concluídas
          </span>
          <span className="text-sm font-bold" style={{ color: dim.color }}>{pct}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: dim.color }} />
        </div>
      </Card>

      {/* Contextos */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <Filter size={15} style={{ color: "var(--muted-foreground)", flexShrink: 0, marginTop: 6 }} />
        {dim.contexts.map(ctx => (
          <button key={ctx} onClick={() => setContext(ctx)}
            className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
            style={{
              background: context === ctx ? dim.color : "var(--muted)",
              color: context === ctx ? "white" : "var(--muted-foreground)",
            }}>
            {ctx}
          </button>
        ))}
      </div>

      {/* Tarefas */}
      <Card>
        <div className="flex flex-col gap-1">
          {filtered.map(task => (
            <button key={task.id} onClick={() => toggle(task.id)}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors text-left w-full">
              <div className="mt-0.5 flex-shrink-0">
                {task.done
                  ? <CheckCircle2 size={17} style={{ color: "var(--sage)" }} />
                  : <Circle size={17} style={{ color: "var(--card-border)" }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.done ? "line-through" : ""}`}
                  style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{task.context}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: priorityColors[task.priority] + "20", color: priorityColors[task.priority] }}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </button>
          ))}

          <button className="flex items-center gap-2 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full mt-1"
            style={{ color: "var(--muted-foreground)" }}>
            <Plus size={15} />
            <span className="text-sm">Nova tarefa em {dim.name}</span>
          </button>
        </div>
      </Card>
    </div>
  )
}

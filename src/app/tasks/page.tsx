"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { CheckCircle2, Circle, Plus, Trash2, X, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useTasks, Task } from "@/hooks/use-tasks"
import { useSomeday } from "@/hooks/use-someday"
import { useProjects, Project } from "@/hooks/use-projects"

type Tab = "actions" | "projects" | "someday"

const AREAS = ["Trabalho", "Pós-grad", "Igreja", "Casa", "Eu"]
const AREA_COLORS: Record<string, string> = {
  Trabalho: "var(--lavender)", "Pós-grad": "var(--golden)",
  Igreja: "var(--sage)", Casa: "var(--dusty-rose)", Eu: "var(--soft-orange)",
}
const contexts = ["@computador", "@ligações", "@recados", "@casa", "@aguardando"]

function AddProjectModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (title: string, area: string, outcome: string) => void
}) {
  const [title, setTitle] = useState("")
  const [area, setArea] = useState("Trabalho")
  const [outcome, setOutcome] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow max-h-[85dvh] overflow-y-auto"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Novo projeto</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Nome do projeto"
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }}
            autoFocus />
          <input value={outcome} onChange={e => setOutcome(e.target.value)}
            placeholder="Resultado desejado (opcional)"
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Área</p>
            <div className="flex flex-wrap gap-1.5">
              {AREAS.map(a => (
                <button key={a} onClick={() => setArea(a)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: area === a ? AREA_COLORS[a] : "var(--muted)",
                    color: area === a ? "white" : "var(--muted-foreground)",
                  }}>{a}</button>
              ))}
            </div>
          </div>
          <button
            onClick={() => { if (title.trim()) { onAdd(title.trim(), area, outcome.trim()); onClose() } }}
            disabled={!title.trim()}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "var(--golden)" }}>
            Criar projeto
          </button>
        </div>
      </div>
    </div>
  )
}

function AddTaskModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (title: string, context: string, area: string) => void
}) {
  const [title, setTitle] = useState("")
  const [context, setContext] = useState("@computador")
  const [area, setArea] = useState("Trabalho")

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow max-h-[85dvh] overflow-y-auto"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Nova ação</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>

        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="O que precisa ser feito?"
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }}
            onKeyDown={e => e.key === "Enter" && title.trim() && (onAdd(title.trim(), context, area), onClose())}
            autoFocus
          />

          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Contexto</p>
            <div className="flex flex-wrap gap-1.5">
              {contexts.map(c => (
                <button key={c} onClick={() => setContext(c)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: context === c ? "var(--foreground)" : "var(--muted)",
                    color: context === c ? "white" : "var(--muted-foreground)",
                  }}>{c}</button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Área</p>
            <div className="flex flex-wrap gap-1.5">
              {AREAS.map(a => (
                <button key={a} onClick={() => setArea(a)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: area === a ? AREA_COLORS[a] : "var(--muted)",
                    color: area === a ? "white" : "var(--muted-foreground)",
                  }}>{a}</button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { if (title.trim()) { onAdd(title.trim(), context, area); onClose() } }}
            disabled={!title.trim()}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "var(--soft-orange)" }}>
            Adicionar ação
          </button>
        </div>
      </div>
    </div>
  )
}

function AddTaskToProjectModal({ project, onClose, onAdd }: {
  project: Project
  onClose: () => void
  onAdd: (title: string, context: string) => void
}) {
  const [title, setTitle] = useState("")
  const [context, setContext] = useState("@computador")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow max-h-[85dvh] overflow-y-auto"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Nova ação</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>
        <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Projeto: {project.title}</p>
        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="O que precisa ser feito?"
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }}
            onKeyDown={e => e.key === "Enter" && title.trim() && (onAdd(title.trim(), context), onClose())}
            autoFocus />
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Contexto</p>
            <div className="flex flex-wrap gap-1.5">
              {contexts.map(c => (
                <button key={c} onClick={() => setContext(c)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: context === c ? "var(--foreground)" : "var(--muted)",
                    color: context === c ? "white" : "var(--muted-foreground)",
                  }}>{c}</button>
              ))}
            </div>
          </div>
          <button onClick={() => { if (title.trim()) { onAdd(title.trim(), context); onClose() } }}
            disabled={!title.trim()}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: project.area_color }}>
            Adicionar ação
          </button>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ p, tasks, onAddTask, onToggle, onRemoveTask, onRemove }: {
  p: Project
  tasks: Task[]
  onAddTask: (title: string, context: string) => void
  onToggle: (id: string, done: boolean) => void
  onRemoveTask: (id: string) => void
  onRemove: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [addingTask, setAddingTask] = useState(false)

  const projectTasks = tasks.filter(t => t.project_id === p.id)
  const doneTasks = projectTasks.filter(t => t.done).length
  const pct = projectTasks.length > 0 ? Math.round((doneTasks / projectTasks.length) * 100) : 0
  const nextAction = projectTasks.find(t => !t.done)

  return (
    <>
      <Card className="group">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: p.area_color + "20", color: p.area_color }}>
              {p.area}
            </span>
            <h3 className="text-sm font-semibold mt-1.5" style={{ color: "var(--foreground)" }}>{p.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-sm font-bold" style={{ color: p.area_color }}>{pct}%</span>
            <button onClick={onRemove}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
              style={{ color: "var(--dusty-rose)" }}>
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {p.outcome && (
          <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>→ {p.outcome}</p>
        )}

        {/* Barra de progresso */}
        <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: "var(--muted)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: p.area_color }} />
        </div>

        {/* Próxima ação (colapsado) */}
        {!expanded && (
          nextAction ? (
            <div className="flex items-center gap-2 p-2.5 rounded-xl mb-3" style={{ background: "var(--muted)" }}>
              <Circle size={12} style={{ color: "var(--soft-orange)", flexShrink: 0 }} />
              <p className="text-xs flex-1 truncate" style={{ color: "var(--foreground)" }}>{nextAction.title}</p>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0"
                style={{ background: "var(--card)", color: "var(--muted-foreground)" }}>
                {nextAction.context}
              </span>
            </div>
          ) : projectTasks.length > 0 ? (
            <p className="text-xs text-center py-1 mb-3" style={{ color: "var(--sage)" }}>✓ Todas as ações concluídas!</p>
          ) : null
        )}

        {/* Lista expandida */}
        {expanded && (
          <div className="space-y-1 mb-3">
            {projectTasks.length === 0 && (
              <p className="text-xs text-center py-2" style={{ color: "var(--muted-foreground)" }}>
                Nenhuma ação ainda. Adicione abaixo.
              </p>
            )}
            {projectTasks.map(task => (
              <div key={task.id}
                className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-[var(--muted)] transition-colors group/task">
                <button onClick={() => onToggle(task.id, !task.done)} className="flex-shrink-0">
                  {task.done
                    ? <CheckCircle2 size={16} style={{ color: "var(--sage)" }} />
                    : <Circle size={16} style={{ color: "var(--card-border)" }} />
                  }
                </button>
                <span className={`text-sm flex-1 min-w-0 truncate ${task.done ? "line-through" : ""}`}
                  style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                  {task.title}
                </span>
                <span className="text-[10px] flex-shrink-0" style={{ color: "var(--muted-foreground)" }}>
                  {task.context}
                </span>
                <button onClick={() => onRemoveTask(task.id)}
                  className="opacity-0 group-hover/task:opacity-100 p-1 rounded-lg transition-all flex-shrink-0"
                  style={{ color: "var(--dusty-rose)" }}>
                  <Trash2 size={11} />
                </button>
              </div>
            ))}
            <button onClick={() => setAddingTask(true)}
              className="flex items-center gap-2 w-full px-2 py-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
              style={{ color: "var(--soft-orange)" }}>
              <Plus size={14} />
              <span className="text-xs font-semibold">Adicionar ação</span>
            </button>
          </div>
        )}

        {/* Rodapé: contador + expandir */}
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {doneTasks}/{projectTasks.length} ações
          </span>
          <button onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg hover:bg-[var(--muted)] transition-colors"
            style={{ color: "var(--muted-foreground)" }}>
            {expanded ? <><ChevronUp size={13} /> Recolher</> : <><ChevronDown size={13} /> Ver ações</>}
          </button>
        </div>
      </Card>

      {addingTask && (
        <AddTaskToProjectModal
          project={p}
          onClose={() => setAddingTask(false)}
          onAdd={onAddTask}
        />
      )}
    </>
  )
}

function ProjectsTab({ projects, tasks, loading, onAddTask, onToggleTask, onRemoveTask, onRemoveProject }: {
  projects: Project[]
  tasks: Task[]
  loading: boolean
  onAddTask: (title: string, context: string, area: string, projectId: string) => void
  onToggleTask: (id: string, done: boolean) => void
  onRemoveTask: (id: string) => void
  onRemoveProject: (id: string) => void
}) {
  if (loading) return <div className="text-center py-8"><p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Carregando...</p></div>
  if (projects.length === 0) return (
    <div className="text-center py-12">
      <p className="text-3xl mb-2">📁</p>
      <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Nenhum projeto ainda.</p>
    </div>
  )
  return (
    <div className="space-y-3">
      {projects.map(p => (
        <ProjectCard key={p.id} p={p} tasks={tasks}
          onAddTask={(title, ctx) => onAddTask(title, ctx, p.area, p.id)}
          onToggle={onToggleTask}
          onRemoveTask={onRemoveTask}
          onRemove={() => onRemoveProject(p.id)}
        />
      ))}
    </div>
  )
}

export default function TasksPage() {
  const { tasks, loading, add, toggle, remove } = useTasks()
  const { items: someday, loading: somedayLoading, add: addSomeday, remove: removeSomeday } = useSomeday()
  const { projects, loading: projectsLoading, add: addProject, remove: removeProject } = useProjects()
  const [tab, setTab] = useState<Tab>("actions")
  const [context, setContext] = useState<string | null>(null)
  const [showDone, setShowDone] = useState(false)
  const [addingTask, setAddingTask] = useState(false)
  const [addingProject, setAddingProject] = useState(false)
  const [somedayInput, setSomedayInput] = useState("")

  const filtered = tasks.filter(a => {
    if (!showDone && a.done) return false
    if (context && a.context !== context) return false
    return true
  })

  const grouped = filtered.reduce((acc, a) => {
    if (!acc[a.context]) acc[a.context] = []
    acc[a.context].push(a)
    return acc
  }, {} as Record<string, typeof tasks>)

  const pending = tasks.filter(a => !a.done).length
  const doneCount = tasks.filter(a => a.done).length

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "short" })

  return (
    <div className="space-y-5 w-full overflow-x-hidden">
      <PageHeader
        title="Tarefas"
        subtitle={
          tab === "actions" ? (loading ? "..." : `${pending} ações abertas`) :
          tab === "projects" ? `${projects.length} projetos ativos` :
          `${someday.length} ideias guardadas`
        }
        action={tab === "actions" ? (
          <button onClick={() => setAddingTask(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            <Plus size={15} /> Nova ação
          </button>
        ) : tab === "projects" ? (
          <button onClick={() => setAddingProject(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--golden)" }}>
            <Plus size={15} /> Novo projeto
          </button>
        ) : undefined}
      />

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
        {([
          { id: "actions", label: "Ações" },
          { id: "projects", label: "Projetos" },
          { id: "someday", label: "Algum dia" },
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
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-1 min-w-max">
              <button onClick={() => setContext(null)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{ background: !context ? "var(--foreground)" : "var(--muted)", color: !context ? "white" : "var(--muted-foreground)" }}>
                Todos
              </button>
              {contexts.map(c => (
                <button key={c} onClick={() => setContext(ctx => ctx === c ? null : c)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={{ background: context === c ? "var(--foreground)" : "var(--muted)", color: context === c ? "white" : "var(--muted-foreground)" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
            </div>
          ) : Object.keys(grouped).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(grouped).map(([ctx, acts]) => (
                <section key={ctx}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>
                    <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--muted)" }}>{ctx}</span>
                  </p>
                  <Card className="divide-y overflow-hidden">
                    {acts.map(action => (
                      <div key={action.id} className="flex items-center gap-3 p-3.5 hover:bg-[var(--muted)] transition-colors group">
                        <button onClick={() => toggle(action.id, !action.done)} className="flex-shrink-0">
                          {action.done
                            ? <CheckCircle2 size={17} style={{ color: "var(--sage)" }} />
                            : <Circle size={17} style={{ color: "var(--card-border)" }} />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm ${action.done ? "line-through" : ""}`}
                            style={{ color: action.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                            {action.title}
                          </span>
                          {action.due_date && (
                            <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                              📅 {formatDate(action.due_date)}
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 hidden sm:block"
                          style={{ background: action.area_color + "20", color: action.area_color }}>
                          {action.area}
                        </span>
                        <button onClick={() => remove(action.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-[var(--muted)] transition-all flex-shrink-0"
                          style={{ color: "var(--dusty-rose)" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </Card>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-3xl mb-2">✅</p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {tasks.length === 0 ? "Nenhuma ação ainda. Crie sua primeira!" : "Tudo feito!"}
              </p>
            </div>
          )}

          {doneCount > 0 && (
            <button onClick={() => setShowDone(s => !s)}
              className="w-full py-2 text-xs rounded-xl hover:bg-[var(--muted)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              {showDone ? "Ocultar" : "Mostrar"} concluídas ({doneCount})
            </button>
          )}
        </div>
      )}

      {/* Projetos */}
      {tab === "projects" && (
        <ProjectsTab
          projects={projects}
          tasks={tasks}
          loading={projectsLoading}
          onAddTask={(title, context, area, projectId) =>
            add({ title, context, area, area_color: AREA_COLORS[area], project_id: projectId })
          }
          onToggleTask={toggle}
          onRemoveTask={remove}
          onRemoveProject={removeProject}
        />
      )}

      {/* Algum dia */}
      {tab === "someday" && (
        <div className="space-y-3">
          <Card className="p-3">
            <div className="flex gap-2">
              <input value={somedayInput} onChange={e => setSomedayInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && somedayInput.trim()) { addSomeday(somedayInput.trim()); setSomedayInput("") } }}
                placeholder="Uma ideia, um sonho, algo para o futuro..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "var(--foreground)" }} />
              <button onClick={() => { if (somedayInput.trim()) { addSomeday(somedayInput.trim()); setSomedayInput("") } }}
                className="p-2 rounded-xl text-white flex-shrink-0"
                style={{ background: "var(--lavender)" }}>
                <Plus size={15} />
              </button>
            </div>
          </Card>

          {somedayLoading ? (
            <div className="text-center py-4">
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {someday.map(item => (
                <Card key={item.id} className="flex items-center gap-3 group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      {new Date(item.created_at).toLocaleDateString("pt-BR", { month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <button onClick={() => removeSomeday(item.id)}
                    className="p-1.5 rounded-lg hover:bg-[var(--muted)] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                    style={{ color: "var(--dusty-rose)" }}>
                    <Trash2 size={13} />
                  </button>
                </Card>
              ))}
              {someday.length === 0 && (
                <p className="text-sm text-center py-8" style={{ color: "var(--muted-foreground)" }}>
                  Nenhuma ideia ainda. Adicione algo acima!
                </p>
              )}
            </div>
          )}
          <p className="text-xs text-center pt-2" style={{ color: "var(--muted-foreground)" }}>
            💡 Revise esses itens na revisão de domingo
          </p>
        </div>
      )}

      {addingTask && (
        <AddTaskModal
          onClose={() => setAddingTask(false)}
          onAdd={(title, context, area) => add({ title, context, area, area_color: AREA_COLORS[area] })}
        />
      )}
      {addingProject && (
        <AddProjectModal
          onClose={() => setAddingProject(false)}
          onAdd={(title, area, outcome) => addProject({ title, area, area_color: AREA_COLORS[area], outcome: outcome || "" })}
        />
      )}
    </div>
  )
}

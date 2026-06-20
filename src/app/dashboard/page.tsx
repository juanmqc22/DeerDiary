"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Onboarding, useOnboarding } from "@/components/onboarding"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useTasks } from "@/hooks/use-tasks"
import { useInbox } from "@/hooks/use-inbox"

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return "Bom dia"
  if (h < 18) return "Boa tarde"
  return "Boa noite"
}

export default function Dashboard() {
  const { show: showOnboarding, done: doneOnboarding } = useOnboarding()
  const { identity } = useCurrentUser()
  const { tasks, loading: tasksLoading, toggle } = useTasks()
  const { items: inboxItems, loading: inboxLoading } = useInbox()

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  const focusTasks = tasks.filter(t => !t.project_id).slice(0, 5)
  const doneCount = focusTasks.filter(t => t.done).length
  const inboxCount = inboxItems.length

  return (
    <>
    {showOnboarding && <Onboarding onDone={doneOnboarding} />}
    <div className="space-y-8">

      {/* Saudação */}
      <div className="pt-2">
        <p className="text-xs capitalize tracking-wide" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-3xl font-bold mt-1" style={{ color: "var(--warm-brown)" }}>
          {greeting()}, {identity ? `${identity.label} ${identity.emoji}` : "..."}
        </h1>
      </div>

      {/* Foco do dia */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Foco de hoje
          </h2>
          {doneCount > 0 && (
            <span className="text-xs font-semibold" style={{ color: "var(--sage)" }}>
              {doneCount}/{focusTasks.length} ✓
            </span>
          )}
        </div>

        {tasksLoading ? (
          <p className="text-sm text-center py-4" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
        ) : focusTasks.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-2xl mb-1">🌿</p>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Nenhuma ação por aqui.</p>
            <Link href="/tasks" className="text-xs mt-2 inline-block underline" style={{ color: "var(--soft-orange)" }}>
              Adicionar ações
            </Link>
          </Card>
        ) : (
          <Card className="divide-y overflow-hidden">
            {focusTasks.map(task => (
              <button key={task.id} onClick={() => toggle(task.id, !task.done)}
                className="flex items-center gap-3 p-4 w-full text-left hover:bg-[var(--muted)] transition-colors">
                {task.done
                  ? <CheckCircle2 size={18} style={{ color: "var(--sage)", flexShrink: 0 }} />
                  : <Circle size={18} style={{ color: "var(--card-border)", flexShrink: 0 }} />
                }
                <div className="flex-1 min-w-0">
                  <span className={`text-sm leading-snug block ${task.done ? "line-through" : ""}`}
                    style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                    {task.title}
                  </span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{task.context}</span>
                </div>
              </button>
            ))}
          </Card>
        )}

        <Link href="/tasks"
          className="flex items-center justify-center gap-1 mt-2 py-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}>
          Ver todas as ações <ChevronRight size={12} />
        </Link>
      </section>

      {/* Inbox */}
      <Link href="/inbox">
        <div className="flex items-center justify-between py-3 px-1 border-b transition-opacity hover:opacity-70"
          style={{ borderColor: "var(--card-border)" }}>
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>Inbox</span>
          <div className="flex items-center gap-2">
            {!inboxLoading && inboxCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ background: "var(--soft-orange)" }}>{inboxCount}</span>
            )}
            {!inboxLoading && inboxCount === 0 && (
              <span className="text-xs" style={{ color: "var(--sage)" }}>✓ limpo</span>
            )}
            <ChevronRight size={14} style={{ color: "var(--card-border)" }} />
          </div>
        </div>
      </Link>

    </div>
    </>
  )
}

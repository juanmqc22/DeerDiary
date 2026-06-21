"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Plus, TrendingUp, BookHeart, ChevronLeft, ChevronRight, X, ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react"
import { useState } from "react"
import { useSharedTasks } from "@/hooks/use-shared-tasks"
import { useTransactions } from "@/hooks/use-transactions"
import { useSavingsGoals } from "@/hooks/use-savings-goals"
import { useDiary } from "@/hooks/use-diary"

const CATEGORIES = ["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Educação", "Outros"]
const CAT_COLORS: Record<string, string> = {
  Moradia: "var(--lavender)", Alimentação: "var(--golden)", Transporte: "var(--sky-blue)",
  Saúde: "var(--sage)", Lazer: "var(--dusty-rose)", Educação: "var(--soft-orange)", Outros: "var(--muted-foreground)",
}
const CAT_BUDGETS: Record<string, number> = {
  Moradia: 2300, Alimentação: 1200, Transporte: 700, Saúde: 400, Lazer: 600, Educação: 500, Outros: 800,
}
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

type TxType = "entrada" | "saída"
type FinanceTab = "transacoes" | "categorias" | "metas"

function AddTransactionModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (tx: { description: string; amount: number; type: TxType; category: string; who: string }) => void
}) {
  const [type, setType] = useState<TxType>("saída")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [who, setWho] = useState("BJ")

  const submit = () => {
    if (!description.trim() || !amount) return
    onAdd({ description: description.trim(), amount: parseFloat(amount.replace(",", ".")), type, category, who })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-5">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Novo lançamento</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>
        <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
          {(["saída", "entrada"] as TxType[]).map(t => (
            <button key={t} onClick={() => setType(t)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: type === t ? "var(--card)" : "transparent",
                color: type === t ? (t === "saída" ? "var(--dusty-rose)" : "var(--sage)") : "var(--muted-foreground)",
              }}>
              {t === "saída" ? "↑ Saída" : "↓ Entrada"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          <input value={description} onChange={e => setDescription(e.target.value)}
            placeholder="Descrição" autoFocus
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>R$</span>
            <input value={amount} onChange={e => setAmount(e.target.value)}
              placeholder="0,00" type="number"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: "var(--foreground)" }} />
          </div>
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Categoria</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{ background: category === c ? CAT_COLORS[c] : "var(--muted)", color: category === c ? "white" : "var(--muted-foreground)" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Quem</p>
            <div className="flex gap-2">
              {["B", "J", "BJ"].map(w => (
                <button key={w} onClick={() => setWho(w)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: who === w ? "var(--warm-brown)" : "var(--muted)", color: who === w ? "white" : "var(--muted-foreground)" }}>
                  {w === "BJ" ? "Casal" : w}
                </button>
              ))}
            </div>
          </div>
          <button onClick={submit} disabled={!description.trim() || !amount}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: type === "saída" ? "var(--dusty-rose)" : "var(--sage)" }}>
            Adicionar lançamento
          </button>
        </div>
      </div>
    </div>
  )
}

function AddSharedTaskModal({ onClose, onAdd }: { onClose: () => void; onAdd: (title: string, who: string) => void }) {
  const [title, setTitle] = useState("")
  const [who, setWho] = useState("BJ")
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Nova tarefa do casal</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="O que precisa ser feito?" autoFocus
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }}
            onKeyDown={e => e.key === "Enter" && title.trim() && (onAdd(title.trim(), who), onClose())} />
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Responsável</p>
            <div className="flex gap-2">
              {["B", "J", "BJ"].map(w => (
                <button key={w} onClick={() => setWho(w)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: who === w ? "var(--warm-brown)" : "var(--muted)", color: who === w ? "white" : "var(--muted-foreground)" }}>
                  {w === "BJ" ? "Casal" : w}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => { if (title.trim()) { onAdd(title.trim(), who); onClose() } }}
            disabled={!title.trim()}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "var(--soft-orange)" }}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  )
}

function AddGoalModal({ onClose, onAdd }: { onClose: () => void; onAdd: (label: string, target: number, color: string) => void }) {
  const [label, setLabel] = useState("")
  const [target, setTarget] = useState("")
  const goalColors = ["var(--soft-orange)", "var(--sage)", "var(--lavender)", "var(--golden)", "var(--sky-blue)", "var(--dusty-rose)"]
  const [color, setColor] = useState(goalColors[0])
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Nova meta</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <input value={label} onChange={e => setLabel(e.target.value)}
            placeholder="Ex: Viagem de fim de ano ✈️" autoFocus
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>R$</span>
            <input value={target} onChange={e => setTarget(e.target.value)} type="number" placeholder="0,00"
              className="flex-1 text-sm outline-none bg-transparent" style={{ color: "var(--foreground)" }} />
          </div>
          <div className="flex gap-2">
            {goalColors.map(c => (
              <button key={c} onClick={() => setColor(c)}
                className="w-7 h-7 rounded-full transition-all"
                style={{ background: c, outline: color === c ? `3px solid ${c}` : "none", outlineOffset: 2 }} />
            ))}
          </div>
          <button onClick={() => { if (label.trim() && target) { onAdd(label.trim(), parseFloat(target), color); onClose() } }}
            disabled={!label.trim() || !target}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "var(--golden)" }}>
            Criar meta
          </button>
        </div>
      </div>
    </div>
  )
}

export default function UsPage() {
  const now = new Date()
  const [tab, setTab] = useState<"tarefas" | "contas" | "diario">("tarefas")
  const [financeTab, setFinanceTab] = useState<FinanceTab>("transacoes")
  const [monthOffset, setMonthOffset] = useState(0)
  const [addingTx, setAddingTx] = useState(false)
  const [addingTask, setAddingTask] = useState(false)
  const [addingGoal, setAddingGoal] = useState(false)
  const [diaryText, setDiaryText] = useState("")
  const [activeAuthor, setActiveAuthor] = useState<"B" | "J">("B")

  const displayMonthIdx = (now.getMonth() + monthOffset + 120) % 12
  const displayYear = now.getFullYear() + Math.floor((now.getMonth() + monthOffset) / 12)

  const { tasks: sharedTasks, loading: tasksLoading, add: addSharedTask, toggle: toggleTask, remove: removeTask } = useSharedTasks()
  const { transactions, loading: txLoading, add: addTx, remove: removeTx } = useTransactions(displayMonthIdx, displayYear)
  const { goals, loading: goalsLoading, add: addGoal, remove: removeGoal } = useSavingsGoals()
  const { entries, add: addEntry, remove: removeEntry } = useDiary()

  const totalIncome = transactions.filter(t => t.type === "entrada").reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === "saída").reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpenses

  const catSummary = CATEGORIES.map(cat => {
    const spent = transactions.filter(t => t.type === "saída" && t.category === cat).reduce((s, t) => s + t.amount, 0)
    const budget = CAT_BUDGETS[cat]
    return { cat, spent, budget, pct: Math.min(100, Math.round((spent / budget) * 100)) }
  }).filter(c => c.spent > 0)

  const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const formatDate = (iso: string) => {
    const d = new Date(iso + "T00:00:00")
    return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
  }
  const formatEntryDate = (iso: string) => {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`
  }

  return (
    <div className="animate-fade-in space-y-5">
      <div className="text-center pt-1">
        <div className="flex justify-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "var(--dusty-rose)" }}>B</div>
          <span className="text-xl leading-9">🤍</span>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: "var(--sky-blue)" }}>J</div>
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>Nós dois</h1>
      </div>

      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
        {(["tarefas", "contas", "diario"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: tab === t ? "var(--card)" : "transparent",
              color: tab === t ? "var(--warm-brown)" : "var(--muted-foreground)",
              boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}>
            {t === "tarefas" ? "Tarefas" : t === "contas" ? "Finanças" : "Diário"}
          </button>
        ))}
      </div>

      {/* ── Tarefas ── */}
      {tab === "tarefas" && (
        <div className="animate-fade-in space-y-3">
          <Card>
            {tasksLoading ? (
              <p className="text-sm text-center py-4" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
            ) : (
              <div className="flex flex-col gap-1">
                {sharedTasks.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors group">
                    <button onClick={() => toggleTask(task.id, !task.done)} className="flex-shrink-0">
                      {task.done
                        ? <CheckCircle2 size={18} style={{ color: "var(--sage)" }} />
                        : <Circle size={18} style={{ color: "var(--card-border)" }} />
                      }
                    </button>
                    <span className={`text-sm flex-1 ${task.done ? "line-through" : ""}`}
                      style={{ color: task.done ? "var(--muted-foreground)" : "var(--foreground)" }}>
                      {task.title}
                    </span>
                    <div className="flex gap-1 flex-shrink-0">
                      {task.who.includes("B") && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--dusty-rose)" }}>B</div>
                      )}
                      {task.who.includes("J") && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--sky-blue)" }}>J</div>
                      )}
                    </div>
                    <button onClick={() => removeTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all flex-shrink-0"
                      style={{ color: "var(--dusty-rose)" }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button onClick={() => setAddingTask(true)}
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full"
                  style={{ color: "var(--muted-foreground)" }}>
                  <Plus size={16} />
                  <span className="text-sm">Adicionar tarefa</span>
                </button>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* ── Finanças ── */}
      {tab === "contas" && (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setMonthOffset(o => o - 1)}
              className="p-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
              {MONTHS[displayMonthIdx]} {displayYear}
            </span>
            <button onClick={() => setMonthOffset(o => o + 1)}
              className="p-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Card className="text-center !p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--sage)" }}>Entradas</p>
              <p className="text-sm font-bold" style={{ color: "var(--sage)" }}>R$ {fmt(totalIncome)}</p>
            </Card>
            <Card className="text-center !p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--dusty-rose)" }}>Saídas</p>
              <p className="text-sm font-bold" style={{ color: "var(--dusty-rose)" }}>R$ {fmt(totalExpenses)}</p>
            </Card>
            <Card className="text-center !p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--warm-brown)" }}>Saldo</p>
              <p className="text-sm font-bold" style={{ color: balance >= 0 ? "var(--sage)" : "var(--dusty-rose)" }}>
                R$ {fmt(balance)}
              </p>
            </Card>
          </div>

          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
            {([
              { id: "transacoes", label: "Lançamentos" },
              { id: "categorias", label: "Categorias" },
              { id: "metas", label: "Metas" },
            ] as { id: FinanceTab; label: string }[]).map(t => (
              <button key={t.id} onClick={() => setFinanceTab(t.id)}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: financeTab === t.id ? "var(--card)" : "transparent",
                  color: financeTab === t.id ? "var(--warm-brown)" : "var(--muted-foreground)",
                }}>
                {t.label}
              </button>
            ))}
          </div>

          {financeTab === "transacoes" && (
            <div className="space-y-2">
              <button onClick={() => setAddingTx(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "var(--soft-orange)" }}>
                <Plus size={16} /> Novo lançamento
              </button>
              {txLoading ? (
                <p className="text-sm text-center py-4" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
              ) : transactions.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: "var(--muted-foreground)" }}>Nenhum lançamento neste mês.</p>
              ) : (
                <div className="space-y-1.5">
                  {transactions.map(tx => (
                    <Card key={tx.id} className="flex items-center gap-3 group !p-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: tx.type === "entrada" ? "var(--sage)20" : "var(--dusty-rose)15" }}>
                        {tx.type === "entrada"
                          ? <ArrowDownLeft size={14} style={{ color: "var(--sage)" }} />
                          : <ArrowUpRight size={14} style={{ color: "var(--dusty-rose)" }} />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{tx.description}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                            style={{ background: CAT_COLORS[tx.category] + "20", color: CAT_COLORS[tx.category] }}>
                            {tx.category}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{formatDate(tx.tx_date)}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold"
                          style={{ color: tx.type === "entrada" ? "var(--sage)" : "var(--foreground)" }}>
                          {tx.type === "entrada" ? "+" : "-"}R$ {fmt(tx.amount)}
                        </p>
                        <div className="flex gap-0.5 justify-end mt-0.5">
                          {tx.who.includes("B") && (
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                              style={{ background: "var(--dusty-rose)" }}>B</div>
                          )}
                          {tx.who.includes("J") && (
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
                              style={{ background: "var(--sky-blue)" }}>J</div>
                          )}
                        </div>
                      </div>
                      <button onClick={() => removeTx(tx.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--muted)] transition-all flex-shrink-0"
                        style={{ color: "var(--dusty-rose)" }}>
                        <Trash2 size={12} />
                      </button>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {financeTab === "categorias" && (
            <div className="space-y-3">
              {catSummary.length === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: "var(--muted-foreground)" }}>Nenhuma saída neste mês.</p>
              ) : catSummary.map(({ cat, spent, budget, pct }) => (
                <Card key={cat} className="!p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: CAT_COLORS[cat] }} />
                      <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{cat}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold" style={{ color: pct > 90 ? "var(--dusty-rose)" : "var(--foreground)" }}>
                        R$ {fmt(spent)}
                      </span>
                      <span className="text-xs ml-1" style={{ color: "var(--muted-foreground)" }}>/ R$ {fmt(budget)}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, background: pct > 90 ? "var(--dusty-rose)" : pct > 70 ? "var(--golden)" : CAT_COLORS[cat] }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{pct}% do orçamento</span>
                    <span className="text-[10px]" style={{ color: spent <= budget ? "var(--sage)" : "var(--dusty-rose)" }}>
                      {spent <= budget ? `R$ ${fmt(budget - spent)} disponível` : `R$ ${fmt(spent - budget)} acima`}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {financeTab === "metas" && (
            <div className="space-y-3">
              {goalsLoading ? (
                <p className="text-sm text-center py-4" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
              ) : goals.map(goal => {
                const pct = Math.round((goal.current_amount / goal.target_amount) * 100)
                return (
                  <Card key={goal.id} className="!p-4 group">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{goal.label}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: goal.color }}>{pct}%</span>
                        <button onClick={() => removeGoal(goal.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                          style={{ color: "var(--dusty-rose)" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: goal.color }} />
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "var(--muted-foreground)" }}>
                      <span>R$ {goal.current_amount.toLocaleString("pt-BR")}</span>
                      <span>R$ {goal.target_amount.toLocaleString("pt-BR")}</span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>
                      Faltam R$ {(goal.target_amount - goal.current_amount).toLocaleString("pt-BR")}
                    </p>
                  </Card>
                )
              })}
              <button onClick={() => setAddingGoal(true)}
                className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 text-sm hover:opacity-70 transition-opacity"
                style={{ border: "2px dashed var(--card-border)", color: "var(--muted-foreground)" }}>
                <TrendingUp size={15} /> Nova meta financeira
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Diário ── */}
      {tab === "diario" && (
        <div className="animate-fade-in space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <BookHeart size={16} style={{ color: "var(--dusty-rose)" }} />
              <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Nova memória</span>
              <div className="ml-auto flex gap-1">
                {(["B", "J"] as const).map(a => (
                  <button key={a} onClick={() => setActiveAuthor(a)}
                    className="w-6 h-6 rounded-full text-[10px] font-bold text-white transition-all"
                    style={{
                      background: a === "B" ? "var(--dusty-rose)" : "var(--sky-blue)",
                      opacity: activeAuthor === a ? 1 : 0.35,
                    }}>{a}</button>
                ))}
              </div>
            </div>
            <textarea
              value={diaryText}
              onChange={e => setDiaryText(e.target.value)}
              placeholder="O que aconteceu de bom hoje? Um momento, uma lembrança... 🌿"
              className="w-full text-sm resize-none outline-none bg-transparent"
              style={{ color: "var(--foreground)", minHeight: 72 }}
            />
            <button
              onClick={async () => {
                if (!diaryText.trim()) return
                await addEntry(diaryText.trim(), activeAuthor)
                setDiaryText("")
              }}
              disabled={!diaryText.trim()}
              className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-40"
              style={{ background: activeAuthor === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
              Guardar memória 💛
            </button>
          </Card>

          <div className="space-y-3">
            {entries.map(entry => (
              <Card key={entry.id} className="border-l-4 group"
                style={{ borderLeftColor: entry.author === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: entry.author === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
                    {entry.author}
                  </div>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{formatEntryDate(entry.created_at)}</span>
                  <button onClick={() => removeEntry(entry.id)}
                    className="ml-auto opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                    style={{ color: "var(--dusty-rose)" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{entry.text}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {addingTx && (
        <AddTransactionModal
          onClose={() => setAddingTx(false)}
          onAdd={tx => addTx(tx)}
        />
      )}
      {addingTask && (
        <AddSharedTaskModal
          onClose={() => setAddingTask(false)}
          onAdd={(title, who) => addSharedTask(title, who)}
        />
      )}
      {addingGoal && (
        <AddGoalModal
          onClose={() => setAddingGoal(false)}
          onAdd={(label, target, color) => addGoal({ label, target_amount: target, color })}
        />
      )}
    </div>
  )
}

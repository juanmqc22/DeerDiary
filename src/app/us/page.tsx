"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, Plus, TrendingUp, BookHeart, ChevronLeft, ChevronRight, X, ArrowDownLeft, ArrowUpRight, Trash2 } from "lucide-react"
import { useState } from "react"

// ── Shared tasks ──────────────────────────────────────────────
const sharedTasks = [
  { id: 1, title: "Renovar seguro do carro", done: false, who: "J" },
  { id: 2, title: "Jantar de aniversário — reserva", done: true, who: "B" },
  { id: 3, title: "Pesquisar planos de saúde", done: false, who: "BJ" },
  { id: 4, title: "Ligar para a imobiliária", done: false, who: "J" },
]

// ── Finance data ───────────────────────────────────────────────
type TxType = "entrada" | "saída"
type Transaction = {
  id: number; date: string; description: string
  amount: number; type: TxType; category: string; who: string
}

const CATEGORIES = ["Moradia", "Alimentação", "Transporte", "Saúde", "Lazer", "Educação", "Outros"]
const CAT_COLORS: Record<string, string> = {
  Moradia: "var(--lavender)", Alimentação: "var(--golden)", Transporte: "var(--sky-blue)",
  Saúde: "var(--sage)", Lazer: "var(--dusty-rose)", Educação: "var(--soft-orange)", Outros: "var(--muted-foreground)",
}
const CAT_BUDGETS: Record<string, number> = {
  Moradia: 2300, Alimentação: 1200, Transporte: 700, Saúde: 400, Lazer: 600, Educação: 500, Outros: 800,
}

const initialTransactions: Transaction[] = [
  { id: 1, date: "20 Jun", description: "Aluguel", amount: 2200, type: "saída", category: "Moradia", who: "BJ" },
  { id: 2, date: "19 Jun", description: "Salário — Baby", amount: 5500, type: "entrada", category: "Outros", who: "B" },
  { id: 3, date: "18 Jun", description: "Mercado", amount: 380, type: "saída", category: "Alimentação", who: "BJ" },
  { id: 4, date: "17 Jun", description: "Salário — Juan", amount: 3000, type: "entrada", category: "Outros", who: "J" },
  { id: 5, date: "15 Jun", description: "Uber", amount: 45, type: "saída", category: "Transporte", who: "B" },
  { id: 6, date: "14 Jun", description: "Restaurante", amount: 128, type: "saída", category: "Alimentação", who: "BJ" },
  { id: 7, date: "12 Jun", description: "Farmácia", amount: 87, type: "saída", category: "Saúde", who: "B" },
  { id: 8, date: "10 Jun", description: "Cinema", amount: 64, type: "saída", category: "Lazer", who: "BJ" },
  { id: 9, date: "10 Jun", description: "Combustível", amount: 200, type: "saída", category: "Transporte", who: "J" },
  { id: 10, date: "05 Jun", description: "Luz + internet", amount: 280, type: "saída", category: "Moradia", who: "BJ" },
]

const savingsGoals = [
  { id: 1, label: "Viagem de fim de ano ✈️", current: 1200, target: 5000, color: "var(--soft-orange)" },
  { id: 2, label: "Reserva de emergência 🏦", current: 8000, target: 15000, color: "var(--sage)" },
]

const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

// ── Diary ─────────────────────────────────────────────────────
const diaryEntries = [
  { date: "18 Jun", text: "Tivemos o melhor jantar. Simples, mas cheio de risadas. 💛", author: "B" },
  { date: "15 Jun", text: "Passeio no parque depois da igreja. Estava lindo.", author: "J" },
]

// ── Finance sub-tabs
type FinanceTab = "transacoes" | "categorias" | "metas"

function AddTransactionModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (tx: Omit<Transaction, "id">) => void
}) {
  const today = new Date()
  const [type, setType] = useState<TxType>("saída")
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [who, setWho] = useState("BJ")

  const submit = () => {
    if (!description.trim() || !amount) return
    const day = today.getDate()
    const month = MONTHS[today.getMonth()].slice(0, 3)
    onAdd({
      date: `${day} ${month}`,
      description: description.trim(),
      amount: parseFloat(amount.replace(",", ".")),
      type, category, who,
    })
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
            style={{ color: "var(--muted-foreground)" }}>
            <X size={16} />
          </button>
        </div>

        {/* Tipo */}
        <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
          {(["saída", "entrada"] as TxType[]).map(t => (
            <button key={t} onClick={() => setType(t)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
              style={{
                background: type === t ? "var(--card)" : "transparent",
                color: type === t
                  ? (t === "saída" ? "var(--dusty-rose)" : "var(--sage)")
                  : "var(--muted-foreground)",
              }}>
              {t === "saída" ? "↑ Saída" : "↓ Entrada"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {/* Descrição */}
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }}
          />

          {/* Valor */}
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>R$</span>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0,00"
              type="number"
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: "var(--foreground)" }}
            />
          </div>

          {/* Categoria */}
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Categoria</p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className="px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: category === c ? CAT_COLORS[c] : "var(--muted)",
                    color: category === c ? "white" : "var(--muted-foreground)",
                  }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Quem */}
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Quem</p>
            <div className="flex gap-2">
              {["B", "J", "BJ"].map(w => (
                <button key={w} onClick={() => setWho(w)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: who === w ? "var(--warm-brown)" : "var(--muted)",
                    color: who === w ? "white" : "var(--muted-foreground)",
                  }}>
                  {w === "BJ" ? "Casal" : w}
                </button>
              ))}
            </div>
          </div>

          <button onClick={submit}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white mt-1"
            style={{ background: type === "saída" ? "var(--dusty-rose)" : "var(--sage)" }}>
            Adicionar lançamento
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function UsPage() {
  const now = new Date()
  const [tasks, setTasks] = useState(sharedTasks)
  const [tab, setTab] = useState<"tarefas" | "contas" | "diario">("tarefas")
  const [financeTab, setFinanceTab] = useState<FinanceTab>("transacoes")
  const [monthOffset, setMonthOffset] = useState(0)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [addingTx, setAddingTx] = useState(false)
  const [diaryText, setDiaryText] = useState("")
  const [entries, setEntries] = useState(diaryEntries)
  const [activeAuthor, setActiveAuthor] = useState<"B" | "J">("B")

  const toggle = (id: number) =>
    setTasks(t => t.map(tk => tk.id === id ? { ...tk, done: !tk.done } : tk))

  const displayMonth = MONTHS[(now.getMonth() + monthOffset + 12) % 12]
  const displayYear = now.getFullYear() + Math.floor((now.getMonth() + monthOffset) / 12)

  const totalIncome = transactions.filter(t => t.type === "entrada").reduce((s, t) => s + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === "saída").reduce((s, t) => s + t.amount, 0)
  const balance = totalIncome - totalExpenses

  const catSummary = CATEGORIES.map(cat => {
    const spent = transactions.filter(t => t.type === "saída" && t.category === cat).reduce((s, t) => s + t.amount, 0)
    const budget = CAT_BUDGETS[cat]
    return { cat, spent, budget, pct: Math.min(100, Math.round((spent / budget) * 100)) }
  }).filter(c => c.spent > 0 || c.budget > 0)

  const fmt = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
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

      {/* Tabs principais */}
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
        <div className="animate-fade-in">
          <Card>
            <div className="flex flex-col gap-1">
              {tasks.map(task => (
                <button key={task.id} onClick={() => toggle(task.id)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors text-left w-full">
                  {task.done
                    ? <CheckCircle2 size={18} style={{ color: "var(--sage)", flexShrink: 0 }} />
                    : <Circle size={18} style={{ color: "var(--card-border)", flexShrink: 0 }} />
                  }
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
                </button>
              ))}
              <button className="flex items-center gap-2 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors w-full"
                style={{ color: "var(--muted-foreground)" }}>
                <Plus size={16} />
                <span className="text-sm">Adicionar tarefa</span>
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* ── Finanças ── */}
      {tab === "contas" && (
        <div className="animate-fade-in space-y-4">

          {/* Seletor de mês */}
          <div className="flex items-center justify-between">
            <button onClick={() => setMonthOffset(o => o - 1)}
              className="p-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
              {displayMonth} {displayYear}
            </span>
            <button onClick={() => setMonthOffset(o => o + 1)}
              className="p-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
              style={{ color: "var(--muted-foreground)" }}>
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Resumo — 3 cards em linha */}
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

          {/* Sub-tabs */}
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

          {/* Lançamentos */}
          {financeTab === "transacoes" && (
            <div className="space-y-2">
              <button onClick={() => setAddingTx(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "var(--soft-orange)" }}>
                <Plus size={16} /> Novo lançamento
              </button>
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
                        <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{tx.date}</span>
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
                    <button onClick={() => setTransactions(t => t.filter(x => x.id !== tx.id))}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-[var(--muted)] transition-all flex-shrink-0"
                      style={{ color: "var(--dusty-rose)" }}>
                      <Trash2 size={12} />
                    </button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Categorias */}
          {financeTab === "categorias" && (
            <div className="space-y-3">
              {catSummary.map(({ cat, spent, budget, pct }) => (
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
                      style={{
                        width: `${pct}%`,
                        background: pct > 90 ? "var(--dusty-rose)" : pct > 70 ? "var(--golden)" : CAT_COLORS[cat],
                      }} />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{pct}% do orçamento</span>
                    <span className="text-[10px]"
                      style={{ color: spent <= budget ? "var(--sage)" : "var(--dusty-rose)" }}>
                      {spent <= budget ? `R$ ${fmt(budget - spent)} disponível` : `R$ ${fmt(spent - budget)} acima`}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Metas */}
          {financeTab === "metas" && (
            <div className="space-y-3">
              {savingsGoals.map(goal => {
                const pct = Math.round((goal.current / goal.target) * 100)
                return (
                  <Card key={goal.label} className="!p-4">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{goal.label}</p>
                      <span className="text-sm font-bold" style={{ color: goal.color }}>{pct}%</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: "var(--muted)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: goal.color }} />
                    </div>
                    <div className="flex justify-between text-xs" style={{ color: "var(--muted-foreground)" }}>
                      <span>R$ {goal.current.toLocaleString("pt-BR")}</span>
                      <span>R$ {goal.target.toLocaleString("pt-BR")}</span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: "var(--muted-foreground)" }}>
                      Faltam R$ {(goal.target - goal.current).toLocaleString("pt-BR")}
                    </p>
                  </Card>
                )
              })}
              <button className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 text-sm hover:opacity-70 transition-opacity"
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
              onClick={() => {
                if (!diaryText.trim()) return
                const d = new Date()
                setEntries(prev => [{
                  date: `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`,
                  text: diaryText.trim(),
                  author: activeAuthor,
                }, ...prev])
                setDiaryText("")
              }}
              className="mt-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: activeAuthor === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
              Guardar memória 💛
            </button>
          </Card>

          <div className="space-y-3">
            {entries.map((entry, i) => (
              <Card key={i} className="border-l-4"
                style={{ borderLeftColor: entry.author === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: entry.author === "B" ? "var(--dusty-rose)" : "var(--sky-blue)" }}>
                    {entry.author}
                  </div>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{entry.date}</span>
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
          onAdd={tx => setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev])}
        />
      )}
    </div>
  )
}

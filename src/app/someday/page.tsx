"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { Trash2, MoveRight, Plus } from "lucide-react"
import { useState } from "react"

const initial = [
  { id: 1, text: "Fazer um curso de fotografia", area: "Eu", areaColor: "var(--soft-orange)", date: "Jun 2026" },
  { id: 2, text: "Aprender espanhol", area: "Eu", areaColor: "var(--soft-orange)", date: "Mai 2026" },
  { id: 3, text: "Criar podcast sobre mídias sociais", area: "Trabalho", areaColor: "var(--lavender)", date: "Jun 2026" },
  { id: 4, text: "Viagem ao Japão", area: "Casal", areaColor: "var(--golden)", date: "Mar 2026" },
  { id: 5, text: "Montar home office definitivo", area: "Casa", areaColor: "var(--dusty-rose)", date: "Abr 2026" },
  { id: 6, text: "Fazer retiro espiritual", area: "Igreja", areaColor: "var(--sage)", date: "Mai 2026" },
]

export default function SomedayPage() {
  const [items, setItems] = useState(initial)
  const [input, setInput] = useState("")

  const add = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
    setItems(i => [{ id: Date.now(), text: input.trim(), area: "Eu", areaColor: "var(--soft-orange)", date: now }, ...i])
    setInput("")
  }

  const remove = (id: number) => setItems(i => i.filter(x => x.id !== id))

  return (
    <div className="space-y-5">
      <PageHeader
        title="Algum dia / Talvez"
        subtitle="Boas ideias que não são prioridade agora 🌙"
      />

      {/* Input */}
      <Card className="p-3">
        <div className="flex gap-2 items-center">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
            placeholder="Uma ideia, um sonho, algo para o futuro..."
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "var(--foreground)" }} />
          <button onClick={add}
            className="p-2 rounded-xl text-white flex-shrink-0"
            style={{ background: "var(--lavender)" }}>
            <Plus size={16} />
          </button>
        </div>
      </Card>

      {/* Lista */}
      <div className="space-y-2">
        {items.map(item => (
          <Card key={item.id} className="flex items-center gap-3 group">
            <div className="w-1 self-stretch rounded-full flex-shrink-0"
              style={{ background: item.areaColor }} />
            <div className="flex-1 min-w-0 py-0.5">
              <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
              <p className="text-xs mt-0.5">
                <span style={{ color: item.areaColor }}>{item.area}</span>
                <span style={{ color: "var(--muted-foreground)" }}> · {item.date}</span>
              </p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                style={{ color: "var(--sage)" }}>
                <MoveRight size={14} />
              </button>
              <button onClick={() => remove(item.id)}
                className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                style={{ color: "var(--dusty-rose)" }}>
                <Trash2 size={14} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-xs text-center pb-2" style={{ color: "var(--muted-foreground)" }}>
        💡 Revise esta lista toda semana na revisão de domingo
      </p>
    </div>
  )
}

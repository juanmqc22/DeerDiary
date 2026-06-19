"use client"

import { Card } from "@/components/ui/card"
import { Plus, Trash2, MoveRight } from "lucide-react"
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
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>
          Algum dia / Talvez
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Boas ideias que não são prioridade agora. Revisitar na weekly review. 🌙
        </p>
      </div>

      {/* Input */}
      <Card className="mb-5">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          placeholder="Uma ideia, um sonho, algo para o futuro..."
          className="w-full text-sm outline-none bg-transparent"
          style={{ color: "var(--foreground)" }} />
        <div className="flex justify-end mt-2">
          <button onClick={add}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white"
            style={{ background: "var(--lavender)" }}>
            Guardar ideia
          </button>
        </div>
      </Card>

      {/* Lista */}
      <div className="flex flex-col gap-2">
        {items.map(item => (
          <Card key={item.id} className="flex items-center gap-3 group">
            <div className="w-1 h-10 rounded-full flex-shrink-0"
              style={{ background: item.areaColor }} />
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px]" style={{ color: item.areaColor }}>{item.area}</span>
                <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>· {item.date}</span>
              </div>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                title="Mover para projeto"
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

      <p className="text-xs text-center mt-6" style={{ color: "var(--muted-foreground)" }}>
        💡 Revise esta lista toda semana para ver se algo virou prioridade
      </p>
    </div>
  )
}

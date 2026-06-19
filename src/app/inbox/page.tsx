"use client"

import { Card } from "@/components/ui/card"
import { Send, Trash2, MoveRight } from "lucide-react"
import { useState } from "react"

const initialItems = [
  { id: 1, text: "Pesquisar sobre mestrado em comunicação", date: "hoje" },
  { id: 2, text: "Ligar pra mãe no fim de semana", date: "ontem" },
  { id: 3, text: "Ideia: criar template de relatório para clientes", date: "ontem" },
  { id: 4, text: "Comprar presente de aniversário da Lia", date: "há 2 dias" },
]

export default function InboxPage() {
  const [items, setItems] = useState(initialItems)
  const [input, setInput] = useState("")

  const add = () => {
    if (!input.trim()) return
    setItems(i => [{ id: Date.now(), text: input.trim(), date: "agora" }, ...i])
    setInput("")
  }

  const remove = (id: number) => setItems(i => i.filter(x => x.id !== id))

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>Captura 🧠</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Jogue tudo que está na sua cabeça aqui. Sem julgamento, sem organizar agora.
        </p>
      </div>

      {/* Input de captura */}
      <Card className="mb-6">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), add())}
          placeholder="O que está na sua cabeça agora? ✨"
          className="w-full text-sm resize-none outline-none bg-transparent"
          style={{ color: "var(--foreground)", minHeight: 80 }}
        />
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Enter para salvar · Shift+Enter para nova linha
          </span>
          <button
            onClick={add}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: "var(--soft-orange)" }}
          >
            <Send size={14} /> Capturar
          </button>
        </div>
      </Card>

      {/* Lista do inbox */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Inbox ({items.length})
          </h2>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Processe quando tiver tempo 💛
          </p>
        </div>

        {items.map(item => (
          <Card key={item.id} className="flex items-start gap-3 group hover:scale-[1.01] transition-transform">
            <div className="flex-1">
              <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{item.date}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                title="Mover para tarefa"
                style={{ color: "var(--sage)" }}
              >
                <MoveRight size={15} />
              </button>
              <button
                onClick={() => remove(item.id)}
                className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                title="Remover"
                style={{ color: "var(--dusty-rose)" }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </Card>
        ))}

        {items.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-3xl mb-2">🌿</p>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Inbox limpo!</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
              Mente livre é mente criativa.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}

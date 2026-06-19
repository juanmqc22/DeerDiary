"use client"

import { Card } from "@/components/ui/card"
import { Trash2, MoveRight, Calendar, BookOpen, ArrowRight } from "lucide-react"
import { useState } from "react"

type InboxItem = {
  id: number
  text: string
  date: string
  processing?: boolean
}

const initial: InboxItem[] = [
  { id: 1, text: "Pesquisar sobre mestrado em comunicação", date: "hoje" },
  { id: 2, text: "Ligar pra mãe no fim de semana", date: "ontem" },
  { id: 3, text: "Criar template de relatório para clientes", date: "ontem" },
  { id: 4, text: "Comprar presente de aniversário da Lia", date: "há 2 dias" },
]

const areas = ["Trabalho", "Pós-grad", "Igreja", "Casa", "Eu"]
const contexts = ["@computador", "@ligações", "@recados", "@casa", "@leitura"]

function ClarifyModal({ item, onClose }: { item: InboxItem; onClose: () => void }) {
  const [step, setStep] = useState<"actionable" | "type" | "details">("actionable")
  const [type, setType] = useState<"next-action" | "project" | "someday" | "reference" | null>(null)
  const [area, setArea] = useState("")
  const [context, setContext] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>

        {/* Item */}
        <div className="mb-4 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item.text}</p>
        </div>

        {/* Passo 1 — É acionável? */}
        {step === "actionable" && (
          <>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--warm-brown)" }}>
              Isso requer uma ação?
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => setStep("type")}
                className="w-full py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "var(--soft-orange)" }}>
                Sim, precisa de ação
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={onClose}
                  className="py-3 rounded-2xl text-sm font-medium flex flex-col items-center gap-1"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  <BookOpen size={16} />
                  Referência
                </button>
                <button onClick={onClose}
                  className="py-3 rounded-2xl text-sm font-medium flex flex-col items-center gap-1"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  <Trash2 size={16} />
                  Descartar
                </button>
              </div>
            </div>
          </>
        )}

        {/* Passo 2 — Qual tipo? */}
        {step === "type" && (
          <>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--warm-brown)" }}>
              É uma ação ou um projeto?
            </p>
            <div className="flex flex-col gap-2">
              <button onClick={() => { setType("next-action"); setStep("details") }}
                className="w-full p-3 rounded-2xl text-left border-2 transition-all hover:opacity-80"
                style={{ borderColor: "var(--soft-orange)", background: "var(--soft-orange)10" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--soft-orange)" }}>⚡ Próxima Ação</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  Uma ação física e concreta
                </p>
              </button>
              <button onClick={() => { setType("project"); setStep("details") }}
                className="w-full p-3 rounded-2xl text-left border-2 transition-all hover:opacity-80"
                style={{ borderColor: "var(--golden)", background: "var(--golden)10" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--golden)" }}>📁 Projeto</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  Requer mais de uma ação
                </p>
              </button>
              <button onClick={() => { setType("someday"); onClose() }}
                className="w-full p-3 rounded-2xl text-left border-2 transition-all hover:opacity-80"
                style={{ borderColor: "var(--card-border)", background: "var(--muted)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>🌙 Algum dia</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  Boa ideia, mas não agora
                </p>
              </button>
            </div>
          </>
        )}

        {/* Passo 3 — Detalhes */}
        {step === "details" && (
          <>
            <p className="text-sm font-semibold mb-3" style={{ color: "var(--warm-brown)" }}>
              Onde e quando?
            </p>
            <div className="flex flex-col gap-3">
              {/* Área de vida */}
              <div>
                <p className="text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Área de vida</p>
                <div className="flex flex-wrap gap-1.5">
                  {areas.map(a => (
                    <button key={a} onClick={() => setArea(a)}
                      className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: area === a ? "var(--warm-brown)" : "var(--muted)",
                        color: area === a ? "white" : "var(--muted-foreground)",
                      }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contexto (só para next-action) */}
              {type === "next-action" && (
                <div>
                  <p className="text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Contexto</p>
                  <div className="flex flex-wrap gap-1.5">
                    {contexts.map(c => (
                      <button key={c} onClick={() => setContext(c)}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                        style={{
                          background: context === c ? "var(--soft-orange)" : "var(--muted)",
                          color: context === c ? "white" : "var(--muted-foreground)",
                        }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Data? */}
              <div>
                <p className="text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                  <Calendar size={11} className="inline mr-1" />Data (opcional)
                </p>
                <input type="date" className="w-full text-sm p-2 rounded-xl outline-none"
                  style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
              </div>

              <button onClick={onClose}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "var(--sage)" }}>
                <ArrowRight size={16} />
                Organizar
              </button>
            </div>
          </>
        )}

        <button onClick={onClose} className="w-full mt-3 py-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default function InboxPage() {
  const [items, setItems] = useState(initial)
  const [input, setInput] = useState("")
  const [clarifying, setClarifying] = useState<InboxItem | null>(null)

  const add = () => {
    if (!input.trim()) return
    setItems(i => [{ id: Date.now(), text: input.trim(), date: "agora" }, ...i])
    setInput("")
  }

  const remove = (id: number) => setItems(i => i.filter(x => x.id !== id))

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>Inbox</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Capture tudo. Processe depois. Mente limpa. 🧠
        </p>
      </div>

      {/* Captura */}
      <Card className="mb-5">
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), add())}
          placeholder="O que está na sua cabeça agora?"
          className="w-full text-sm resize-none outline-none bg-transparent"
          style={{ color: "var(--foreground)", minHeight: 64 }} />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Enter para salvar</span>
          <button onClick={add}
            className="px-4 py-1.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            Capturar
          </button>
        </div>
      </Card>

      {/* Lista */}
      {items.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
              Para processar ({items.length})
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {items.map(item => (
              <Card key={item.id} className="flex items-center gap-3 group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{item.date}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => setClarifying(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all"
                    style={{ background: "var(--soft-orange)" }}>
                    <MoveRight size={13} /> Processar
                  </button>
                  <button onClick={() => remove(item.id)}
                    className="p-1.5 rounded-xl hover:bg-[var(--muted)] transition-colors opacity-0 group-hover:opacity-100"
                    style={{ color: "var(--dusty-rose)" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">🌿</p>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Inbox limpo!</p>
          <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Mente livre é mente criativa.</p>
        </div>
      )}

      {/* Modal de clarificação */}
      {clarifying && (
        <ClarifyModal item={clarifying} onClose={() => {
          remove(clarifying.id)
          setClarifying(null)
        }} />
      )}
    </div>
  )
}

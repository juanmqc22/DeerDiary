"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { Trash2, MoveRight, ArrowRight, Calendar, Plus } from "lucide-react"
import { useState } from "react"

type Tab = "capture" | "someday"
type InboxItem = { id: number; text: string; date: string }

const initialInbox: InboxItem[] = [
  { id: 1, text: "Pesquisar sobre mestrado em comunicação", date: "hoje" },
  { id: 2, text: "Ligar pra mãe no fim de semana", date: "ontem" },
  { id: 3, text: "Criar template de relatório para clientes", date: "ontem" },
  { id: 4, text: "Comprar presente de aniversário da Lia", date: "há 2 dias" },
]

const initialSomeday: InboxItem[] = [
  { id: 1, text: "Fazer um curso de fotografia", date: "Jun 2026" },
  { id: 2, text: "Aprender espanhol", date: "Mai 2026" },
  { id: 3, text: "Criar podcast sobre mídias sociais", date: "Jun 2026" },
  { id: 4, text: "Viagem ao Japão", date: "Mar 2026" },
  { id: 5, text: "Montar home office definitivo", date: "Abr 2026" },
]

const areas = ["Trabalho", "Pós-grad", "Igreja", "Casa", "Eu"]
const contexts = ["@computador", "@ligações", "@recados", "@casa", "@leitura"]

function ClarifyModal({ item, onClose }: { item: InboxItem; onClose: () => void }) {
  const [step, setStep] = useState<"actionable" | "type" | "details">("actionable")
  const [type, setType] = useState<string | null>(null)
  const [area, setArea] = useState("")
  const [context, setContext] = useState("")

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>

        <div className="mb-4 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{item.text}</p>
        </div>

        {step === "actionable" && (
          <>
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--warm-brown)" }}>
              Isso requer uma ação?
            </p>
            <div className="space-y-2">
              <button onClick={() => setStep("type")}
                className="w-full py-3 rounded-2xl text-sm font-semibold text-white"
                style={{ background: "var(--soft-orange)" }}>
                Sim, precisa de ação
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={onClose}
                  className="py-3 rounded-2xl text-sm font-medium"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  Referência
                </button>
                <button onClick={onClose}
                  className="py-3 rounded-2xl text-sm font-medium"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  Descartar
                </button>
              </div>
            </div>
          </>
        )}

        {step === "type" && (
          <>
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--warm-brown)" }}>
              É uma ação ou um projeto?
            </p>
            <div className="space-y-2">
              <button onClick={() => { setType("action"); setStep("details") }}
                className="w-full p-3.5 rounded-2xl text-left border-2"
                style={{ borderColor: "var(--soft-orange)", background: "var(--soft-orange)08" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--soft-orange)" }}>⚡ Próxima Ação</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Uma ação física e concreta</p>
              </button>
              <button onClick={() => { setType("project"); setStep("details") }}
                className="w-full p-3.5 rounded-2xl text-left border-2"
                style={{ borderColor: "var(--golden)", background: "var(--golden)08" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--golden)" }}>📁 Projeto</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Requer mais de uma ação</p>
              </button>
              <button onClick={onClose}
                className="w-full p-3.5 rounded-2xl text-left border-2"
                style={{ borderColor: "var(--card-border)", background: "var(--muted)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--muted-foreground)" }}>🌙 Algum dia</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Boa ideia, mas não agora</p>
              </button>
            </div>
          </>
        )}

        {step === "details" && (
          <>
            <p className="text-sm font-semibold mb-4" style={{ color: "var(--warm-brown)" }}>Onde e quando?</p>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Área de vida</p>
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
              {type === "action" && (
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Contexto</p>
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
              <div>
                <p className="text-xs font-medium mb-2 flex items-center gap-1"
                  style={{ color: "var(--muted-foreground)" }}>
                  <Calendar size={11} /> Data (opcional)
                </p>
                <input type="date" className="w-full text-sm p-2.5 rounded-xl outline-none"
                  style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
              </div>
              <button onClick={onClose}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "var(--sage)" }}>
                <ArrowRight size={16} /> Organizar
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
  const [tab, setTab] = useState<Tab>("capture")
  const [inbox, setInbox] = useState(initialInbox)
  const [someday, setSomeday] = useState(initialSomeday)
  const [input, setInput] = useState("")
  const [clarifying, setClarifying] = useState<InboxItem | null>(null)

  const addInbox = () => {
    if (!input.trim()) return
    setInbox(i => [{ id: Date.now(), text: input.trim(), date: "agora" }, ...i])
    setInput("")
  }

  const addSomeday = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleDateString("pt-BR", { month: "short", year: "numeric" })
    setSomeday(i => [{ id: Date.now(), text: input.trim(), date: now }, ...i])
    setInput("")
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Inbox" subtitle="Mente limpa começa aqui 🧠" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--muted)" }}>
        {([
          { id: "capture", label: `Captura ${inbox.length > 0 ? `(${inbox.length})` : ""}` },
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

      {/* Captura */}
      {tab === "capture" && (
        <div className="space-y-4">
          <Card className="p-3">
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), addInbox())}
              placeholder="O que está na sua cabeça agora?"
              className="w-full text-sm resize-none outline-none bg-transparent"
              style={{ color: "var(--foreground)", minHeight: 60 }} />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Enter para salvar</span>
              <button onClick={addInbox}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
                style={{ background: "var(--soft-orange)" }}>
                Capturar
              </button>
            </div>
          </Card>

          {inbox.length > 0 ? (
            <div className="space-y-2">
              {inbox.map(item => (
                <Card key={item.id} className="flex items-center gap-3 group">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{item.date}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button onClick={() => setClarifying(item)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: "var(--soft-orange)" }}>
                      <MoveRight size={12} /> Processar
                    </button>
                    <button onClick={() => setInbox(i => i.filter(x => x.id !== item.id))}
                      className="p-1.5 rounded-lg hover:bg-[var(--muted)] opacity-0 group-hover:opacity-100 transition-all"
                      style={{ color: "var(--dusty-rose)" }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">🌿</p>
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>Inbox limpo!</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Mente livre é mente criativa.</p>
            </div>
          )}
        </div>
      )}

      {/* Algum dia */}
      {tab === "someday" && (
        <div className="space-y-4">
          <Card className="p-3">
            <div className="flex gap-2 items-center">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addSomeday()}
                placeholder="Uma ideia, um sonho, algo para o futuro..."
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "var(--foreground)" }} />
              <button onClick={addSomeday}
                className="p-2 rounded-xl text-white flex-shrink-0"
                style={{ background: "var(--lavender)" }}>
                <Plus size={15} />
              </button>
            </div>
          </Card>

          <div className="space-y-2">
            {someday.map(item => (
              <Card key={item.id} className="flex items-center gap-3 group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{item.date}</p>
                </div>
                <button onClick={() => setSomeday(i => i.filter(x => x.id !== item.id))}
                  className="p-1.5 rounded-lg hover:bg-[var(--muted)] opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                  style={{ color: "var(--dusty-rose)" }}>
                  <Trash2 size={13} />
                </button>
              </Card>
            ))}
          </div>

          <p className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
            💡 Revise na revisão de domingo
          </p>
        </div>
      )}

      {clarifying && (
        <ClarifyModal item={clarifying} onClose={() => {
          setInbox(i => i.filter(x => x.id !== clarifying.id))
          setClarifying(null)
        }} />
      )}
    </div>
  )
}

"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/layout/page-header"
import { Trash2, MoveRight, ArrowRight, Calendar } from "lucide-react"
import { useState } from "react"
import { useInbox } from "@/hooks/use-inbox"
import { useSomeday } from "@/hooks/use-someday"
import { createClient } from "@/lib/supabase/client"

const areas = ["Trabalho", "Pós-grad", "Igreja", "Casa", "Eu"]
const contexts = ["@computador", "@ligações", "@recados", "@casa", "@leitura"]

type Outcome = "action" | "project" | "someday" | "reference" | "trash" | null

function ClarifyModal({ text, onClose }: { text: string; onClose: (outcome: Outcome) => void }) {
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
          <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{text}</p>
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
                <button onClick={() => onClose("reference")}
                  className="py-3 rounded-2xl text-sm font-medium"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  📁 Referência
                </button>
                <button onClick={() => onClose("trash")}
                  className="py-3 rounded-2xl text-sm font-medium"
                  style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
                  🗑️ Descartar
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
              <button onClick={() => onClose("someday")}
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
                      }}>{a}</button>
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
                        }}>{c}</button>
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
              <button onClick={() => onClose(type === "action" ? "action" : "project")}
                className="w-full py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
                style={{ background: "var(--sage)" }}>
                <ArrowRight size={16} /> Organizar
              </button>
            </div>
          </>
        )}

        <button onClick={() => onClose(null)} className="w-full mt-3 py-2 text-xs"
          style={{ color: "var(--muted-foreground)" }}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

const outcomeMessages: Record<string, string> = {
  action: "✅ Adicionado às próximas ações",
  project: "📁 Adicionado aos projetos",
  someday: "🌙 Guardado em Algum dia",
  reference: "📎 Arquivado como referência",
  trash: "🗑️ Descartado",
}

export default function InboxPage() {
  const { items, loading, add, remove } = useInbox()
  const { add: addSomeday } = useSomeday()
  const [input, setInput] = useState("")
  const [clarifyingId, setClarifyingId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const supabase = createClient()

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = async () => {
    if (!input.trim()) return
    await add(input.trim())
    setInput("")
  }

  const handleProcessed = async (outcome: Outcome) => {
    const item = items.find(i => i.id === clarifyingId)
    if (!item || outcome === null) { setClarifyingId(null); return }

    if (outcome === "someday") {
      await addSomeday(item.text)
    } else if (outcome === "action") {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("tasks").insert({
          title: item.text, user_id: user.id,
          context: "@computador", area: "Trabalho", area_color: "var(--lavender)",
        })
      }
    }

    await remove(item.id)
    showToast(outcomeMessages[outcome])
    setClarifyingId(null)
  }

  const clarifyingItem = items.find(i => i.id === clarifyingId)

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    const now = new Date()
    const diff = Math.floor((now.getTime() - d.getTime()) / 86400000)
    if (diff === 0) return "hoje"
    if (diff === 1) return "ontem"
    return `há ${diff} dias`
  }

  return (
    <div className="space-y-5">
      <PageHeader title="Inbox" subtitle="Capture tudo, decida depois 🧠" />

      <Card className="p-3">
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleAdd())}
          placeholder="O que está na sua cabeça agora?"
          className="w-full text-sm resize-none outline-none bg-transparent"
          style={{ color: "var(--foreground)", minHeight: 60 }} />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Enter para salvar</span>
          <button onClick={handleAdd}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-white"
            style={{ background: "var(--soft-orange)" }}>
            Capturar
          </button>
        </div>
      </Card>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Carregando...</p>
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-2">
          {items.map(item => (
            <Card key={item.id} className="flex items-center gap-3 group">
              <div className="flex-1 min-w-0">
                <p className="text-sm" style={{ color: "var(--foreground)" }}>{item.text}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  {formatDate(item.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={() => setClarifyingId(item.id)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white"
                  style={{ background: "var(--soft-orange)" }}>
                  <MoveRight size={12} /> Processar
                </button>
                <button onClick={() => remove(item.id)}
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

      {clarifyingId && clarifyingItem && (
        <ClarifyModal text={clarifyingItem.text} onClose={handleProcessed} />
      )}

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl text-sm font-medium text-white shadow-lg"
          style={{ background: "var(--warm-brown)", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  )
}

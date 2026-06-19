"use client"

import { Card } from "@/components/ui/card"
import { GrowingPlant } from "@/components/ui/growing-plant"
import { CheckCircle2, Circle, ChevronRight } from "lucide-react"
import { useState } from "react"

const steps = [
  { id: "feel", label: "Como você está?" },
  { id: "done", label: "O que foi feito" },
  { id: "open", label: "O que ficou em aberto" },
  { id: "week", label: "A semana que vem" },
  { id: "couple", label: "Nós dois" },
  { id: "spirit", label: "Espiritualidade" },
  { id: "close", label: "Fechamento" },
]

const moods = [
  { emoji: "😴", label: "Cansada" },
  { emoji: "😐", label: "Ok" },
  { emoji: "🙂", label: "Bem" },
  { emoji: "😊", label: "Ótima" },
  { emoji: "🤩", label: "Incrível" },
]

const openTasks = [
  { id: 1, title: "Pesquisar programas de pós-grad", dim: "Pós-grad", color: "var(--golden)" },
  { id: 2, title: "Enviar relatório de mídia", dim: "Trabalho", color: "var(--lavender)" },
  { id: 3, title: "Compras da semana", dim: "Casa", color: "var(--dusty-rose)" },
]

export default function ReviewPage() {
  const [step, setStep] = useState(0)
  const [mood, setMood] = useState<number | null>(null)
  const [feelText, setFeelText] = useState("")
  const [openChecked, setOpenChecked] = useState<number[]>([])
  const [nextWeek, setNextWeek] = useState("")
  const [coupleText, setCoupleText] = useState("")
  const [spiritText, setSpiritText] = useState("")

  const current = steps[step]
  const isLast = step === steps.length - 1
  const progress = ((step) / (steps.length - 1)) * 100

  const next = () => { if (step < steps.length - 1) setStep(s => s + 1) }
  const prev = () => { if (step > 0) setStep(s => s - 1) }

  const toggleOpen = (id: number) =>
    setOpenChecked(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])

  const today = new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })

  return (
    <div className="max-w-xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-6 text-center">
        <p className="text-sm capitalize" style={{ color: "var(--muted-foreground)" }}>{today}</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-1" style={{ color: "var(--warm-brown)" }}>
          Revisão de Domingo 🕊️
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Um momento só seu. Com calma. 🌿
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-1 mb-8 px-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1">
            <button
              onClick={() => setStep(i)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0"
              style={{
                background: i < step ? "var(--sage)" : i === step ? "var(--soft-orange)" : "var(--muted)",
                color: i <= step ? "white" : "var(--muted-foreground)",
              }}>
              {i < step ? "✓" : i + 1}
            </button>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-1 rounded-full"
                style={{ background: i < step ? "var(--sage)" : "var(--muted)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <Card className="mb-4 min-h-64">
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--warm-brown)" }}>
          {current.label}
        </h2>

        {/* Como você está */}
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-around">
              {moods.map((m, i) => (
                <button key={i} onClick={() => setMood(i)}
                  className="flex flex-col items-center gap-1 p-3 rounded-2xl transition-all"
                  style={{ background: mood === i ? "var(--muted)" : "transparent", transform: mood === i ? "scale(1.15)" : "scale(1)" }}>
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{m.label}</span>
                </button>
              ))}
            </div>
            <textarea value={feelText} onChange={e => setFeelText(e.target.value)}
              placeholder="Conta mais... como foi essa semana pra você? 💛"
              className="w-full text-sm resize-none outline-none bg-transparent p-3 rounded-xl"
              style={{ color: "var(--foreground)", minHeight: 80, background: "var(--muted)" }} />
          </div>
        )}

        {/* O que foi feito */}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Esta semana você concluiu estas tarefas 🎉
            </p>
            {[
              { title: "Preparar aula dominical", dim: "Igreja", color: "var(--sage)" },
              { title: "Reunião com cliente", dim: "Trabalho", color: "var(--lavender)" },
              { title: "Organizar documentos", dim: "Casa", color: "var(--dusty-rose)" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                <CheckCircle2 size={17} style={{ color: "var(--sage)" }} />
                <span className="text-sm flex-1" style={{ color: "var(--foreground)" }}>{t.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: t.color + "22", color: t.color }}>{t.dim}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 p-3 rounded-2xl text-center justify-center"
              style={{ background: "var(--sage)" + "15" }}>
              <GrowingPlant progress={65} color="#7a9e7e" size={48} />
              <div className="text-left">
                <p className="text-sm font-semibold" style={{ color: "var(--sage)" }}>3 tarefas concluídas!</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Sua plantinha cresceu 🌿</p>
              </div>
            </div>
          </div>
        )}

        {/* O que ficou em aberto */}
        {step === 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Marque o que vai para a próxima semana:
            </p>
            {openTasks.map(t => (
              <button key={t.id} onClick={() => toggleOpen(t.id)}
                className="flex items-center gap-3 p-3 rounded-xl text-left w-full transition-all"
                style={{ background: openChecked.includes(t.id) ? "var(--muted)" : "transparent", border: "1px solid var(--card-border)" }}>
                {openChecked.includes(t.id)
                  ? <CheckCircle2 size={17} style={{ color: "var(--soft-orange)" }} />
                  : <Circle size={17} style={{ color: "var(--card-border)" }} />
                }
                <span className="text-sm flex-1" style={{ color: "var(--foreground)" }}>{t.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: t.color + "22", color: t.color }}>{t.dim}</span>
              </button>
            ))}
          </div>
        )}

        {/* A semana que vem */}
        {step === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Qual é a sua intenção para a semana que vem?
            </p>
            <textarea value={nextWeek} onChange={e => setNextWeek(e.target.value)}
              placeholder="Ex: Quero avançar na pesquisa da pós e ter pelo menos um dia de descanso de verdade..."
              className="w-full text-sm resize-none outline-none bg-transparent p-3 rounded-xl"
              style={{ color: "var(--foreground)", minHeight: 100, background: "var(--muted)" }} />
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              💡 Foque em no máximo 3 prioridades
            </p>
          </div>
        )}

        {/* Nós dois */}
        {step === 4 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Como você quer que o Juan te apoie essa semana?
            </p>
            <textarea value={coupleText} onChange={e => setCoupleText(e.target.value)}
              placeholder="Me conta o que você precisa... 💛"
              className="w-full text-sm resize-none outline-none bg-transparent p-3 rounded-xl"
              style={{ color: "var(--foreground)", minHeight: 80, background: "var(--muted)" }} />
            <div className="p-3 rounded-xl" style={{ background: "var(--dusty-rose)" + "15" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--dusty-rose)" }}>
                💌 Mensagem do Juan esta semana:
              </p>
              <p className="text-sm italic" style={{ color: "var(--foreground)" }}>
                "Estou aqui por você. Orgulho de tudo que você está construindo."
              </p>
            </div>
          </div>
        )}

        {/* Espiritualidade */}
        {step === 5 && (
          <div className="flex flex-col gap-4">
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Como foi sua semana espiritualmente?
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Escrituras", "Oração", "Templo", "Serviço"].map(item => (
                <button key={item}
                  className="p-3 rounded-xl text-sm font-medium text-center transition-all hover:opacity-80"
                  style={{ background: "var(--sage)" + "20", color: "var(--sage)", border: "1px solid " + "var(--sage)" + "40" }}>
                  {item}
                </button>
              ))}
            </div>
            <textarea value={spiritText} onChange={e => setSpiritText(e.target.value)}
              placeholder="Reflexão da semana... o que sentiu, aprendeu ou quer trabalhar 🕊️"
              className="w-full text-sm resize-none outline-none bg-transparent p-3 rounded-xl"
              style={{ color: "var(--foreground)", minHeight: 80, background: "var(--muted)" }} />
          </div>
        )}

        {/* Fechamento */}
        {step === 6 && (
          <div className="flex flex-col items-center gap-4 py-4">
            <GrowingPlant progress={75} color="#7a9e7e" size={100} />
            <div className="text-center">
              <p className="text-xl font-bold" style={{ color: "var(--warm-brown)" }}>
                Revisão completa! 🎉
              </p>
              <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
                Você cuidou de si mesma hoje, Baby.<br />
                A semana já começou bem. 🌿
              </p>
            </div>
            <div className="w-full p-4 rounded-2xl text-center"
              style={{ background: "linear-gradient(135deg, var(--soft-orange)20, var(--golden)20)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--warm-brown)" }}>
                Streak de revisão dominical: 🔥 3 semanas seguidas
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Navegação */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={prev}
            className="flex-1 py-3 rounded-2xl text-sm font-medium transition-all hover:opacity-80"
            style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}>
            Voltar
          </button>
        )}
        <button onClick={isLast ? undefined : next}
          className="flex-1 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
          style={{ background: isLast ? "var(--sage)" : "var(--soft-orange)" }}>
          {isLast ? "Fechar revisão ✨" : <>Próximo <ChevronRight size={16} /></>}
        </button>
      </div>
    </div>
  )
}

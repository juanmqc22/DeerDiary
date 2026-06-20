"use client"

import { useState, useEffect } from "react"
import { GrowingPlant } from "@/components/ui/growing-plant"

const STORAGE_KEY = "deardiary_onboarded"

const slides = [
  {
    id: "welcome",
    emoji: null,
    plant: null,
    title: "Baby,\neste app é seu. 🌸",
    body: "Eu sei que a sua mente não para nunca — mil ideias, mil compromissos, mil coisas importantes. Criei esse espaço especialmente para você organizar tudo isso com calma, sem stress, do seu jeito.",
    cta: "Me conta mais →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #f5e0c8 100%)",
  },
  {
    id: "inbox",
    emoji: "🧠",
    plant: null,
    title: "Primeiro: esvazie a cabeça.",
    body: "Tudo que estiver rondando na sua mente — uma tarefa, uma ideia, uma preocupação — joga no Inbox. Sem julgamento, sem organizar agora. Só captura.\n\nDepois você decide o que fazer com cada coisa.",
    cta: "Entendi →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #e8f5ea 100%)",
    highlight: { label: "Inbox", icon: "📥" },
  },
  {
    id: "process",
    emoji: "⚡",
    plant: null,
    title: "Depois, processe com calma.",
    body: "Cada item do Inbox vai ter um destino: virar uma ação, entrar num projeto, ir pra lista de \"algum dia\", ou simplesmente ser arquivado.\n\nO botão \"Processar\" te guia passo a passo. É o GTD simplificado.",
    cta: "Continua →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #fef3e2 100%)",
  },
  {
    id: "tasks",
    emoji: "✅",
    plant: null,
    title: "Suas tarefas, no contexto certo.",
    body: "Em Tarefas você vê tudo organizado por contexto — o que fazer no computador, o que ligar, o que resolver em casa.\n\nIsso evita aquela sensação de olhar pra lista e não saber por onde começar.",
    cta: "Que bacana →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #f0eaf8 100%)",
    highlight: { label: "@computador · @ligações · @recados", icon: "🏷️" },
  },
  {
    id: "us",
    emoji: "🤍",
    plant: null,
    title: "E o que é nosso, é nosso.",
    body: "A aba Nós é do casal — tarefas compartilhadas, finanças juntos e um diário de memórias.\n\nAs contas ficam organizadas por categoria, com orçamento e metas de poupança. E o diário é pra guardar os momentos bons.",
    cta: "Amei →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #fde8e8 100%)",
  },
  {
    id: "goals",
    emoji: null,
    plant: { progress: 85, color: "#e8845a" },
    title: "Suas metas crescem de verdade.",
    body: "Cada meta que você define vira uma plantinha. Conforme você avança, ela cresce — de semente até florescer.\n\nÉ a ideia do Hay Day que você adora, mas aplicada à sua vida real. 🌱",
    cta: "Isso é lindo →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #e8f5ea 100%)",
  },
  {
    id: "sunday",
    emoji: "🕊️",
    plant: null,
    title: "Todo domingo, um momento seu.",
    body: "A Revisão de Domingo está no seu calendário, toda semana. É um momento tranquilo pra olhar pra trás, reorganizar o que ficou em aberto e preparar a semana com intenção.\n\nSem pressa. Com calma.",
    cta: "Faz sentido →",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #e8f5ea 100%)",
  },
  {
    id: "final",
    emoji: null,
    plant: { progress: 100, color: "#c97d7d" },
    title: "Agora é teu, Baby. 💛",
    body: "Este app foi feito com amor, pensando em você — na sua rotina, nas suas metas, na nossa vida juntos.\n\nEspero que ele te ajude a ter mais clareza, mais leveza e mais tempo pra viver o que importa.",
    cta: "Vamos começar 🌸",
    bg: "linear-gradient(160deg, #fdf6ee 0%, #f5e0c8 100%)",
    final: true,
  },
]

export function Onboarding({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [exiting, setExiting] = useState(false)

  const slide = slides[step]
  const isLast = step === slides.length - 1

  const advance = () => {
    if (isLast) {
      setExiting(true)
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, "1")
        onDone()
      }, 350)
    } else {
      setStep(s => s + 1)
    }
  }

  const skip = () => {
    localStorage.setItem(STORAGE_KEY, "1")
    onDone()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background: slide.bg,
        transition: "background 0.5s ease",
        opacity: exiting ? 0 : 1,
      }}>

      {/* Progress dots */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <div key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                background: i === step ? "var(--warm-brown)" : "var(--card-border)",
              }} />
          ))}
        </div>
        <button onClick={skip} className="text-xs px-3 py-1.5 rounded-full"
          style={{ color: "var(--muted-foreground)", background: "rgba(255,255,255,0.5)" }}>
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center"
        key={step}
        style={{ animation: "fadeIn 0.4s ease forwards" }}>

        {/* Visual */}
        <div className="mb-8 flex items-center justify-center" style={{ minHeight: 120 }}>
          {slide.emoji && (
            <span style={{ fontSize: 72, lineHeight: 1 }}>{slide.emoji}</span>
          )}
          {slide.plant && (
            <div style={{ transform: "scale(1.6)" }}>
              <GrowingPlant progress={slide.plant.progress} color={slide.plant.color} size={80} />
            </div>
          )}
          {!slide.emoji && !slide.plant && (
            <svg width="80" height="80" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="14" fill="#8b5e3c" />
              <path d="M20 31 C20 31 9 23 9 16 C9 11.8 12.2 9 16 9 C18 9 19.7 9.9 20 10.8 C20.3 9.9 22 9 24 9 C27.8 9 31 11.8 31 16 C31 23 20 31 20 31Z"
                fill="white" opacity="0.92" />
            </svg>
          )}
        </div>

        {/* Highlight chip */}
        {slide.highlight && (
          <div className="mb-4 px-4 py-2 rounded-2xl text-sm font-semibold"
            style={{ background: "rgba(255,255,255,0.7)", color: "var(--warm-brown)" }}>
            {slide.highlight.icon} {slide.highlight.label}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 whitespace-pre-line leading-snug"
          style={{ color: "var(--warm-brown)" }}>
          {slide.title}
        </h2>

        {/* Body */}
        <p className="text-sm leading-relaxed max-w-xs whitespace-pre-line"
          style={{ color: "var(--muted-foreground)" }}>
          {slide.body}
        </p>
      </div>

      {/* CTA */}
      <div className="px-8 pb-10">
        <button
          onClick={advance}
          className="w-full py-4 rounded-2xl text-base font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, var(--warm-brown), var(--soft-orange))" }}>
          {slide.cta}
        </button>

        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)}
            className="w-full mt-3 py-2 text-xs"
            style={{ color: "var(--muted-foreground)" }}>
            ← Voltar
          </button>
        )}
      </div>
    </div>
  )
}

export function useOnboarding() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY)
    if (!done) setShow(true)
  }, [])

  return { show, done: () => setShow(false) }
}

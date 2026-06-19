"use client"

import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

const sampleEvents: Record<number, { title: string; color: string; who: string }[]> = {
  5:  [{ title: "Reunião de estratégia", color: "var(--lavender)", who: "B" }],
  10: [{ title: "Consulta médica", color: "var(--dusty-rose)", who: "B" }, { title: "Futebol", color: "var(--sky-blue)", who: "J" }],
  15: [{ title: "Culto", color: "var(--sage)", who: "BJ" }],
  19: [{ title: "Aniversário da amiga", color: "var(--dusty-rose)", who: "B" }],
  22: [{ title: "Reunião de casal", color: "var(--golden)", who: "BJ" }],
  28: [{ title: "Entrega de projeto", color: "var(--lavender)", who: "B" }],
}

export default function CalendarPage() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selected, setSelected] = useState<number | null>(now.getDate())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const next = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedEvents = selected ? (sampleEvents[selected] ?? []) : []

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--warm-brown)" }}>Calendário</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Tudo no mesmo lugar, para os dois 📅</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
          style={{ background: "var(--soft-orange)" }}>
          <Plus size={16} /> Novo evento
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendário principal */}
        <div className="col-span-2">
          <Card>
            {/* Header do mês */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prev} className="p-1 rounded-lg hover:bg-[var(--muted)] transition-colors">
                <ChevronLeft size={20} style={{ color: "var(--muted-foreground)" }} />
              </button>
              <h2 className="font-semibold" style={{ color: "var(--warm-brown)" }}>
                {MONTHS[month]} {year}
              </h2>
              <button onClick={next} className="p-1 rounded-lg hover:bg-[var(--muted)] transition-colors">
                <ChevronRight size={20} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>

            {/* Dias da semana */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold py-1"
                  style={{ color: "var(--muted-foreground)" }}>{d}</div>
              ))}
            </div>

            {/* Células */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />
                const hasEvents = !!sampleEvents[day]
                const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
                const isSelected = day === selected

                return (
                  <button
                    key={day}
                    onClick={() => setSelected(day)}
                    className="aspect-square flex flex-col items-center justify-start pt-1 rounded-xl transition-all text-sm relative"
                    style={{
                      background: isSelected ? "var(--soft-orange)" : isToday ? "var(--muted)" : "transparent",
                      color: isSelected ? "white" : "var(--foreground)",
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {day}
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {sampleEvents[day].slice(0, 3).map((ev, idx) => (
                          <div key={idx} className="w-1 h-1 rounded-full"
                            style={{ background: isSelected ? "white" : ev.color }} />
                        ))}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Legenda */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {[
              { label: "Baby", color: "var(--dusty-rose)" },
              { label: "Juan", color: "var(--sky-blue)" },
              { label: "Casal", color: "var(--golden)" },
              { label: "Igreja", color: "var(--sage)" },
              { label: "Trabalho", color: "var(--lavender)" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Painel lateral do dia */}
        <div>
          <h2 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            {selected ? `Dia ${selected}` : "Selecione um dia"}
          </h2>
          {selectedEvents.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-2xl mb-2">🌿</p>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Dia livre! Que bênção.</p>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedEvents.map((ev, i) => (
                <Card key={i} className="border-l-4" style={{ borderLeftColor: ev.color }}>
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{ev.title}</p>
                    <div className="flex gap-1 ml-2">
                      {ev.who.includes("B") && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--dusty-rose)" }}>B</div>
                      )}
                      {ev.who.includes("J") && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--sky-blue)" }}>J</div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Próximos eventos */}
          <h2 className="text-sm font-semibold mb-3 mt-6 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
            Próximos eventos
          </h2>
          <div className="flex flex-col gap-2">
            {[
              { day: 15, title: "Culto", color: "var(--sage)" },
              { day: 22, title: "Reunião de casal", color: "var(--golden)" },
              { day: 28, title: "Entrega de projeto", color: "var(--lavender)" },
            ].map(ev => (
              <div key={ev.day} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--muted)] transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: ev.color }}>
                  {ev.day}
                </div>
                <span className="text-sm" style={{ color: "var(--foreground)" }}>{ev.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

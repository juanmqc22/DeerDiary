"use client"

import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus, X, Trash2 } from "lucide-react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useCalendarEvents } from "@/hooks/use-calendar-events"

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]

const EVENT_COLORS = [
  { label: "Trabalho", color: "var(--lavender)" },
  { label: "Casal", color: "var(--golden)" },
  { label: "Igreja", color: "var(--sage)" },
  { label: "Baby", color: "var(--dusty-rose)" },
  { label: "Juan", color: "var(--sky-blue)" },
  { label: "Saúde", color: "var(--soft-orange)" },
]

const REVIEW_EVENT = { id: "__review__", title: "Revisão de domingo 🕊️", color: "var(--sage)", who: "BJ", isReview: true, event_time: null, event_date: "", created_at: "" }

function AddEventModal({ defaultDate, onClose, onAdd }: {
  defaultDate: string
  onClose: () => void
  onAdd: (title: string, date: string, time: string | null, color: string, who: string) => void
}) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(defaultDate)
  const [time, setTime] = useState("")
  const [color, setColor] = useState("var(--lavender)")
  const [who, setWho] = useState("BJ")

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-sm rounded-3xl p-5 animate-grow"
        style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-base font-bold" style={{ color: "var(--warm-brown)" }}>Novo evento</p>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--muted)]"
            style={{ color: "var(--muted-foreground)" }}><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)}
            placeholder="Nome do evento" autoFocus
            className="w-full text-sm p-3 rounded-xl outline-none"
            style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Data</p>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl outline-none"
                style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
            </div>
            <div>
              <p className="text-xs font-medium mb-1.5" style={{ color: "var(--muted-foreground)" }}>Horário (opcional)</p>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl outline-none"
                style={{ background: "var(--muted)", color: "var(--foreground)", border: "none" }} />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Cor / categoria</p>
            <div className="flex flex-wrap gap-2">
              {EVENT_COLORS.map(({ label, color: c }) => (
                <button key={c} onClick={() => setColor(c)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all"
                  style={{
                    background: color === c ? c : "var(--muted)",
                    color: color === c ? "white" : "var(--muted-foreground)",
                  }}>{label}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Para quem</p>
            <div className="flex gap-2">
              {["B", "J", "BJ"].map(w => (
                <button key={w} onClick={() => setWho(w)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
                  style={{ background: who === w ? "var(--warm-brown)" : "var(--muted)", color: who === w ? "white" : "var(--muted-foreground)" }}>
                  {w === "BJ" ? "Casal" : w}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => { if (title.trim() && date) { onAdd(title.trim(), date, time || null, color, who); onClose() } }}
            disabled={!title.trim() || !date}
            className="w-full py-3 rounded-2xl text-sm font-bold text-white disabled:opacity-40"
            style={{ background: "var(--soft-orange)" }}>
            Criar evento
          </button>
        </div>
      </div>
    </div>
  )
}



export default function CalendarPage() {
  const router = useRouter()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [selected, setSelected] = useState<number | null>(now.getDate())
  const [addingEvent, setAddingEvent] = useState(false)

  const { events: dbEvents, loading, add, remove } = useCalendarEvents(month, year)

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  // Build day map with Sunday reviews injected
  const eventsByDay = useMemo(() => {
    const map: Record<number, typeof REVIEW_EVENT[]> = {}
    for (let d = 1; d <= daysInMonth; d++) {
      const dow = new Date(year, month, d).getDay()
      if (dow === 0) map[d] = [{ ...REVIEW_EVENT, event_date: `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}` }]
    }
    dbEvents.forEach(ev => {
      const d = parseInt(ev.event_date.slice(8, 10))
      if (!map[d]) map[d] = []
      map[d].push({ ...ev, isReview: false })
    })
    return map
  }, [dbEvents, month, year, daysInMonth])

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const selectedDateStr = selected
    ? `${year}-${String(month+1).padStart(2,"0")}-${String(selected).padStart(2,"0")}`
    : ""
  const selectedEvents = selected ? (eventsByDay[selected] ?? []) : []

  // Upcoming events (from today)
  const todayStr = now.toISOString().slice(0, 10)
  const upcomingEvents = dbEvents.filter(ev => ev.event_date >= todayStr).slice(0, 5)

  return (
    <div className="animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--warm-brown)" }}>Agenda</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>Para os dois 📅</p>
        </div>
        <button onClick={() => setAddingEvent(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-white"
          style={{ background: "var(--soft-orange)" }}>
          <Plus size={15} /> Novo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Calendário */}
        <div className="md:col-span-2">
          <Card>
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
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold py-1"
                  style={{ color: "var(--muted-foreground)" }}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (!day) return <div key={`e-${i}`} />
                const hasEvents = !!eventsByDay[day]
                const isToday = day === now.getDate() && month === now.getMonth() && year === now.getFullYear()
                const isSelected = day === selected
                return (
                  <button key={day} onClick={() => setSelected(day)}
                    className="aspect-square flex flex-col items-center justify-start pt-1 rounded-xl transition-all text-sm"
                    style={{
                      background: isSelected ? "var(--soft-orange)" : isToday ? "var(--muted)" : "transparent",
                      color: isSelected ? "white" : "var(--foreground)",
                      fontWeight: isToday ? 700 : 400,
                    }}>
                    {day}
                    {hasEvents && (
                      <div className="flex gap-0.5 mt-0.5">
                        {(eventsByDay[day] ?? []).slice(0, 3).map((ev, idx) => (
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

          <div className="flex gap-3 mt-4 flex-wrap">
            {EVENT_COLORS.map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Painel do dia */}
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
                <Card key={i} className={`border-l-4 group ${(ev as any).isReview ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
                  style={{ borderLeftColor: ev.color }}
                  onClick={(ev as any).isReview ? () => router.push("/review") : undefined}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{ev.title}</p>
                      {(ev as any).event_time && (
                        <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--muted-foreground)" }}>{(ev as any).event_time}</p>
                      )}
                      {(ev as any).isReview && (
                        <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>Toque para iniciar a revisão →</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {ev.who.includes("B") && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--dusty-rose)" }}>B</div>
                      )}
                      {ev.who.includes("J") && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ background: "var(--sky-blue)" }}>J</div>
                      )}
                      {!(ev as any).isReview && (
                        <button onClick={e => { e.stopPropagation(); remove(ev.id) }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all"
                          style={{ color: "var(--dusty-rose)" }}>
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {upcomingEvents.length > 0 && (
            <>
              <h2 className="text-sm font-semibold mb-3 mt-6 uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                Próximos eventos
              </h2>
              <div className="flex flex-col gap-2">
                {upcomingEvents.map(ev => {
                  const d = parseInt(ev.event_date.slice(8, 10))
                  return (
                    <div key={ev.id} onClick={() => setSelected(d)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--muted)] transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: ev.color }}>{d}</div>
                      <span className="text-sm" style={{ color: "var(--foreground)" }}>{ev.title}</span>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {addingEvent && (
        <AddEventModal
          defaultDate={selectedDateStr || now.toISOString().slice(0, 10)}
          onClose={() => setAddingEvent(false)}
          onAdd={(title, date, time, color, who) => add({ title, event_date: date, event_time: time, color, who })}
        />
      )}
    </div>
  )
}

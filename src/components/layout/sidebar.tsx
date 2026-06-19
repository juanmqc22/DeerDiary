"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Heart, Inbox, CheckSquare, User, TrendingUp, Sun, Menu, X } from "lucide-react"
import { useState } from "react"

const primaryNav = [
  { href: "/dashboard", icon: Home, label: "Hoje" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/tasks", icon: CheckSquare, label: "Tarefas" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
  { href: "/us", icon: Heart, label: "Nós" },
]

const secondaryNav = [
  { href: "/goals", icon: TrendingUp, label: "Metas" },
  { href: "/review", icon: Sun, label: "Revisão de domingo" },
  { href: "/profile", icon: User, label: "Perfil" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(href))

  const close = () => setDrawerOpen(false)

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-full w-[68px] flex-col items-center py-4 z-50"
        style={{ background: "var(--card)", borderRight: "1px solid var(--card-border)" }}
      >
        <Link href="/" className="mb-5">
          <DearIcon />
        </Link>

        <nav className="flex flex-col gap-0.5 w-full px-2 flex-1">
          {primaryNav.map(({ href, icon: Icon, label }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all text-center"
                style={active
                  ? { background: "var(--soft-orange)", color: "white" }
                  : { color: "var(--muted-foreground)" }
                }>
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[9px] font-semibold">{label}</span>
              </Link>
            )
          })}

          <div className="my-2 mx-3 h-px" style={{ background: "var(--card-border)" }} />

          {secondaryNav.map(({ href, icon: Icon, label }) => {
            const active = isActive(href)
            return (
              <Link key={href} href={href}
                className="flex flex-col items-center gap-1 py-2 rounded-xl transition-all text-center hover:bg-[var(--muted)]"
                style={{ color: active ? "var(--warm-brown)" : "var(--muted-foreground)" }}>
                <Icon size={15} strokeWidth={1.8} />
                <span className="text-[8px] font-medium">{label.split(" ")[0]}</span>
              </Link>
            )
          })}
        </nav>

        <Link href="/profile" className="pb-2">
          <div className="flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
              style={{ background: "var(--dusty-rose)" }}>B</div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
              style={{ background: "var(--sky-blue)" }}>J</div>
          </div>
        </Link>
      </aside>

      {/* ── Mobile top header ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
        style={{
          background: "rgba(253,246,238,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--card-border)",
        }}>
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-xl hover:bg-[var(--muted)] transition-colors"
          style={{ color: "var(--warm-brown)" }}>
          <Menu size={22} />
        </button>
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <DearIcon size={28} />
        </Link>
        <Link href="/profile">
          <div className="flex -space-x-1.5">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
              style={{ background: "var(--dusty-rose)" }}>B</div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
              style={{ background: "var(--sky-blue)" }}>J</div>
          </div>
        </Link>
      </header>

      {/* ── Mobile slide-in drawer ── */}
      {drawerOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
            onClick={close}
          />
          <aside
            className="md:hidden fixed left-0 top-0 h-full z-[60] flex flex-col py-6"
            style={{
              width: 260,
              background: "var(--card)",
              borderRight: "1px solid var(--card-border)",
              animation: "slideInLeft 0.2s ease",
            }}>

            <div className="flex items-center justify-between px-5 mb-6">
              <div className="flex items-center gap-2.5">
                <DearIcon size={28} />
                <span className="text-lg font-bold" style={{ color: "var(--warm-brown)" }}>DearDiary</span>
              </div>
              <button onClick={close} className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
                style={{ color: "var(--muted-foreground)" }}>
                <X size={18} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
              {primaryNav.map(({ href, icon: Icon, label }) => {
                const active = isActive(href)
                return (
                  <Link key={href} href={href} onClick={close}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                    style={active
                      ? { background: "var(--soft-orange)", color: "white" }
                      : { color: "var(--foreground)" }
                    }>
                    <Icon size={19} strokeWidth={active ? 2.5 : 1.8} />
                    <span className="text-sm font-semibold">{label}</span>
                  </Link>
                )
              })}

              <div className="my-3 mx-1 h-px" style={{ background: "var(--card-border)" }} />

              {secondaryNav.map(({ href, icon: Icon, label }) => {
                const active = isActive(href)
                return (
                  <Link key={href} href={href} onClick={close}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-[var(--muted)]"
                    style={{ color: active ? "var(--warm-brown)" : "var(--muted-foreground)" }}>
                    <Icon size={17} strokeWidth={1.8} />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="px-5 pt-4 border-t" style={{ borderColor: "var(--card-border)" }}>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                Revisão de domingo no calendário 🕊️
              </p>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

function DearIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
      <ellipse cx="36" cy="46" rx="14" ry="10" fill="#8b5e3c" opacity="0.85" />
      <circle cx="36" cy="30" r="10" fill="#8b5e3c" opacity="0.85" />
      <ellipse cx="27" cy="23" rx="4" ry="6" fill="#8b5e3c" opacity="0.7" transform="rotate(-15 27 23)" />
      <ellipse cx="45" cy="23" rx="4" ry="6" fill="#8b5e3c" opacity="0.7" transform="rotate(15 45 23)" />
      <path d="M29 18 Q26 12 22 8 M26 12 Q23 10 20 12" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M43 18 Q46 12 50 8 M46 12 Q49 10 52 12" stroke="#8b5e3c" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <circle cx="32" cy="29" r="2" fill="#3d2c1e" />
      <circle cx="40" cy="29" r="2" fill="#3d2c1e" />
      <circle cx="32.6" cy="28.4" r="0.7" fill="white" />
      <circle cx="40.6" cy="28.4" r="0.7" fill="white" />
    </svg>
  )
}

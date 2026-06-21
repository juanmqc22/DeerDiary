"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Heart, Inbox, CheckSquare, User, TrendingUp, Sun, Menu, X } from "lucide-react"
import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"

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
  const { identity } = useCurrentUser()

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
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ${identity?.who === "baby" ? "ring-[var(--warm-brown)]" : "ring-white"}`}
              style={{ background: "var(--dusty-rose)", opacity: identity && identity.who !== "baby" ? 0.45 : 1 }}>B</div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ${identity?.who === "juan" ? "ring-[var(--warm-brown)]" : "ring-white"}`}
              style={{ background: "var(--sky-blue)", opacity: identity && identity.who !== "juan" ? 0.45 : 1 }}>J</div>
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
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ${identity?.who === "baby" ? "ring-[var(--warm-brown)]" : "ring-white"}`}
              style={{ background: "var(--dusty-rose)", opacity: identity && identity.who !== "baby" ? 0.45 : 1 }}>B</div>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ${identity?.who === "juan" ? "ring-[var(--warm-brown)]" : "ring-white"}`}
              style={{ background: "var(--sky-blue)", opacity: identity && identity.who !== "juan" ? 0.45 : 1 }}>J</div>
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
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="12" fill="#8b5e3c" />
      <path d="M20 29 C20 29 10 22 10 16 C10 12.5 13 10 16.5 10 C18.2 10 19.7 10.8 20 11.5 C20.3 10.8 21.8 10 23.5 10 C27 10 30 12.5 30 16 C30 22 20 29 20 29Z"
        fill="white" opacity="0.92" />
    </svg>
  )
}

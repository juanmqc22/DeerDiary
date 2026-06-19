"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home, Calendar, Heart, Inbox, Zap,
  FolderOpen, Moon, Sun, User, TrendingUp, MoreHorizontal
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const primaryNav = [
  { href: "/dashboard", icon: Home, label: "Hoje" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/next-actions", icon: Zap, label: "Ações" },
  { href: "/projects", icon: FolderOpen, label: "Projetos" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
]

const secondaryNav = [
  { href: "/us", icon: Heart, label: "Nós" },
  { href: "/goals", icon: TrendingUp, label: "Metas" },
  { href: "/someday", icon: Moon, label: "Algum dia" },
  { href: "/review", icon: Sun, label: "Domingo" },
  { href: "/profile", icon: User, label: "Perfil" },
]

const mobileNav = [
  { href: "/dashboard", icon: Home, label: "Hoje" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/next-actions", icon: Zap, label: "Ações" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
  { href: "/us", icon: Heart, label: "Nós" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-full w-[68px] flex-col items-center py-4 z-50"
        style={{ background: "var(--card)", borderRight: "1px solid var(--card-border)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center mb-5 group">
          <DearIcon />
        </Link>

        {/* Navegação primária */}
        <nav className="flex flex-col gap-0.5 w-full px-2 flex-1">
          {primaryNav.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl transition-all text-center"
                style={
                  active
                    ? { background: "var(--soft-orange)", color: "white" }
                    : { color: "var(--muted-foreground)" }
                }
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
                <span className="text-[9px] font-semibold leading-none">{label}</span>
              </Link>
            )
          })}

          {/* Divisor */}
          <div className="my-2 mx-3 h-px" style={{ background: "var(--card-border)" }} />

          {/* Navegação secundária */}
          {secondaryNav.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 py-2 rounded-xl transition-all text-center hover:bg-[var(--muted)]"
                style={
                  active
                    ? { color: "var(--warm-brown)", background: "var(--muted)" }
                    : { color: "var(--muted-foreground)" }
                }
              >
                <Icon size={15} strokeWidth={1.8} />
                <span className="text-[8px] font-medium leading-none">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Avatar casal */}
        <div className="flex -space-x-1.5 pb-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
            style={{ background: "var(--dusty-rose)" }}
          >B</div>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white"
            style={{ background: "var(--sky-blue)" }}
          >J</div>
        </div>
      </aside>

      {/* ── Mobile bottom nav ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around"
        style={{
          background: "rgba(253,246,238,0.97)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid var(--card-border)",
          paddingTop: 8,
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
        }}
      >
        {mobileNav.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 px-3 py-0.5 rounded-xl transition-all"
              style={{ color: active ? "var(--soft-orange)" : "var(--muted-foreground)" }}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          )
        })}

        {/* Botão "Mais" */}
        <button
          onClick={() => setMoreOpen(o => !o)}
          className="flex flex-col items-center gap-1 px-3 py-0.5 rounded-xl transition-all"
          style={{ color: moreOpen ? "var(--soft-orange)" : "var(--muted-foreground)" }}
        >
          <MoreHorizontal size={22} strokeWidth={1.8} />
          <span className="text-[10px] font-semibold">Mais</span>
        </button>
      </nav>

      {/* Drawer "Mais" no mobile */}
      {moreOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-40"
            onClick={() => setMoreOpen(false)}
          />
          <div
            className="md:hidden fixed bottom-[68px] right-3 z-50 rounded-2xl p-2 shadow-lg min-w-[160px]"
            style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
          >
            {secondaryNav.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMoreOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
                style={{ color: pathname === href ? "var(--soft-orange)" : "var(--foreground)" }}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

function DearIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 72 72" fill="none">
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

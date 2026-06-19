"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Heart, Inbox, TrendingUp, Sun, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Início" },
  { href: "/inbox", icon: Inbox, label: "Captura" },
  { href: "/calendar", icon: Calendar, label: "Calendário" },
  { href: "/us", icon: Heart, label: "Nós" },
  { href: "/goals", icon: TrendingUp, label: "Metas" },
]

const secondaryItems = [
  { href: "/review", icon: Sun, label: "Domingo" },
  { href: "/profile", icon: User, label: "Perfil" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center py-6 gap-2 z-50"
        style={{ background: "var(--card)", borderRight: "1px solid var(--card-border)" }}>

        <Link href="/" className="mb-4 flex flex-col items-center group">
          <DeerIcon />
          <span className="text-[9px] font-bold tracking-widest mt-1 group-hover:opacity-80 transition-opacity"
            style={{ color: "var(--warm-brown)" }}>
            DEER
          </span>
        </Link>

        <nav className="flex flex-col gap-1 w-full px-2">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 px-1 rounded-xl transition-all text-center",
                  !active && "hover:bg-[var(--muted)]"
                )}
                style={active
                  ? { background: "var(--soft-orange)", color: "white" }
                  : { color: "var(--muted-foreground)" }
                }>
                <Icon size={20} />
                <span className="text-[10px] font-medium leading-tight">{label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Itens secundários */}
        <div className="flex flex-col gap-1 w-full px-2 mt-2 pt-2" style={{ borderTop: "1px solid var(--card-border)" }}>
          {secondaryItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all text-center",
                  !active && "hover:bg-[var(--muted)]"
                )}
                style={active
                  ? { background: "var(--golden)", color: "white" }
                  : { color: "var(--muted-foreground)" }
                }>
                <Icon size={17} />
                <span className="text-[9px] font-medium leading-tight">{label}</span>
              </Link>
            )
          })}
        </div>

        <div className="mt-auto flex flex-col items-center gap-1">
          <div className="flex gap-1">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--dusty-rose)" }}>B</div>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "var(--sky-blue)" }}>J</div>
          </div>
          <span className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>casal</span>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pb-safe"
        style={{
          background: "rgba(253,246,238,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--card-border)",
          paddingTop: "10px",
          paddingBottom: "max(10px, env(safe-area-inset-bottom))",
        }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
              style={{ color: active ? "var(--soft-orange)" : "var(--muted-foreground)" }}>
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

function DeerIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 72 72" fill="none">
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

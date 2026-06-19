"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Heart, Inbox, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Início" },
  { href: "/inbox", icon: Inbox, label: "Captura" },
  { href: "/calendar", icon: Calendar, label: "Calendário" },
  { href: "/us", icon: Heart, label: "Nós" },
  { href: "/goals", icon: TrendingUp, label: "Metas" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-6 gap-2 z-50"
      style={{ background: "var(--card)", borderRight: "1px solid var(--card-border)" }}>
      {/* Logo */}
      <div className="mb-4 flex flex-col items-center">
        <span className="text-3xl">🦌</span>
        <span className="text-[9px] font-bold tracking-widest mt-1" style={{ color: "var(--warm-brown)" }}>
          DEER
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 w-full px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 px-1 rounded-xl transition-all text-center",
                active
                  ? "text-white"
                  : "hover:bg-[var(--muted)]"
              )}
              style={active ? { background: "var(--soft-orange)", color: "white" } : { color: "var(--muted-foreground)" }}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium leading-tight">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Avatar casal no fundo */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ background: "var(--dusty-rose)", color: "white" }}>B</div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{ background: "var(--sky-blue)", color: "white" }}>J</div>
        </div>
        <span className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>casal</span>
      </div>
    </aside>
  )
}

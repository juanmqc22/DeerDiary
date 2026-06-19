"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, Heart, Inbox, Zap, FolderOpen, Moon, Sun, User, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const mainNav = [
  { href: "/dashboard", icon: Home, label: "Hoje" },
  { href: "/inbox", icon: Inbox, label: "Inbox" },
  { href: "/next-actions", icon: Zap, label: "Ações" },
  { href: "/projects", icon: FolderOpen, label: "Projetos" },
  { href: "/calendar", icon: Calendar, label: "Agenda" },
  { href: "/us", icon: Heart, label: "Nós" },
]

const secondaryNav = [
  { href: "/goals", icon: TrendingUp, label: "Metas" },
  { href: "/someday", icon: Moon, label: "Algum dia" },
  { href: "/review", icon: Sun, label: "Domingo" },
  { href: "/profile", icon: User, label: "Perfil" },
]

function NavLink({ href, icon: Icon, label, active }: { href: string; icon: React.ElementType; label: string; active: boolean }) {
  return (
    <Link href={href}
      className={cn("flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl transition-all text-center")}
      style={active
        ? { background: "var(--soft-orange)", color: "white" }
        : { color: "var(--muted-foreground)" }
      }>
      <Icon size={19} />
      <span className="text-[9px] font-medium leading-tight">{label}</span>
    </Link>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-[72px] flex-col items-center py-5 gap-1 z-50"
        style={{ background: "var(--card)", borderRight: "1px solid var(--card-border)" }}>

        <Link href="/" className="mb-3 flex flex-col items-center">
          <DearIcon />
        </Link>

        <nav className="flex flex-col gap-0.5 w-full px-2">
          {mainNav.map(({ href, icon, label }) => (
            <NavLink key={href} href={href} icon={icon} label={label} active={pathname === href} />
          ))}
        </nav>

        <div className="my-2 w-8 h-px" style={{ background: "var(--card-border)" }} />

        <nav className="flex flex-col gap-0.5 w-full px-2">
          {secondaryNav.map(({ href, icon: SecIcon, label }) => (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-1 py-2 px-1 rounded-xl transition-all text-center hover:bg-[var(--muted)]"
              style={pathname === href
                ? { background: "var(--muted)", color: "var(--warm-brown)" }
                : { color: "var(--muted-foreground)" }
              }>
              <SecIcon size={15} />
              <span className="text-[8px] font-medium leading-tight">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-1 pb-2">
          <div className="flex -space-x-1">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white border border-white"
              style={{ background: "var(--dusty-rose)" }}>B</div>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white border border-white"
              style={{ background: "var(--sky-blue)" }}>J</div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav — só os principais */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-1"
        style={{
          background: "rgba(253,246,238,0.96)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid var(--card-border)",
          paddingTop: "8px",
          paddingBottom: "max(8px, env(safe-area-inset-bottom))",
        }}>
        {[...mainNav, { href: "/profile", icon: User, label: "Perfil" }].map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all"
              style={{ color: active ? "var(--soft-orange)" : "var(--muted-foreground)" }}>
              <Icon size={21} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[9px] font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

function DearIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 72 72" fill="none">
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

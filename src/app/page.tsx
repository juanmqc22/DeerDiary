import Link from "next/link"
import { GrowingPlant } from "@/components/ui/growing-plant"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fdf6ee 0%, #f5e0c8 60%, #e8c9a8 100%)" }}>

      {/* Plantas decorativas de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 opacity-20" style={{ transform: "scale(2) translateX(-20%) translateY(20%)" }}>
          <GrowingPlant progress={100} color="#8b5e3c" size={120} />
        </div>
        <div className="absolute bottom-0 right-0 opacity-20" style={{ transform: "scale(2.5) translateX(25%) translateY(20%)" }}>
          <GrowingPlant progress={80} color="#d4a547" size={120} />
        </div>
        <div className="absolute top-10 right-10 opacity-10" style={{ transform: "scale(1.5)" }}>
          <GrowingPlant progress={60} color="#7a9e7e" size={80} />
        </div>
        <div className="absolute top-20 left-8 opacity-10" style={{ transform: "scale(1.2)" }}>
          <GrowingPlant progress={45} color="#c97d7d" size={80} />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center flex-1 px-6 py-16">

        {/* Logo */}
        <div className="flex flex-col items-center mb-2" style={{ animation: "fadeIn 0.6s ease forwards" }}>
          <div className="mb-3">
            <DearLogo />
          </div>
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: "var(--warm-brown)" }}>
            DearDiary
          </h1>
          <p className="mt-3 text-base text-center max-w-xs leading-relaxed" style={{ color: "#9a7a62" }}>
            A vida de vocês dois,<br />organizada com amor 🌿
          </p>
        </div>

        {/* Preview mini das plantas */}
        <div className="flex items-end gap-4 my-8 px-6 py-4 rounded-3xl"
          style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
          {[
            { progress: 20, color: "var(--sage)", label: "Saúde" },
            { progress: 55, color: "var(--golden)", label: "Finanças" },
            { progress: 80, color: "var(--soft-orange)", label: "Pós-grad" },
            { progress: 100, color: "var(--dusty-rose)", label: "Amor" },
          ].map(p => (
            <div key={p.label} className="flex flex-col items-center gap-1">
              <GrowingPlant progress={p.progress} color={p.color} size={56} />
              <span className="text-[10px] font-medium" style={{ color: "#9a7a62" }}>{p.label}</span>
            </div>
          ))}
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/dashboard"
            className="w-full py-4 px-6 rounded-2xl text-center font-bold text-white shadow-lg transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #c97d7d, #e8845a)" }}>
            Entrar como Baby 🌸
          </Link>
          <Link href="/dashboard"
            className="w-full py-4 px-6 rounded-2xl text-center font-bold text-white shadow-lg transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "linear-gradient(135deg, #7aa3c9, #9b8bc4)" }}>
            Entrar como Juan 🌊
          </Link>
        </div>

        <p className="mt-6 text-xs" style={{ color: "#b89880" }}>
          Sua fazenda de metas está crescendo ✨
        </p>
      </div>
    </main>
  )
}

function DearLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="14" fill="#8b5e3c" />
      <path d="M20 31 C20 31 9 23 9 16 C9 11.8 12.2 9 16 9 C18 9 19.7 9.9 20 10.8 C20.3 9.9 22 9 24 9 C27.8 9 31 11.8 31 16 C31 23 20 31 20 31Z"
        fill="white" opacity="0.92" />
    </svg>
  )
}

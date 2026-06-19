import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #fdf6ee 0%, #f5e6d8 100%)" }}>

      <div className="flex flex-col items-center mb-10 animate-fade-in">
        <span className="text-8xl mb-2">🦌</span>
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--warm-brown)" }}>
          DeerDiary
        </h1>
        <p className="mt-2 text-sm text-center max-w-xs" style={{ color: "var(--muted-foreground)" }}>
          A vida de vocês dois, organizada com amor 🌿
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm animate-fade-in">
        <Link href="/dashboard"
          className="w-full py-4 px-6 rounded-2xl text-center font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--dusty-rose)" }}>
          Entrar como Baby 🌸
        </Link>
        <Link href="/dashboard"
          className="w-full py-4 px-6 rounded-2xl text-center font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "var(--sky-blue)" }}>
          Entrar como Juan 🌊
        </Link>
      </div>

      <p className="mt-8 text-xs" style={{ color: "var(--muted-foreground)" }}>
        ✨ Sua fazenda de metas está crescendo
      </p>
    </main>
  )
}

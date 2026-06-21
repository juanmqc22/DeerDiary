import { Sidebar } from "./sidebar"

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--background)" }}>
      <Sidebar />
      <main className="flex-1 md:ml-[68px] lg:ml-[200px] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 pt-20 pb-8 md:py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

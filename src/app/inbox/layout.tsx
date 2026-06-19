import { Sidebar } from "@/components/layout/sidebar"

export default function InboxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-20 p-6 overflow-y-auto">{children}</main>
    </div>
  )
}

import { Sidebar } from "@/components/layout/sidebar"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-20 p-4 md:p-6 pb-24 md:pb-6 overflow-y-auto">{children}</main>
    </div>
  )
}

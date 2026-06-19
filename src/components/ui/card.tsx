import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-[var(--card)] border-[var(--card-border)] shadow-sm p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

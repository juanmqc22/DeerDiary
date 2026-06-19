export type LifeDimension = {
  id: string
  name: string
  color: string
  emoji: string
  taskCount: number
}

export type Task = {
  id: string
  title: string
  completed: boolean
  dimensionId?: string
  dueDate?: string
  assignedTo?: "her" | "him" | "both"
  createdAt: string
}

export type CalendarEvent = {
  id: string
  title: string
  date: string
  time?: string
  color: string
  assignedTo: "her" | "him" | "both"
}

export type Transaction = {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
  paidBy: "her" | "him" | "shared"
}

export type DiaryEntry = {
  id: string
  content: string
  mood?: string
  date: string
  authorId: string
}

export type Goal = {
  id: string
  title: string
  emoji: string
  progress: number
  target: number
  unit: string
  color: string
  scope: "her" | "him" | "couple"
}

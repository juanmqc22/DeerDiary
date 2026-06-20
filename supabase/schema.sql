-- ─────────────────────────────────────────────
-- DearDiary — schema completo
-- Cole tudo isso no SQL Editor do Supabase
-- ─────────────────────────────────────────────

-- 1. Perfis (espelho de auth.users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null check (role in ('baby', 'juan')),
  created_at timestamptz default now()
);

-- 2. Inbox
create table if not exists inbox_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  text text not null,
  created_at timestamptz default now()
);

-- 3. Tarefas (próximas ações)
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  context text not null default '@computador',
  area text not null default 'Trabalho',
  area_color text not null default 'var(--lavender)',
  done boolean not null default false,
  due_date date,
  project_id uuid,
  created_at timestamptz default now()
);

-- 4. Projetos
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  area text not null default 'Trabalho',
  area_color text not null default 'var(--lavender)',
  outcome text not null default '',
  next_action text not null default '',
  next_context text not null default '@computador',
  total_actions int not null default 1,
  done_actions int not null default 0,
  created_at timestamptz default now()
);

-- FK de tasks → projects (depois de criar projects)
alter table tasks
  add constraint tasks_project_fk
  foreign key (project_id) references projects(id) on delete set null;

-- 5. Algum dia
create table if not exists someday_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  text text not null,
  created_at timestamptz default now()
);

-- 6. Eventos do calendário
create table if not exists calendar_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_date date not null,
  color text not null default 'var(--lavender)',
  who text not null default 'BJ',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- 7. Transações financeiras
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  description text not null,
  amount numeric(10,2) not null,
  type text not null check (type in ('entrada', 'saída')),
  category text not null default 'Outros',
  who text not null default 'BJ',
  tx_date date not null default current_date,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- 8. Metas financeiras
create table if not exists savings_goals (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  current_amount numeric(10,2) not null default 0,
  target_amount numeric(10,2) not null,
  color text not null default 'var(--soft-orange)',
  created_at timestamptz default now()
);

-- 9. Tarefas do casal
create table if not exists shared_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  done boolean not null default false,
  who text not null default 'BJ',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- 10. Diário do casal
create table if not exists diary_entries (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  author text not null check (author in ('B', 'J')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────

alter table profiles enable row level security;
alter table inbox_items enable row level security;
alter table tasks enable row level security;
alter table projects enable row level security;
alter table someday_items enable row level security;
alter table calendar_events enable row level security;
alter table transactions enable row level security;
alter table savings_goals enable row level security;
alter table shared_tasks enable row level security;
alter table diary_entries enable row level security;

-- Profiles: cada um vê o seu
create policy "own profile" on profiles for all using (auth.uid() = id);

-- Inbox: cada um vê o seu
create policy "own inbox" on inbox_items for all using (auth.uid() = user_id);

-- Tasks: cada um vê as suas
create policy "own tasks" on tasks for all using (auth.uid() = user_id);

-- Projects: cada um vê os seus
create policy "own projects" on projects for all using (auth.uid() = user_id);

-- Someday: cada um vê o seu
create policy "own someday" on someday_items for all using (auth.uid() = user_id);

-- Itens do casal: ambos autenticados veem tudo
create policy "couple calendar" on calendar_events for all using (auth.role() = 'authenticated');
create policy "couple transactions" on transactions for all using (auth.role() = 'authenticated');
create policy "couple savings_goals" on savings_goals for all using (auth.role() = 'authenticated');
create policy "couple shared_tasks" on shared_tasks for all using (auth.role() = 'authenticated');
create policy "couple diary" on diary_entries for all using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────
-- Dados iniciais (metas e tarefas do casal)
-- ─────────────────────────────────────────────

insert into savings_goals (label, current_amount, target_amount, color) values
  ('Viagem de fim de ano ✈️', 1200, 5000, 'var(--soft-orange)'),
  ('Reserva de emergência 🏦', 8000, 15000, 'var(--sage)');

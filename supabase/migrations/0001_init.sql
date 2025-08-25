-- Initial schema for HWRP
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text CHECK (role IN ('admin','manager','supervisor','painter','apprentice')) NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  phone text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  address text NOT NULL,
  description text,
  status text CHECK (status IN ('new','in-progress','completed')) DEFAULT 'new',
  assigned_user_ids uuid[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text CHECK (status IN ('todo','doing','done')) DEFAULT 'todo',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  address text NOT NULL,
  details text,
  status text CHECK (
    status IN (
      'new','reviewed','quoted','scheduled','in-progress','completed'
    )
  ) DEFAULT 'new',
  portal_token text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  category text CHECK (category IN ('paint','tools','other')) NOT NULL,
  description text,
  cost numeric NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "users can read self" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "admins can manage users" ON users FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role = 'admin'
  )
);

-- Projects policies
CREATE POLICY "managers can manage projects" ON projects FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);
CREATE POLICY "field can read assigned projects" ON projects FOR SELECT USING (auth.uid() = ANY(assigned_user_ids));

-- Tasks policies
CREATE POLICY "managers can manage tasks" ON tasks FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);
CREATE POLICY "field can read tasks of assigned projects" ON tasks FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p WHERE p.id = project_id AND auth.uid() = ANY(p.assigned_user_ids)
  )
);

-- Photos policies
CREATE POLICY "managers can manage photos" ON photos FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);
CREATE POLICY "field can read photos of assigned projects" ON photos FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p WHERE p.id = project_id AND auth.uid() = ANY(p.assigned_user_ids)
  )
);

-- Expenses policies
CREATE POLICY "managers can manage expenses" ON expenses FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);
CREATE POLICY "field can read expenses of assigned projects" ON expenses FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM projects p WHERE p.id = project_id AND auth.uid() = ANY(p.assigned_user_ids)
  )
);

-- Clients policies
CREATE POLICY "managers can manage clients" ON clients FOR ALL USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);

-- Quote requests policies
CREATE POLICY "public can insert quote_requests" ON quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "managers can read quote_requests" ON quote_requests FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users u WHERE u.id = auth.uid() AND u.role IN ('admin','manager','supervisor')
  )
);

-- Trigger to insert new auth user into public.users with default role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'painter')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
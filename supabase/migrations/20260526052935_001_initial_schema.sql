/*
  # Initial AI Workspace Schema

  1. New Tables
    - `profiles` - User profile information extending auth.users
    - `workspaces` - Team workspaces with ownership
    - `workspace_members` - Workspace membership and roles
    - `documents` - Collaborative documents with full metadata
    - `document_blocks` - Block-based document content
    - `tasks` - Task management with status tracking
    - `ai_messages` - AI chat history and context
    - `notifications` - User notification system
    - `activities` - Activity tracking for workspace events

  2. Security
    - Enable RLS on all tables
    - Comprehensive policies for authenticated users
    - Workspace-based access control
    - Proper ownership and membership checks

  3. Performance
    - Strategic indexes for common queries
    - Foreign key relationships with cascade deletes
*/

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text UNIQUE NOT NULL,
  avatar_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- WORKSPACES TABLE
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text,
  owner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- WORKSPACE MEMBERS TABLE
CREATE TABLE IF NOT EXISTS workspace_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at timestamptz DEFAULT now(),
  UNIQUE(workspace_id, user_id)
);

-- DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text,
  emoji text,
  cover_image text,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- DOCUMENT BLOCKS TABLE
CREATE TABLE IF NOT EXISTS document_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  type text NOT NULL,
  content text,
  position integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- TASKS TABLE
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority integer DEFAULT 0,
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AI MESSAGES TABLE
CREATE TABLE IF NOT EXISTS ai_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error', 'invite', 'comment')),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id uuid REFERENCES workspaces(id) ON DELETE CASCADE,
  action text NOT NULL,
  entity_type text,
  entity_id uuid,
  created_at timestamptz DEFAULT now()
);

-- ENABLE RLS ON ALL TABLES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Helper functions to check workspace membership and admin/owner role.
-- These are SECURITY DEFINER so policy checks can use them without triggering RLS recursion.
CREATE OR REPLACE FUNCTION is_workspace_member(w_id uuid, u_id uuid) RETURNS boolean
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM workspace_members WHERE workspace_id = w_id AND user_id = u_id);
$$;

CREATE OR REPLACE FUNCTION is_workspace_admin_or_owner(w_id uuid, u_id uuid) RETURNS boolean
LANGUAGE sql SECURITY DEFINER AS $$
  SELECT (
    EXISTS (SELECT 1 FROM workspaces WHERE id = w_id AND owner_id = u_id)
    OR EXISTS (SELECT 1 FROM workspace_members WHERE workspace_id = w_id AND user_id = u_id AND role IN ('admin','owner'))
  );
$$;

-- PROFILES POLICIES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- WORKSPACES POLICIES
CREATE POLICY "Users can view workspaces they own or are members of"
  ON workspaces FOR SELECT
  TO authenticated
  USING (
    auth.uid() = owner_id
    OR EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = workspaces.id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create workspaces"
  ON workspaces FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can update"
  ON workspaces FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can delete"
  ON workspaces FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- WORKSPACE MEMBERS POLICIES
CREATE POLICY "Users can view members of workspaces they belong to"
  ON workspace_members FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR is_workspace_member(workspace_members.workspace_id, auth.uid())
    OR EXISTS (
      SELECT 1 FROM workspaces
      WHERE workspaces.id = workspace_members.workspace_id
      AND workspaces.owner_id = auth.uid()
    )
  );

CREATE POLICY "Workspace owners and admins can manage members"
  ON workspace_members FOR INSERT
  TO authenticated
  WITH CHECK (
    is_workspace_admin_or_owner(workspace_members.workspace_id, auth.uid())
  );

CREATE POLICY "Workspace owners and admins can delete members"
  ON workspace_members FOR DELETE
  TO authenticated
  USING (
    is_workspace_admin_or_owner(workspace_members.workspace_id, auth.uid())
  );

-- DOCUMENTS POLICIES
CREATE POLICY "Users can view documents in their workspaces"
  ON documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = documents.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM workspaces
      WHERE workspaces.id = documents.workspace_id
      AND workspaces.owner_id = auth.uid()
    )
    OR author_id = auth.uid()
  );

CREATE POLICY "Users can create documents in their workspaces"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = documents.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM workspaces
      WHERE workspaces.id = documents.workspace_id
      AND workspaces.owner_id = auth.uid()
    )
  );

CREATE POLICY "Document authors and workspace admins can update"
  ON documents FOR UPDATE
  TO authenticated
  USING (
    author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
      WHERE w.id = documents.workspace_id
      AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
    )
  )
  WITH CHECK (
    author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
      WHERE w.id = documents.workspace_id
      AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
    )
  );

CREATE POLICY "Document authors and workspace owners can delete"
  ON documents FOR DELETE
  TO authenticated
  USING (
    author_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
      WHERE w.id = documents.workspace_id
      AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
    )
  );

-- DOCUMENT BLOCKS POLICIES
CREATE POLICY "Users can view blocks of accessible documents"
  ON document_blocks FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_blocks.document_id
      AND (
        EXISTS (
          SELECT 1 FROM workspace_members wm
          WHERE wm.workspace_id = d.workspace_id
          AND wm.user_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM workspaces w
          WHERE w.id = d.workspace_id
          AND w.owner_id = auth.uid()
        )
        OR d.author_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage blocks of editable documents"
  ON document_blocks FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_blocks.document_id
      AND (
        d.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM workspaces w
          LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
          WHERE w.id = d.workspace_id
          AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
        )
      )
    )
  );

CREATE POLICY "Users can update blocks of editable documents"
  ON document_blocks FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_blocks.document_id
      AND (
        d.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM workspaces w
          LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
          WHERE w.id = d.workspace_id
          AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
        )
      )
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_blocks.document_id
      AND (
        d.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM workspaces w
          LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
          WHERE w.id = d.workspace_id
          AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
        )
      )
    )
  );

CREATE POLICY "Users can delete blocks of editable documents"
  ON document_blocks FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents d
      WHERE d.id = document_blocks.document_id
      AND (
        d.author_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM workspaces w
          LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
          WHERE w.id = d.workspace_id
          AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
        )
      )
    )
  );

-- TASKS POLICIES
CREATE POLICY "Users can view tasks in their workspaces or assigned to them"
  ON tasks FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = tasks.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM workspaces
      WHERE workspaces.id = tasks.workspace_id
      AND workspaces.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create tasks"
  ON tasks FOR INSERT
  TO authenticated
  WITH CHECK (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = tasks.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Task owners and workspace admins can update"
  ON tasks FOR UPDATE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
      WHERE w.id = tasks.workspace_id
      AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
      WHERE w.id = tasks.workspace_id
      AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
    )
  );

CREATE POLICY "Task owners and workspace owners can delete"
  ON tasks FOR DELETE
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspaces w
      LEFT JOIN workspace_members wm ON wm.workspace_id = w.id AND wm.user_id = auth.uid()
      WHERE w.id = tasks.workspace_id
      AND (w.owner_id = auth.uid() OR wm.role IN ('admin', 'owner'))
    )
  );

-- AI MESSAGES POLICIES
CREATE POLICY "Users can view their own AI messages"
  ON ai_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create AI messages"
  ON ai_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ACTIVITIES POLICIES
CREATE POLICY "Users can view activities in their workspaces"
  ON activities FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM workspace_members
      WHERE workspace_members.workspace_id = activities.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM workspaces
      WHERE workspaces.id = activities.workspace_id
      AND workspaces.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- INDEXES FOR PERFORMANCE
CREATE INDEX idx_workspaces_owner ON workspaces(owner_id);
CREATE INDEX idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX idx_documents_workspace ON documents(workspace_id);
CREATE INDEX idx_documents_author ON documents(author_id);
CREATE INDEX idx_document_blocks_document ON document_blocks(document_id);
CREATE INDEX idx_tasks_user ON tasks(user_id);
CREATE INDEX idx_tasks_workspace ON tasks(workspace_id);
CREATE INDEX idx_ai_messages_user ON ai_messages(user_id);
CREATE INDEX idx_ai_messages_document ON ai_messages(document_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_activities_user ON activities(user_id);
CREATE INDEX idx_activities_workspace ON activities(workspace_id);

-- UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- APPLY UPDATE TRIGGERS
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workspaces_updated_at BEFORE UPDATE ON workspaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_document_blocks_updated_at BEFORE UPDATE ON document_blocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- UnKnot Phase 2: Initial Database Schema
-- Run this in the Supabase SQL Editor

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  record_type TEXT NOT NULL DEFAULT 'other',
  category TEXT NOT NULL DEFAULT 'Other',
  subcategory TEXT,
  source_type TEXT NOT NULL DEFAULT 'text',
  document_date DATE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'uploaded',
  confidence REAL,
  duplicate_status TEXT NOT NULL DEFAULT 'none',
  duplicate_of UUID REFERENCES public.records(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_records_user_id ON public.records(user_id);
CREATE INDEX idx_records_category ON public.records(user_id, category);
CREATE INDEX idx_records_document_date ON public.records(user_id, document_date);
CREATE INDEX idx_records_status ON public.records(user_id, status);

-- ============================================================
-- FILES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  record_id UUID NOT NULL REFERENCES public.records(id) ON DELETE CASCADE,
  cloudinary_public_id TEXT NOT NULL,
  secure_url TEXT NOT NULL,
  resource_type TEXT NOT NULL DEFAULT 'image',
  format TEXT,
  original_filename TEXT,
  file_size INTEGER,
  mime_type TEXT,
  file_hash TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_files_user_id ON public.files(user_id);
CREATE INDEX idx_files_record_id ON public.files(record_id);

-- ============================================================
-- EXTRACTED DATA
-- ============================================================
CREATE TABLE IF NOT EXISTS public.extracted_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  record_id UUID NOT NULL REFERENCES public.records(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  extracted_text TEXT,
  entities JSONB DEFAULT '{}',
  amount NUMERIC,
  currency TEXT DEFAULT 'INR',
  merchant TEXT,
  product TEXT,
  invoice_number TEXT,
  warranty_expiry DATE,
  investment_type TEXT,
  is_investment BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_extracted_data_user_id ON public.extracted_data(user_id);
CREATE INDEX idx_extracted_data_record_id ON public.extracted_data(record_id);
CREATE INDEX idx_extracted_data_merchant ON public.extracted_data(user_id, merchant);
CREATE INDEX idx_extracted_data_product ON public.extracted_data(user_id, product);
CREATE INDEX idx_extracted_data_investment ON public.extracted_data(user_id) WHERE is_investment = TRUE;

-- ============================================================
-- RELATIONSHIPS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  from_record_id UUID NOT NULL REFERENCES public.records(id) ON DELETE CASCADE,
  to_record_id UUID NOT NULL REFERENCES public.records(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(from_record_id, to_record_id, relationship_type)
);

CREATE INDEX idx_relationships_user_id ON public.relationships(user_id);
CREATE INDEX idx_relationships_from ON public.relationships(from_record_id);
CREATE INDEX idx_relationships_to ON public.relationships(to_record_id);

-- ============================================================
-- REMINDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  record_id UUID REFERENCES public.records(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  type TEXT NOT NULL DEFAULT 'other',
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX idx_reminders_date ON public.reminders(user_id, reminder_date);
CREATE INDEX idx_reminders_status ON public.reminders(user_id, status);

-- ============================================================
-- ANALYSES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  evidence JSONB DEFAULT '[]',
  source_record_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analyses_user_id ON public.analyses(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extracted_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update only their own
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Records
CREATE POLICY "records_select_own" ON public.records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "records_insert_own" ON public.records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "records_update_own" ON public.records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "records_delete_own" ON public.records FOR DELETE USING (auth.uid() = user_id);

-- Files
CREATE POLICY "files_select_own" ON public.files FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "files_insert_own" ON public.files FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "files_delete_own" ON public.files FOR DELETE USING (auth.uid() = user_id);

-- Extracted Data
CREATE POLICY "extracted_data_select_own" ON public.extracted_data FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "extracted_data_insert_own" ON public.extracted_data FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "extracted_data_update_own" ON public.extracted_data FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "extracted_data_delete_own" ON public.extracted_data FOR DELETE USING (auth.uid() = user_id);

-- Relationships
CREATE POLICY "relationships_select_own" ON public.relationships FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "relationships_insert_own" ON public.relationships FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "relationships_delete_own" ON public.relationships FOR DELETE USING (auth.uid() = user_id);

-- Reminders
CREATE POLICY "reminders_select_own" ON public.reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "reminders_insert_own" ON public.reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reminders_update_own" ON public.reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reminders_delete_own" ON public.reminders FOR DELETE USING (auth.uid() = user_id);

-- Analyses
CREATE POLICY "analyses_select_own" ON public.analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "analyses_insert_own" ON public.analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "analyses_delete_own" ON public.analyses FOR DELETE USING (auth.uid() = user_id);

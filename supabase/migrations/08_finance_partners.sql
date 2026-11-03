-- V18: Finance partner logo management
CREATE TABLE IF NOT EXISTS public.finance_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  logo_url TEXT NOT NULL,
  storage_path TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.finance_partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read active finance partners" ON public.finance_partners;
CREATE POLICY "Public read active finance partners"
  ON public.finance_partners FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

DROP POLICY IF EXISTS "Admins manage finance partners" ON public.finance_partners;
CREATE POLICY "Admins manage finance partners"
  ON public.finance_partners FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

GRANT SELECT ON public.finance_partners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.finance_partners TO authenticated;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('finance-partners', 'finance-partners', TRUE, 2097152,
  ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET
  public = TRUE,
  file_size_limit = 2097152,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

DROP POLICY IF EXISTS "Public read finance partner logos" ON storage.objects;
CREATE POLICY "Public read finance partner logos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'finance-partners');

DROP POLICY IF EXISTS "Admins upload finance partner logos" ON storage.objects;
CREATE POLICY "Admins upload finance partner logos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'finance-partners' AND public.is_admin());

DROP POLICY IF EXISTS "Admins update finance partner logos" ON storage.objects;
CREATE POLICY "Admins update finance partner logos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'finance-partners' AND public.is_admin())
  WITH CHECK (bucket_id = 'finance-partners' AND public.is_admin());

DROP POLICY IF EXISTS "Admins delete finance partner logos" ON storage.objects;
CREATE POLICY "Admins delete finance partner logos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'finance-partners' AND public.is_admin());

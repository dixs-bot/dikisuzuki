-- V19: Ensure public test-drive submissions and admin management policies.
ALTER TABLE public.test_drive_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public insert test_drive_requests" ON public.test_drive_requests;
CREATE POLICY "Public insert test_drive_requests"
  ON public.test_drive_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(trim(full_name)) BETWEEN 2 AND 120
    AND char_length(trim(phone)) BETWEEN 8 AND 24
    AND char_length(trim(product_name)) BETWEEN 2 AND 120
  );

DROP POLICY IF EXISTS "Admin manage test_drive_requests" ON public.test_drive_requests;
CREATE POLICY "Admin manage test_drive_requests"
  ON public.test_drive_requests FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

GRANT INSERT ON public.test_drive_requests TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.test_drive_requests TO authenticated;

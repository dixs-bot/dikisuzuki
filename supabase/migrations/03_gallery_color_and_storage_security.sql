-- Migration 03: connect gallery photos to vehicle colors and restrict storage writes to admins.
ALTER TABLE public.vehicle_photos
  ADD COLUMN IF NOT EXISTS color_id UUID REFERENCES public.vehicle_colors(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_vehicle_photos_color_id ON public.vehicle_photos(color_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_photos_product_color_sort ON public.vehicle_photos(product_id, color_id, sort_order);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND role IN ('super_admin', 'sales_admin')
  );
$$;

-- Remove the previous broad authenticated-user policies. Storage writes are admin-only.
DROP POLICY IF EXISTS "Authenticated users upload vehicle-gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users update vehicle-gallery" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users delete vehicle-gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload vehicle-gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admin update vehicle-gallery" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete vehicle-gallery" ON storage.objects;

CREATE POLICY "Admin upload vehicle-gallery"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'vehicle-gallery' AND public.is_admin());

CREATE POLICY "Admin update vehicle-gallery"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'vehicle-gallery' AND public.is_admin())
  WITH CHECK (bucket_id = 'vehicle-gallery' AND public.is_admin());

CREATE POLICY "Admin delete vehicle-gallery"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'vehicle-gallery' AND public.is_admin());

UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'vehicle-gallery';

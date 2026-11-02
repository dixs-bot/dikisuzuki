-- =============================================================================
-- Migration 02: 02_storage_and_rls.sql
-- Row Level Security (RLS) & Storage Setup for vehicle-gallery
-- =============================================================================

-- Enable RLS across all tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_colors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicle_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_drive_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid() AND role IN ('super_admin', 'sales_admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. admin_profiles
CREATE POLICY "Admins can view profiles"
    ON public.admin_profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Super admin manage profiles"
    ON public.admin_profiles FOR ALL
    USING (public.is_admin());

-- 2. Public Read Policies
CREATE POLICY "Public read dealer_settings"
    ON public.dealer_settings FOR SELECT
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admin manage dealer_settings"
    ON public.dealer_settings FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read products"
    ON public.products FOR SELECT
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admin manage products"
    ON public.products FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read product_variants"
    ON public.product_variants FOR SELECT
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admin manage product_variants"
    ON public.product_variants FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read vehicle_colors"
    ON public.vehicle_colors FOR SELECT
    USING (TRUE);

CREATE POLICY "Admin manage vehicle_colors"
    ON public.vehicle_colors FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read vehicle_photos"
    ON public.vehicle_photos FOR SELECT
    USING (TRUE);

CREATE POLICY "Admin manage vehicle_photos"
    ON public.vehicle_photos FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read promotions"
    ON public.promotions FOR SELECT
    USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "Admin manage promotions"
    ON public.promotions FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read testimonials"
    ON public.testimonials FOR SELECT
    USING (is_featured = TRUE OR public.is_admin());

CREATE POLICY "Admin manage testimonials"
    ON public.testimonials FOR ALL
    USING (public.is_admin());

-- 3. test_drive_requests
CREATE POLICY "Public insert test_drive_requests"
    ON public.test_drive_requests FOR INSERT
    WITH CHECK (TRUE);

CREATE POLICY "Admin manage test_drive_requests"
    ON public.test_drive_requests FOR ALL
    USING (public.is_admin());

-- =============================================================================
-- Storage Bucket: vehicle-gallery
-- =============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'vehicle-gallery',
    'vehicle-gallery',
    TRUE,
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = TRUE,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

-- Storage Policies
CREATE POLICY "Public read vehicle-gallery"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'vehicle-gallery');

CREATE POLICY "Authenticated users upload vehicle-gallery"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'vehicle-gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users update vehicle-gallery"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'vehicle-gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users delete vehicle-gallery"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'vehicle-gallery' AND auth.role() = 'authenticated');

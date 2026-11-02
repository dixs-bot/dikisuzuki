-- =============================================================================
-- Migration 01: 01_initial_schema.sql
-- Core Schema for Diki Wahyudin - Suzuki Sales Consultant Bandung
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. admin_profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'sales_admin' CHECK (role IN ('super_admin', 'sales_admin', 'viewer')),
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. dealer_settings
CREATE TABLE IF NOT EXISTS public.dealer_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dealer_name TEXT NOT NULL DEFAULT 'Nusantara Jaya Sentosa (NJS) Ahmad Yani Bandung',
    sales_name TEXT NOT NULL DEFAULT 'Diki Wahyudin',
    sales_title TEXT NOT NULL DEFAULT 'Suzuki Senior Sales Consultant',
    phone TEXT NOT NULL DEFAULT '+6285189976233',
    whatsapp TEXT NOT NULL DEFAULT '+6285189976233',
    email TEXT DEFAULT 'diki.suzuki.bandung@gmail.com',
    address TEXT NOT NULL DEFAULT 'Jl. Jendral Ahmad Yani No. 259, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114',
    city TEXT NOT NULL DEFAULT 'Bandung',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Nusantara+Jaya+Sentosa+Ahmad+Yani+Bandung',
    operational_hours JSONB NOT NULL DEFAULT '{"weekdays": "08:00 - 17:00", "saturday": "08:30 - 15:00", "sunday": "09:00 - 14:00"}'::jsonb,
    flat_interest_rates JSONB NOT NULL DEFAULT '{"1": 0.05, "2": 0.06, "3": 0.07, "4": 0.08, "5": 0.09}'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    tagline TEXT,
    category TEXT NOT NULL CHECK (category IN ('passenger', 'commercial', 'SUV', 'MPV', 'Hatchback')),
    price_start NUMERIC(15, 2) NOT NULL DEFAULT 0,
    dp_start NUMERIC(15, 2) NOT NULL DEFAULT 0,
    installment_start NUMERIC(15, 2) NOT NULL DEFAULT 0,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    badge TEXT,
    description TEXT,
    brochure_url TEXT,
    main_image_url TEXT NOT NULL,
    engine_summary TEXT,
    transmission_summary TEXT,
    fuel_type TEXT DEFAULT 'Bensin',
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. product_variants
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    transmission TEXT NOT NULL DEFAULT 'Manual',
    fuel_type TEXT DEFAULT 'Bensin',
    otr_price NUMERIC(15, 2) NOT NULL,
    dp_min NUMERIC(15, 2) NOT NULL DEFAULT 0,
    installment_min NUMERIC(15, 2) NOT NULL DEFAULT 0,
    specs JSONB DEFAULT '{}'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. vehicle_colors
CREATE TABLE IF NOT EXISTS public.vehicle_colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    hex_code TEXT NOT NULL,
    image_url TEXT,
    is_two_tone BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. vehicle_photos
CREATE TABLE IF NOT EXISTS public.vehicle_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    caption TEXT,
    category TEXT NOT NULL DEFAULT 'exterior' CHECK (category IN ('exterior', 'interior', 'feature', 'delivery', 'event')),
    image_url TEXT NOT NULL,
    storage_path TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. promotions
CREATE TABLE IF NOT EXISTS public.promotions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    badge TEXT DEFAULT 'PROMO BANDUNG SPESIAL',
    description TEXT,
    highlight TEXT,
    banner_url TEXT,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    dp_promo NUMERIC(15, 2),
    installment_promo NUMERIC(15, 2),
    bonus_items JSONB DEFAULT '[]'::jsonb,
    valid_until DATE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Bandung',
    vehicle_model TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    photo_url TEXT,
    handover_date DATE,
    is_featured BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. test_drive_requests
CREATE TABLE IF NOT EXISTS public.test_drive_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    city TEXT DEFAULT 'Bandung',
    preferred_date DATE NOT NULL,
    preferred_time TEXT DEFAULT 'Pagi (09:00 - 12:00)',
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    location_type TEXT NOT NULL DEFAULT 'dealer' CHECK (location_type IN ('dealer', 'home_visit')),
    address_notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_colors_product_id ON public.vehicle_colors(product_id);
CREATE INDEX IF NOT EXISTS idx_photos_product_id ON public.vehicle_photos(product_id);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON public.promotions(is_active);

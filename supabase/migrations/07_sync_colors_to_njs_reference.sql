-- Migration 07: synchronize Suzuki model color choices with the supplied NJS Cimahi reference.
-- Run AFTER migrations 01-06 and after the product seed has created the referenced slugs.
-- Safe to re-run. Existing photo rows are preserved: obsolete colors are archived (is_active=false),
-- not deleted, so vehicle_photos.color_id foreign keys and uploaded files remain intact.

BEGIN;

ALTER TABLE public.vehicle_colors
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE;

-- Normalize legacy names only when the target name does not already exist.
-- This preserves color IDs and any gallery photos already assigned to those rows.
UPDATE public.vehicle_colors old
SET name = alias.new_name
FROM public.products p,
     (VALUES
       ('ertiga', 'Prime Black', 'Prime Cool Black'),
       ('ertiga', 'Pearl White', 'Pearl Snow White'),
       ('carry', 'Super White', 'White'),
       ('carry', 'Black', 'Real Black'),
       ('spresso', 'Silky Silver', 'Silky Silver Metallic'),
       ('spresso', 'Pearl White', 'White'),
       ('spresso', 'Fire Red', 'Solid Fire Red'),
       ('apv', 'Black', 'Cool Black Metallic'),
       ('apv', 'Silky Silver', 'Silky Silver Metallic')
     ) AS alias(slug, old_name, new_name)
WHERE old.product_id = p.id
  AND p.slug = alias.slug
  AND lower(old.name) = lower(alias.old_name)
  AND NOT EXISTS (
    SELECT 1 FROM public.vehicle_colors existing
    WHERE existing.product_id = old.product_id
      AND lower(existing.name) = lower(alias.new_name)
      AND existing.id <> old.id
  );

-- Archive current colors for the reference-listed models before activating the exact NJS palette.
UPDATE public.vehicle_colors c
SET is_active = FALSE
FROM public.products p
WHERE c.product_id = p.id
  AND p.slug IN (
    'xl7', 'ertiga', 'carry', 'jimny-3door', 'jimny-5door',
    'grand-vitara', 'spresso', 'fronx', 'apv'
  );

-- Desired model-level palette. Fronx and XL7 combine colors shown across trims;
-- exact trim/color eligibility is noted in COLOR_AUDIT_NJS.md.
WITH desired(slug, name, hex_code, is_two_tone, sort_order) AS (
  VALUES
    -- XL7 Hybrid: Alpha, Beta and Zeta palettes combined from NJS trim sections.
    ('xl7','Ice Grayish Blue - Black','#879BAA',TRUE,1),
    ('xl7','Savanna Ivory - Black','#E7DDC8',TRUE,2),
    ('xl7','Marble Black','#202124',FALSE,3),
    ('xl7','Pearl Snow White - Black','#F4F3EF',TRUE,4),
    ('xl7','Metallic Magma Grey','#777A7D',FALSE,5),

    -- All New Ertiga (NJS detail page lists these six names).
    ('ertiga','Prime Cool Black','#17191B',FALSE,1),
    ('ertiga','Brave Khaki','#8A8062',FALSE,2),
    ('ertiga','Mellow Deep Red','#8C2430',FALSE,3),
    ('ertiga','Metallic Magma Gray','#74777A',FALSE,4),
    ('ertiga','Pearl Snow White','#F5F4EF',FALSE,5),
    ('ertiga','Silky Silver','#B8B8B8',FALSE,6),

    -- New Carry Pick-Up.
    ('carry','Real Black','#171717',FALSE,1),
    ('carry','Prime Graphite Grey','#55595E',FALSE,2),
    ('carry','White','#F5F5F0',FALSE,3),
    ('carry','Silky Silver','#B8B8B8',FALSE,4),

    -- Jimny 3 Door.
    ('jimny-3door','Kinetic Yellow 2 - Pearl Bluish Black 4','#D8B83D',TRUE,1),
    ('jimny-3door','Metallic Brisk Blue - Pearl Bluish Black 3','#315A87',TRUE,2),
    ('jimny-3door','Metallic Chiffon Ivory 2 - Pearl Bluish Black 4','#D8CFB8',TRUE,3),
    ('jimny-3door','Pearl White','#F4F3EE',FALSE,4),
    ('jimny-3door','Silky Silver Metallic','#B8B8B8',FALSE,5),
    ('jimny-3door','Medium Grey','#777A7D',FALSE,6),
    ('jimny-3door','Bluish Black Pearl 3','#20252B',FALSE,7),

    -- Jimny 5 Door.
    ('jimny-5door','Jungle Green 2','#31553B',FALSE,1),
    ('jimny-5door','Kinetic Yellow 2 - Pearl Bluish Black 4','#D8B83D',TRUE,2),
    ('jimny-5door','Metallic Chiffon Ivory 2 - Pearl Bluish Black 4','#D8CFB8',TRUE,3),
    ('jimny-5door','Metallic Sizzling Red - Pearl Bluish Black 4','#8F2630',TRUE,4),
    ('jimny-5door','Bluish Black 4','#20252B',FALSE,5),
    ('jimny-5door','Granite Gray Metallic','#707478',FALSE,6),

    -- Grand Vitara.
    ('grand-vitara','Pearl Cave Black','#17191B',FALSE,1),
    ('grand-vitara','Pearl Midnight Black','#24272B',FALSE,2),
    ('grand-vitara','Pearl Arctic White - Black','#F4F3EF',TRUE,3),
    ('grand-vitara','Prime Splendid Silver - Black','#B7B9BC',TRUE,4),

    -- S-Presso.
    ('spresso','Granite Gray Metallic','#74787C',FALSE,1),
    ('spresso','White','#F5F5F0',FALSE,2),
    ('spresso','Silky Silver Metallic','#B8B8B8',FALSE,3),
    ('spresso','Solid Fire Red','#B51F2B',FALSE,4),
    ('spresso','Sizzle Orange','#E56C24',FALSE,5),

    -- Fronx: union of colors displayed across SGX Kuro, SGX, GX and GL sections.
    ('fronx','Cool Black with Black Grille','#17191B',TRUE,1),
    ('fronx','Ice Grayish Blue - Black','#879BAA',TRUE,2),
    ('fronx','Pearl Snow White - Black','#F4F3EF',TRUE,3),
    ('fronx','Savanna Ivory - Black','#E7DDC8',TRUE,4),
    ('fronx','Cool Black','#17191B',FALSE,5),
    ('fronx','Pearl Snow White','#F5F4EF',FALSE,6),
    ('fronx','Savanna Ivory','#E7DDC8',FALSE,7),
    ('fronx','Metallic Magma Gray','#777A7D',FALSE,8),

    -- APV Arena.
    ('apv','Cool Black Metallic','#17191B',FALSE,1),
    ('apv','Burgundy Red','#70212A',FALSE,2),
    ('apv','Graphite Grey Metallic','#64686C',FALSE,3),
    ('apv','Silky Silver Metallic','#B8B8B8',FALSE,4)
),
resolved AS (
  SELECT p.id AS product_id, d.name, d.hex_code, d.is_two_tone, d.sort_order
  FROM desired d
  JOIN public.products p ON p.slug = d.slug
)
UPDATE public.vehicle_colors c
SET hex_code = r.hex_code,
    is_two_tone = r.is_two_tone,
    sort_order = r.sort_order,
    is_active = TRUE
FROM resolved r
WHERE c.product_id = r.product_id
  AND lower(c.name) = lower(r.name);

WITH desired(slug, name, hex_code, is_two_tone, sort_order) AS (
  VALUES
    ('xl7','Ice Grayish Blue - Black','#879BAA',TRUE,1),
    ('xl7','Savanna Ivory - Black','#E7DDC8',TRUE,2),
    ('xl7','Marble Black','#202124',FALSE,3),
    ('xl7','Pearl Snow White - Black','#F4F3EF',TRUE,4),
    ('xl7','Metallic Magma Grey','#777A7D',FALSE,5),
    ('ertiga','Prime Cool Black','#17191B',FALSE,1),
    ('ertiga','Brave Khaki','#8A8062',FALSE,2),
    ('ertiga','Mellow Deep Red','#8C2430',FALSE,3),
    ('ertiga','Metallic Magma Gray','#74777A',FALSE,4),
    ('ertiga','Pearl Snow White','#F5F4EF',FALSE,5),
    ('ertiga','Silky Silver','#B8B8B8',FALSE,6),
    ('carry','Real Black','#171717',FALSE,1),
    ('carry','Prime Graphite Grey','#55595E',FALSE,2),
    ('carry','White','#F5F5F0',FALSE,3),
    ('carry','Silky Silver','#B8B8B8',FALSE,4),
    ('jimny-3door','Kinetic Yellow 2 - Pearl Bluish Black 4','#D8B83D',TRUE,1),
    ('jimny-3door','Metallic Brisk Blue - Pearl Bluish Black 3','#315A87',TRUE,2),
    ('jimny-3door','Metallic Chiffon Ivory 2 - Pearl Bluish Black 4','#D8CFB8',TRUE,3),
    ('jimny-3door','Pearl White','#F4F3EE',FALSE,4),
    ('jimny-3door','Silky Silver Metallic','#B8B8B8',FALSE,5),
    ('jimny-3door','Medium Grey','#777A7D',FALSE,6),
    ('jimny-3door','Bluish Black Pearl 3','#20252B',FALSE,7),
    ('jimny-5door','Jungle Green 2','#31553B',FALSE,1),
    ('jimny-5door','Kinetic Yellow 2 - Pearl Bluish Black 4','#D8B83D',TRUE,2),
    ('jimny-5door','Metallic Chiffon Ivory 2 - Pearl Bluish Black 4','#D8CFB8',TRUE,3),
    ('jimny-5door','Metallic Sizzling Red - Pearl Bluish Black 4','#8F2630',TRUE,4),
    ('jimny-5door','Bluish Black 4','#20252B',FALSE,5),
    ('jimny-5door','Granite Gray Metallic','#707478',FALSE,6),
    ('grand-vitara','Pearl Cave Black','#17191B',FALSE,1),
    ('grand-vitara','Pearl Midnight Black','#24272B',FALSE,2),
    ('grand-vitara','Pearl Arctic White - Black','#F4F3EF',TRUE,3),
    ('grand-vitara','Prime Splendid Silver - Black','#B7B9BC',TRUE,4),
    ('spresso','Granite Gray Metallic','#74787C',FALSE,1),
    ('spresso','White','#F5F5F0',FALSE,2),
    ('spresso','Silky Silver Metallic','#B8B8B8',FALSE,3),
    ('spresso','Solid Fire Red','#B51F2B',FALSE,4),
    ('spresso','Sizzle Orange','#E56C24',FALSE,5),
    ('fronx','Cool Black with Black Grille','#17191B',TRUE,1),
    ('fronx','Ice Grayish Blue - Black','#879BAA',TRUE,2),
    ('fronx','Pearl Snow White - Black','#F4F3EF',TRUE,3),
    ('fronx','Savanna Ivory - Black','#E7DDC8',TRUE,4),
    ('fronx','Cool Black','#17191B',FALSE,5),
    ('fronx','Pearl Snow White','#F5F4EF',FALSE,6),
    ('fronx','Savanna Ivory','#E7DDC8',FALSE,7),
    ('fronx','Metallic Magma Gray','#777A7D',FALSE,8),
    ('apv','Cool Black Metallic','#17191B',FALSE,1),
    ('apv','Burgundy Red','#70212A',FALSE,2),
    ('apv','Graphite Grey Metallic','#64686C',FALSE,3),
    ('apv','Silky Silver Metallic','#B8B8B8',FALSE,4)
)
INSERT INTO public.vehicle_colors (product_id, name, hex_code, is_two_tone, sort_order, is_active)
SELECT p.id, d.name, d.hex_code, d.is_two_tone, d.sort_order, TRUE
FROM desired d
JOIN public.products p ON p.slug = d.slug
WHERE NOT EXISTS (
  SELECT 1 FROM public.vehicle_colors c
  WHERE c.product_id = p.id AND lower(c.name) = lower(d.name)
);

-- Public website sees only active color choices; admins can still see archived colors.
DROP POLICY IF EXISTS "Public read vehicle_colors" ON public.vehicle_colors;
CREATE POLICY "Public read active vehicle_colors"
  ON public.vehicle_colors FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

COMMIT;

-- Verify after migration:
-- SELECT p.slug, c.name, c.hex_code, c.is_two_tone, c.is_active
-- FROM public.vehicle_colors c
-- JOIN public.products p ON p.id = c.product_id
-- ORDER BY p.sort_order, c.sort_order, c.name;

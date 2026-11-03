-- Update customer-facing and admin color choices for Suzuki Ertiga and XL7.
-- Safe to re-run. Existing XL7 photos assigned to removed colors are retained
-- as product-level (unassigned-color) gallery photos before color rows are deleted.

BEGIN;

-- 1) Ertiga: replace the existing Blue label with Brave Khaki, preserving its UUID
-- and any photos already linked to that color.
UPDATE public.vehicle_colors
SET name = 'Brave Khaki',
    hex_code = '#8A8062',
    sort_order = 5
WHERE product_id = 'a0000000-0000-0000-0000-000000000002'
  AND lower(name) IN ('metallic blue', 'brave khaki');

-- If the Ertiga color row was missing, create it.
INSERT INTO public.vehicle_colors
  (id, product_id, name, hex_code, image_url, is_two_tone, sort_order)
SELECT
  'c0020000-0000-0000-0000-000000000005',
  'a0000000-0000-0000-0000-000000000002',
  'Brave Khaki', '#8A8062', 'SUZUKI_ERTIGA.png', FALSE, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.vehicle_colors
  WHERE product_id = 'a0000000-0000-0000-0000-000000000002'
    AND lower(name) = 'brave khaki'
);

-- 2) XL7: detach photos from Red and Silver before deleting those color options.
-- Photos remain attached to the XL7 product and are not deleted.
UPDATE public.vehicle_photos
SET color_id = NULL
WHERE product_id = 'a0000000-0000-0000-0000-000000000001'
  AND color_id IN (
    SELECT id FROM public.vehicle_colors
    WHERE product_id = 'a0000000-0000-0000-0000-000000000001'
      AND lower(name) IN ('magma red', 'red', 'silky silver', 'silver')
  );

DELETE FROM public.vehicle_colors
WHERE product_id = 'a0000000-0000-0000-0000-000000000001'
  AND lower(name) IN ('magma red', 'red', 'silky silver', 'silver');

-- 3) XL7: add Blue and Ivory without creating duplicates on repeated runs.
INSERT INTO public.vehicle_colors
  (id, product_id, name, hex_code, image_url, is_two_tone, sort_order)
SELECT
  'c0010000-0000-0000-0000-000000000005',
  'a0000000-0000-0000-0000-000000000001',
  'Blue', '#1E3A8A', 'newxl7.png', FALSE, 5
WHERE NOT EXISTS (
  SELECT 1 FROM public.vehicle_colors
  WHERE product_id = 'a0000000-0000-0000-0000-000000000001'
    AND lower(name) = 'blue'
);

INSERT INTO public.vehicle_colors
  (id, product_id, name, hex_code, image_url, is_two_tone, sort_order)
SELECT
  'c0010000-0000-0000-0000-000000000006',
  'a0000000-0000-0000-0000-000000000001',
  'Ivory', '#F2E8D5', 'newxl7.png', FALSE, 6
WHERE NOT EXISTS (
  SELECT 1 FROM public.vehicle_colors
  WHERE product_id = 'a0000000-0000-0000-0000-000000000001'
    AND lower(name) = 'ivory'
);

COMMIT;

-- Verify the resulting choices:
-- SELECT p.name AS model, c.name AS color, c.hex_code
-- FROM public.vehicle_colors c JOIN public.products p ON p.id = c.product_id
-- WHERE p.slug IN ('ertiga', 'xl7') ORDER BY p.slug, c.sort_order;

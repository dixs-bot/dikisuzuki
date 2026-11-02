-- Diagnostic read-only query for the Suzuki Diki gallery dropdown.
-- Run in Supabase SQL Editor. It does not modify any data.

SELECT
  COUNT(*) AS total_products,
  COUNT(*) FILTER (WHERE is_active = TRUE) AS active_products,
  COUNT(*) FILTER (WHERE is_active = FALSE) AS inactive_products
FROM public.products;

SELECT
  p.id,
  p.slug,
  p.name,
  p.is_active,
  COUNT(vc.id) AS color_count
FROM public.products AS p
LEFT JOIN public.vehicle_colors AS vc
  ON vc.product_id = p.id
GROUP BY p.id, p.slug, p.name, p.is_active, p.sort_order
ORDER BY p.sort_order, p.name;

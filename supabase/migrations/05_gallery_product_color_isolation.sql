-- Migration 05: enforce strict product/color ownership for vehicle gallery.
-- Run after migrations 01-04. Existing mismatched color references are detached
-- rather than silently shown under the wrong vehicle/color.

UPDATE public.vehicle_photos AS photo
SET color_id = NULL
WHERE photo.color_id IS NOT NULL
  AND NOT EXISTS (
    SELECT 1
    FROM public.vehicle_colors AS color
    WHERE color.id = photo.color_id
      AND color.product_id = photo.product_id
  );

-- Required as the referenced composite key for the ownership foreign key.
CREATE UNIQUE INDEX IF NOT EXISTS vehicle_colors_id_product_id_uidx
  ON public.vehicle_colors (id, product_id);

-- Replace independent SET NULL references with cascades so product/color deletion
-- cannot leave a half-linked gallery row. Existing rows are preserved and checked
-- for future writes because constraints are added NOT VALID.
ALTER TABLE public.vehicle_photos
  DROP CONSTRAINT IF EXISTS vehicle_photos_color_id_fkey;

ALTER TABLE public.vehicle_photos
  DROP CONSTRAINT IF EXISTS vehicle_photos_product_id_fkey;

ALTER TABLE public.vehicle_photos
  ADD CONSTRAINT vehicle_photos_product_id_fkey
  FOREIGN KEY (product_id) REFERENCES public.products(id)
  ON DELETE CASCADE NOT VALID;

-- A photo's color must belong to the same product. NOT VALID preserves old
-- unassigned rows but validates all new/updated references.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'vehicle_photos_color_product_match_fk'
      AND conrelid = 'public.vehicle_photos'::regclass
  ) THEN
    ALTER TABLE public.vehicle_photos
      ADD CONSTRAINT vehicle_photos_color_product_match_fk
      FOREIGN KEY (color_id, product_id)
      REFERENCES public.vehicle_colors (id, product_id)
      ON DELETE CASCADE
      NOT VALID;
  END IF;
END $$;

-- New uploads and reassignment must always provide both product and color.
-- Existing legacy photos can still have no color and can still be edited/deleted.
CREATE OR REPLACE FUNCTION public.enforce_vehicle_photo_product_color()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT'
     OR NEW.product_id IS DISTINCT FROM OLD.product_id
     OR NEW.color_id IS DISTINCT FROM OLD.color_id THEN
    IF NEW.product_id IS NULL OR NEW.color_id IS NULL THEN
      RAISE EXCEPTION 'Vehicle gallery photos must include both product_id and color_id.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_vehicle_photo_product_color ON public.vehicle_photos;
CREATE TRIGGER trg_enforce_vehicle_photo_product_color
  BEFORE INSERT OR UPDATE OF product_id, color_id
  ON public.vehicle_photos
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_vehicle_photo_product_color();

CREATE INDEX IF NOT EXISTS idx_vehicle_photos_product_color_category
  ON public.vehicle_photos (product_id, color_id, category, sort_order);

COMMENT ON CONSTRAINT vehicle_photos_color_product_match_fk ON public.vehicle_photos
  IS 'Prevents a vehicle photo from being assigned to a color belonging to another product.';

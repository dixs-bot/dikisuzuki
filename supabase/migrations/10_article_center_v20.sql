-- V20: Extend existing articles CMS with SEO fields and categories.
-- Safe additive migration: preserves every existing article and cover image.
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'Tips & Informasi Suzuki',
  ADD COLUMN IF NOT EXISTS focus_keyword TEXT,
  ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

CREATE INDEX IF NOT EXISTS idx_articles_category_published
  ON public.articles(category, published_at DESC)
  WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_articles_focus_keyword
  ON public.articles(focus_keyword)
  WHERE status = 'published';

COMMENT ON COLUMN public.articles.category IS 'Kategori editorial artikel Suzuki';
COMMENT ON COLUMN public.articles.focus_keyword IS 'Keyword utama untuk panduan SEO artikel';
COMMENT ON COLUMN public.articles.seo_keywords IS 'Keyword pendukung artikel; metadata bantu, bukan jaminan ranking Google';

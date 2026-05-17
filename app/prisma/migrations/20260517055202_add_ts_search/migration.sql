-- AlterTable
ALTER TABLE "note" ALTER COLUMN "title" SET DEFAULT 'Untitled Note ' || now()::text;

-- =========================================
-- NOTE TABLE FULL-TEXT SEARCH
-- =========================================

-- 1. Add column (safe)
ALTER TABLE "note"
ADD COLUMN IF NOT EXISTS "tsv_search" tsvector;

-- 2. Drop old function if exists
DROP FUNCTION IF EXISTS note_tsvector_trigger CASCADE;

-- 3. Create function
CREATE FUNCTION note_tsvector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.tsv_search :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.content, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.topic, '')), 'C');

  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- 4. Drop & recreate trigger
DROP TRIGGER IF EXISTS tr_note_tsv_update ON "note";

CREATE TRIGGER tr_note_tsv_update
BEFORE INSERT OR UPDATE
ON "note"
FOR EACH ROW
EXECUTE FUNCTION note_tsvector_trigger();

-- 5. Index
CREATE INDEX IF NOT EXISTS idx_note_search
ON "note"
USING GIN ("tsv_search");


-- =========================================
-- COLLECTION TABLE FULL-TEXT SEARCH
-- =========================================

-- 1. Add column (safe)
ALTER TABLE "collection"
ADD COLUMN IF NOT EXISTS "tsv_search" tsvector;

-- 2. Drop old function
DROP FUNCTION IF EXISTS collection_tsvector_trigger CASCADE;

-- 3. Create function (FIXED: correct fields)
CREATE FUNCTION collection_tsvector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.tsv_search :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.topic, '')), 'C');

  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- 4. Drop & recreate trigger
DROP TRIGGER IF EXISTS tr_collection_tsv_update ON "collection";

CREATE TRIGGER tr_collection_tsv_update
BEFORE INSERT OR UPDATE
ON "collection"
FOR EACH ROW
EXECUTE FUNCTION collection_tsvector_trigger();

-- 5. Index
CREATE INDEX IF NOT EXISTS idx_collection_search
ON "collection"
USING GIN ("tsv_search");
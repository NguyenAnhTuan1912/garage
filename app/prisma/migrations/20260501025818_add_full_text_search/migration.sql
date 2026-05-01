-- --- BẢNG NOTE ---
-- 1. Thêm cột tsvector để lưu trữ index tìm kiếm
ALTER TABLE "note" ADD COLUMN "tsv_search" tsvector;

-- 2. Tạo function để tổng hợp dữ liệu từ title, content và topic
CREATE OR REPLACE FUNCTION note_tsvector_trigger() RETURNS trigger AS $$
BEGIN
  NEW.tsv_search :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.content, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.topic, '')), 'C');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

-- 3. Tạo Trigger tự động cập nhật khi insert/update
CREATE TRIGGER tr_note_tsv_update BEFORE INSERT OR UPDATE
ON "note" FOR EACH ROW EXECUTE FUNCTION note_tsvector_trigger();

-- 4. Tạo GIN Index để tăng tốc độ search
CREATE INDEX idx_note_search ON "note" USING GIN ("tsv_search");


-- --- BẢNG COLLECTION ---
ALTER TABLE "collection" ADD COLUMN "tsv_search" tsvector;

CREATE OR REPLACE FUNCTION collection_tsvector_trigger() RETURNS trigger AS $$
BEGIN
  NEW.tsv_search :=
    setweight(to_tsvector('simple', coalesce(NEW.content, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.topic, '')), 'B');
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_collection_tsv_update BEFORE INSERT OR UPDATE
ON "collection" FOR EACH ROW EXECUTE FUNCTION collection_tsvector_trigger();

CREATE INDEX idx_collection_search ON "collection" USING GIN ("tsv_search");

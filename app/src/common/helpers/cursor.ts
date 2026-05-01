/**
 * Encode id and createdAt of a record to create cursor.
 * @param id
 * @param createdAt
 * @returns
 */
export function encodeCursor(id: string, createdAt: Date) {
  const cursor = Buffer.from(`${createdAt.toISOString()}_${id}`).toString(
    "base64"
  );
  return cursor;
}

/**
 * Decode cursor back to id and createdAt.
 * @param cursor 
 * @returns 
 */
export function decodeCursor(cursor: string): [Date, string] {
  try {
    const decoded = Buffer.from(cursor, "base64").toString("utf-8");

    const [createdAtStr, id] = decoded.split("_");

    const createdAt = new Date(createdAtStr);

    // Kiểm tra xem Date có hợp lệ không
    if (isNaN(createdAt.getTime()) || !id) {
      throw new Error("Invalid cursor format");
    }

    return [createdAt, id];
  } catch (error) {
    throw new Error("Malformed cursor");
  }
}

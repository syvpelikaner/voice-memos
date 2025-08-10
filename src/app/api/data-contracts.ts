import * as v from "valibot";

const safeInteger = v.pipe(
  v.string(),
  v.trim(),
  v.transform((value) => parseFloat(value)),
  v.number(),
  v.integer()
);

export const MemoSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.optional(v.string(), "empty description"),
  content: v.string(),
  tags: v.optional(v.array(v.string())),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export const MemoQuerySchema = v.object({
  search: v.optional(v.string()),
  dateFrom: v.optional(v.string()),
  dateTo: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  sort: v.optional(v.union([v.literal("asc"), v.literal("desc")])),
  limit: v.optional(safeInteger),
  offset: v.optional(safeInteger),
});

export type Memo = v.InferOutput<typeof MemoSchema>;
export type MemoQuery = v.InferOutput<typeof MemoQuerySchema>;

import * as v from "valibot";

import { MemoQuerySchema } from "../app/api/data-contracts";

export function getQueryFromRequest(request: Request) {
  const url = new URL(request.url);
  const raw = Object.fromEntries(url.searchParams.entries());

  const result = v.safeParse(MemoQuerySchema, raw);
  if (!result.success) {
    console.error("Failed to parse query parameters:", result.issues);
    return {};
  }

  return result.output;
}

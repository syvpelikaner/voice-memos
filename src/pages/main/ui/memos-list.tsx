import { Link } from "react-router";
import { useMemos } from "../state/memos";

import { MemoItem } from "./memo-item";

export function MemosList() {
  const { data, isError, isLoading } = useMemos();
  return (
    <section className="flex-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4 [column-fill:balance] overflow-auto">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading memos</p>}
      {data && data.length === 0 && <p>No memos found</p>}
      {data &&
        data.map((memo) => (
          <Link to={`/${memo.id}`} key={memo.id} className="block">
            <MemoItem memo={memo} />
          </Link>
        ))}
    </section>
  );
}

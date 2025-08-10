import type { Memo } from "../../../app/api";
import { formatDate } from "../../../utils/format";

export interface MemoProps {
  memo: Memo;
}
export function MemoItem({ memo }: MemoProps) {
  return (
    <div className="card cursor-pointer break-inside-avoid bg-base-100 card-border border-base-300 card-sm">
      <div className="card-body">
        <h3 className="card-title">{memo.title}</h3>
        <p>{memo.description}</p>
        <div className="max-h-10 overflow-hidden text-ellipsis">
          {memo.content}
        </div>
        <div className="text-xs text-base-content/60">
          <p>Created: {formatDate(memo.createdAt)}</p>
          <p>Updated: {formatDate(memo.updatedAt)}</p>
        </div>
        {memo.tags !== undefined && memo.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {memo.tags.map((tag) => (
              <div key={tag} className="badge badge-soft">
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

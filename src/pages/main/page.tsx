import { MemosList } from "./ui/memos-list";
import { NewMemo } from "./ui/new-memo";
import { RecordButton } from "../../shared/ui/record-button";
import { Search } from "./ui/search";

export const IndexPage = () => {
  return (
    <>
      <Search />
      <MemosList />
      <RecordButton />
      <NewMemo />
    </>
  );
};

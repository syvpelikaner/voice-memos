import { Notebook } from "lucide-react";

export const Nav = () => {
  return (
    <nav className="navbar bg-base-100 shadow-sm fixed">
      <div className="flex flex-1 flex-row space-x-2 items-center ">
        <Notebook />
        <h1 className="text-xl">Voice Memos</h1>
      </div>
    </nav>
  );
};

import Dexie, { type EntityTable } from "dexie";
import { seedDatabase } from "./seed";

export interface MemoTable {
  id: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type DB = Dexie & {
  memos: EntityTable<MemoTable, "id">;
};

export const db = new Dexie("voice-memos") as DB;

db.version(1).stores({
  memos: `
    id, 
    title,
    description,
    content,
    createdAt,
    updatedAt,
    tags
  `,
});

db.on("populate", () => {
  seedDatabase(db);
});

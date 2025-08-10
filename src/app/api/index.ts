import { delay } from "../../utils/delay";
import { type DB, db } from "../db";

import type { Memo, MemoQuery } from "./data-contracts";
import { memosSeed } from "../db/seed";

export interface VoiceMemosApi {
  getMemos: (query?: MemoQuery) => Promise<Memo[]>;
  addMemo: (memo: Memo) => Promise<void>;
  deleteMemo: (id: string) => Promise<void>;
  updateMemo: (id: string, memo: Partial<Memo>) => Promise<string>;
  getMemo: (id: string) => Promise<Memo | undefined>;
}

export class LocalVoiceMemosApi implements VoiceMemosApi {
  private memos: Memo[] = memosSeed;

  async getMemos(query: MemoQuery = {}): Promise<Memo[]> {
    console.log("Fetching memos with query:", query);
    const { search, limit = 10, offset = 0, sort } = query;

    let results = this.memos;

    await delay(500);

    if (search) {
      results = results.filter((memo) =>
        memo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (limit !== undefined) {
      results = results.slice(0, limit);
    }

    if (offset !== undefined) {
      results = results.slice(offset);
    }

    if (sort) {
      results = results.toSorted((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sort === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return results;
  }

  async addMemo(memo: Memo): Promise<void> {
    console.log("Adding memo:", memo);
    await delay(500);
    this.memos.push(memo);
  }

  async deleteMemo(id: string): Promise<void> {
    await delay(500);
    this.memos = this.memos.filter((memo) => memo.id !== id);
  }

  async updateMemo(id: string, memo: Partial<Memo>): Promise<string> {
    await delay(500);
    const index = this.memos.findIndex((m) => m.id === id);
    if (index !== -1) {
      this.memos[index] = { ...this.memos[index], ...memo };
    }
    return id;
  }

  async getMemo(id: string): Promise<Memo | undefined> {
    await delay(500);
    return this.memos.find((memo) => memo.id === id);
  }
}

export class IndexedDbVoiceMemosApi implements VoiceMemosApi {
  private db: DB;
  constructor(dbInstance: DB) {
    this.db = dbInstance;
  }
  async getMemos({
    search,
    sort,
    limit = 1000,
    offset = 0,
  }: MemoQuery = {}): Promise<Memo[]> {
    let query = await this.db.memos.offset(offset).limit(limit);

    if (search) {
      query = query.filter(
        (memo) =>
          memo.title.toLowerCase().includes(search.toLowerCase()) ||
          memo.description.toLowerCase().includes(search.toLowerCase()) ||
          memo.content.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "desc") {
      return query.reverse().sortBy("createdAt");
    }

    return query.sortBy("createdAt");
  }
  async addMemo(memo: Memo): Promise<void> {
    await this.db.memos.add(memo);
  }
  async deleteMemo(id: string): Promise<void> {
    await this.db.memos.delete(id);
  }
  async updateMemo(id: string, memo: Partial<Memo>): Promise<string> {
    console.log("Updating memo:", id, memo);
    await this.db.memos.update(id, memo);
    return id;
  }
  async getMemo(id: string): Promise<Memo | undefined> {
    const memo = await this.db.memos.where("id").equals(id).first();
    return memo;
  }
}

export const voiceMemosApi: VoiceMemosApi = new IndexedDbVoiceMemosApi(db);

export type { Memo, MemoQuery } from "./data-contracts";

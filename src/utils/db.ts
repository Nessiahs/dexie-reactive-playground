import Dexie, { type EntityTable } from 'dexie';

export interface Friend {
  id?: number;
  name: string;
}

export interface DemoDatabase extends Dexie {
  friends: EntityTable<Friend, 'id'>;
}

export const db = new Dexie('dexie-reactive-demo') as DemoDatabase;

db.version(1).stores({
  friends: '++id,name',
});

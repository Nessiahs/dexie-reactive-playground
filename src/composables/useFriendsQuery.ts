import { db } from '../utils/db';

import { useLiveQuery } from 'dexie-reactive';

export function useFriendsQuery() {
  return useLiveQuery(
    () => db.friends.orderBy('id').toArray(),

    {
      key: 'friends',
    }
  );
}

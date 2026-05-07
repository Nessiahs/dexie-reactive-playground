# dexie-reactive demo

Interactive StackBlitz demo for `dexie-reactive`.

This demo shows how one Vue component owns a Dexie `liveQuery` subscription while other components consume the same shared reactive state by key.

## What to test

1. Add a friend.
2. Watch both views update from the same shared state.
3. Remove or update entries.
4. Verify that all consumers react automatically.

## What this demonstrates

- Dexie `liveQuery` integration
- shared producer/consumer state
- one subscription per key
- Vue reactivity
- IndexedDB-backed updates
- browser-local persistence

## Browser note

StackBlitz WebContainers may behave differently across browsers. Chromium-based browsers and Firefox are recommended. Safari may be less reliable.

## Links

- [npm package](https://www.npmjs.com/package/dexie-reactive)

- [GitHub repository](https://github.com/Nessiahs/dexie-reactive)

----------

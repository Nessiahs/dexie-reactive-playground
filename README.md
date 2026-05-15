# dexie-reactive demo

Interactive StackBlitz demo for `dexie-reactive`.

This demo shows how one Vue component owns a Dexie `liveQuery` subscription
while other components consume the same shared reactive state by key. Consumer
controls detach and reattach only the local consumer snapshot; they do not pause
the shared producer subscription.

## What to test

1. Add a friend.
2. Watch the producer, Consumer A, and Consumer B update from the same shared state.
3. Detach Consumer A.
4. Add or delete a friend.
5. Verify that the producer and Consumer B update while Consumer A stays frozen.
6. Reattach Consumer A and verify that it shows the current shared state.
7. Stop the producer liveQuery, then add or delete a friend.
8. Verify that consumers no longer receive live updates until the producer is restarted.

## What this demonstrates

- Dexie `liveQuery` integration
- shared producer/consumer state
- one subscription per key
- producer-owned subscription lifecycle
- local consumer attachment lifecycle
- Vue reactivity
- IndexedDB-backed updates
- browser-local persistence

## Browser note

StackBlitz WebContainers may behave differently across browsers. Chromium-based browsers and Firefox are recommended. Safari may be less reliable.

## Links

- [npm package](https://www.npmjs.com/package/dexie-reactive)

- [GitHub repository](https://github.com/Nessiahs/dexie-reactive)

----------

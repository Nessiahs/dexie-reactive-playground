<script setup lang="ts">
import ProducerPanel from './components/ProducerPanel.vue';
import ConsumerPanel from './components/ConsumerPanel.vue';
import { db } from './utils/db';
const clear = async () => {
  await db.friends.clear();
};
</script>

<template>
  <main class="demo-shell">
    <header class="hero">
      <p class="eyebrow">dexie-reactive</p>
      <h1>Live query demo</h1>
      <p>
        One producer component owns the Dexie liveQuery subscription while
        consumer components share the same reactive state by key.
      </p>
      <button class="primary-action" @click="clear">Clear IndexedDB</button>
    </header>

    <section class="demo-grid">
      <ProducerPanel />
      <ConsumerPanel />
    </section>
  </main>
</template>

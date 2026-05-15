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
        One producer owns the real Dexie liveQuery subscription for the
        friends key. Consumers attach locally, so a detached consumer keeps its
        snapshot while the producer and other consumers continue receiving
        updates.
      </p>
      <section class="hero-actions">
        <div>
          <button class="button primary-action" @click="clear">
            Clear IndexedDB
          </button>
          <p>
            Removes all locally stored demo data.
          </p>
        </div>
        <div>
          <a
            class="primary-action button button-link"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open second demo tab
          </a>
          <p>
            Demonstrates shared reactive updates across browser tabs.
          </p>
        </div>
      </section>
    </header>

    <section class="panel-grid">
      <ProducerPanel />
      <ConsumerPanel title="Consumer A" label="Local attachment" />
      <ConsumerPanel title="Consumer B" label="Local attachment" />
    </section>
  </main>
</template>

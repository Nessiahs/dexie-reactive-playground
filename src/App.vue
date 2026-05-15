<script setup lang="ts">
import { ref } from 'vue';
import ProducerPanel from './components/ProducerPanel.vue';
import ConsumerPanel from './components/ConsumerPanel.vue';
import { db } from './utils/db';

const showProducer = ref(true);

const clear = async () => {
  await db.friends.clear();
};

function destroyProducer() {
  showProducer.value = false;
}

function restoreProducer() {
  showProducer.value = true;
}
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
      <ProducerPanel v-if="showProducer" @destroy="destroyProducer" />
      <section v-else class="panel producer-placeholder">
        <div class="panel-header">
          <div>
            <p class="eyebrow">Producer</p>
            <h2>Producer destroyed</h2>
            <p class="panel-copy">
              The producer component is unmounted. Consumers may keep snapshots
              or wait for a producer to register the friends key again.
            </p>
          </div>

          <span class="status-pill is-detached">
            Destroyed
          </span>
        </div>

        <div class="panel-actions">
          <button
            class="button button-small success-action"
            @click="restoreProducer"
          >
            Restore producer
          </button>
        </div>

        <p class="empty-state">
          Restore the producer to create a new owner for the shared liveQuery.
        </p>
      </section>
      <ConsumerPanel title="Consumer A" label="Local attachment" />
      <ConsumerPanel title="Consumer B" label="Local attachment" />
    </section>
  </main>
</template>

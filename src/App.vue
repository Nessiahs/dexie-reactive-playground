<script setup lang="ts">
import ProducerPanel from './components/ProducerPanel.vue';
import ConsumerPanel from './components/ConsumerPanel.vue';
import { db } from './utils/db';
import {ref} from "vue";
const clear = async () => {
  await db.friends.clear();
};

const isActive = ref(true);
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
      <section class="demo-grid">
        <div>
          <button  class="button primary-action" @click="clear">Clear IndexedDB</button>
          <p>
            Removes all locally stored demo data.
          </p>
        </div>
        <div>
          <a  class="primary-action button button-link" href="/"
              target="_blank"
              rel="noopener noreferrer"
          >Open second demo tab</a>
          <p>
            Demonstrates shared reactive updates across browser tabs.
          </p>

        </div>

      </section>
    </header>

    <section class="demo-grid">
      <ProducerPanel :is-active="isActive" @toggle="() => isActive=!isActive"/>
      <ConsumerPanel :is-active="isActive"  @toggle="() => isActive=!isActive"/>
    </section>
  </main>
</template>

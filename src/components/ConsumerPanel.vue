<script setup lang="ts">
import type { Friend } from '../utils/db';

import { useLiveQuerySubscription } from 'dexie-reactive';
import { ref } from 'vue';
import FriendList from './FriendList.vue';

const props = withDefaults(
  defineProps<{
    allowControls?: boolean;
    label?: string;
    title: string;
  }>(),
  {
    allowControls: true,
    label: 'Consumer',
  }
);

const state = useLiveQuerySubscription<Friend>('friends');
const isAttached = ref(true);

function detachConsumer() {
  state.stop();
  isAttached.value = false;
}

function reattachConsumer() {
  state.restart();
  isAttached.value = true;
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <p class="eyebrow">{{ props.label }}</p>
        <h2>{{ props.title }}</h2>
        <p class="panel-copy">
          Uses the friends key and controls only this local attachment.
        </p>
      </div>
      <span
        class="status-pill"
        :class="{
          'is-detached': !isAttached,
          'is-loading': state.loading.value,
          'is-error': state.hasError.value,
          'is-live':
            isAttached && !state.loading.value && !state.hasError.value,
        }"
      >
        {{
          !isAttached
            ? 'Detached'
            : state.hasError.value
            ? 'Error'
            : state.loading.value
            ? 'Loading'
            : 'Ready'
        }}
      </span>

    </div>

    <div v-if="props.allowControls" class="panel-actions">
      <button
        v-if="isAttached"
        class="button button-small danger-action"
        @click="detachConsumer"
      >
        Detach consumer
      </button>
      <button
        v-else
        class="button button-small success-action"
        @click="reattachConsumer"
      >
        Reattach consumer
      </button>
    </div>

    <FriendList
      :friends="state.data.value"
      empty-label="Waiting for producer data"
      :status-label="isAttached ? undefined : 'Detached snapshot'"
    />
  </section>
</template>

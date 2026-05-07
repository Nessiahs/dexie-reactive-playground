<script setup lang="ts">
import type { Friend } from '../utils/db';

import { useLiveQuerySubscription } from 'dexie-reactive';
import FriendList from './FriendList.vue';
const props = defineProps<{isActive: boolean}>()
const state = useLiveQuerySubscription<Friend>('friends');

const emit = defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <section class="panel">
    <div class="panel-header" >
      <div>
        <p class="eyebrow">Consumer</p>
        <h2>useLiveQuerySubscription</h2>

      </div>
      <span
        class="status-pill"
        :class="{
          'is-loading': state.loading.value,
          'is-error': state.hasError.value,
          'is-live': !state.loading.value && !state.hasError.value,
        }"
      >
        {{
          state.hasError.value
            ? 'Error'
            : state.loading.value
            ? 'Loading'
            : 'Ready'
        }}
      </span>

    </div>
    <div class="flex-between" style="margin: 1rem 0;">
      <button v-if="props.isActive" class="button button-small danger-action" @click="() => {state.stop(); emit('toggle')}">Pause shared liveQuery</button>
      <button v-else class="button button-small success-action" @click="() => {state.restart(); emit('toggle')}">Resume shared liveQuery</button>
    </div>
    <FriendList
      :friends="state.data.value"
      empty-label="Waiting for producer data"
    />
  </section>
</template>

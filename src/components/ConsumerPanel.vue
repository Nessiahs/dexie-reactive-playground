<script setup lang="ts">
import type { Friend } from '../utils/db';

import { useLiveQuerySubscription } from 'dexie-reactive';
import FriendList from './FriendList.vue';

const state = useLiveQuerySubscription<Friend>('friends');
</script>

<template>
  <section class="panel">
    <div class="panel-header">
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
            : 'Live'
        }}
      </span>
    </div>

    <FriendList
      :names="state.data.value.map((friend) => friend.name)"
      empty-label="Waiting for producer data"
    />
  </section>
</template>

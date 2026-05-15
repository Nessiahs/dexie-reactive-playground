<script setup lang="ts">
import { ref } from 'vue';
import { db } from '../utils/db';
import { useFriendsQuery } from '../composables/useFriendsQuery';
import FriendList from './FriendList.vue';

const state = useFriendsQuery();

const newFriendName = ref('');
const isProducerActive = ref(true);

async function addFriend() {
  const name = newFriendName.value.trim();

  if (!name) {
    return;
  }

  await db.friends.add({ name });

  newFriendName.value = '';
}

function stopProducer() {
  state.stop();
  isProducerActive.value = false;
}

function restartProducer() {
  state.restart();
  isProducerActive.value = true;
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <p class="eyebrow">Producer</p>
        <h2>useLiveQuery</h2>
        <p class="panel-copy">
          Owns the shared friends liveQuery subscription.
        </p>
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

    <div class="panel-actions">
      <button
        v-if="isProducerActive"
        class="button button-small danger-action"
        @click="stopProducer"
      >
        Stop producer liveQuery
      </button>
      <button
        v-else
        class="button button-small success-action"
        @click="restartProducer"
      >
        Restart producer liveQuery
      </button>
    </div>

    <form class="entry-form" @submit.prevent="addFriend">
      <label class="field">
        <span>Friend name</span>

        <input v-model="newFriendName" placeholder="Ada Lovelace" />
      </label>

      <button class="primary-action button" type="submit">Add friend</button>
    </form>

    <FriendList
      :friends="state.data.value"
      empty-label="No friends yet"
    />
  </section>
</template>

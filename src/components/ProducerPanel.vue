<script setup lang="ts">
import { ref } from 'vue';
import { db } from '../utils/db';
import { useFriendsQuery } from '../composables/useFriendsQuery';
import FriendList from './FriendList.vue';

const state = useFriendsQuery();

const newFriendName = ref('');

async function addFriend() {
  const name = newFriendName.value.trim();

  if (!name) {
    return;
  }

  await db.friends.add({ name });

  newFriendName.value = '';
}
</script>

<template>
  <section class="panel">
    <div class="panel-header">
      <div>
        <p class="eyebrow">Producer</p>
        <h2>useLiveQuery</h2>
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

    <form class="entry-form" @submit.prevent="addFriend">
      <label class="field">
        <span>Friend name</span>

        <input v-model="newFriendName" placeholder="Ada Lovelace" />
      </label>

      <button class="primary-action" type="submit">Add friend</button>
    </form>

    <FriendList
      :names="state.data.value.map((friend) => friend.name)"
      empty-label="No friends yet"
    />
  </section>
</template>

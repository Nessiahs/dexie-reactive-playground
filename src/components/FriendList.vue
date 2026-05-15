<script setup lang="ts">
import { HiOutlineTrash } from 'vue-icons-plus/hi2';
import { type Friend, db } from '../utils/db';


const props = defineProps<{
  emptyLabel: string;
  friends: Friend[];
  statusLabel?: string;
}>();

async function deleteFriend(id?: number) {
  if (id === undefined) {
    return;
  }

  await db.friends.delete(id);
}
</script>

<template>
  <div class="friend-list">
    <p v-if="props.statusLabel" class="friend-list-status">
      {{ props.statusLabel }}
    </p>

    <ul v-if="props.friends.length > 0">
      <li v-for="friend in props.friends" :key="friend.id" class="flex-between">
        {{ friend.name }}
        <button
          class="icon-button"
          type="button"
          aria-label="Delete friend"
          @click="deleteFriend(friend.id)"
        >
          <HiOutlineTrash />
        </button>
      </li>
    </ul>

    <p v-else class="empty-state">
      {{ props.emptyLabel }}
    </p>
  </div>
</template>

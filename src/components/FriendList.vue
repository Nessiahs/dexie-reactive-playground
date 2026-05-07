<script setup lang="ts">
import { HiOutlineTrash } from 'vue-icons-plus/hi2'
import  {type Friend, db} from "../utils/db.ts";


const props = defineProps<{
  emptyLabel: string;
  friends: Friend[]
}>()

const cb = (id: number) => {

  db.friends.delete(id)
}

</script>

<template>


  <div class="friend-list">
    <ul v-if="props.friends.length > 0">
      <li v-for="friend in props.friends" :key="friend.id" class="flex-between">
        {{friend.name}}
        <button @click="cb(friend.id as number)"><HiOutlineTrash /></button>
      </li>
    </ul>

    <p v-else class="empty-state">
      {{ props.emptyLabel }}
    </p>
  </div>
</template>


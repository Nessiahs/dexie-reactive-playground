<script setup lang="ts">
defineProps<{
  emptyLabel: string;
  names: string[];
}>();
</script>

<template>
  <div class="friend-list">
    <ul v-if="names.length > 0">
      <li v-for="name in names" :key="name">
        {{ name }}
      </li>
    </ul>

    <p v-else class="empty-state">
      {{ emptyLabel }}
    </p>
  </div>
</template>

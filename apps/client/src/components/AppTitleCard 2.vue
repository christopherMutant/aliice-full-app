<script setup>
const props = defineProps({
  title: String,
  className: String,
})
</script>

<template>
  <v-card class="title-card" variant="text" rounded="md">
    <v-card-item class="px-0 pt-0 pb-2">
      <v-card-title class="text-h5">{{ props.title }}</v-card-title>
    </v-card-item>
    <v-card-text variant="outlined" :class="`${props.className}`">
      <slot />
    </v-card-text>
  </v-card>
</template>

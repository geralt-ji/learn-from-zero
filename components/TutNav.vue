<template>
  <nav v-if="nav">
    <ul class="space-y-2">
      <li v-for="link in nav" :key="link._path">
        <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
  
<script setup>
defineProps({
  nav: {
  },
})
</script>
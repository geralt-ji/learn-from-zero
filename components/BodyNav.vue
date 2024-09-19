<template>
  <nav v-if="toc">
    <ul class="space-y-2">
      <li v-for="link in toc.links" :key="link.id">
        <a :href="`#${link.id}`" class="text-gray-600 hover:text-gray-900 text-sm font-medium">{{ link.text }}</a>
        <ul v-if="link.children" class="ml-4 mt-2 space-y-2">
          <li v-for="childLink in link.children" :key="childLink.id">
            <a :href="`#${childLink.id}`" class="text-gray-500 hover:text-gray-700 text-sm">{{ childLink.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  toc: {
  },
})
</script>
<template>
  <main>
    <ContentDoc v-slot="{ doc }">
      <BodyNav :toc="doc.body.toc" />
          
      <ContentNavigation v-slot="{ navigation }" :query="catsQuery">
        <TutNav :nav="navigation[0].children" />
      </ContentNavigation>

      <article>
        <h1 class="text-2xl">{{ doc.title }}</h1>
        <p>{{ doc.description?doc.description:"" }}</p>
        <p>---正文开始---</p>
        <ContentRenderer :value="doc" class="prose"/>
      </article>
    </ContentDoc>
  </main>
  </template>

<script setup lang="ts">
const catsQuery = queryContent('/python-zero/')
</script>
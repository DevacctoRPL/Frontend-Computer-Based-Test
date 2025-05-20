<template>
  <div
    class="sticky z-50 top-0 w-full h-16 bg-primary-dark border-b border-tertiary-dark px-6 py-4 flex items-center gap-2"
  >
    <Icon name="lucide:panel-left" class="w-6 h-6 cursor-pointer" />
    <h1 class="text-xl font-bold">{{ capital }}</h1>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
let pathName = ref(route.path.replace(/^\/|\/$/g, "").split("/")[0]);
let capital = pathName.value.charAt(0).toUpperCase() + pathName.value.slice(1);
</script>

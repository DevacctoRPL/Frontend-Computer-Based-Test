<!-- layouts/admin.vue -->
<template>
  <div class="flex min-h-screen bg-primary-dark text-white">
    <SidebarAdmin />
    <div class="flex-1">
      <TopBarAdmin />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

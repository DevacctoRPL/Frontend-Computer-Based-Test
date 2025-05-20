<!-- layouts/admin.vue -->
<template>
  <div class="flex min-h-screen bg-primary-dark text-white">
    <AdminSidebar class="fixed" />
    <div class="flex-1">
      <AdminTopbar />
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

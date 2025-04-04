<template>
  <div class="fixed w-full flex justify-between items-center h-16 p-2">
    <img src="~/assets/images/Penus.webp" alt="Logo" class="w-14" />

    <UDrawer
      :ui="{
        overlay: 'bg-primary-dark/50',
        content: 'bg-secondary-dark ring-primary-light/30',
      }"
      :handle="false"
      direction="right"
    >
      <div class="cursor-pointer">
        <UIcon name="lucide:settings" class="size-10" />
      </div>
      <template #content>
        <div class="min-w-96 min-h-96 size-full m-4">
        </div>
      </template>
    </UDrawer>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>

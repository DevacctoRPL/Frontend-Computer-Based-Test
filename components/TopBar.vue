<template>
  <div class="fixed w-full flex justify-between items-center h-16 py-2 px-4">
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
        <div class="w-72 min-h-96 size-full m-4">
          <div class="flex flex-col gap-4 items-center justify-center border-b border-primary-light pb-5">
            <div class="w-24 h-24 rounded-full bg-primary-light"></div>
            <div class="flex flex-col items-center justify-center">
              <span class="text-xl text-primary-light">{{ user.username }}</span>
              <span class="text-md text-primary-light opacity-40">XI RPL 2</span>
            </div>
          </div>
        </div>
      </template>
    </UDrawer>
  </div>
</template>

<script lang="ts" setup>
const { getData } = useStorage()
const user = await getData()
</script>

<style></style>

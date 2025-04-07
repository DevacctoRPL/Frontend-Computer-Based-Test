<template>
  <NuxtLink
    :to="to"
    :class="[
      isAnswered
        ? 'border-answered text-answered hover:bg-answered/10'
        : 'border-primary-light text-primary-light hover:bg-primary-light/10',
      isActive ? 'bg-primary-light/15' : 'bg-transparent',
      'w-10 h-10 flex items-center justify-center cursor-pointer border-[1px] rounded-md transition-all duration-300',
    ]"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  isAnswered: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  to: {
    type: String,
  },
});
</script>

<style></style>

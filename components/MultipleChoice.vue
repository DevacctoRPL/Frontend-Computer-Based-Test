<template>
  <URadioGroup :ui="{
    base: 'ring-primary-light/25 cursor-pointer',
    item: 'flex items-center',
    indicator: 'bg-primary-light',
    label: 'text-primary-light text-lg cursor-pointer',
  }" :items="items" />
</template>

<script lang="ts" setup>
import type { RadioGroupItem, RadioGroupValue } from "@nuxt/ui";

defineProps({
  items: {
    type: Array as () => RadioGroupItem[],
    required: true,
  },
});
</script>

<style></style>

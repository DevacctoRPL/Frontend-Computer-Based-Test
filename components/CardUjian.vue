<template>
<UCard class="bg-primary-dark border border-answered w-80 h-64 flex justify-start">
  <div class="flex flex-col gap-y-2">
    <h3 class="text-lg font-semibold">{{ soal.title }}</h3>
    <p class="text-lg">Guru:<br> <span class="text-base text-primary-light opacity-40">{{ soal.guru }}</span></p>
    <p class="text-lg">Mata Pelajaran:<br> <span class="text-base text-primary-light opacity-40">{{ soal.mapel }}</span></p>
    <p class="text-lg">Jumlah Soal:<br> <span class="text-base text-primary-light opacity-40">{{ soal.jumlah }} Soal</span></p>
  </div>
</UCard>

</template>

<script setup lang="ts">
defineProps<{
  soal: {
    title: string,
    guru: string,
    mapel: string,
    jumlah: number
  }
}>()
</script>

<template>
<UCard class="bg-primary-dark border border-answered w-80 h-64 flex justify-start">
  <div class="flex flex-col gap-y-2">
    <h3 class="text-lg font-semibold">{{ soal.judul }}</h3>
    <p class="text-lg">judul:<br> <span class="text-base text-primary-light opacity-40">{{ soal.mapel }}</span></p>
    <p class="text-lg">Jenis:<br> <span class="text-base text-primary-light opacity-40">{{ soal.jenis_ujian }}</span></p>
    <p class="text-lg">Durasi:<br> <span class="text-base text-primary-light opacity-40">{{ soal.durasi_menit }} Meint</span></p>
  </div>
</UCard>

</template>

<script setup lang="ts">
defineProps<{
  soal: {
    judul: string,
    mapel: string,
    jenis_ujian: string,
    durasi_menit: string
  }
}>()
</script>

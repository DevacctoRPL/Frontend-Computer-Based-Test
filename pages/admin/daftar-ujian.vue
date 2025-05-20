<template>
  <div>
    <div class="flex gap-4 mb-6">
      <UButton
        class="bg-primary-light hover:bg-answered"
        icon="lucide:edit"
        @click="addUjian"
        >Tambah ujian</UButton
      >
      <UButton
        class="bg-primary-light text-red-600 hover:bg-red-600 hover:text-primary-dark"
        icon="lucide:trash-2"
        @click="deleteUjian"
      ></UButton>
    </div>

    <div class="flex flex-wrap gap-4">
      <CardUjian
        v-for="(ujian, index) in ujianList"
        :key="index"
        :ujian="{
          judul: ujian.judul,
          mapel: ujian.mapel,
          jenis_ujian: ujian.jenis_ujian,
          durasi_menit: ujian.durasi_menit,
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Test } from "~/types/main.types";
const { GetTest } = useTest();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

import { ref } from "vue";

const ujianList = ref<Test[]>([]);

onMounted(async () => {
  try {
    const data = await GetTest();
    ujianList.value = data;
  } catch (error) {}
});

const addUjian = () => alert("Tambah ujian belum diimplementasikan :v");
const deleteUjian = () => alert("Hapus ujian belum diimplementasikan 🙏");
</script>

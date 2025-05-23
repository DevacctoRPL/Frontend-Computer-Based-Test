<template>
  <div>
    <div class="flex gap-4 mb-6 border-b border-tertiary-dark pb-2.5">
      <UButton
        class="bg-primary-light hover:bg-answered cursor-pointer"
        icon="lucide:edit"
        @click="addUjian"
        >Tambah ujian</UButton
      >
      <UButton
        class="bg-primary-light hidden text-red-600 hover:bg-red-600 hover:text-primary-dark"
        icon="lucide:trash-2"
        @click="deleteUjian"
      ></UButton>
    </div>

    <div v-if="ujianList.length != 0" class="flex flex-wrap gap-4">
      <CardUjian
        v-for="(ujian, index) in ujianList"
        :key="index"
        :ujian="{
          id: ujian.id,
          judul: ujian.judul,
          mapel: ujian.mapel,
          jenis_ujian: ujian.jenis_ujian,
          durasi_menit: ujian.durasi_menit,
        }"
      />
    </div>
    <div v-else>
      <p class="text-center text-primary-light">
        Belum ada ujian yang dibuat
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Test } from "~/types/main.types";
const { GetTest } = useTest();

definePageMeta({
  layout: "admin",
  middleware: "auth",
  path: "/admin/ujian",
});

import { ref } from "vue";

const ujianList = ref<Test[]>([]);

onMounted(async () => {
  try {
    const data = await GetTest();
    ujianList.value = data;
  } catch (error) {}
});

const addUjian = () => {
  navigateTo('/admin/create-ujian')
};
const deleteUjian = () => alert("Hapus ujian belum diimplementasikan 🙏");
</script>

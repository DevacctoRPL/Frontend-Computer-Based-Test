<template>
  <div>
    <div class="flex gap-4 mb-6 border-b border-tertiary-dark pb-2.5">
      <UButton
        class="bg-primary-light hover:bg-answered cursor-pointer"
        icon="lucide:edit"
        @click="navigateTo('/admin/ujian/tambah')"
        >Tambah ujian</UButton
      >
      <UButton
        class="bg-primary-light text-red-600 hover:bg-red-600 hover:text-primary-dark"
        icon="lucide:trash-2"
        @click="deleteUjian"
      ></UButton>
    </div>

    <div v-if="ujianList.length != 0" class="flex flex-wrap gap-4">
      <AdminCardUjian
        v-for="(ujian, index) in ujianList"
        :key="index"
        :ujian="{
          id: ujian.tes_id,
          judul: ujian.judul,
          deskripsi: ujian.deskripsi,
          mapel: ujian.mapel,
          jenis_ujian: ujian.jenis_ujian,
          durasi_menit: ujian.durasi_menit,
        }"
        @deleted="handleDeleted"
      />
    </div>
    <div v-else>
      <p class="text-center text-primary-light">Belum ada ujian yang dibuat</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Test } from "~/types/main.types";
const { GetTest, DeleteAllTest, DeleteTest } = useTest();

definePageMeta({
  layout: "admin",
  middleware: "auth",
  path: "/admin/ujian",
});

import { ref } from "vue";

const ujianList = ref<Test[]>([]);

const fetchTests = async () => {
  try {
    const data = await GetTest();
    ujianList.value = data;
    console.log(ujianList.value);
  } catch (error) {
    console.error("Failed to fetch tests:", error);
  }
};

onMounted(fetchTests);

const deleteUjian = async () => {
  const konfirmasi = confirm("yakin mau hapus semua??");
  if (!konfirmasi) {
    return;
  }

  try {
    await DeleteAllTest();
    alert("semua ujian/Tedt di apus");
    await fetchTests();
  } catch (error) {
    alert("gagal hapus");
    console.log(error);
  }
};

const handleDeleted = async () => {
  await fetchTests();
};
</script>

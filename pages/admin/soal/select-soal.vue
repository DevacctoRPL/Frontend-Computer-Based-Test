<template>
  <div class="min-h-screen flex items-center justify-center text-white">
    <div
      class="w-full h-80 max-w-md mb-4 p-6 border border-white/20 rounded-xl shadow-md"
    >
      <UButton
        class="text-sm hover:text-white text-white"
        variant="link"
        icon="i-heroicons-arrow-left"
        @click="$router.back()"
      >
        Kembali
      </UButton>

      <h1 class="text-2xl font-bold text-center mb-6">Detail Soal</h1>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block mb-1 text-white">Pilih Tes</label>
          <select
            v-model="selectedTesId"
            class="w-full px-4 py-2 border border-white/30 rounded-md bg-black text-white"
          >
            <option disabled value="">-- Pilih Tes --</option>
            <option
              v-for="test in ujianList"
              :key="test.tes_id"
              :value="test.tes_id"
            >
              {{ test.judul }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
        >
          Mulai Buat Soal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Test } from "~/types/main.types";

const { GetTest } = useTest()
const ujianList = ref<Test[]>([]);
const selectedTesId = ref("");
const router = useRouter();

definePageMeta({
  path: "/admin/soal",
  middleware: "auth",
  layout: "admin",
});

onMounted(async () => {
  try {
    const data = await GetTest();
    ujianList.value = data;
  } catch (err) {
    console.error("Gagal ambil data tes:", err);
  }
});

const submitForm = () => {
  if (selectedTesId.value) {
    router.push(`soal/tambah/${selectedTesId.value}/1`);
  }
};
</script>

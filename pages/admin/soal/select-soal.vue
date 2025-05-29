<template>
  <div class="h-full flex items-center justify-center text-white">
    <div
      class="w-full max-w-md p-6 border border-white/20 rounded-xl shadow-md"
    >
      <UButton
        class="text-sm cursor-pointer mb-5 hover:text-white text-white"
        variant="link"
        icon="i-heroicons-arrow-left"
        @click="$router.back()"
      >
        Kembali
      </UButton>
      <h1 class="text-3xl font-bold text-center mb-6">Detail Soal</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block mb-1 text-white">Pilih Tes</label>
          <USelect
            v-model="selectedTesId"
            :ui="{
              base: 'bg-primary-dark ring-primary-light/50 w-full p-2',
              placeholder: 'text-primary-light/50',
              content: 'bg-tertiary-dark ring-0',
              item: 'text-primary-light bg-tertiary-dark hover:bg-primary-dark rounded-md',
            }"
            variant="outline"
            size="xl"
            :items="
              ujianList.map((test) => ({
                label: test.judul,
                value: test.tes_id,
              }))
            "
            placeholder="Pilih jenis ujian"
          />
        </div>

        <button
          type="submit"
          class="w-full cursor-pointer py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
        >
          Mulai Buat Soal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Test } from "~/types/main.types";

const { GetTest } = useTest();
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

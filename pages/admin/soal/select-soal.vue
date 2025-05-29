<template>
  <div class="h-full flex items-center justify-center text-primary-light">
    <UCard
      class="w-full ring-primary-light/30 bg-tertiary-dark/30 max-w-md text-primary-light/20 rounded-xl shadow-md"
    >
      <UButton
        class="text-sm cursor-pointer hover:text-primary-light text-primary-light/90"
        variant="link"
        icon="i-heroicons-arrow-left"
        @click="$router.back()"
      >
        Kembali
      </UButton>
      <h1 class="text-3xl font-bold text-center text-primary-light">
        Detail Soal
      </h1>
      <div class="mb-4">
        <label class="block mb-1 text-primary-light">Pilih Tes</label>
        <USelect
          v-model="selectedTesId"
          :ui="{
            base: 'bg-primary-dark ring-primary-light/50 w-full p-2',
            placeholder: 'text-primary-light/50',
            content: 'bg-tertiary-dark ring-primary-light/30',
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
          class="mb-6"
          placeholder="Pilih ujian"
        />
      </div>

      <UButton
        @click="submitForm"
        :ui="{
          base: 'w-full bg-tertiary-dark/60 hover:bg-tertiary-dark transition-all hover:ring-primary-light/30 cursor-pointer ring ring-primary-light/40 py-2 rounded-md text-primary-light flex justify-center',
        }"
        type="submit"
        size="xl"
      >
        Lihat Soal
      </UButton>
    </UCard>
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
    navigateTo(`/admin/soal/${selectedTesId.value}`);
  }
};
</script>

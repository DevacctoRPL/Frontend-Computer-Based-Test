<template>
  <div class="p-4">
    <UButton
      class="text-sm cursor-pointer mb-5 hover:text-primary-light text-primary-light"
      variant="link"
      icon="i-heroicons-arrow-left"
      @click="$router.back()"
    >
      Kembali
    </UButton>
    <UCard
      :ui="{
        body: '',
        header: 'text-primary-light font-semibold border-primary-light/30',
      }"
      class="bg-tertiary-dark/20 ring ring-primary-light/30"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold">Daftar Soal</h3>
          <div class="flex gap-2">
            <UButton
              icon="i-heroicons-plus"
              color="primary"
              :to="`/admin/soal/tambah/${tesId}`"
              class="cursor-pointer"
            >
              Tambah Soal
            </UButton>
            <UButton
              @click="fetchSoal"
              icon="i-heroicons-arrow-path-solid"
              color="info"
              class="cursor-pointer"
            >
              Muat Ulang
            </UButton>
          </div>
        </div>
      </template>

      <div
        class="space-y-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <UCard
          v-for="soal in semuaSoal"
          :key="soal.soal_id"
          :ui="{
            header:
              'text-primary-light font-semibold border-primary-light/30 p-2',
          }"
          class="relative h-full ring-primary-light/30 bg-tertiary-dark/60 shadow-md"
        >
          <template #header>
            <div class="flex gap-2">
              <UButton
                color="neutral"
                variant="ghost"
                icon="i-heroicons-pencil-square"
                :to="`/admin/soal/edit/${soal.soal_id}`"
              />
              <UButton
                color="error"
                variant="ghost"
                icon="i-heroicons-trash"
                class="cursor-pointer"
                @click="confirmDelete(soal.soal_id)"
              />
            </div>
          </template>

          <div class="flex flex-col gap-4">
            <div class="flex-1">
              <h4 class="text-lg font-medium mb-2">{{ soal.pertanyaan }}</h4>
              <UBadge :color="getBadgeColor(soal.jenis_soal)">
                {{
                  soal.jenis_soal === "pilihan_ganda"
                    ? "Pilihan Ganda"
                    : soal.jenis_soal === "essay"
                    ? "Essay"
                    : "Lainnya"
                }}
              </UBadge>
            </div>

            <div v-if="soalAnswers[soal.soal_id]?.length" class="ml-4">
              <p class="text-sm text-neutral-600 mb-2">Jawaban:</p>
              <div class="grid gap-2">
                <div
                  v-for="jawaban in soalAnswers[soal.soal_id]"
                  :key="jawaban.jawaban_id"
                  class="flex items-center gap-2"
                >
                  <UIcon
                    :name="
                      jawaban.is_benar
                        ? 'i-heroicons-check-circle'
                        : 'i-heroicons-minus-circle'
                    "
                    :class="
                      jawaban.is_benar ? 'text-green-500' : 'text-neutral-400'
                    "
                  />
                  <span>{{ jawaban.teks_pilihan }}</span>
                </div>
              </div>
            </div>

            <div v-else-if="soal.jenis_soal !== 'essay'">
              <span>Memuat Jawaban...</span>
            </div>
          </div>
        </UCard>
      </div>

      <div v-if="semuaSoal.length === 0" class="text-center py-8">
        <UIcon
          name="i-heroicons-queue-list"
          class="w-12 h-12 mx-auto text-neutral-400"
        />
        <p class="mt-2 text-neutral-600">
          Belum ada soal. Silakan tambah soal baru.
        </p>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "admin",
});

import type { JawabanData, Soal } from "~/types/main.types";

const route = useRoute();
const tesId = route.params.tes_id as string;
const { getAllAnswers } = useAnswer();
const { getAllQuestions } = useSoal();

let semuaSoal = ref<Soal[]>([]);
const soalAnswers = ref<{ [key: string]: JawabanData[] }>({});

const fetchSoal = async () => {
  semuaSoal.value = await getAllQuestions(tesId);
  await Promise.all(
    semuaSoal.value.map((soal) => loadAnswersForQuestion(soal.soal_id))
  );
};
onMounted(async () => {
  try {
    fetchSoal()
  } catch (error) {
    console.error("Error:", error);
  }
});

const loadAnswersForQuestion = async (soalId: string) => {
  try {
    const response = await getAllAnswers(soalId);
    soalAnswers.value[soalId] = response;
  } catch (error) {
    console.error(`Error loading answers for question ${soalId}:`, error);
  }
};

const getBadgeColor = (tipe: string) => {
  switch (tipe.toLowerCase()) {
    case "pilihan_ganda":
      return "info";
    case "essay":
      return "primary";
    default:
      return "neutral";
  }
};

const confirmDelete = async (soalId: string) => {
  if (confirm("Apakah anda yakin ingin menghapus soal ini?")) {
    try {
      await useSoal().deleteSoal(soalId);
      semuaSoal.value = semuaSoal.value.filter((s) => s.soal_id !== soalId);
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
</script>

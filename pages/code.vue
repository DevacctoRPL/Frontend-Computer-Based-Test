<template>
  <div
    class="flex justify-center items-center h-screen text-primary-light bg-gradient-to-b from-tertiary-dark to-primary-dark gap-16"
  >
    <UCard class="md:w-1/4 bg-primary-dark/15 ring-primary-light/30">
      <UForm :state="state" @submit.prevent="">
        <div class="mb-5 text-center">
          <img
            src="~/assets/images/Penus.webp"
            alt="Logo"
            class="w-14 mx-auto"
          />
          <h1 class="text-3xl font-bold text-center">Kode Tes</h1>
          <span class="">Masukan kode tes untuk masuk ujian</span>
        </div>

        <div class="mb-3">
          <label class="block mb-1 text-white">Pilih Tes</label>
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

        <div class="mb-3">
          <label class="block mb-1 text-white">Kode Tes</label>
          <input
            v-model="state.code"
            type="text"
            placeholder="Masukkan kode tes"
            class="w-full px-4 py-2 border border-white/30 rounded-md bg-black text-white"
          />
        </div>

        <UButton
          variant="outline"
          type="submit"
          @click="SubmitKode"
          class="w-full p-2 text-xl font-bold flex justify-center cursor-pointer text-primary-light ring-primary-light/70 hover:bg-primary-light/10"
        >
          Cek Kode
        </UButton>
      </UForm>
    </UCard>
    <div v-if="detailUjian" class="h-2/3 w-[1px] bg-primary-light/30" />
    <UCard
      v-if="detailUjian"
      class="md:w-1/4 bg-primary-dark/15 ring-primary-light/30"
    >
      <div class="mb-5 text-center">
        <h1 class="text-3xl font-bold text-center">Info</h1>
        <span class="">Informasi dasar ujian</span>
      </div>
      <div class="flex flex-col gap-2">
        <p>
          <span class="text-lg text-primary-light">Jenis Ujian:</span><br />
          <span class="text-sm text-primary-light opacity-40"
            >{{ detailUjian?.jenis_ujian }}</span
          >
        </p>
        <p>
          <span class="text-lg text-primary-light">Mata Pelajaran:</span><br />
          <span class="text-sm text-primary-light opacity-40">{{ detailUjian?.mapel }}</span>
        </p>
        <p>
          <span class="text-lg text-primary-light">Semester:</span><br />
          <span class="text-sm text-primary-light opacity-40">{{ detailUjian?.semester }}</span>
        </p>
      </div>
      <UButton
        variant="outline"
          @click="navigateTo(`/soal/${selectedTesId}/first`)"
        class="w-full mt-3.5 p-2 text-xl font-bold flex justify-center cursor-pointer text-primary-light ring-primary-light/70 hover:bg-primary-light/10"
      >
        Masuk
      </UButton>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
});

import type { Test } from "~/types/main.types";
// import Tes_id from "./admin/soal/[tes_id].vue";

const { GetSiswaTestById, GetTestSiswa } = useSiswa();
const ujianList = ref<Test[]>([]);
const selectedTesId = ref("");
const toast = useToast();

const state = ref({
  code: "",
});

const detailUjian = ref<Test | null>(null);

// Nanti bakal di ganti sesuai ama api, sementara aja ini - Adit
// bikelahj -john🦅🦅
const FETCHED = ref(true);

const fetchUjian = async() => {
    try {
    const data = await GetTestSiswa();
    ujianList.value = data;
    console.log(data)
  } catch (err) {
    console.error("Gagal ambil data tes:", err);
  }
}

onMounted(fetchUjian)

const SubmitKode = async () => {
  if (!selectedTesId.value) {
    return;
  }

  try {
    const detailTest = await GetSiswaTestById(selectedTesId.value);

    if (detailTest.password_tes !== state.value.code) {
      // alert("KODE SALAHHHHHH");
       toast.add({
        title: "Wrong Code",
        description: "Failed",
        color: "error",
      });
      return;
    }

    detailUjian.value = detailTest;
    // alert("YEAYYYYY KAMU BENAR KODENYA");
          toast.add({
        title: "Code Correct xixixi",
        description: "Continue to Test",
        color: "success",
      });
  } catch (error) {
    console.error("GAGAGGAGAL", error);
    alert("error");
  }
};
</script>

<style></style>

<template>
  <div class="p-6 space-y-6">
    <div class="text-2xl font-bold">Soal Nomor: {{ soalNo }}</div>

    <div>
      <textarea
        v-model="formData.pertanyaan"
        placeholder="Masukan Soal..."
        class="w-full h-32 p-4 border rounded bg-secondary-dark text-white"
      />
      <div class="mt-2">
        <button class="text-sm text-blue-400 flex items-center gap-1">
          <Icon name="lucide:image" /> Tambah Foto
        </button>
      </div>
    </div>
    <!-- Pilihan Jenis Soal -->
    <div class="space-y-1">
      <label class="font-semibold">Tipe Soal:</label>
      <div class="flex items-center gap-4">
        <label>
          <input
            type="radio"
            v-model="formData.jenis_soal"
            value="pilihan_ganda"
          />
          Pilihan Ganda
        </label>
        <label>
          <input type="radio" v-model="formData.jenis_soal" value="essay" />
          Essay
        </label>
      </div>
    </div>

    <div class="flex gap-4">
      <button
        @click="submitSoal"
        class="bg-answered hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Simpan
      </button>
      <button
        @click="batal"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Batal
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});

import type { Soal } from "~/types/main.types";

const { CreateSoal } = useSoal();
const route = useRoute();
const router = useRouter();
const TesId = route.params.tes_id as string;

// type SoalInput = {
//   pertanyaan: string;
//   jenis_soal: string;
//   file_gambar: File | null;
//   poin: number;
// };

const formData = ref({
  pertanyaan: "",
  jenis_soal: "",
  file_gambar: null,
  poin: 1,
});

const soalNo = Number(route.params.id);

// function submitSoal() {
//   try {
//     const response =
//     CreateSoal(TesId, formData.value)
//   } catch (error) {

//   }
// }

const submitSoal = async () => {
  try {
    const data = new FormData();
    data.append("pertanyaan", formData.value.pertanyaan);
    data.append("jenis_soal", formData.value.jenis_soal);
    data.append("poin", formData.value.poin.toString());

    if (formData.value.file_gambar) {
      data.append("file_gambar", formData.value.file_gambar);
    }

    await CreateSoal(TesId, data);
    // Redirect atau tampilkan notifikasi sukses
    console.log("Soal berhasil disimpan!"); // atau route ke halaman lain sesuai kebutuhan
  } catch (error) {
    console.error("Gagal menyimpan soal:", error);
    // Tambahkan notifikasi error atau alert di sini kalau ingin
  }
};

function batal() {
  router.back();
}
</script>

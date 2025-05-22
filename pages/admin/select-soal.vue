<template>
  <div class="min-h-screen flex items-center justify-center text-white">
    <div
      class="w-full max-w-md mb-4 p-6 border border-white/20 rounded-xl shadow-md"
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
          <label class="block mb-1 text-white" for="title">Nama Soal</label>
          <input
            v-model="form.title"
            type="text"
            id="title"
            placeholder="Masukan Nama Soal"
            class="w-full px-4 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white placeholder-white/50"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1 text-white" for="subject"
            >Mata Pelajaran</label
          >
          <select
            v-model="form.subject"
            id="subject"
            class="w-full px-4 py-2 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-black text-white"
          >
            <option disabled value="">Pilih Mata Pelajaran</option>
            <option>Matematika</option>
            <option>Bahasa Indonesia</option>
            <option>IPA</option>
            <option>IPS</option>
          </select>
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-white" for="duration"
            >Waktu Pengerjaan</label
          >
          <select
            v-model="form.duration"
            id="duration"
            class="w-full px-4 py-2 bg-black border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-white"
          >
            <option disabled value="">Pilih Waktu</option>
            <option>30 Menit</option>
            <option>60 Menit</option>
            <option>90 Menit</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
        >
          Buat Soal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  layout: "admin",
});

const form = ref({
  title: "",
  subject: "",
  duration: "",
});

function submitForm() {
  console.log("Form Submitted:", form.value);
  //   Simpen backend wok
}
</script>

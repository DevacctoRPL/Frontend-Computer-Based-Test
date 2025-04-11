<template>
  <div>
    <div class="flex gap-4 mb-6">
      <UButton class="bg-primary-light hover:bg-answered" icon="lucide:edit" @click="addSoal" >Tambah Soal</UButton>
      <UButton class="bg-primary-light text-red-600 hover:bg-red-600 hover:text-primary-dark" icon="lucide:trash-2" @click="deleteSoal"></UButton>
    </div>

    <div class="flex justify-between flex-wrap gap-4">
      <CardUjian
        v-for="(soal, index) in soalList"
        :key="index"
        :soal="soal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: auth
})

import { ref } from 'vue'
import auth from '~/middleware/auth'

const soalList = ref([
  { title: "Matematika 1", guru: "Ir. Joko Widodo", mapel: "Matematika", jumlah: 70 },
  { title: "Matematika 2", guru: "Pak Prabowo", mapel: "Matematika", jumlah: 80 },
  { title: "Fisika Dasar", guru: "Mas Gibran", mapel: "Fisika", jumlah: 50 },
  { title: "Kimia", guru: "Mas Kaesang", mapel: "Kimia", jumlah: 60 }
])

const addSoal = () => alert("Tambah soal belum diimplementasikan :v")
const deleteSoal = () => alert("Hapus soal belum diimplementasikan 🙏")
</script>

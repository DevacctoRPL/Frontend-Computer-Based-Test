<template>
  <div>
    <div class="flex gap-4 mb-6">
      <UButton class="bg-primary-light hover:bg-answered" icon="lucide:edit" @click="addSoal" >Tambah Soal</UButton>
      <UButton class="bg-primary-light text-red-600 hover:bg-red-600 hover:text-primary-dark" icon="lucide:trash-2" @click="deleteSoal"></UButton>
    </div>

    <div class="flex flex-wrap gap-4">
      <CardUjian
        v-for="(soal, index) in soalList"
        :key="index"
        :soal="{
          judul: soal.judul,
          mapel: soal.mapel,
          jenis_ujian: soal.jenis_ujian,
          durasi_menit: soal.durasi_menit
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Test } from '~/types/test.types'
const { GetTest } = useTest()

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

import { ref } from 'vue'
// import auth from '~/middleware/auth'

const soalList = ref<Test[]>([])

onMounted(async () => {
  try {
    const data = await GetTest()
    soalList.value = data
  } catch (error) {
    
  }
})

const addSoal = () => alert("Tambah soal belum diimplementasikan :v")
const deleteSoal = () => alert("Hapus soal belum diimplementasikan 🙏")
</script>

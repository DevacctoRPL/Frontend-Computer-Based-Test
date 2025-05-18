<template>
  <div class="h-full text-white flex items-center justify-center px-4">
    <div class="w-full max-w-3xl border border-primary-light focus:outline-none focus:ring-0 focus:border-answered rounded-lg p-6">
      <h2 class="text-3xl font-bold text-center mb-6">Detail Ujian</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Judul ujiannya -->
        <div>
          <label class="block mb-1">Judul</label>
          <input v-model="formData.judul" type="text" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" placeholder="Masukkan judul ujian" />
        </div>

        <!-- Deskripsi nya-->
        <div>
          <label class="block mb-1">Deskripsi</label>
          <textarea v-model="formData.deskripsi" rows="3" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" placeholder="Masukkan deskripsi..."></textarea>
        </div>

        <!-- Durasi Menit -->
        <div>
          <label class="block mb-1">Durasi (menit)</label>
          <input v-model="formData.durasi_menit" type="number" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" placeholder="Misal: 90" />
        </div>

        <!-- Tanggal Mulai & Tanggal Selesai harusnyaa -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Tanggal Mulai</label>
            <input v-model="formData.tanggal_mulai" type="date" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
          </div>
          <div>
            <label class="block mb-1">Tanggal Selesai</label>
            <input v-model="formData.tanggal_selesai" type="date" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
          </div>
        </div>

        <!-- Jam mulai -->
        <div>
          <label class="block mb-1">Jam Mulai</label>
          <input v-model="formData.jam_mulai" type="time" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
        </div>

        
        <div>
          <label class="block mb-1">Batas Percobaan</label>
          <input v-model="formData.batas_percobaan" type="number" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
        </div>

        <!-- password tes atau uian -->
        <div>
          <label class="block mb-1">Password Tes</label>
          <input v-model="formData.password_tes" type="text" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
        </div>

        <!-- MapelUjian -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Mapel</label>
            <input v-model="formData.mapel" type="text" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
          </div>
          <div>
            <label class="block mb-1">Jenis Ujian</label>
            <select v-model="formData.jenis_ujian" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered">
              <option value="">Pilih jenis ujian</option>
              <option value="PTS">PTS</option>
              <option value="PAS">PAS</option>
              <option value="UTS">UTS</option>
            </select>
          </div>
        </div>

        <!-- Semester berapa gitu -->
        <div>
          <label class="block mb-1">Semester</label>
          <input v-model="formData.semester" type="number" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" />
        </div>

        <!-- Kelas-->
        <div>
          <label class="block mb-1">Kelas</label>
          <div class="space-y-2">
            <input v-model="formData.kelas[0]" type="text" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" placeholder="Kelas 1 (misal: XI-RPL-2)" />
            <input v-model="formData.kelas[1]" type="text" class="w-full p-2 rounded border border-primary-light focus:outline-none focus:ring-0 focus:border-answered" placeholder="Kelas 2 (misal: XII-RPL-3)" />
          </div>
        </div>

        <!-- Tombol bol tombol -->
        <div class="pt-4">
          <button type="submit" class="w-full hover:border-answered border border-gray-600 py-2 rounded text-white">
            Buat Ujian
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script lang="ts" setup>
  definePageMeta({
      layout: 'admin',
      middleware: 'auth'      
  })

  const {CreateTest} = useTest()


const formData = ref({
  judul: '',
  deskripsi: '',
  durasi_menit: '',
  tanggal_mulai: '',
  tanggal_selesai: '',
  batas_percobaan: '',
  password_tes: '',
  mapel: '',
  jenis_ujian: '',
  semester: '',
  kelas: ['', ''],
  jam_mulai: ''
})

const handleSubmit = async () => {
  try {
    const response = await CreateTest(formData.value)
    console.log("berhasil", response)

  } catch (error) {
    console.error("Gagal membuat tes:", error)
  }
}


</script>

<style>

</style>
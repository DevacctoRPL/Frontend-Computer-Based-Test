<template>
  <div class="h-full text-white flex items-center justify-center px-4">
    <div class="w-full max-w-3xl border border-primary-light focus:outline-none focus:ring-0 focus:border-answered rounded-lg p-6">
      <h2 class="text-3xl font-bold text-center mb-6">Edit Ujian</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block mb-1">Judul</label>
          <input v-model="formData.judul" type="text" class="w-full p-2 rounded border border-primary-light" />
        </div>

        <div>
          <label class="block mb-1">Deskripsi</label>
          <textarea v-model="formData.deskripsi" rows="3" class="w-full p-2 rounded border border-primary-light"></textarea>
        </div>

        <div>
          <label class="block mb-1">Durasi (menit)</label>
          <input v-model="formData.durasi_menit" type="number" class="w-full p-2 rounded border border-primary-light" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Tanggal Mulai</label>
            <input v-model="formData.tanggal_mulai" type="date" class="w-full p-2 rounded border border-primary-light" />
          </div>
          <div>
            <label class="block mb-1">Tanggal Selesai</label>
            <input v-model="formData.tanggal_selesai" type="date" class="w-full p-2 rounded border border-primary-light" />
          </div>
        </div>

        <div>
          <label class="block mb-1">Jam Mulai</label>
          <input v-model="formData.jam_mulai" type="time" class="w-full p-2 rounded border border-primary-light" />
        </div>

        <div>
          <label class="block mb-1">Batas Percobaan</label>
          <input v-model="formData.batas_percobaan" type="number" class="w-full p-2 rounded border border-primary-light" />
        </div>

        <div>
          <label class="block mb-1">Password Tes</label>
          <input v-model="formData.password_tes" type="text" class="w-full p-2 rounded border border-primary-light" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Mapel</label>
            <input v-model="formData.mapel" type="text" class="w-full p-2 rounded border border-primary-light" />
          </div>
          <div>
            <label class="block mb-1">Jenis Ujian</label>
            <select v-model="formData.jenis_ujian" class="w-full p-2 rounded border border-primary-light">
              <option value="">Pilih jenis ujian</option>
              <option value="PTS">PTS</option>
              <option value="PAS">PAS</option>
              <option value="UTS">UTS</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block mb-1">Semester</label>
          <input v-model="formData.semester" type="number" class="w-full p-2 rounded border border-primary-light" />
        </div>

        <div>
          <label class="block mb-1">Kelas</label>
          <div class="space-y-2">
            <input v-model="formData.kelas[0]" type="text" class="w-full p-2 rounded border border-primary-light" placeholder="Kelas 1" />
            <input v-model="formData.kelas[1]" type="text" class="w-full p-2 rounded border border-primary-light" placeholder="Kelas 2" />
          </div>
        </div>

        <div class="pt-4">
          <button type="submit" class="w-full border border-gray-600 py-2 rounded text-white hover:border-answered">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import Id from '~/pages/soal/[id].vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const { GetTestById, EditTest} = useTest()
const formData = ref({
    id:'',
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
    jam_mulai: '',
})

const id = useRoute().params.id as string

onMounted(async () => {
    const data = await GetTestById(id)
    console.log(data)
    formData.value = {
        id,
        judul: data.judul,
        deskripsi: data.deskripsi,
        durasi_menit: data.durasi_menit,
        tanggal_mulai: data.tanggal_mulai,
        tanggal_selesai: data.tanggal_selesai,
        batas_percobaan: data.batas_percobaan,
        password_tes: data.password_tes,
        mapel: data.mapel,
        jenis_ujian: data.jenis_ujian,
        semester: data.semester,
        kelas: data.kelas ?? ['', ''],
        jam_mulai: data.jam_mulai
    }
})


const handleSubmit = async () => {
  
  try {
    await EditTest(id, formData.value)
    alert('Berhasil mengupdate ujian.')
    console.log(Response)
    navigateTo('/admin/daftar-ujian') 
  } catch (err) {
    console.error('Gagal update:', err)
  }
}
</script>

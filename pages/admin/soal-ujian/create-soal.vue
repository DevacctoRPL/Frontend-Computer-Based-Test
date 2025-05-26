<template>
  <div class="p-6 space-y-6">
    <div class="text-2xl font-bold">Soal Nomor: {{ soalNo }}</div>

    <!-- Soal -->
    <div>
      <textarea
        v-model="soalText"
        placeholder="Masukan Soal..."
        class="w-full h-32 p-4 border rounded bg-black text-white"
      />
      <div class="mt-2">
        <button class="text-sm text-blue-400 flex items-center gap-1">
          <Icon name="lucide:image" /> Tambah Foto
        </button>
      </div>
    </div>

    <!-- Jawaban -->
    <div class="space-y-4">
      <div class="text-xl font-bold">Jawaban</div>

      <div
        v-for="(jawaban, index) in jawabanList"
        :key="index"
        class="flex items-center gap-2"
      >
        <input
          v-model="jawaban.text"
          class="flex-1 p-2 rounded border bg-black text-white"
          placeholder="KKB = Hama"
        />

        <button
          @click="setBenar(index)"
          class="px-2 py-1 border rounded"
          :class="jawaban.benar ? 'bg-green-500 text-white' : 'bg-black text-white border-green-500'"
        >
          ✔
        </button>

        <button @click="hapusJawaban(index)" class="text-red-500">
          <Icon name="lucide:trash" />
        </button>
      </div>

      <button
        @click="tambahJawaban"
        class="text-white bg-black border border-white px-4 py-2 rounded"
      >
        <Icon name="lucide:plus" class="inline" /> Tambah Jawaban
      </button>
    </div>

    <!-- Pilihan Jenis Soal -->
    <div class="space-y-1">
      <label class="font-semibold">Tipe Soal:</label>
      <div class="flex items-center gap-4">
        <label>
          <input type="radio" v-model="tipe" value="pilihan_ganda" />
          Pilihan Ganda
        </label>
        <label>
          <input type="radio" v-model="tipe" value="essay" />
          Essay
        </label>
      </div>
    </div>

    <div class="flex gap-4">
      <button
        @click="submitSoal"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
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

<script setup>

definePageMeta({
    layout: 'admin'
})
const route = useRoute()
const router = useRouter()

const soalNo = Number(route.params.id)
const soalText = ref("")
const tipe = ref("pilihan_ganda")

const jawabanList = ref([
  { text: "", benar: false },
  { text: "", benar: false },
])

function tambahJawaban() {
  jawabanList.value.push({ text: "", benar: false })
}

function hapusJawaban(index) {
  jawabanList.value.splice(index, 1)
}

function setBenar(index) {
  jawabanList.value.forEach((j, i) => {
    j.benar = i === index
  })
}

function submitSoal() {
  const payload = {
    no: soalNo,
    soal: soalText.value,
    tipe: tipe.value,
    jawaban: jawabanList.value,
    tes_id: route.query.tes_id,
  }

  // Kirim ke API
  $fetch("/api/soal", {
    method: "POST",
    body: payload,
  }).then(() => {
    router.push(`/soal/${soalNo + 1}?tes_id=${route.query.tes_id}`)
  })
}

function batal() {
  router.back()
}
</script>

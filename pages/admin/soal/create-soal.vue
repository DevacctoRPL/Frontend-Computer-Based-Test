<template>
  <div class="p-6 min-h-screen text-white">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="flex-1 space-y-6 border border-primary-dark p-6 rounded-lg">
        <div class="text-2xl font-bold">Soal Nomor: {{ soalNo }}</div>

        <div class="relative">
          <textarea
            v-model="soalText"
            placeholder="Masukan Soal..."
            class="w-full h-32 p-4 border rounded bg-secondary-dark text-white"
          />

          <button
            class="absolute bottom-2 right-2 text-sm text-blue-400 flex items-center gap-1"
          >
            <Icon name="lucide:image" /> Tambah Foto
          </button>
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
              class="flex-1 p-2 rounded border bg-secondary-dark text-white"
              placeholder="KKB = Hama"
            />

            <button
              @click="setBenar(index)"
              class="px-2 py-1 border rounded"
              :class="
                jawaban.benar
                  ? 'bg-green-500 text-white'
                  : 'bg-secondary-dark text-white border-green-500'
              "
            >
              ✔
            </button>

            <button @click="hapusJawaban(index)" class="text-red-500">
              <Icon name="lucide:trash" />
            </button>
          </div>

          <button
            @click="tambahJawaban"
            class="bg-primary-light border border-white px-4 py-2 rounded flex items-center text-black gap-1"
          >
            <Icon name="lucide:plus" class="inline text-black" /> Tambah Jawaban
          </button>
        </div>

        <!-- Tipe Soal -->
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

      <!-- Bagian Kanan: Detail Soal -->
      <div
        class="w-full lg:w-80 border border-white/20 p-6 rounded-lg space-y-4 bg-black/30"
      >
        <div class="text-2xl font-bold text-center">Detail Soal</div>

        <div><strong>Guru:</strong> Ir. Joko Widodo</div>
        <div><strong>Mata Pelajaran:</strong> Matematika</div>
        <div><strong>Jumlah Soal:</strong> 1 Soal</div>
        <div><strong>Waktu Pengerjaan:</strong> Sampai Kiamat</div>

        <button class="text-white flex items-center gap-1 text-sm">
          <Icon name="lucide:edit" /> Edit Detail
        </button>

        <div class="mt-4 space-y-2">
          <div>
            <label class="flex items-center gap-2">
              <input type="radio" disabled checked />
              Pilihan Ganda
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" disabled />
              Essay
            </label>
          </div>
          <div class="flex gap-2">
            <button
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
            <button
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
const route = useRoute();
const router = useRouter();

const soalNo = Number(route.params.id);
const soalText = ref("");
const tipe = ref("pilihan_ganda");

const jawabanList = ref([
  { text: "", benar: false },
  { text: "", benar: false },
]);

function tambahJawaban() {
  jawabanList.value.push({ text: "", benar: false });
}

function hapusJawaban(index) {
  jawabanList.value.splice(index, 1);
}

function setBenar(index) {
  jawabanList.value.forEach((j, i) => {
    j.benar = i === index;
  });
}

function submitSoal() {
  const payload = {
    no: soalNo,
    soal: soalText.value,
    tipe: tipe.value,
    jawaban: jawabanList.value,
    tes_id: route.query.tes_id,
  };

  // Kirim ke API
  $fetch("/api/soal", {
    method: "POST",
    body: payload,
  }).then(() => {
    router.push(`/soal/${soalNo + 1}?tes_id=${route.query.tes_id}`);
  });
}

function batal() {
  router.back();
}
</script>

<template>
  <!-- ? Mantap Jon, gua benerin dikit - Adit -->
  <!-- ? Setelah diskusi lebih lanjut, kami sepakat untuk membuat border menjadi solid color. Terimakasih atas kerja keras untuk pembuat border yang dahulu - Adit UI Side -->
  <div class="flex min-h-screen bg-primary-dark text-primary-light pt-16">
    <!-- Sidebar nyaa -->
    <aside class="w-1/5 p-4 border-r border-secondary-dark flex flex-col">
      <div>
        <div
          class="grid grid-cols-5 space-x-0.5 space-y-3 transition-all justify-items-center"
        >
          <!-- Nanti bakal diambil dari api buat is-answered, mungkin. is-active pakai url params -->
          <NumberButton
            v-for="(soal, index) in ujianList"
            :key="soal.soal_id"
            :to="`/soal/${tesId}/${soal.soal_id}`"
            :is-answered="userAnswers[soal.soal_id] ? true : false"
            :is-active="soal.soal_id === SoalId"
          >
            {{ index + 1 }}
          </NumberButton>

        </div>
      </div>

      <!-- Tombol Navigasi -->
      <div class="mt-6 flex items-center justify-between gap-1">
        <UButton
          class="w-24 h-10 cursor-pointer transition-all bg-secondary-dark hover:bg-primary-light/40 text-primary-light rounded flex items-center justify-center"
        >
          <UIcon name="lucide:chevron-left" size="24" />
        </UButton>

        <UButton
          variant="outline"
          class="w-10 h-10 cursor-pointer hover:bg-yellow-400/10 text-yellow-400 rounded ring-amber-300 flex items-center justify-center"
        >
          <UIcon name="lucide:flag" size="24" />
        </UButton>

        <UButton
          class="w-24 h-10 cursor-pointer transition-all bg-secondary-dark hover:bg-primary-light/40 text-primary-light rounded flex items-center justify-center"
        >
          <UIcon name="lucide:chevron-right" size="24" />
        </UButton>
      </div>
    </aside>

    <!-- Main Contentt -->
    <main class="flex-1 p-6" v-if="FETCHED">
      <div>
        <h1 class="text-xl font-bold">What is Lorem Ipsum?</h1>
        <p class="mt-2 text-gray-300">
          {{ SoalList?.pertanyaan }}
        </p>

        <section id="answer" class="mt-8">
          <textarea
            v-if="current > 25"
            rows="10"
            placeholder="Jawaban Anda"
            class="w-full p-2 mt-4 bg-secondary-dark/50 outline outline-[#2E2E2E] rounded-md"
          ></textarea>
          <URadioGroup v-model="selectedAnswer" :items="jawabanListWithIds" />
        </section>

        <!-- Pencet, Nanti kira-kira gitu hasilnya - Adit -->
        <UButton
          v-if="answered < 30"
          variant="outline"
          @click="next()"
          class="mt-14 cursor-pointer float-end ring-1 ring-primary-light text-primary-light hover:bg-primary-light/10 py-2 px-3 rounded"
        >
          Selanjutnya →
        </UButton>
        <UButton
          v-else
          icon="lucide:send"
          class="mt-14 cursor-pointer float-end py-2 px-3 rounded"
        >
          Selesai
        </UButton>
      </div>
    </main>

    <!-- Right Panel nya -->
    <!-- nanti ku buat lebih best practice kalo bisa -->
    <aside class="w-1/5 p-4 border-l border-secondary-dark" v-if="FETCHED">
      <div class="flex flex-col gap-3">
        <p>
          <span class="text-lg text-primary-light">Judul:</span><br />
          <span class="text-sm text-primary-light opacity-40"
            >{{ DetailSoal?.judul }}</span
          >
        </p>
        <p>
          <span class="text-lg text-primary-light">Mata Pelajaran:</span><br />
          <span class="text-sm text-primary-light opacity-40">{{DetailSoal?.mapel}}</span>
        </p>
        <p>
          <span class="text-lg text-primary-light">Durasi Pengerjaan:</span><br />
          <span class="text-sm text-primary-light opacity-40">{{ DetailSoal?.durasi_menit }}</span>
        </p>
        <p>
          <span class="text-lg text-primary-light">Semester:</span
          ><br />
          <span class="text-sm text-primary-light opacity-40"
            >{{DetailSoal?.semester}}</span
          >
        </p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
import type { Soal, Test } from "~/types/main.types";

const route = useRoute();
const router = useRouter();
const toast = useToast()

const tesId = route.params.tes_id as string;
const SoalId = ref(route.params.soal_id as string);

const { GetSoal, GetSoalById, SendAnswer, GetSiswaTestById } = useSiswa();

const ujianList = ref<Soal[]>([]);
const SoalList = ref<Soal>();
const DetailSoal = ref<Test>();
const selectedAnswer = ref<string | null>(null);

const current = ref(1);
const answered = ref(0);

const FETCHED = ref(false);

// Jawaban yang sudah pernah disimpan dlus
const userAnswers = ref<{ [key: string]: string }>({});

// aommbil LocalStorage
const loadLocalAnswers = () => {
  const stored = localStorage.getItem("userAnswers");
  if (stored) {
    userAnswers.value = JSON.parse(stored);
  }
};

// smpan LocalStorage
const saveLocalAnswers = () => {
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers.value));
};

const jawabanListWithIds = computed(() => {
  if (!SoalList.value?.list_jawaban) return [];
  return SoalList.value.list_jawaban.map((item: any) => ({
    value: item.jawaban_id,
    label: item.teks_pilihan,
  }));
});

const fetchTests = async () => {
  if (!tesId) return;

  try {
    const data = await GetSoal(tesId);
    const detail = await GetSiswaTestById(tesId)
    const soal = await GetSoalById(SoalId.value);
    DetailSoal.value = detail
    ujianList.value = data;
    SoalList.value = soal;


    loadLocalAnswers();

    const savedAnswer = userAnswers.value[SoalId.value];
    if (savedAnswer) {
      selectedAnswer.value = savedAnswer;
      answered.value++;
    }

    FETCHED.value = true;
  } catch (error) {
    console.error("Failed to fetch tests:", error);
  }
};

onMounted(fetchTests);

const next = async () => {
  if (!selectedAnswer.value) {
    // alert("Pilih jawaban dulu ya!");
     toast.add({
        title: "Jawaban jangan dikosonginn",
        description: "isi",
        color: "warning",
      });
    return;
  }

  console.log("Jawaban yang dipilih:", selectedAnswer.value);

  // Kirim ke backend
  await SendAnswer(tesId, SoalId.value,  selectedAnswer.value);

  // Simpan ke local bcjhechjewcbhjes hje 
  userAnswers.value[SoalId.value] = selectedAnswer.value;
  saveLocalAnswers();

  // Update state
  answered.value++;
  current.value++;

  // Reset selected answer untuk next soal
  selectedAnswer.value = null;

  const nextSoal = ujianList.value[current.value - 1];
  if (nextSoal) {
    SoalId.value = nextSoal.soal_id;
    const soal = await GetSoalById(nextSoal.soal_id);
    SoalList.value = soal;

    // Load jawaban yang sudah pernah diisi (jika ada)
    const savedAnswer = userAnswers.value[nextSoal.soal_id];
    if (savedAnswer) {
      selectedAnswer.value = savedAnswer;
    }
  } else {
     toast.add({
        title: "Kamu udah Menjawab semua",
        description: "Selamat yey",
        color: "success",
      });
    // Ujian selesai
    router.push("/");
  }
};
</script>

<style scoped>
main {
  user-select: none;
}
</style>

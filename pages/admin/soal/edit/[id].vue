<template>
  <div class="text-primary-light">
    <div class="flex">
      <div class="flex-1 p-6">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-primary-light">Edit Soal</h1>
        </div>

        <div class="mb-6">
          <UTextarea
            v-model="formData.pertanyaan"
            :rows="4"
            :ui="{
              base: 'w-full bg-tertiary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            class="w-full"
            size="xl"
            placeholder="Masukkan pertanyaan..."
          ></UTextarea>

          <div class="mt-3">
            <UButton
              @click="triggerFileInput"
              variant="ghost"
              color="info"
              size="sm"
              icon="i-heroicons-photo"
              class="text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              Tambah Foto
            </UButton>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="hidden"
            />
          </div>

          <div v-if="selectedImage" class="mt-4">
            <img
              :src="selectedImage"
              alt="Selected"
              class="max-w-xs rounded border border-gray-600"
            />
            <UButton
              @click="removeImage"
              variant="ghost"
              color="error"
              size="xs"
              icon="i-heroicons-x-mark"
              class="mt-2 cursor-pointer"
            >
              Hapus Gambar
            </UButton>
          </div>
        </div>

        <div class="mb-6">
          <div v-if="formData.jenis_soal === 'pilihan_ganda'" class="space-y-3">
            <h2 class="text-lg font-semibold mb-4">Jawaban</h2>

            <div
              v-for="(option, index) in formData.pilihan_jawaban"
              :key="index"
              class="flex items-center gap-3"
            >
              <UInput
                v-model="option.teks_pilihan"
                :ui="{
                  base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light placeholder:text-primary-light/50',
                }"
                type="text"
                class="w-full flex-1"
                :placeholder="`Jawaban ${String.fromCharCode(65 + index)}`"
                size="xl"
              />
              <UButton
                @click="removeOption(index)"
                variant="ghost"
                size="md"
                color="error"
                icon="i-heroicons-trash"
                class="cursor-pointer"
                :disabled="formData.pilihan_jawaban.length <= 1"
              />
            </div>

            <UButton
              @click="addOption"
              variant="outline"
              icon="i-heroicons-plus"
              class="mt-2 cursor-pointer"
            >
              Tambah Pilihan
            </UButton>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-2"
                >Jawaban Benar:</label
              >
              <USelect
                v-model="formData.jawaban_benar"
                :ui="{
                  base: 'bg-primary-dark ring-primary-light/50 w-36 p-2',
                  placeholder: 'text-primary-light/50',
                  content: 'bg-tertiary-dark ring-0',
                  item: 'text-primary-light bg-tertiary-dark hover:bg-primary-dark rounded-md',
                }"
                :items="correctAnswerOptions"
                variant="outline"
                size="md"
                placeholder="Pilih jenis ujian"
              />
            </div>
          </div>
        </div>

        <!-- ... Rest of template is identical to tambah/[id].vue ... -->
        <!-- Only change the submitSoal method name to updateSoal -->
        <div class="flex gap-4">
          <UButton
            @click="updateSoal"
            size="lg"
            icon="i-heroicons-check"
            :loading="isSubmitting"
            :disabled="!isFormValid"
            class="cursor-pointer"
          >
            Update
          </UButton>
          <UButton
            @click="batal"
            variant="outline"
            color="error"
            size="lg"
            icon="i-heroicons-x-mark"
            class="cursor-pointer"
          >
            Batal
          </UButton>
        </div>
      </div>

      <div class="w-80 p-6 border-l border-tertiary-dark">
        <h3 class="text-lg font-semibold mb-4">Detail Soal</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Nama ujian: </label>
            <span class="text-gray-400">{{
              tesDetail?.judul || "Loading..."
            }}</span>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2"
              >Mata Pelajaran:</label
            >
            <span class="text-gray-400">{{
              tesDetail?.mapel || "Loading..."
            }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2"
              >Waktu Pengerjaan:</label
            >
            <span class="text-gray-400"
              >{{ tesDetail?.durasi_menit || "-" }} Menit</span
            >
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Poin:</label>
            <UInput
              v-model="formData.poin"
              :ui="{
                base: 'w-full text-center p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light ',
              }"
              min="1"
              type="number"
              size="md"
              class="w-full"
            />
          </div>
        </div>

        <div class="mt-6">
          <URadioGroup
            v-model="formData.jenis_soal"
            option-attribute="label"
            value-attribute="value"
            class="space-y-2"
            :items="[
              { label: 'Pilihan Ganda', value: 'pilihan_ganda' },
              { label: 'Essay', value: 'essay' },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Soal, Test, JawabanData } from "~/types/main.types";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});

interface FormData {
  pertanyaan: string;
  jenis_soal: string;
  file_gambar: File | null;
  poin: number;
  pilihan_jawaban: JawabanData[];
  jawaban_benar: string;
}

const route = useRoute();
const router = useRouter();
const toast = useToast();
const soalId = route.params.id as string;

const { updateSoal: updateSoalApi } = useSoal();
const { getAllAnswers, updateMultipleAnswers, deleteMultipleAnswers } =
  useAnswer();

const isSubmitting = ref(false);
const fileInput = ref<HTMLInputElement>();
const selectedImage = ref<string>("");
const tesDetail = ref<Test | null>(null);

const formData = ref<FormData>({
  pertanyaan: "",
  jenis_soal: "pilihan_ganda",
  file_gambar: null,
  poin: 1,
  pilihan_jawaban: [
    { teks_pilihan: "", is_benar: false },
    { teks_pilihan: "", is_benar: false },
  ],
  jawaban_benar: "0",
});

const correctAnswerOptions = computed(() =>
  formData.value.pilihan_jawaban.map((_, index) => ({
    value: index.toString(),
    label: `Pilihan ${String.fromCharCode(65 + index)}`,
  }))
);

const isFormValid = computed(() => {
  const hasQuestion = formData.value.pertanyaan.trim().length > 0;
  const hasValidType = formData.value.jenis_soal.length > 0;

  if (formData.value.jenis_soal === "pilihan_ganda") {
    const hasValidOptions = formData.value.pilihan_jawaban.every(
      (option) => option.teks_pilihan.trim().length > 0
    );
    const hasCorrectAnswer = formData.value.jawaban_benar !== "";
    return hasQuestion && hasValidType && hasValidOptions && hasCorrectAnswer;
  }

  if (formData.value.jenis_soal === "essay") {
    return hasQuestion && hasValidType;
  }

  return hasQuestion && hasValidType;
});

const fetchTesDetail = async () => {
  try {
    const { GetTestById } = useTest();
    // tesDetail.value = await GetTestById(tesId);
  } catch (error) {
    console.error("Failed to fetch test details:", error);
    toast.add({
      title: "Gagal memuat detail tes",
      color: "error",
    });
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        title: "File terlalu besar",
        description: "Ukuran file maksimal 5MB",
        color: "error",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.add({
        title: "Format file tidak valid",
        description: "Hanya file gambar yang diperbolehkan",
        color: "error",
      });
      return;
    }

    formData.value.file_gambar = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      selectedImage.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    toast.add({
      title: "Gambar berhasil dipilih",
      color: "primary",
    });
  }
};

const removeImage = () => {
  formData.value.file_gambar = null;
  selectedImage.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const addOption = () => {
  if (formData.value.pilihan_jawaban.length < 6) {
    formData.value.pilihan_jawaban.push({ teks_pilihan: "", is_benar: false });
  }
};

const removeOption = (index: number) => {
  if (formData.value.pilihan_jawaban.length > 1) {
    formData.value.pilihan_jawaban.splice(index, 1);

    const currentCorrect = parseInt(formData.value.jawaban_benar);
    if (currentCorrect === index) {
      formData.value.jawaban_benar = "0";
    } else if (currentCorrect > index) {
      formData.value.jawaban_benar = (currentCorrect - 1).toString();
    }
  }
};

// Add new method to fetch existing question data
const fetchSoalData = async () => {
  try {
    const soal = await getSoalById(soalId);
    if (soal) {
      formData.value.pertanyaan = soal.pertanyaan;
      formData.value.jenis_soal = soal.jenis_soal;
      formData.value.poin = soal.poin;

      if (soal.file_gambar) {
        selectedImage.value = soal.file_gambar;
      }

      if (soal.jenis_soal === "pilihan_ganda") {
        const answers = await getAllAnswers(soalId);
        formData.value.pilihan_jawaban = answers.map((jawaban) => ({
          teks_pilihan: jawaban.teks_pilihan,
          is_benar: jawaban.is_benar,
          jawaban_id: jawaban.jawaban_id,
        }));

        const correctIndex = formData.value.pilihan_jawaban.findIndex(
          (p) => p.is_benar
        );
        if (correctIndex !== -1) {
          formData.value.jawaban_benar = correctIndex.toString();
        }
      }
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    toast.add({
      title: "Gagal memuat soal",
      color: "error",
    });
  }
};

const updateSoal = async () => {
  if (!isFormValid.value) {
    toast.add({
      title: "Form tidak lengkap",
      description: "Mohon lengkapi semua field yang diperlukan",
      color: "error",
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const soalData = new FormData();
    soalData.append("pertanyaan", formData.value.pertanyaan);
    soalData.append("jenis_soal", formData.value.jenis_soal);
    soalData.append("poin", formData.value.poin.toString());

    if (
      formData.value.file_gambar &&
      formData.value.file_gambar instanceof File
    ) {
      soalData.append("file_gambar", formData.value.file_gambar);
    }

    await updateSoalApi(soalId, soalData);

    if (formData.value.jenis_soal === "pilihan_ganda") {
      const existingAnswers = formData.value.pilihan_jawaban.filter(
        (p) => p.jawaban_id
      );
      const updatedAnswers = existingAnswers.map((option, index) => ({
        teks_pilihan: option.teks_pilihan,
        is_benar: index.toString() === formData.value.jawaban_benar,
      }));

      await updateMultipleAnswers(soalId, updatedAnswers);
    }

    toast.add({
      title: "Berhasil!",
      description: "Soal berhasil diupdate",
      color: "primary",
    });

    router.push(`/admin/soal/${soalId}`);
  } catch (error: any) {
    toast.add({
      title: "Gagal mengupdate soal",
      description: error?.message || "Terjadi kesalahan",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const batal = () => {
  if (formData.value.pertanyaan.trim() || formData.value.file_gambar) {
    const confirmed = confirm(
      "Apakah Anda yakin ingin membatalkan? Data yang sudah diinput akan hilang."
    );
    if (confirmed) {
      router.push(`/admin/soal/${soalId}`);
    }
  } else {
    router.push(`/admin/soal/${soalId}`);
  }
};

watch(
  () => formData.value.jenis_soal,
  (newType) => {
    if (
      newType === "pilihan_ganda" &&
      formData.value.pilihan_jawaban.length === 0
    ) {
      formData.value.pilihan_jawaban = [
        { teks_pilihan: "", is_benar: false },
        { teks_pilihan: "", is_benar: false },
      ];
      formData.value.jawaban_benar = "0";
    }
  }
);

onMounted(() => {
  fetchSoalData();
  fetchTesDetail();
});
</script>

<style></style>

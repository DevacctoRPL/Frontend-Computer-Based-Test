<template>
  <div class="h-full text-white flex items-center justify-center px-4">
    <div
      class="w-full max-w-3xl ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50 rounded-lg p-6"
    >
      <h2 class="text-3xl font-bold text-center mb-6">Detail Ujian</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block mb-1">Judul</label>
          <UInput
            v-model="formData.judul"
            :ui="{
              base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            type="text"
            class="w-full"
            size="xl"
          />
        </div>

        <div>
          <label class="block mb-1">Deskripsi</label>
          <UTextarea
            v-model="formData.deskripsi"
            :rows="3"
            :ui="{
              base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            class="w-full"
            size="xl"
          ></UTextarea>
        </div>

        <div>
          <label class="block mb-1">Durasi (menit)</label>
          <UInput
            v-model="formData.durasi_menit"
            :ui="{
              base: 'w-full text-center p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light ',
            }"
            min="1"
            max="120"
            type="number"
            size="xl"
            placeholder="Misal: 90"
            class="w-full"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Tanggal Mulai</label>
            <UInput
              v-model="formData.tanggal_mulai"
              :ui="{
                base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light',
              }"
              size="xl"
              type="date"
              class="w-full"
            />
          </div>
          <div>
            <label class="block mb-1">Tanggal Selesai</label>
            <UInput
              v-model="formData.tanggal_selesai"
              :ui="{
                base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light ',
              }"
              size="xl"
              type="date"
              class="w-full"
            />
          </div>
        </div>

        <div>
          <label class="block mb-1">Jam Mulai</label>
          <UInput
            v-model="formData.jam_mulai"
            :ui="{
              base: 'w-full p-2 bg-primary-dark rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            type="time"
            size="xl"
            class="w-full"
          />
        </div>

        <div>
          <label class="block mb-1">Batas Percobaan</label>
          <UInput
            v-model="formData.batas_percobaan"
            :ui="{
              base: 'w-full text-center bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            size="xl"
            type="number"
            min="1"
            class="w-full"
          />
        </div>

        <div>
          <label class="block mb-1">Password Tes</label>
          <UInput
            v-model="formData.password_tes"
            :ui="{
              base: 'w-full bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            type="text"
            size="xl"
            class="w-full"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Mapel</label>
            <UInput
              v-model="formData.mapel"
              :ui="{
                base: 'w-full bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50',
              }"
              type="text"
              size="xl"
              class="w-full"
            />
          </div>
          <div>
            <label class="block mb-1">Jenis Ujian</label>
            <USelect
              v-model="formData.jenis_ujian"
              :ui="{
                base: 'bg-primary-dark ring-primary-light/50 w-full p-2',
                placeholder: 'text-primary-light/50',
                content: 'bg-tertiary-dark ring-0',
                item: 'text-primary-light bg-tertiary-dark hover:bg-primary-dark rounded-md',
              }"
              variant="outline"
              size="xl"
              :items="jenisUjian"
              placeholder="Pilih jenis ujian"
            />
          </div>
        </div>

        <div>
          <label class="block mb-1">Semester</label>
          <UInput
            v-model="formData.semester"
            :ui="{
              base: 'w-full p-2 text-center bg-primary-dark rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/50',
            }"
            class="w-full"
            type="number"
            min="1"
            size="xl"
          />
        </div>

        <div>
          <label class="block mb-1">Kelas</label>
          <div
            v-for="(kelas, index) in formData.kelas"
            :key="index"
            class="flex items-center mb-2"
          >
            <UInput
              v-model="formData.kelas[index]"
              :ui="{
                base: 'w-full bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light',
              }"
              type="text"
              size="xl"
              placeholder="Misal: X-RPL-1"
              class="flex-grow mr-2"
            />
            <UButton
              icon="i-lucide-minus"
              color="error"
              variant="solid"
              @click="removeKelas(index)"
            />
          </div>
          <UButton
            icon="i-lucide-plus"
            color="primary"
            variant="solid"
            @click="addKelas"
          >
            Tambah Kelas
          </UButton>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="w-full hover:ring-primary-light cursor-pointer ring ring-primary-light/50 py-2 rounded-md text-white"
          >
            Update Ujian
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, navigateTo } from "#app"; // Assuming Nuxt 3 imports
import { useTest } from "~/composables/useTest"; // Adjust the path to your useTest composable

definePageMeta({
  layout: "admin",
  middleware: "auth",
  path: "/admin/ujian/update/:id",
});

const { GetTestById, EditTest } = useTest();
const jenisUjian = ["PAS", "PAT"];

const tes_id = useRoute().params.id as string;

const formData = ref<{
  tes_id: string;
  judul: string;
  deskripsi: string;
  durasi_menit: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  batas_percobaan: number;
  password_tes: string;
  mapel: string;
  jenis_ujian: string;
  semester: number;
  kelas: string[];
  jam_mulai: string;
}>({
  tes_id: "",
  judul: "",
  deskripsi: "",
  durasi_menit: 0,
  tanggal_mulai: "",
  tanggal_selesai: "",
  batas_percobaan: 0,
  password_tes: "",
  mapel: "",
  jenis_ujian: "",
  semester: 0,
  kelas: [],
  jam_mulai: "",
});

// Function to add a new empty class input field
const addKelas = () => {
  formData.value.kelas.push("");
};

const removeKelas = (index: number) => {
  formData.value.kelas.splice(index, 1);
};

onMounted(async () => {
  try {
    const data = await GetTestById(tes_id);

    const kelasData = Array.isArray(data.kelas) ? data.kelas : [];

    formData.value = {
      tes_id,
      judul: data.judul,
      deskripsi: data.deskripsi,
      durasi_menit: data.durasi_menit,
      tanggal_mulai: data.tanggal_mulai.split(" ")[0],
      tanggal_selesai: data.tanggal_selesai.split(" ")[0],
      batas_percobaan: data.batas_percobaan,
      password_tes: data.password_tes,
      mapel: data.mapel,
      jenis_ujian: data.jenis_ujian,
      semester: data.semester,
      kelas: kelasData,
      jam_mulai: data.jam_mulai,
    };
  } catch (error) {
    console.error("Error fetching test data:", error);
  }
});

const handleSubmit = async () => {
  try {
    await EditTest(tes_id, {
      ...formData.value,
    });
    alert("Berhasil mengupdate ujian.");
    navigateTo("/admin/ujian");
  } catch (err) {
    console.error("Gagal update:", err);
    alert("Gagal mengupdate ujian. Silakan coba lagi.");
  }
};
</script>

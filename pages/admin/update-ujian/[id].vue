<template>
  <div class="h-full text-white flex items-center justify-center px-4">
    <div
      class="w-full max-w-3xl ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/30 rounded-lg p-6"
    >
      <h2 class="text-3xl font-bold text-center mb-6">Detail Ujian</h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Judul ujiannya -->
        <div>
          <label class="block mb-1">Judul</label>
          <UInput
            v-model="formData.judul"
            :ui="{
              base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light placeholder:text-primary-light/30',
            }"
            type="text"
            class="w-full"
            size="xl"
            placeholder="Masukkan judul ujian"
          />
        </div>

        <!-- Deskripsi nya-->
        <div>
          <label class="block mb-1">Deskripsi</label>
          <UTextarea
            v-model="formData.deskripsi"
            :rows="3"
            :ui="{
              base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light placeholder:text-primary-light/30',
            }"
            class="w-full"
            placeholder="Masukkan deskripsi..."
          ></UTextarea>
        </div>

        <!-- Durasi Menit -->
        <div>
          <label class="block mb-1">Durasi (menit)</label>
          <UInputNumber
            v-model="formData.durasi_menit"
            :ui="{
              base: 'w-full p-2 rounded-md ring ring-primary-light/50 bg-primary-dark focus-visible:ring-primary-light ',
            }"
            :min="1"
            :max="120"
            color="primary"
            :increment="{
              color: 'neutral',
            }"
            :decrement="{
              color: 'neutral',
            }"
            placeholder="Misal: 90"
            class="w-full"
          />
        </div>

        <!-- Tanggal Mulai & Tanggal Selesai harusnyaa -->
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

        <!-- Jam mulai -->
        <div>
          <label class="block mb-1">Jam Mulai</label>
          <UInput
            v-model="formData.jam_mulai"
            :ui="{
              base: 'w-full p-2 bg-primary-dark rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/30',
            }"
            type="time"
            size="xl"
            class="w-full"
          />
        </div>

        <div>
          <label class="block mb-1">Batas Percobaan</label>
          <UInputNumber
            v-model="formData.batas_percobaan"
            :ui="{
              base: 'w-full bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/30',
            }"
            :increment="{
              color: 'neutral',
            }"
            :decrement="{
              color: 'neutral',
            }"
            size="xl"
            class="w-full"
          />
        </div>

        <!-- password tes atau uian -->
        <div>
          <label class="block mb-1">Password Tes</label>
          <UInput
            v-model="formData.password_tes"
            :ui="{
              base: 'w-full bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/30',
            }"
            type="text"
            size="xl"
            class="w-full"
          />
        </div>

        <!-- MapelUjian -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block mb-1">Mapel</label>
            <UInput
              v-model="formData.mapel"
              :ui="{
                base: 'w-full bg-primary-dark p-2 rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/30',
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
              }"
              variant="outline"
              size="xl"
              :items="jenisUjian"
              placeholder="Pilih jenis ujian"
            />
          </div>
        </div>

        <!-- Semester berapa gitu -->
        <div>
          <label class="block mb-1">Semester</label>
          <UInputNumber
            v-model="formData.semester"
            :ui="{
              base: 'w-full p-2 bg-primary-dark rounded-md ring ring-primary-light/50 focus-visible:ring-primary-light placeholder:text-primary-light/30',
            }"
            class="w-full"
            :increment="{
              color: 'neutral',
            }"
            :decrement="{
              color: 'neutral',
            }"
            :min="0"
            :max="6"
            size="xl"
          />
        </div>

        <!-- Kelas-->
        <div>
          <label class="block mb-1">Kelas</label>
          <div class="grid grid-cols-2 gap-2">
            <div
              v-for="kelas in DaftarKelas"
              :key="kelas"
              class="flex items-center"
            >
              <input
                type="checkbox"
                :value="kelas"
                v-model="formData.kelas"
                class="mr-2 accent-answered"
              />
              <label>{{ kelas }}</label>
            </div>
          </div>
        </div>

        <!-- Tombol bol tombol -->
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
definePageMeta({
  layout: "admin",
  middleware: "auth",
  path: "/admin/ujian/update/:id",
});

const { GetTestById, EditTest } = useTest();
const jenisUjian = ["PAS", "PAT"];

const tes_id = useRoute().params.id as string;

const DaftarKelas = [
  "X-RPL-1",
  "X-RPL-2",
  "XI-RPL-1",
  "XI-RPL-2",
  "XI-RPL-3",
  "X-TKJ-1",
  "X-TKJ-2",
  "X-TKJ-3",
  "XI-TKJ-1",
  "XI-TKJ-2",
  "XI-TKJ-3",
  "X-MM-1",
  "X-MM-2",
  "X-MM-3",
  "X-MM-4",
  "XI-MM-1",
  "XI-MM-2",
  "XI-MM-3",
  "XI-MM-4",
  "X-PKM-1",
  "X-PKM-2",
  "X-PKM-3",
  "XI-PKM-1",
  "XI-PKM-2",
  "XI-PKM-3",
];

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
  semester: string;
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
  semester: "",
  kelas: [],
  jam_mulai: "",
});

const formatDateForInput = (dateString: string) => {
  return dateString.split(" ")[0];
};

onMounted(async () => {
  const data = await GetTestById(tes_id);
  console.log(data);
  formData.value = {
    tes_id,
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
    kelas: Array.isArray(data.kelas) ? data.kelas : [],
    jam_mulai: data.jam_mulai,
  };
});

const handleSubmit = async () => {
  try {
    await EditTest(tes_id, {
      ...formData.value,
      semester: formData.value.semester.toString(),
    });
    alert("Berhasil mengupdate ujian.");
    navigateTo("/admin/ujian");
  } catch (err) {
    console.error("Gagal update:", err);
  }
};
</script>

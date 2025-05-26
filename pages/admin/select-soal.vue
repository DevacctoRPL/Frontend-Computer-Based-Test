<template>
  <div class="min-h-screen flex items-center justify-center text-white">
    <div
      class="w-full h-80 max-w-md mb-4 p-6 border border-white/20 rounded-xl shadow-md"
    >
      <UButton
        class="text-sm hover:text-white text-white"
        variant="link"
        icon="i-heroicons-arrow-left"
        @click="$router.back()"
      >
        Kembali
      </UButton>

      <h1 class="text-2xl font-bold text-center mb-6">Detail Soal</h1>

      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="mb-1 text-primary-light" for="subject">Tes</label>
          <USelect
            :ui="{
              base: 'w-full mb-10 z-50 bg-primary-dark outline-primary-light ring-1 ring-primary-light',
              content: 'bg-primary-dark ring-1 ring-primary-light',
              value: 'bg-primary-dark'
            }"
            
            size="xl"
            v-model="form.subject"
            :items="              ujianList.map((test) => ({
                label: test.judul,
                value: test.tes_id,
              }))"
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 8,
            }"
            placeholder="Pilih Tes"
            class="text-primary-light"
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 border border-white text-white rounded-md hover:bg-white hover:text-black transition"
        >
          Buat Soal
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { type Test } from "~/types/main.types";

const router = useRouter();
const { GetTest } = useTest();

const items = ref(['Backlog', 'Todo', 'In Progress', 'Done'])

const ujianList = ref<Test[]>([]);

onMounted(async () => {
  try {
    const data = await GetTest();
    ujianList.value = data;
    console.log(ujianList.value);
  } catch (error) {
    console.error("Gagal mengambil daftar tes:", error);
  }
});

const form = ref({
  subject: "", // ini akan berisi tes_id dari USelect
});

function submitForm() {
  if (!form.value.subject) {
    alert("Silakan pilih tes terlebih dahulu.");
    return;
  }

  // Navigasi ke halaman soal berdasarkan tes_id
  router.push(`/admin/soal/${form.value.subject}`);
}
</script>

<style scoped>
/* jika ingin ubah style USelect text putih, bisa atur di sini */
</style>

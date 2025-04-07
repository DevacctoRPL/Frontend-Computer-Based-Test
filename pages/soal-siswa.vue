<template>
  <!-- ? Mantap Jon, gua benerin dikit - Adit -->
  <!-- ? Setelah diskusi lebih lanjut, kami sepakat untuk membuat border menjadi solid color. Terimakasih atas kerja keras untuk pembuat border yang dahulu - Adit UI Side -->
  <div class="flex min-h-screen bg-primary-dark text-primary-light pt-16">
    <!-- Sidebar nyaa -->
    <aside class="w-1/5 p-4 border-r border-secondary-dark flex flex-col">
      <div>
        <div class="grid grid-cols-5 space-x-0.5 space-y-3 transition-all">
          <!-- Nanti bakal diambil dari api buat is-answered, mungkin. is-active pakai url params -->
          <NumberButton
            v-for="i in 30"
            :to="'/soal/' + i"
            :is-answered="i <= answered ? true : false"
            :is-active="i == current ? true : false"
            >{{ i }}</NumberButton
          >
        </div>
      </div>

      <!-- Tombol Navigasi -->
      <div class="mt-6 flex items-center justify-between gap-1">
        <NuxtLink
          to="#"
          class="w-24 h-10 cursor-pointer transition-all bg-secondary-dark hover:bg-primary-light/40 text-primary-light rounded flex items-center justify-center"
        >
          <UIcon name="lucide:chevron-left" size="24" />
        </NuxtLink>

        <UButton
          variant="outline"
          class="w-10 h-10 cursor-pointer hover:bg-yellow-400/10 text-yellow-400 rounded ring-amber-300 flex items-center justify-center"
        >
          <UIcon name="lucide:flag" size="24" />
        </UButton>

        <NuxtLink
          to="#"
          class="w-24 h-10 cursor-pointer transition-all bg-secondary-dark hover:bg-primary-light/40 text-primary-light rounded flex items-center justify-center"
        >
          <UIcon name="lucide:chevron-right" size="24" />
        </NuxtLink>
      </div>
    </aside>

    <!-- Main Contentt -->
    <main class="flex-1 p-6">
      <div>
        <h1 class="text-xl font-bold">What is Lorem Ipsum?</h1>
        <p class="mt-2 text-gray-300">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <textarea
          rows="10"
          placeholder="Jawaban Anda"
          class="w-full p-2 mt-4 bg-secondary-dark/50 outline outline-[#2E2E2E] rounded-md"
        ></textarea>

        <!-- Pencet, Nanti kira-kira gitu hasilnya - Adit -->
        <UButton
          v-if="answered < 30"
          variant="outline"
          @click="next()"
          class="mt-14 cursor-pointer float-end ring-1 ring-primary-light text-primary-light hover:bg-primary-light/10 py-2 px-3 rounded"
        >
          Selanjutnya →
        </UButton>
        <UButton v-else icon="lucide:send" class="mt-14 cursor-pointer float-end py-2 px-3 rounded">
          Selesai
        </UButton>
      </div>
    </main>

    <!-- Right Panel nya -->
    <!-- nanti ku buat lebih best practice kalo bisa -->
    <aside class="w-1/5 p-4 border-l border-secondary-dark">
      <div class="flex flex-col gap-3">
        <p>
          <span class="text-lg text-primary-light">Guru:</span><br />
          <span class="text-sm text-primary-light opacity-40"
            >Ir. Joko Widodo</span
          >
        </p>
        <p>
          <span class="text-lg text-primary-light">Mata Pelajaran:</span><br />
          <span class="text-sm text-primary-light opacity-40">Matematika</span>
        </p>
        <p>
          <span class="text-lg text-primary-light">Jumlah Soal:</span><br />
          <span class="text-sm text-primary-light opacity-40">7000</span>
        </p>
        <p>
          <span class="text-lg text-primary-light">Waktu Pengerjaan:</span
          ><br />
          <span class="text-sm text-primary-light opacity-40"
            >Sampai Kiamat</span
          >
        </p>
      </div>
    </aside>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  path: "/soal",
});

const answered = ref(0)
const current = ref(1)

const next = () => {
  answered.value++
  current.value++
}

</script>

<style scoped>
main {
  user-select: none;
}
</style>
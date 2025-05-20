<template>
  <div
    class="flex justify-center items-center h-screen text-primary-light bg-gradient-to-b from-tertiary-dark to-primary-dark gap-16"
  >
    <UCard class="md:w-1/4 bg-primary-dark/15 ring-primary-light/30">
      <UForm :state="state" @submit.prevent="">
        <div class="mb-5 text-center">
          <img
            src="~/assets/images/Penus.webp"
            alt="Logo"
            class="w-14 mx-auto"
          />
          <h1 class="text-3xl font-bold text-center">Kode Tes</h1>
          <span class="">Masukan kode tes untuk masuk ujian</span>
        </div>
        <UFormField required label="Kode Tes" size="xl" class="mb-3">
          <UInput
            required
            v-model="state.code"
            placeholder="Masukan Kode"
            type="text"
            :ui="{
              base: 'transition-all w-full mb-3 p-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full"
          />
        </UFormField>
        <UButton
          variant="outline"
          type="submit"
          class="w-full p-2 text-xl font-bold flex justify-center cursor-pointer text-primary-light ring-primary-light/70 hover:bg-primary-light/10"
        >
          Cek Kode
        </UButton>
      </UForm>
    </UCard>
    <div v-if="FETCHED" class="h-2/3 w-[1px] bg-primary-light/30" />
    <UCard
      v-if="FETCHED"
      class="md:w-1/4 bg-primary-dark/15 ring-primary-light/30"
    >
      <div class="mb-5 text-center">
        <h1 class="text-3xl font-bold text-center">Info</h1>
        <span class="">Informasi dasar ujian</span>
      </div>
      <div class="flex flex-col gap-2">
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
      </div>
      <UButton
        variant="outline"
        @click="navigateTo('/soal')"
        class="w-full mt-3.5 p-2 text-xl font-bold flex justify-center cursor-pointer text-primary-light ring-primary-light/70 hover:bg-primary-light/10"
      >
        Masuk
      </UButton>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

// Nanti bakal di ganti sesuai ama api, sementara aja ini - Adit
const FETCHED = ref(true);

const state = ref({
  code: "",
  validSoal: true,
});
</script>

<style></style>

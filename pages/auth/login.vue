<template>
  <div
    class="flex justify-center items-center h-screen text-primary-light bg-gradient-to-b from-tertiary-dark to-primary-dark"
  >
    <UCard class="w-96 bg-primary-dark/15 ring-primary-light/30">
      <UForm :state="state" @submit="">
        <h1 class="text-4xl font-bold text-center mb-5">Masuk</h1>
        <UFormField required label="Nama Pengguna" size="xl">
          <UInput
            required
            placeholder="Masukan Nama Pengguna"
            type="text"
            :ui="{
              base: 'w-full mb-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-2.5"
          />
        </UFormField>

        <UFormField required label="Email" size="xl">
          <UInput
            required
            placeholder="Masukan Email"
            type="email"
            :ui="{
              base: 'w-full mb-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-2.5"
          />
        </UFormField>

        <UFormField required label="Kata Sandi" size="xl">
          <UInput
            required
            placeholder="Masukan Kata Sandi"
            type="password"
            :ui="{
              base: 'w-full mb-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-10"
          />
        </UFormField>

        <UButton
          variant="outline"
          type="submit"
          class="w-full p-2.5 text-xl font-bold flex justify-center cursor-pointer text-primary-light ring-primary-light/70 hover:bg-primary-light/10"
        >
          Masuk
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  path: "/login",
});

const state = ref({
  username: "",
  email: "",
  password: "",
  c_password: "",
});
</script>

<style></style>

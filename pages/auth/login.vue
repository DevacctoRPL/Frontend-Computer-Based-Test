<template>
  <div
    class="flex justify-center items-center h-screen text-primary-light bg-gradient-to-b from-tertiary-dark to-primary-dark"
  >
    <UCard class="md:w-1/3 bg-primary-dark/15 ring-primary-light/30">
      <UForm :state="state" @submit.prevent="Login(state)">
        <div class="mb-5 text-center">
          <img
            src="~/assets/images/Penus.webp"
            alt="Logo"
            class="w-14 mx-auto"
          />
          <h1 class="text-3xl font-bold text-center">Masuk</h1>
          <span class="">Masukan kredensial untuk masuk ke akun anda</span>
        </div>
        <UFormField required label="Nama Pengguna" size="xl">
          <UInput
            required
            v-model="state.username"
            placeholder="Masukan Nama Pengguna"
            type="text"
            :ui="{
              base: 'transition-all w-full mb-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-2"
          />
        </UFormField>

        <UFormField required label="Email" size="xl">
          <UInput
            required
            v-model="state.email"
            placeholder="Masukan Email"
            type="email"
            :ui="{
              base: 'transition-all w-full mb-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-2"
          />
        </UFormField>

        <UFormField required label="Kata Sandi" size="xl">
          <UInput
            required
            v-model="state.password"
            placeholder="Masukan Kata Sandi"
            type="password"
            :ui="{
              base: 'transition-all w-full mb-2.5 bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-2"
          />
        </UFormField>

        <UFormField required label="Kata Sandi" size="xl">
          <UInput
            required
            v-model="state.c_password"
            placeholder="Masukan Kata Sandi lagi"
            type="password"
            :ui="{
              base: 'transition-all w-full mb-2.5 p-2.5  bg-secondary-dark/35 focus:ring-primary-light focus-visible:ring-primary-light/70 ring-primary-light/50 placeholder:text-primary-light/40',
            }"
            class="w-full mb-10"
          />
        </UFormField>

        <UButton
          variant="outline"
          type="submit"
          class="w-full p-2 text-xl font-bold flex justify-center cursor-pointer text-primary-light ring-primary-light/70 hover:bg-primary-light/10"
        >
          Masuk
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const { Login } = useAuth();

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

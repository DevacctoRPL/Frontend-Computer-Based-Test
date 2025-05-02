<template>
  <aside class="relative w-64 bg-primary-dark p-4 flex flex-col">
    <h1 class="text-xl font-bold mb-12">Cobate</h1>
    <nav class="flex flex-col gap-2">
      <NuxtLink
        to="/admin"
        class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark"
      >
        <Icon name="lucide:home" class="w-5 h-5" />
        Beranda
      </NuxtLink>
      <NuxtLink
        to="/admin/soal"
        class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark"
      >
        <Icon name="lucide:book-open" class="w-5 h-5" />
        Soal
      </NuxtLink>
      <NuxtLink
        to="/admin/ujian"
        class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark"
      >
        <Icon name="lucide:file-text" class="w-5 h-5" />
        Ujian
      </NuxtLink>
      <NuxtLink
        to="/admin/siswa"
        class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark"
      >
        <Icon name="lucide:user" class="w-5 h-5" />
        Siswa
      </NuxtLink>
    </nav>
    <div class="w-1.5 h-full top-0 right-0 absolute cursor-e-resize">
      <div class="w-[1px] h-full bg-tertiary-dark absolute right-0 top-0"></div>
    </div>
  </aside>
</template>

<style scoped>
.exactActiveClass {
  background-color: var(--color-tertiary-dark);
}
</style>

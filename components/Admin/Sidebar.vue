<template>
  <aside class="sticky z-50 w-64 bg-primary-dark flex justify-between flex-col">
    <div class="sticky top-0">
      <div class="flex items-center h-16 px-4">
        <img src="~/assets/images/Penus.webp" alt="Logo" class="w-12" />
        <h1 class="text-2xl font-semibold">
          Cobate
        </h1>
      </div>
      <nav class="flex flex-col gap-2 p-4">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-2 p-2 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:home" class="w-5 h-5" />
          Beranda
        </NuxtLink>
        <NuxtLink
          to="/admin/soal"
          class="flex items-center gap-2 p-2 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:book-open" class="w-5 h-5" />
          Soal
        </NuxtLink>
        <NuxtLink
          to="/admin/ujian"
          class="flex items-center gap-2 p-2 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:file-text" class="w-5 h-5" />
          Ujian
        </NuxtLink>
        <NuxtLink
          to="/admin/siswa"
          class="flex items-center gap-2 p-2 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:user" class="w-5 h-5" />
          Siswa
        </NuxtLink>
      </nav>
    </div>
    <AdminProfileWidget />
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

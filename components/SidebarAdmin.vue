<template>
 <aside class="w-64 bg-primary-dark p-4 flex flex-col border-1 border-tertiary-dark">
      <h1 class="text-xl font-bold mb-12">Cobate</h1>
      <nav class="flex flex-col gap-2">
        <NuxtLink to="/" class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark">
          <Icon name="lucide:home" class="w-5 h-5" />
          Beranda
        </NuxtLink>
        <NuxtLink to="/soal" class="flex items-center gap-2 p-2 rounded bg-tertiary-dark">
          <Icon name="lucide:book-open" class="w-5 h-5" />
          Soal
        </NuxtLink>
        <NuxtLink to="/ujian" class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark">
          <Icon name="lucide:file-text" class="w-5 h-5" />
          Ujian
        </NuxtLink>
        <NuxtLink to="/siswa" class="flex items-center gap-2 p-2 rounded hover:bg-tertiary-dark">
          <Icon name="lucide:user" class="w-5 h-5" />
          Siswa
        </NuxtLink>
      </nav>
    </aside>
</template>

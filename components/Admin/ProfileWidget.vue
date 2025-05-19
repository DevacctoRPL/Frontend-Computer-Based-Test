<template>
  <div class="sticky z-50 bottom-0 w-full p-4 flex flex-col border-t border-tertiary-dark rounded-t-2xl"> 
    <div class="w-full flex justify-between items-center px-2">
      <div class="flex gap-3 items-center">
        <UAvatar />
        <span class="font-semibold"> Aditya </span>
      </div>
      <UIcon
        @click="fold()"
        :name="folded ? 'lucide:chevron-up' : 'lucide:chevron-down'"
        class="size-6 cursor-pointer"
      />
    </div>
    <div class="transition-all ease-in-out duration-200 dropdown max-h-0 overflow-hidden">
      <div class="flex flex-col gap-2 mt-4">
        <NuxtLink
          to="/admin/profil"
          class="flex items-center gap-2 p-1 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:user" class="w-5 h-5" />
          Profil
        </NuxtLink>
        <NuxtLink
          to="/admin/setting"
          class="flex items-center gap-2 p-1 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:settings" class="w-5 h-5" />
          Pengaturan
        </NuxtLink>
        <NuxtLink
          to="/admin/logout"
          class="flex items-center gap-2 p-1 pl-3.5 rounded hover:bg-tertiary-dark"
        >
          <UIcon name="lucide:log-out" class="w-5 h-5" />
          Keluar
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let folded = ref(true)
function fold() {
  const dropdown = document.querySelector(".dropdown") as HTMLDivElement;

  if (dropdown.classList.contains('max-h-0')) {
    folded.value = false
    dropdown.classList.replace("max-h-0", "max-h-72");
  } else if (dropdown.classList.contains('max-h-72')) {
    folded.value = true
    dropdown.classList.replace("max-h-72", "max-h-0");
  }
}
</script>

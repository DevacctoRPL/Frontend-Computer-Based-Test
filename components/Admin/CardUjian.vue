<template>
  <UCard
    class="bg-primary-dark ring-primary-light/50 rounded-lg shadow-md overflow-hidden h-auto min-w-60 max-w-60"
  >
    <div class="flex justify-center items-center gap-2 pb-2 mb-2 border-b border-tertiary-dark">
      <NuxtLink :href="`/admin/ujian/update/${ujian.id}`">
        <UButton
          icon="i-heroicons-pencil-square"
          color="primary"
          variant="solid"
          size="sm"
          label="Edit"
          class="cursor-pointer"
        />
      </NuxtLink>
      <UButton
        icon="i-heroicons-trash"
        color="error"
        variant="solid"
        size="sm"
        label="Delete"
        class="hover:bg-red-600 cursor-pointer"
        @click="handleDelete"
      />
    </div>
    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-grow">
        <h3 class="text-xl font-bold text-white mb-2">{{ ujian.judul }}</h3>
        <p class="text-sm text-gray-400 mb-4">{{ ujian.mapel }}</p>
        <p class="text-sm text-gray-300 mb-4">{{ ujian.deskripsi }}</p>

        <div class="space-y-2">
          <div class="flex items-center text-white">
            <UIcon name="i-heroicons-tag" class="mr-2 text-primary-light" />
            <span class="font-semibold">Jenis Ujian:</span>
            <span class="ml-2 text-primary-light opacity-70">{{
              ujian.jenis_ujian
            }}</span>
          </div>

          <div class="flex items-center text-white">
            <UIcon name="i-heroicons-clock" class="mr-2 text-primary-light" />
            <span class="font-semibold">Durasi:</span>
            <span class="ml-2 text-primary-light opacity-70"
              >{{ ujian.durasi_menit }} Menit</span
            >
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { DeleteTest } = useTest();

const emit = defineEmits(["deleted"]);

const props = defineProps<{
  ujian: {
    id: string;
    judul: string;
    deskripsi: string;
    mapel: string;
    jenis_ujian: string;
    durasi_menit: number;
  };
}>();

const handleDelete = async () => {
  if (
    confirm(`Yakin ingin menghapus ujian ini? "${props.ujian.judul}"?`)
  ) {
    try {
      await DeleteTest(props.ujian.id);
      emit("deleted", props.ujian.id);
    } catch (error) {
      console.error("Gagal menghapus ujian:", error);
      alert("Gagal menghapus ujian. Silahkan coba lagi."); 
    }
  }
};
</script>
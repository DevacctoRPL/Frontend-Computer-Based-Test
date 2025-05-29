<template>
  <UCard
    :ui="{
      header: 'text-primary-light font-semibold border-primary-light/30 p-2',
    }"
    class="ring-primary-light/30 bg-tertiary-dark/60 rounded-lg shadow-md overflow-hidden h-full min-w-60 max-w-60"
  >
    <template #header>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-pencil-square"
          :to="`/admin/ujian/update/${ujian.id}`"
        />
        <UButton
          color="error"
          variant="ghost"
          icon="i-heroicons-trash"
          class="cursor-pointer"
          @click="handleDelete"
        />
      </div>
    </template>

    <div class="flex flex-col h-full">
      <div class="flex flex-col flex-grow">
        <h3 class="text-xl font-bold text-white mb-2">{{ ujian.judul }}</h3>
        <p class="text-sm text-gray-300 mb-4">{{ ujian.deskripsi }}</p>

        <div class="space-y-2">
          <div class="flex items-center text-white">
            <UIcon name="i-heroicons-book-open" class="mr-2 text-primary-light" />
            <span class="font-semibold">Mata Pelajaran:</span>
            <span class="ml-2 text-primary-light opacity-70">{{
              ujian.mapel
            }}</span>
          </div>

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
  if (confirm(`Yakin ingin menghapus ujian ini? "${props.ujian.judul}"?`)) {
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

<template>
  <UCard
    class="bg-primary-dark border border-answered w-80 h-72 flex justify-start"
  >
    <div class="flex gap-3">
      <NuxtLink :href="`/admin/update-ujian/${ujian.id}`">
        <button
          class="bg-answered px-3 rounded-sm text-primary-dark"
          icon="lucide:edit"
          @click=""
        >
          edit
        </button>
      </NuxtLink>
      <button
        class="bg-red-500 px-3 rounded-sm text-primary-dark"
        icon="lucide:delete"
        @click="handleDelete"
      >
        Delete
      </button>
    </div>
    <div class="flex flex-col gap-y-2">
      <h3 class="text-lg font-semibold">{{ ujian.judul }}</h3>
      <p class="text-lg">
        judul:<br />
        <span class="text-base text-primary-light opacity-40">{{
          ujian.mapel
        }}</span>
      </p>
      <p class="text-lg">
        Jenis:<br />
        <span class="text-base text-primary-light opacity-40">{{
          ujian.jenis_ujian
        }}</span>
      </p>
      <p class="text-lg">
        Durasi:<br />
        <span class="text-base text-primary-light opacity-40"
          >{{ ujian.durasi_menit }} Meint</span
        >
      </p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const { DeleteTest } = useTest();

const emit = defineEmits(['deleted']);

const props = defineProps<{
  ujian: {
    id: string;
    judul: string;
    mapel: string;
    jenis_ujian: string;
    durasi_menit: string;
  };
}>();

const handleDelete = async () => {
  try {
    await DeleteTest(props.ujian.id)
    emit('deleted', props.ujian.id)
  } catch (error) {
    console.error('Failed to delete test:', error)
  }
};
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-light mx-auto"></div>
      <p class="mt-4 text-primary-light">Memuat soal...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ 
  middleware: "auth",
});

const route = useRoute();
const tesId = route.params.tes_id as string;
const { GetSoal } = useSiswa();

onMounted(async () => {
  try {
    console.log('Loading first soal for tes:', tesId);
    
    const soalList = await GetSoal(tesId);
    
    if (soalList && soalList.length > 0) {
      // Redirect ke soal pertama
      await navigateTo(`/soal/${tesId}/${soalList[0].soal_id}`, { replace: true });
    } else {
      console.error('No soal found for this tes');
      // Redirect back atau tampilkan error
      await navigateTo('/dashboard', { replace: true });
    }
  } catch (error) {
    console.error('Failed to load soal:', error);
    await navigateTo('/dashboard', { replace: true });
  }
});
</script>
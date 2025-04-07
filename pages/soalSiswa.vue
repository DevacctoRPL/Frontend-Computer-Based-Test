<script setup>
</script>

<template>
  <div class='flex h-auto bg-primary-dark text-primary-light pt-16'>

      <!-- Sidebar nyaa -->
      <aside class='w-1/5 p-6 border-r border-primary-dark flex flex-col'>
  <!-- Grid Soal -->
  <div>
    <div class='grid grid-cols-5 gap-x-1 gap-y-3.5'>
      <Button v-for='i in 30' :key='i' class='w-10 h-10 flex items-center justify-center border border-gray-500 rounded'>
        {{ i }}
      </Button>
    </div>
  </div>

  <!-- Tombol Navigasi -->
  <div class="mt-6 flex items-center justify-between pr-4">
  <Button class="w-24 h-10 bg-secondary-dark hover:bg-secondary-light text-primary-light rounded flex items-center justify-center">
    ←
  </Button>

  <Button class="w-10 h-10  hover:bg-yellow-400 text-black rounded border-amber-300 border-1 flex items-center justify-center">
    🚩
  </Button>

  <Button class="w-24 h-10 bg-secondary-dark hover:bg-secondary-light text-primary-light rounded flex items-center justify-center">
    →
  </Button>
</div>

</aside>
      
      <div class="flex w-1 flex-col justify-center">
  <div class="h-[700px] w-1 bg-gradient-to-b from-tertiary-dark via-primary-light to-tertiary-dark rounded-full"></div>
      </div>
      
      <!-- Main Contentt -->
      <main class='flex-1 p-6'>
        <Card>
          <h1 class='text-xl font-bold'>Soal</h1>
          <p class='mt-2 text-gray-300'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry...iyiuergiergorgieyoreiytgregoierygoiregiergioergoi
          </p>
          <textarea class="w-full p-2 mt-4 bg-secondary-dark rounded-md" placeholder="Jawaban Anda"></textarea>
          <Button class='mt-14 cursor-pointer float-end border-1 border-primary-light p-2 rounded'>Selanjutnya →</Button>
        </Card>
      </main>
      
      <div class="flex flex-col justify-center">
  <div class="h-[700px] w-1 bg-gradient-to-b from-tertiary-dark via-primary-light to-tertiary-dark rounded-full"></div>
      </div>

      <!-- Right Panel nya -->
       <!-- nanti ku buat lebih best practice kalo bisa -->
      <aside class='w-1/5 p-4'>
        <Card class="flex flex-col gap-3">
          <p><span class="text-lg text-primary-light">Guru:</span><br> <span class="text-sm text-primary-light opacity-40">Ir. Joko Widodo</span></p>
          <p><span class="text-lg text-primary-light">Mata Pelajaran:</span><br> <span class="text-sm text-primary-light opacity-40">Matematika</span></p>
          <p><span class="text-lg text-primary-light">Jumlah Soal:</span><br> <span class="text-sm text-primary-light opacity-40">7000</span></p>
          <p><span class="text-lg text-primary-light">Waktu Pengerjaan:</span><br> <span class="text-sm text-primary-light opacity-40">Sampai Kiamat</span></p>
        </Card>
      </aside>
    </div>
</template>

import { ref, readonly } from "vue";
import type { JawabanData } from "~/types/main.types";

export const useAnswer = () => {
  const Answers = ref<JawabanData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const getAllAnswers = async (soalId: string) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;
    const token = await useStorage().getToken();

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{ data: JawabanData[]}>(
        `${BASE_URL}/api/guru/jawaban/show/${soalId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      error.value = err.message || "Gagal mengambil jawaban";
      Answers.value = [];
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteAnswer = async (jawabanId: string) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;

    loading.value = true;
    error.value = null;
    const token = await useStorage().getToken();

    try {
      const response = await $fetch(
        `${BASE_URL}/api/guru/jawaban/delete/${jawabanId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Answers.value = Answers.value.filter((j) => j.jawaban_id !== jawabanId);

      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal hapus jawaban";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createMultipleAnswers = async (
    soalId: string,
    AnswersData: JawabanData[]
  ) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;

    loading.value = true;
    error.value = null;
    const token = await useStorage().getToken();

    try {
      const body = { jawaban: AnswersData };

      const response = await $fetch(
        `${BASE_URL}/api/guru/jawaban/create/${soalId}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal membuat pilihan ganda";
      throw err;
    } finally {
      loading.value = false;
    }
  };

    const updateMultipleAnswers = async (
    soalId: string,
    AnswersData: JawabanData[]
  ) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;

    loading.value = true;
    error.value = null;
    const token = await useStorage().getToken();

    try {
      const body = { jawaban: AnswersData };

      const response = await $fetch(
        `${BASE_URL}/api/guru/jawaban/update/${soalId}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal memperbarui pilihan ganda";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteMultipleAnswers = async (jawabanIds: string[]) => {
    loading.value = true;
    error.value = null;

    try {
      const promises = jawabanIds.map((id) => deleteAnswer(id));
      const responses = await Promise.all(promises);

      Answers.value = Answers.value.filter((j) => !jawabanIds.includes(j.jawaban_id || ""));

      return responses;
    } catch (err: any) {
      error.value = err.message || "Gagal hapus pilihan ganda";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    Answers: readonly(Answers),
    loading: readonly(loading),
    error: readonly(error),

    getAllAnswers,
    deleteAnswer,
    createMultipleAnswers,
    updateMultipleAnswers,
    deleteMultipleAnswers,
  };
};
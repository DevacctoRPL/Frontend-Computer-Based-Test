import { ref, readonly } from "vue";
import type { JawabanData, JawabanResponseData } from "~/types/main.types";

export const useAnswer = () => {
  const Answers = ref<JawabanResponseData[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  interface ApiResponse<T> {
    data: T;
  }

  const createAnswer = async (
    soalId: string,
    jawabanData: JawabanData | FormData
  ) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;

    loading.value = true;
    error.value = null;
    const token = await useStorage().getToken();

    try {
      let body: any;
      let headers: HeadersInit = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (jawabanData instanceof FormData) {
        body = jawabanData;
      } else {
        body = JSON.stringify(jawabanData);
        headers["Content-Type"] = "application/json";
      }

      const response = await $fetch<ApiResponse<JawabanResponseData>>(
        `${BASE_URL}/api/guru/jawaban/create/${soalId}`,
        {
          method: "POST",
          body: body,
          headers: headers,
        }
      );

      await getAllAnswers(soalId);

      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal membuat jawaban";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const getAllAnswers = async (soalId: string) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;

    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<ApiResponse<JawabanResponseData[]>>(
        `${BASE_URL}/api/guru/jawaban/show/${soalId}`,
        {
          method: "GET",
        }
      );

      Answers.value = response.data || [];
      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal mengambil jawaban";
      Answers.value = [];
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateAnswer = async (
    jawabanId: string,
    jawabanData: JawabanData | FormData
  ) => {
    const BASE_URL = useRuntimeConfig().public.apiBase;

    loading.value = true;
    error.value = null;
    const token = await useStorage().getToken();

    try {
      let body: any;
      let headers: HeadersInit = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      if (jawabanData instanceof FormData) {
        body = jawabanData;
        body.append("_method", "PUT");
      } else {
        body = JSON.stringify(jawabanData);
        headers["Content-Type"] = "application/json";
      }

      const response = await $fetch<ApiResponse<JawabanResponseData>>(
        `${BASE_URL}/api/guru/jawaban/update/${jawabanId}`,
        {
          method: "PUT",
          body,
          headers,
        }
      );

      const index = Answers.value.findIndex((j) => j.id === jawabanId);
      if (index !== -1) {
        Answers.value[index] = { ...Answers.value[index], ...response.data };
      }

      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal update jawaban";
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
      const response = await $fetch<ApiResponse<any>>(
        `${BASE_URL}/api/guru/jawaban/delete/${jawabanId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Answers.value = Answers.value.filter((j) => j.id !== jawabanId);

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
    AnswersUpdates: Array<{ id: string; data: JawabanData }>
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const promises = AnswersUpdates.map((update) =>
        updateAnswer(update.id, update.data)
      );

      const responses = await Promise.all(promises);
      return responses;
    } catch (err: any) {
      error.value = err.message || "Gagal update pilihan ganda";
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

      Answers.value = Answers.value.filter((j) => !jawabanIds.includes(j.id));

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

    createAnswer,
    getAllAnswers,
    updateAnswer,
    deleteAnswer,
    createMultipleAnswers,
    updateMultipleAnswers,
    deleteMultipleAnswers,
  };
};
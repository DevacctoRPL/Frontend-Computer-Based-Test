import type { Soal } from "~/types/main.types";

export const useSoal = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const getAllQuestions = async (tes_id: string) => {
    const token = await getToken();
    const response = await $fetch<{ data: Soal[] }>(
      `${BASE_URL}/api/guru/soal/show/${tes_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const createQuestion = async (tes_id: string, formData: FormData) => {
    const token = await getToken();
    const response = await $fetch<{ data: Soal }>(
      `${BASE_URL}/api/guru/soal/create/${tes_id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    return response;
  };

  const updateSoal = async (soal_id: string, formData: FormData) => {
    const token = await getToken();
    const response = await $fetch<{ data: Soal }>(
      `${BASE_URL}/api/guru/soal/update/${soal_id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    return response;
  };

  const deleteSoal = async (soal_id: string) => {
    const token = await getToken();
    return await $fetch(`${BASE_URL}/api/guru/soal/delete/${soal_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { getAllQuestions, createQuestion, updateSoal, deleteSoal };
};

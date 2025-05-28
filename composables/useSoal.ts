import type { Soal } from "~/types/main.types";

export const useSoal = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const token = getToken();

  const CreateSoal = async (tes_id: string, formData: FormData) => {
    const response = await $fetch(
      `${BASE_URL}/api/guru/soal/create/${tes_id}`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    return response;
  };

  const SetJawaban = async (soal_id: string, jawaban: any) => {
    const response = await $fetch(
      `${BASE_URL}/api/guru/jawaban/create/${soal_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jawaban,
      }
    );
    return response;
  };

  return { CreateSoal, SetJawaban };
};

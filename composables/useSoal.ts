import type { Soal } from "~/types/main.types";

export const useSoal = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const CreateSoal = async (tes_id: string, formData: FormData) => {
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

  const SetJawaban = async (soal_id: string, jawaban: any) => {
    const token = getToken();
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

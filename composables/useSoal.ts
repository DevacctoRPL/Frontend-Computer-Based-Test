import type { Soal } from "~/types/main.types";

export const useSoal = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const token = getToken();

  const CreateSoal = async (tes_id: string, formData: Soal) => {
    const response = await $fetch(`${BASE_URL}/api/guru/soal/create${tes_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });

    return response;
  };

  return {CreateSoal}
};

const EditSoal = () => {
  
}

import type { Test, Soal } from "~/types/main.types";

export const useSiswa = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const GetTestSiswa = async () => {
    const token = await getToken();

    const response = await $fetch<{ data: Test[] }>(
      `${BASE_URL}/api/siswa/tes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };

  const GetSiswaTestById = async (tes_id: string) => {
    const token = await getToken();

    const response = await $fetch<{ data: Test }>(
      `${BASE_URL}/api/siswa/tes/${tes_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  const GetSoal = async (tes_id: string) => {
    const token = await getToken();

    const response = await $fetch<{ data: Soal[] }>(`${BASE_URL}/api/siswa/soal/showall/${tes_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data
  };

  const GetSoalById = async (soal_id: string) => {
    const token = await getToken();

    const response = await $fetch<{ data: Soal }>(`${BASE_URL}/api/siswa/soal/show/${soal_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data
  };

  const SendAnswer = async (tes_id: string, soal_id: string, jawaban_id: string ) => {
    const token = await getToken();

    const response = await $fetch(`${BASE_URL}/api/siswa/sendpg/${tes_id}/${soal_id}/${jawaban_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    })

    // return response
  }

  return {
    GetSiswaTestById,
    GetTestSiswa,
    GetSoal,
    GetSoalById,
    SendAnswer
  };
};

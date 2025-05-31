import type { Test } from "~/types/main.types";

export const useTest = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const GetTest = async () => {
    const token = await getToken();

    const response = await $fetch<{ data: Test[] }>(
      `${BASE_URL}/api/guru/tes/show`,
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

  const CreateTest = async (formData: Test) => {
    const token = await getToken();

    const response = await $fetch<Test>(`${BASE_URL}/api/guru/tes/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  };

  const GetTestById = async (id: string) => {
    const token = await getToken();

    const response = await $fetch<{ data: Test }>(
      `${BASE_URL}/api/guru/tes/show/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data); // cek data di console
    return response.data;
  };

  const EditTest = async (id: string, formData: Test) => {
    const token = await getToken();

    const response = await $fetch<Test>(
      `${BASE_URL}/api/guru/tes/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
  };

  const DeleteTest = async (id: string) => {
    const token = await getToken();

    const response = await $fetch(`${BASE_URL}/api/guru/tes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const DeleteAllTest = async () => {
    const token = await getToken();

    const response = await $fetch(`${BASE_URL}/api/guru/tes/deleteall`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

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

  return {
    GetTest,
    CreateTest,
    GetTestById,
    EditTest,
    DeleteTest,
    DeleteAllTest,
    GetTestSiswa,
    GetSiswaTestById,
  };
};

import type { Test } from "~/types/main.types";

export const useTest = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase;
  const { getToken } = useStorage();

  const token = getToken();

  const GetTest = async () => {
    const response = await $fetch<{ data: Test[] }>(
      `${BASE_URL}/api/guru/tes/show`,
      {
        method: "get",
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
    console.log(response.data);
    return response.data;
  };
  const EditTest = async (id: string, formData: Test) => {
    const response = await $fetch<Test>(
      `${BASE_URL}/api/guru/tes/update/${id}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

  };
  return { GetTest, CreateTest, GetTestById, EditTest };
};

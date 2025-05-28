import type { userData } from "~/types/main.types";

export const useStorage = () => {
  let token: any = ref("");

  const setToken = async (tokens: string) => {
    useCookie("authToken").value = tokens;
  };

  const getToken = async () => {
    token = useCookie("authToken").value;
    return token;
  };

  const setData = async (data: userData) => {
    useCookie("data").value = JSON.stringify(data);
  };

  const getData = async (): Promise<userData | undefined> => {
    try {
      const stored = useCookie("data").value;
      const parsed = typeof stored === "string" ? JSON.parse(stored) : stored;
      return parsed as userData;
    } catch {
      return undefined;
    }
  };

  return { setToken, getToken, setData, getData };
};

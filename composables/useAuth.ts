import type { loginResponse } from "~/types/main.types";

export const useAuth = () => {
  const BASE_URL = useRuntimeConfig().public.apiBase; // gak tau env nya gak bisa di pake jadi gua gini dlu, kalo bisa di ganti pake env
  const { setToken, setData } = useStorage();

  const Login = async (data: any) => {
    try {
      const res: loginResponse = (await $fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        body: data,
      })) as any;

      setData(res.user);
      setToken(res.token);

      if (res.user.role == "admin" || res.user.role == "guru") {
        navigateTo("/admin");
      } else {
        navigateTo("/");
      }
    } catch (error) {
      throw error;
    }
  };

  const Logout = () => {
    try {
      setToken("");
      useCookie("data").value = null;
      return navigateTo("/login");
    } catch (error) {
      throw error;
    }
  };

  return { Login, Logout };
};

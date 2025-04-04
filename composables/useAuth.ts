export const useAuth = () => {
const BASE_URL = useRuntimeConfig().public.apiBase // gak tau env nya gak bisa di pake jadi gua gini dlu, kalo bisa di ganti pake env
const { setToken, saveUserData } = useStorage()

  const Login = async (data: any) => {
    try {
      const res = await $fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: data
      }) as any

      console.log(res)
      setToken(res?.token)
      saveUserData(res?.user)

      navigateTo({ path: '/' })
    }
    catch (error) {
      throw error;
    }
  }

  const Logout = () => {
    try {
      setToken('')
      saveUserData(null)
    }
    catch (error) {
      throw error;
    }
  }

  return { Login, Logout }
}
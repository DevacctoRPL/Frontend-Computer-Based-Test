export const useStorage = () => {
  const setToken = (token: string) => {
    useCookie('authToken').value = token
  }

  const getToken = () => {
    return useCookie('authToken').value
  }

  const saveUserData = (userData: any) => {
   window.localStorage.setItem('userData', JSON.stringify(userData))
  }

  const getUserData = () => {
    const userData = window.localStorage.getItem('userData')
    return userData ? JSON.parse(userData) : null
  } // Gak tau dah bakal kepake apa kaga -Adit

  return { setToken, getToken, saveUserData, getUserData }
}

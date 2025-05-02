export const useStorage = () => {
  const setToken = (token: string) => {
    useCookie("authToken").value = token;
  };

  const getToken = () => {
    return useCookie("authToken").value;
  };

  const saveUserData = (userData: any) => {
    useCookie("userData", userData);
  };

  const getUserData = () => {
    const userData = useCookie("userData").value;
    return userData;
  };

  return { setToken, getToken, saveUserData, getUserData };
};

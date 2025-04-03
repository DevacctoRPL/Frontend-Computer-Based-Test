export default defineNuxtRouteMiddleware((to, from) => {
  const { getToken } = useStorage();
  const token = getToken();

  if (!token) {
    return navigateTo({ path: "/login" });
  }

  return true;
}); // Kalo bisa bikin yang lebih bagus, bikinla -Adit

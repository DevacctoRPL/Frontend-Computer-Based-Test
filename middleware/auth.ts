export default defineNuxtRouteMiddleware((to, from) => {
  const { getToken } = useStorage();
  const token = getToken();

  if (to.path == '/admin') {
    
  }

  return true;
});

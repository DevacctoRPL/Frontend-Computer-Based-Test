export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getToken, getData } = useStorage();
  const token = await getToken();
  const data = await getData();
  const allowedRoles = ["admin", "guru"];

  if (!token || !data) {
    return navigateTo("/login");
  }

  if (to.path.startsWith("/admin") && !allowedRoles.includes(data.role)) {
    return navigateTo("/");
  }

  return true;
});

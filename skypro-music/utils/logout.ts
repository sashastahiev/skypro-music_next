import { useRouter } from "next/router";

export const logout = (): void => {
  const router = useRouter();
  localStorage.removeItem('access');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  sessionStorage.clear();
  // Перенаправление на страницу входа
  router.push('/auth/signin');
};
export const exit = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
}
export const logout = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  sessionStorage.clear();
  // Перенаправление на страницу входа
  window.location.href = '/auth/signin';
};
export const exit = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
}
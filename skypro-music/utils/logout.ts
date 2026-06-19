
export const logout = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  sessionStorage.clear();
};
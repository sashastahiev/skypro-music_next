
export const logout = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  localStorage.removeItem('refresh');
  sessionStorage.clear();
};
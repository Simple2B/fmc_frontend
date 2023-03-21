export const getErrorMessage = (
  axiosError: string,
  // eslint-disable-next-line no-unused-vars
  setError: (value: React.SetStateAction<string | null>) => void,
  type?: string
) => {
  const errorNumber = axiosError.replace(/\D/g, '');
  if (Number(errorNumber) === 403) {
    setError('Invalid credentials');
  } else if (Number(errorNumber) === 409) {
    setError('User with such email address already exists');
  } else if (Number(errorNumber) === 401) {
    setError('Unauthorized');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    if (process.env.BASE_URL) window.location.href = process.env.BASE_URL;
  } else if (Number(errorNumber) === 400) {
    if (type && type === 'resetPass') {
      setError('Bad token');
    }
    setError('You haven`t been signed up before');
  } else if (Number(errorNumber) === 500) {
    setError('Something went wrong');
  } else {
    setError(`${axiosError}`);
  }
};

export const getErrorMessage: any = (
  axiosError: string,
  // eslint-disable-next-line no-unused-vars
  setError: (value: React.SetStateAction<string | null>) => void,
  type?: string
) => {
  const errorNumber = axiosError.replace(/\D/g, '');
  console.log('====================================');
  console.log(' axiosError ', axiosError);
  console.log('====================================');
  console.log(' errorNumber ', errorNumber);
  if (Number(errorNumber) === 403) {
    setError('Invalid credentials');
  } else if (Number(errorNumber) === 409) {
    if (type && type === 'changePass') {
      setError('Error while changing password');
      return;
    }
    if (type && type === 'getHelp') {
      setError('Failed to create a new contact request');
      return;
    }
    setError('User with such email address already exists');
  } else if (Number(errorNumber) === 401) {
    setError('Unauthorized');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    if (process.env.BASE_URL) window.location.href = process.env.BASE_URL;
  } else if (Number(errorNumber) === 400) {
    if (type && type === 'resetPass') {
      setError('Bad token');
      return;
    }
    if (type && type === 'changePass') {
      setError('Old password is incorrect');
      return;
    }
    setError('You haven`t been signed up before');
  } else if (Number(errorNumber) === 500) {
    setError('Something went wrong');
  } else if (Number(errorNumber) === 208) {
    setError('Newsletter subscription already exists');
  } else {
    setError(`${axiosError}`);
  }
};

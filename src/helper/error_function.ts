export const getErrorMessage = (
  axiosError: string,
  // eslint-disable-next-line no-unused-vars
  setError: (value: React.SetStateAction<string | null>) => void
) => {
  const errorNumber = axiosError.replace(/\D/g, '');
  if (Number(errorNumber) === 403) {
    setError('Invalid credentials');
  } else if (Number(errorNumber) === 409) {
    setError('Student with such email address already exists');
  } else {
    setError(`${axiosError}`);
  }
};

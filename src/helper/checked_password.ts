export const checkedPassword = (
  password: string,
  passwordConfirm: string,
  setIsErrorPassword: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorPasswordMessage: React.Dispatch<React.SetStateAction<string>>,
  setIsErrorPasswordConfirm: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorPasswordConfirmMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  if (password === '') {
    setIsErrorPassword(true);
    setErrorPasswordMessage('Password cannot be empty');
  } else {
    setIsErrorPassword(false);
    setErrorPasswordMessage('');
  }

  if (passwordConfirm === '') {
    setIsErrorPasswordConfirm(true);
    setErrorPasswordConfirmMessage('Password cannot be empty');
  } else {
    setIsErrorPasswordConfirm(false);
    setErrorPasswordConfirmMessage('');
  }

  if (password !== passwordConfirm) {
    setIsErrorPasswordConfirm(true);
    setErrorPasswordConfirmMessage("Passwords don't match");
    // setIsLoad(false);
    // setSuccess(false);
    // setError(null);
  } else {
    setIsErrorPasswordConfirm(false);
    setErrorPasswordConfirmMessage('');
    // setIsLoad(false);
    // setError(null);
  }
};

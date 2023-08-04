export const validateEmail = (email: string) => {
  const regex = /@/;
  return regex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const validateForm = (email: string, password: string) => {
  return validateEmail(email) && validatePassword(password);
};

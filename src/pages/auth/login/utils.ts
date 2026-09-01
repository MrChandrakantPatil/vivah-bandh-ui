export const loginValidators = {
  username: (value: string) => {
    if (!value.trim()) {
      return 'Email address or mobile number is required';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(value) && !mobileRegex.test(value)) {
      return 'Please enter a valid email address or mobile number';
    }

    return '';
  },

  password: (value: string) => {
    if (!value.trim()) {
      return 'Password is required';
    }

    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }

    return '';
  },
};

export function validateLogin(username: string, password: string) {
  const usernameError = loginValidators.username(username);
  const passwordError = loginValidators.password(password);

  return {
    usernameError,
    passwordError,
    isValid: !usernameError && !passwordError,
  };
}

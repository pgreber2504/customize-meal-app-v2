export const checkValidation = (value: any, rules: any) => {
  let isValid = true;
  let message = "";

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
    if (isValid === false) {
      message = `Field can't be empty`;
      return {
        isValid: isValid,
        message: message,
      };
    }
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
    if (isValid === false) {
      message = `Field must contain at least ${rules.minLength} characters`;
      return {
        isValid: isValid,
        message: message,
      };
    }
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
    if (isValid === false) {
      message = `Field must have less than ${rules.maxLength} characters`;
      return {
        isValid: isValid,
        message: message,
      };
    }
  }

  if (rules.isEmail) {
    const regex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    isValid = regex.test(value) && isValid;
    if (isValid === false) {
      message = `You're typed e-mail is not valid`;
      return {
        isValid: isValid,
        message: message,
      };
    }
  }

  if (rules.isNumber) {
    const regex = /^[0-9]*$/;
    isValid = regex.test(value) && isValid;
    if (isValid === false) {
      message = `Value typed in field must be numeric`;
      return {
        isValid: isValid,
        message: message,
      };
    }
  }

  if (rules.confirmation) {
    isValid = value === rules.confirmation && isValid;
    if (isValid === false) {
      message = `different`;
      return {
        isValid: isValid,
        message: message,
      };
    }
  }

  return {
    isValid: isValid,
    message: message,
  };
};

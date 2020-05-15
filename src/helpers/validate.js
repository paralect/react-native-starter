import i18n from 'i18n';

const firstNameValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push(i18n.t('errorMessage.firstName/empty'));
  }
  return errors;
};

const lastNameValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push(i18n.t('errorMessage.lastName/empty'));
  }
  return errors;
};

const emailValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push(i18n.t('errorMessage.email/empty'));
  }
  return errors;
};

const passwordValidator = (value) => {
  const errors = [];
  if (!value || value.trim() === '') {
    errors.push(i18n.t('errorMessage.password/empty'));
  }
  return errors;
};

const confirmPasswordValidator = ({ confirmPassword, password }) => {
  const errors = [];
  if (!confirmPassword || confirmPassword.trim() === '') {
    errors.push(i18n.t('errorMessage.confirmPassword/empty'));
  }
  if (confirmPassword !== password) {
    errors.push(i18n.t('errorMessage.confirmPassword/match'));
  }
  return errors;
};

export const validate = (value, key) => {
  switch (key) {
    case 'firstName':
      return firstNameValidator(value);
    case 'lastName':
      return lastNameValidator(value);
    case 'email':
      return emailValidator(value);
    case 'password':
      return passwordValidator(value);
    case 'confirmPassword':
      return confirmPasswordValidator(value);
    default:
      return [];
  }
};

export const getServerErrors = (commonErrors, key) => {
  return commonErrors
    .filter(error => Object.keys(error)[0] === key)
    .map(error => error[key]);
};

export const containErrors = (errors) => {
  return Boolean(Object.keys(errors)
    .filter(key => errors[key].length).length);
};

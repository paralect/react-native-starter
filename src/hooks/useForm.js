import { useState, useCallback } from 'react';
import { containErrors } from 'helpers/validate';

const useForm = (defaultValues, handleSubmit, validateForm) => {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  const onChange = useCallback(field => (value) => {
    const newValues = {
      ...values,
      [field]: value,
    };

    setValues(newValues);
  }, [values]);

  const onSubmit = useCallback(async () => {
    let validationErrors = {};
    if (validateForm) {
      validationErrors = validateForm(values);
    }

    if (containErrors(validationErrors)) {
      setErrors(validationErrors);
    } else {
      try {
        await handleSubmit(values);
      } catch (serverErrors) {
        setErrors(serverErrors);
      }
    }
  }, [values, handleSubmit, validateForm]);

  const setFocus = useCallback(inputRef => () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const form = { values, errors };

  return [form, onChange, onSubmit, setFocus];
};

export default useForm;

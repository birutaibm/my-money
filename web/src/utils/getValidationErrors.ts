import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(yupError: ValidationError): Errors {
  const result: Errors = {};
  yupError.inner.forEach(err => {
    result[err.path] = err.message;
  });
  return result;
}

import { ValidationError } from 'yup';

type Errors = { [key: string]: string };

function getValidationErrors(yupValidation: ValidationError): Errors {
  const result: Errors = {};
  yupValidation.inner.forEach(err => {
    result[err.path] = err.message;
  });
  return result;
}

export default getValidationErrors;

import { ClientError } from "../exceptions/ClientError.js";


export const validate = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  })
  if(result.error) {
    throw new ClientError(crudresult.error.message)
  }

  return result.value;
};

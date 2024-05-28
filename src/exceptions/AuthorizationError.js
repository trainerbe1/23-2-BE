import { ClientError } from "./ClientError";

class AuthorizationError extends ClientError {
  constructor(message) {
    super(403, message);
    this.name = 'AuthorizationError';
  }
}

export { AuthorizationError }

import { ClientError } from "./ClientError";

class AuthenticationError extends ClientError {
  constructor(message) {
    super(401, message);
    this.name = 'AuthenticationError';
  }
}

export { AuthenticationError }

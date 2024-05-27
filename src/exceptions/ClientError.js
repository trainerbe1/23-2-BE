class ClientError extends Error {
  constructor(status, statusCode = 400, message) {
    super(message);
    this.status = status;
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

export { ClientError }

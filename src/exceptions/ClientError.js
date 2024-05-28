class ClientError extends Error {
  constructor( statusCode = 400, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

export { ClientError }

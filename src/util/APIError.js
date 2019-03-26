export default class AIPError extends Error {
  constructor(status, message, details) {
    super(message);
    this.details = details || {};
    this.status = status || 500;
    this.message = message || 'Internal Server Error';
  }
}

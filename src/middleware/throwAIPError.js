import APIError from '../util/APIError';

export default (status, message, details) => (_, __, next) => {
  next(new APIError(status, message, details));
};

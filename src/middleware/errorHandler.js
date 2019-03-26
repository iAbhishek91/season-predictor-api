import APIError from '../util/APIError';

const defaultError = msg => new APIError(500, 'Server Error', msg || 'Internal Server Error');

export default (err, _req, res, _next) => {
  const apiError = err instanceof APIError ? err : defaultError(err.message);

  res.status(apiError.status).json(apiError);
};

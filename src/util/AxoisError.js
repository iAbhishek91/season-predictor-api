import R from 'ramda';

class AxiosError extends Error {
  constructor(axiosError) {
    super(axiosError);
    this.headers = R.pathOr({}, ['response', 'headers'], axiosError);
    this.status = R.pathOr(500, ['response', 'status'], axiosError);
    this.data = R.pathOr({}, ['response', 'data'], axiosError);
    this.statusText = R.pathOr('', ['response', 'statusText'], axiosError);
  }
}

export default AxiosError;

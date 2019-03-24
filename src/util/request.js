import axios from 'axios';
import { URL } from 'url';
import AxiosError from './AxoisError';

export default host => async (path, method, headers) => {
  const url = new URL(path, host);

  try {
    const { data } = await axios.request({
      url: url.toString(),
      headers,
      method,
    });

    return data;
  } catch (e) {
    throw new AxiosError(e);
  }
};

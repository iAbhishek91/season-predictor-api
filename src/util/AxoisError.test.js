import AxiosError from './AxoisError';

const response = {
  headers: { test: 'test' },
  status: 400,
  data: { test: 'test' },
  statusText: 'test',
};

const mockAxiosErrorObject = { response: { ...response } };

const axiosErrorInstance = new AxiosError(mockAxiosErrorObject);

describe('AxiosError', () => {
  test('validate "message","name" and "stack" property of Error class is inherited', () => {
    expect(axiosErrorInstance.message).toBeTruthy();
    expect(axiosErrorInstance.name).toBeTruthy();
    expect(axiosErrorInstance.stack).toBeTruthy();
  });

  test('validate "header" property is initialized from axiosError instance', () => {
    expect(axiosErrorInstance.headers).toBe(response.headers);
  });

  test('validate "status" property is initialized from axiosError instance', () => {
    expect(axiosErrorInstance.status).toBe(response.status);
  });

  test('validate "data" property is initialized from axiosError instance', () => {
    expect(axiosErrorInstance.data).toBe(response.data);
  });

  test('validate "statusText" property is initialized from axiosError instance', () => {
    expect(axiosErrorInstance.statusText).toBe(response.statusText);
  });
});

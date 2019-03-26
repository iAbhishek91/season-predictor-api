import APIError from './APIError';

const response = {
  details: 'test',
  status: 400,
  message: 'test',
};

const apiErrorInstance = new APIError(
  response.status,
  response.message,
  response.details,
);

const apiErrorInstanceWithoutParameter = new APIError();

describe('AxiosError', () => {
  test('validate "message","name" and "stack" property of Error class is inherited', () => {
    expect(apiErrorInstance.message).toBeTruthy();
    expect(apiErrorInstance.name).toBeTruthy();
    expect(apiErrorInstance.stack).toBeTruthy();
  });

  test('validate "details" property is initialized from APIError instance', () => {
    expect(apiErrorInstance.details).toBe(response.details);
  });

  test('validate "status" property is initialized from APIError instance', () => {
    expect(apiErrorInstance.status).toBe(response.status);
  });

  test('validate "message" property is initialized from APIError instance', () => {
    expect(apiErrorInstance.message).toBe(response.message);
  });

  test('validate "details" property is initialized to default when not passed during obj creation', () => {
    expect(apiErrorInstanceWithoutParameter.details).toEqual({});
  });

  test('validate "status" property is initialized to default when not passed during obj creation', () => {
    expect(apiErrorInstanceWithoutParameter.status).toBe(500);
  });

  test('validate "message" property is initialized to default when not passed during obj creation', () => {
    expect(apiErrorInstanceWithoutParameter.message).toBe('Internal Server Error');
  });
});

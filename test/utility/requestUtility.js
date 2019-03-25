import request from 'supertest';

export const requestGet = (baseUrl, path, headers) => (
  request(baseUrl)
    .get(path)
    .set(headers)
);

export const requestPost = (baseUrl, path, headers) => (
  request(baseUrl)
    .post(path)
    .set(headers)
);

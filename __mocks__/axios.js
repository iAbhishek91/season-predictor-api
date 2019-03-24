export default {
  request: jest.fn(() => Promise.resolve({
    data: {
      temperature: 20,
      humidity: 50,
    },
  })),
};

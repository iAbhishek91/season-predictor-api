module.exports = {
  extends: "airbnb-base",
  env: {
    jest: true
  },
  rules: {
    'no-unused-vars': ['error', { "args": "none" }],
  }
}

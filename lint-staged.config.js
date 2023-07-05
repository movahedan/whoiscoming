module.exports = {
  '**/*.ts?(x)': () => ['yarn type-check', 'yarn lint --fix'],
};

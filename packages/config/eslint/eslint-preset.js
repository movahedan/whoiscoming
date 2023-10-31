module.exports = {
  extends: ["prettier"],
  plugins: ["prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "prettier/prettier": ["error"],
    "no-console": "off",
  },
};

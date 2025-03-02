module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "wip", "design", "refactor", "patch", "build"],
    ],
  },
};

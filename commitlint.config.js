export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "design",
        "rename",
        "remove",
        "ci",
        "build",
        "perf",
        "revert",
      ],
    ],
    "subject-case": [0],
    "subject-full-stop": [0],
    "header-max-length": [2, "always", 100],
  },
};

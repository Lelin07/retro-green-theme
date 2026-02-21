module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/Lelin07/retro-green-theme.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/exec",
      {
        verifyConditionsCmd: "npx vsce verify-pat -p $VSCE_TOKEN",
        prepareCmd: "npx vsce package --no-yarn",
        publishCmd: "npx vsce publish --pat $VSCE_TOKEN",
      },
    ],
    [
      "@semantic-release/github",
      {
        successComment: false,
        failComment: false,
        releasedLabels: false,
      },
    ],
  ],
};

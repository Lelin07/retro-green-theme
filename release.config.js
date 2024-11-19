module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/Lelin07/retro-green-theme.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: "vsce package",
        publishCmd: "vsce publish --pat $VSCE_TOKEN",
      },
    ],
    "@semantic-release/github",
  ],
};

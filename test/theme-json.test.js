const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const themePath = path.join(repoRoot, "themes", "retro-green-theme-color-theme.json");
const theme = JSON.parse(fs.readFileSync(themePath, "utf8"));

assert.equal(typeof theme.name, "string", 'Theme must include string field "name"');
assert.ok(theme.name.trim().length > 0, '"name" must not be empty');

assert.equal(typeof theme.colors, "object", 'Theme must include object field "colors"');
assert.ok(theme.colors && Object.keys(theme.colors).length > 0, '"colors" must not be empty');

assert.ok(Array.isArray(theme.tokenColors), 'Theme must include array field "tokenColors"');
assert.ok(theme.tokenColors.length > 0, '"tokenColors" must not be empty');

for (const [index, tokenColor] of theme.tokenColors.entries()) {
  assert.equal(typeof tokenColor, "object", `tokenColors[${index}] must be an object`);
  assert.ok(
    typeof tokenColor.name === "string" ||
      typeof tokenColor.scope === "string" ||
      Array.isArray(tokenColor.scope),
    `tokenColors[${index}] must define at least one of "name" or "scope"`
  );
  assert.equal(typeof tokenColor.settings, "object", `tokenColors[${index}] must include "settings" object`);
}

console.log("Theme JSON validation passed.");

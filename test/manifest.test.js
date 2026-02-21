const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const manifestPath = path.join(repoRoot, "package.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const requiredStringFields = ["name", "displayName", "description", "version", "publisher", "icon"];
for (const field of requiredStringFields) {
  assert.equal(typeof manifest[field], "string", `package.json must include string field "${field}"`);
  assert.ok(manifest[field].trim().length > 0, `package.json field "${field}" must not be empty`);
}

assert.equal(typeof manifest.engines, "object", 'package.json must include "engines"');
assert.equal(typeof manifest.engines.vscode, "string", 'package.json must include "engines.vscode"');

assert.equal(typeof manifest.categories, "object", 'package.json must include "categories"');
assert.ok(Array.isArray(manifest.categories), '"categories" must be an array');
assert.ok(manifest.categories.length > 0, '"categories" must not be empty');

assert.equal(typeof manifest.contributes, "object", 'package.json must include "contributes"');
assert.ok(Array.isArray(manifest.contributes.themes), '"contributes.themes" must be an array');
assert.ok(manifest.contributes.themes.length > 0, '"contributes.themes" must not be empty');

const themeEntry = manifest.contributes.themes[0];
assert.equal(typeof themeEntry.label, "string", 'Theme entry must include "label"');
assert.equal(typeof themeEntry.uiTheme, "string", 'Theme entry must include "uiTheme"');
assert.equal(typeof themeEntry.path, "string", 'Theme entry must include "path"');

const themeFilePath = path.resolve(repoRoot, themeEntry.path.replace(/^\.\//, ""));
assert.ok(fs.existsSync(themeFilePath), `Theme file does not exist at ${themeEntry.path}`);

console.log("Manifest validation passed.");

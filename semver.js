const fs = require("fs");
const path = require("path");
const semver = require("semver");

const filePath = path.join(__dirname, "app.json");
const appJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

const currentVersion = appJson.expo.version;
const newVersion = semver.inc(currentVersion, "patch"); // Change 'patch' to 'minor' or 'major' if needed

appJson.expo.version = newVersion;

fs.writeFileSync(filePath, JSON.stringify(appJson, null, 2), "utf8");

console.log(`Updated version to ${newVersion}`);

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// read package.json and .nvmrc files
const packageJsonPath = path.resolve(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const nvmrcPath = path.resolve(__dirname, '..', '.nvmrc');
const recommendedVersion = fs.readFileSync(nvmrcPath, 'utf8').trim();

// get the current version of node
const currentVersion = process.version;
const currentMajor = parseInt(currentVersion.slice(1).split('.')[0], 10);

// get the required version range from package.json
const engineNode = packageJson.engines.node;
const minVersion = engineNode.match(/>=(\d+)/)[1];
const maxVersion = engineNode.match(/<(\d+)/)[1];

console.log(`Current Node.js version: ${currentVersion}`);
console.log(`Required Node.js version: ${engineNode}`);
console.log(`Recommended Node.js version: ${recommendedVersion}`);

if (currentMajor < parseInt(minVersion, 10) || currentMajor >= parseInt(maxVersion, 10)) {
  console.warn('\nWARNING: Your Node.js version is outside the required range!');
  console.warn(`   This project requires Node.js ${engineNode}`);
  console.warn(`   Using an unsupported version may cause dependency issues.`);
  console.warn('\nRecommended steps:');
  
  // check if nvm is installed
  let hasNvm = false;
  try {
    execSync('command -v nvm', { stdio: 'ignore' });
    hasNvm = true;
  } catch (e) {
    // nvm not installed, no op
  }

  if (hasNvm) {
    console.warn(`   1. Run: nvm install ${recommendedVersion}`);
    console.warn(`   2. Run: nvm use ${recommendedVersion}`);
  } else {
    console.warn(`   1. Install nvm (Node Version Manager) from https://github.com/nvm-sh/nvm`);
    console.warn(`   2. Run: nvm install ${recommendedVersion}`);
  }
  
  console.warn(`   3. Delete the node_modules directory: rm -rf node_modules`);
  console.warn(`   4. Delete package-lock.json: rm package-lock.json`);
  console.warn(`   5. Reinstall dependencies: npm ci`);
  console.warn('\n');
  
  // don't exit with error code to allow builds to continue
}

console.log('Node version check completed\n'); 
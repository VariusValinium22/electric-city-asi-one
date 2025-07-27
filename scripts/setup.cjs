#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}====================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan} Electric City Sharks - Setup Tool ${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}====================================${colors.reset}\n`);

const platform = os.platform();
const nodeVersion = process.version;

console.log(`${colors.bright}Platform:${colors.reset} ${platform}`);
console.log(`${colors.bright}Node version:${colors.reset} ${nodeVersion}`);

const hasNodeModules = fs.existsSync(path.join(__dirname, '..', 'node_modules'));
console.log(`${colors.bright}node_modules exists:${colors.reset} ${hasNodeModules ? 'Yes' : 'No'}\n`);

function runCommand(command, message) {
  console.log(`${colors.bright}${message}...${colors.reset}`);
  try {
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    return true;
  } catch (error) {
    console.error(`${colors.red}Command failed: ${command}${colors.reset}`);
    return false;
  }
}

async function setup() {
  try {
    require('./check-node-version.cjs');
  } catch (error) {
    console.error(`${colors.red}Failed to check Node.js version: ${error.message}${colors.reset}`);
  }

  if (hasNodeModules) {
    console.log(`${colors.yellow}Removing existing node_modules for a clean installation...${colors.reset}`);
    const rmCmd = platform === 'win32' ? 'rmdir /s /q node_modules' : 'rm -rf node_modules';
    if (!runCommand(rmCmd, 'Cleaning node_modules')) {
      console.log(`${colors.yellow}Could not remove node_modules. Please delete it manually and try again.${colors.reset}`);
    }
  }

  if (fs.existsSync(path.join(__dirname, '..', 'package-lock.json'))) {
    runCommand('npm ci --no-fund --no-audit --loglevel=error', 'Running clean install (npm ci)');
  } else {
    console.log(`${colors.yellow}No package-lock.json found, falling back to npm install${colors.reset}`);
    runCommand('npm install --no-fund --no-audit --loglevel=error', 'Installing dependencies (npm install)');
  }

  console.log(`\n${colors.green}${colors.bright}Setup completed!${colors.reset}`);
}

setup().catch(err => {
  console.error(`${colors.red}Setup failed: ${err.message}${colors.reset}`);
  process.exit(1);
}); 
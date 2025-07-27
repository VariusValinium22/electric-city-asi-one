#!/usr/bin/env node

/**
 * A simple commit message validator
 */

const fs = require('fs');

// get the commit message file path from arguments
const msgFile = process.argv[2];

if (!msgFile || !fs.existsSync(msgFile)) {
  console.error(`Error: Commit message file not found: ${msgFile}`);
  process.exit(1);
}

try {
  // read the commit message directly from the file
  const commitMsg = fs.readFileSync(msgFile, 'utf-8').trim();
  
  // Format: <type>(<scope>): <subject>
  const pattern = /^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|temp)(\([a-zA-Z0-9_\-]+\))?: .+/;
  
  if (!pattern.test(commitMsg)) {
    console.error('\n************* Invalid Git Commit Message **************');
    console.error(`commit message: ${commitMsg}`);
    console.error('correct format: <type>(<scope>): <subject>');
    console.error('example: docs(ECASI-1): update README\n');
    console.error('type:');
    console.error('  feat     A new feature.');
    console.error('  fix      A bug fix.');
    console.error('  docs     Documentation only changes.');
    console.error('  style    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).');
    console.error('  refactor A code change that neither fixes a bug nor adds a feature.');
    console.error('  test     Adding missing tests or correcting existing ones.');
    console.error('  chore    Changes to the build process or auxiliary tools and libraries such as documentation generation.');
    console.error('  perf     A code change that improves performance.');
    console.error('  ci       Changes to your CI configuration files and scripts.');
    console.error('  build    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).');
    console.error('  temp     Temporary commit that won\'t be included in your CHANGELOG.\n');
    console.error('scope:');
    console.error('  Optional, can be anything specifying the scope of the commit change.');
    console.error('  For JIRA tickets, use the format: (ECASI-1)\n');
    console.error('subject:');
    console.error('  Brief summary of the change in present tense. Not capitalized. No period at the end.\n');
    process.exit(1);
  }
  
  console.log('Commit message format is valid.');
  process.exit(0);
} catch (error) {
  console.error(`Error validating commit message: ${error.message}`);
  process.exit(1);
} 
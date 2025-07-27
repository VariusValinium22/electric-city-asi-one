#!/usr/bin/env node

/**
 * This script is a compatibility layer for Husky with ESM projects.
 * It properly installs Husky git hooks when run in the "prepare" npm script.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up Husky git hooks...');

try {
  execSync('npx husky install', { stdio: 'inherit' });
  
  // set up _/husky.sh correctly (without deprecated format)
  const huskyDir = path.join(process.cwd(), '.husky');
  const huskyShDir = path.join(huskyDir, '_');
  
  if (!fs.existsSync(huskyShDir)) {
    fs.mkdirSync(huskyShDir, { recursive: true });
  }
  
  // write a non-deprecated version of husky.sh
  fs.writeFileSync(
    path.join(huskyShDir, 'husky.sh'),
    '#!/usr/bin/env sh\n\n' +
    '# Husky helper script\n' +
    'if [ -z "$husky_skip_init" ]; then\n' +
    '  debug() {\n' +
    '    if [ "$HUSKY_DEBUG" = "1" ]; then\n' +
    '      echo "husky (debug) - $1"\n' +
    '    fi\n' +
    '  }\n\n' +
    '  readonly hook_name="$(basename -- "$0")"\n' +
    '  debug "starting $hook_name hook"\n' +
    '  if [ "$HUSKY" = "0" ]; then\n' +
    '    debug "HUSKY env variable is set to 0, skipping hook"\n' +
    '    exit 0\n' +
    '  fi\n\n' +
    '  if [ -f ~/.huskyrc ]; then\n' +
    '    debug "sourcing ~/.huskyrc"\n' +
    '    . ~/.huskyrc\n' +
    '  fi\n' +
    'fi\n',
    { mode: 0o755 } // Make executable
  );

  // fix the commit-msg hook
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  if (fs.existsSync(commitMsgPath)) {
    const content = fs.readFileSync(commitMsgPath, 'utf-8');
    const fixedContent = content.replace(
      '.git/hooks/commit-msg', 
      'npx --no -- git-commit-msg-linter $1'
    );
    fs.writeFileSync(commitMsgPath, fixedContent, { mode: 0o755 });
  }

  console.log('Husky installed successfully');
} catch (error) {
  console.error('Failed to install Husky:', error);
  process.exit(1);
} 
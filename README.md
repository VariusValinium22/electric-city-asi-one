# Apiary Project: Electric City Aquarium: Sharks Interactive

## Getting Started

Cloning the repository:

```
git clone git@github.com:tripleten-externships/electric-city-asi-one.git
```

### Prerequisites

This project requires:

- Node.js version between 18.0.0 and 25.0.0 (recommended: 24.4.1)
- npm version 9.0.0 or newer

> **TIP:** Use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to easily switch between Node.js versions.
> After installing nvm, run: `nvm install 24.4.1` and then `nvm use 24.4.1`

### Installation

!!!IMPORTANT Make sure to install dependencies before making any code changes. This repository utilizes git-hooks which must be installed using npm before they will function.

#### Recommended Installation (Cross-Platform Compatible)

For the most consistent installation experience across all platforms (Windows, macOS, Linux):

```
npm run setup
```

This command will check your Node.js version and ensure a clean installation of dependencies.

#### Alternative Installation Methods

Standard npm installation (may produce different results on different platforms):

```
npm install
```

Or for a clean installation that strictly follows package-lock.json:

```
npm ci
```

### Troubleshooting Installation Issues

If you encounter issues with dependency installation:

1. Make sure you're using the correct Node.js version: `node -v` should return a version between 18.x and 24.x
2. Try the clean setup process:
   ```
   rm -rf node_modules
   rm package-lock.json  # Only if instructed by a teacher
   npm run setup
   ```
3. For Windows users with OpenSSL issues: `set NODE_OPTIONS=--openssl-legacy-provider` before running npm commands

### Running the application:

```
npm run dev
```

Running tests:

```
npm run test

# Run tests in watch mode (for development)
npm run test:watch

# Run tests with verbose output
npm run test:full

# Generate and view coverage report
npm run coverage
npm run coverage:open  # Also opens coverage report in browser

# Generate and view test results
npm run test:results   # Generates and opens test results in browser

# Run everything - tests with coverage and detailed reports
npm run test:all
```

### Generated Reports

After running tests with coverage or detailed reporting, you'll find:

- **Coverage Report**: `coverage/index.html` - Interactive HTML coverage report
- **Test Results**: `test-results/index.html` - Detailed test results and statistics
- **JSON Reports**: Available for CI/CD integration in `coverage/` and `test-results/` directories

The coverage report shows line, function, branch, and statement coverage with a target threshold of 80% for each metric.

## Deployments

- [WebApp Staging](https://d2ar1l3x08s5gx.cloudfront.net/)
- [Electron Staging](https://dr8igenkfpdcq.cloudfront.net/)

- [Storybook](https://dd79xas6ef12x.cloudfront.net/)

- [WebApp Production](https://d2iglzmdn49e7r.cloudfront.net/)
- [Electron Production](https://d2fhuq64y8upd7.cloudfront.net/)

## Contributing

### No Commits To Main

Contributors are not allowed to commit directly to `main`. This rule is enforced using git hooks. Instead, you must create a new branch off of `main` using the following naming pattern:

```
Pattern:"/^(master|main|develop){1}$|^(feature|fix|hotfix|release|ECASI-[^/]+)\/.+$/g"
```

Example:
`feature/my-dev-task`
`ECASI-[JIRA-KEY]/my-dev-task`

### Commit messages

If your commit message does not conform to the correct pattern, you will receive an error message like the following:

```
  ************* Invalid Git Commit Message **************
  commit message: Added husky git hooks
  correct format: <type>[scope]: <subject>
  example: docs: update README to add developer tips

  type:
    feat     A new feature.
    fix      A bug fix.
    docs     Documentation only changes.
    style    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    refactor A code change that neither fixes a bug nor adds a feature.
    test     Adding missing tests or correcting existing ones.
    chore    Changes to the build process or auxiliary tools and libraries such as documentation generation.
    perf     A code change that improves performance.
    ci       Changes to your CI configuration files and scripts.
    build    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
    temp     Temporary commit that won't be included in your CHANGELOG.

  scope:
    Optional, can be anything specifying the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
    In App Development, scope can be a page, a module or a component.

  subject:
    Brief summary of the change in present tense. Not capitalized. No period at the end.
```

## Helpful Resources

This project uses the following key libraries

- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/docs/installation)
- [Tailwind Components](https://tailwindui.com/components)
- [Headless UI](https://headlessui.com/)
- [Vite JS](https://vitejs.dev/)
- [Storybook JS](https://storybook.js.org/)
- [Testing Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Testing Cheatsheet #2](https://vitest.dev/api/)

## Deployment

The project is configured to deploy automatically using GitHub Actions whenever a commit is made to `main`. This workflow is triggered by merging a Pull Request.

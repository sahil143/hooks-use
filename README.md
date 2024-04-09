# Hooks use

A collection of usefull react hooks

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/rollup-lib-app-starter.git
cd rollup-lib-app-starter
yarn install
yarn install:web
```

## Available Commands

Build library 
```
yarn build
```

Build library in watch mode
```
yarn dev
```

Installs the dependencies for the web example
```
yarn install:web
```

Starts the Parcel development server for the web example
```
yarn start:web
```

Run unit tests
```
yarn test
```

Run linter
```
yarn lint
```

## Build with

- **Build Tools**: The project uses [Rollup](https://rollupjs.org/) for building the library and [Parcel](https://parceljs.org/) for the web example.
- **Testing**: Unit tests are set up using [Jest](https://jestjs.io/) and [@testing-library](https://testing-library.com/).
- **Code Styling and Formatting**: [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) are set up for code styling and formatting.
- **DevContainer**: A [devcontainer](https://code.visualstudio.com/docs/remote/containers) is set up for consistent development environments.
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) are used to enforce code styling and formatting on commit.

## Folder Structure

- **Library Development**: The `src` directory is used for building the library, which can be published as a standalone package.
- **Web Example**: The `web` directory contains an example web application that demonstrates the usage of the library.

### DevContainer

This project includes a devcontainer configuration for Visual Studio Code. To use the devcontainer, open the project in Visual Studio Code and click the "Reopen in Container" button when prompted.

### Git Hooks

This project uses Husky and lint-staged to enforce code styling and formatting on commit. When you commit changes, the linter and Prettier will automatically run, and the commit will be rejected if there are any issues.

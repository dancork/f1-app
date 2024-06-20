# F1 App

This app utilises the [Open F1 API](https://openf1.org) as a data source to display data about past, and live, grand prix.

The application is currently hosted at [f1-app-dc.netlify.app](https://f1-app-dc.netlify.app).

## Technology Used

- pnpm, as package manager
- typescript
- vite with swc
- jotai, for state management
- axios, for making http requests
- tanstack query, for managing statefulness of http requests
- luxon, for manipulating dates
- remeda, a quite of typescript utilities
- eslint, for code quality
- playwright, for end-to-end testing

- github actions, to run linting and e2e tests when deploying
- netlify, to host the app

## Setup

### Pre-requisites

The application was built using [pnpm](https://pnpm.io) as its package manager. If you already have node and npm installed then this can be installed using the following command.

```sh
$ npm install --global pnpm
```

### Dependencies

The application's dependencies can then be installed using the following command.

```sh
$ pnpm install
```

This will include the dependencies required for executing e2e tests in playwright.

## Development

### Running the app locally

To run the application on your local machine using `vite` use the following command and open [localhost:5173](http://localhost:5173/) in your browser.

```sh
$ pnpm dev
```

### Code quality

ESLint is installed and configured, along with Prettier, to maintain code quality. These are checked on github actions but can also be run locally.

```sh
$ pnpm lint
```

### End-to-end tests

The end-to-end tests can be run with or without playwright's UI. The headed mode is useful for testing and debugging, however it is best to test in headless mode before commiting as this will be how the e2es are run on github actions.

```sh
// headless
$ pnpm e2e

// headed
$ pnpm e2e --ui
```

Sometimes it is necessary, depending on your OS, to install playwright browsers and dependencies. Details about how to do this [can be found on their documention website](https://playwright.dev/docs/browsers).

## Roadmap

The API can supply a lot of data, and in real-time. For this reason I think it would be fun to add the following functionality:

- Visualisations of larger datasets such as:
  - Position change over time
  - Lap speed over time
- Information about the "stints" each driver had and on what tyre
- Details of the intervals between drivers
- Race information such as:
  - Weather and track temperatures
  - Racing indcidents like flags and safety cars
- Sessions other than the Grand Prix. Eg. practice, qualifying, sprints

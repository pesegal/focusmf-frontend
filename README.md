# focusmf-frontend

## Prerequisites
* NodeJS v10.x (install with nvm)
* Yarn (install with homebrew)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
# Install Node LTS version
nvm install 10
# Set NodeJS v10.x as your default so when you open a new terminal session you won't have to switch to it again.
nvm alias default 10
# install Yarn without Node
brew install yarn --without-node
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

## Testing
## Functional (e2e)
I setup the Cypress testing framework to work within our application. See the [documentation here](https://docs.cypress.io/guides/overview/why-cypress.html).
1. Start up the back-end and front-end applications
2. In a new terminal window, go to the root directory of the front-end project (this project).
    1. Ensure you have installed the latest dependencies:
        ```bash
        yarn install
        ```
    2. Open the Cypress application:
        ```bash
        yarn test:e2e
        ```
5. Click on any test to launch it. You can run tests from the examples folder but that will only run the sample tests pointing at cypress.io. If you want to run our tests, collapse the example folder and you should see a list of tests at the bottom. At the creation of this section, there is only a single test named `sign-up.spec.js`. Click on it to see it run.

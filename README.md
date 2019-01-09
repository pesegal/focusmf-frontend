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

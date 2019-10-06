const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src/'))
  },

  devServer: {
    proxy: {
      '^/graphql': {
        target: 'http://localhost:3000'
      }
    }
  }
}

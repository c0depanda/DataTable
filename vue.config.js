const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === "production"
module.exports = {
  lintOnSave: false,
  configureWebpack: {
    optimization: {
      minimizer: isProd ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true
            },
            sourceMap: false
          }
        })
      ] : []
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  }
}
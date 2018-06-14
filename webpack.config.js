var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var scriptConfig = function (env) {
  var dist = env.chain ? '/dist/' + env.chain : '/src'
  return {
    context: path.join(__dirname, "src"),
    devtool: (env && env.build !== "true") ? "inline-sourcemap" : false,
    entry: {
      app: ['babel-polyfill', "./js/client.js", "./assets/css/app.scss"],
      other: "./assets/css/foundation.scss"
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000000
            }
          }
        ]
      }
      ]
    },
    output: {
      path: __dirname + dist,
      filename: "[name].min.js"
    },
    plugins: (env && env.build !== "true") ? [
      new ExtractTextPlugin({ // define where to save the file
        filename: '[name].bundle.css',
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        'env': JSON.stringify(env.chain),
        'process.env': {
          'logger': 'true'
        }
      }),
      new HtmlWebpackPlugin({
        title: "Wallet - kyber.network",
        template: './app.html.template',
        favicon: './assets/img/favicon.png',
        inject: 'body',
        styleFile: 'app.bundle.css?v=' + Date.now(),
        otherFile: 'other.bundle.css?v=' + Date.now()
      })
    ] : [
        new UglifyJsPlugin({
          uglifyOptions: {
            comments: false,
            compress: {
              drop_console: true,
              warnings: false
            }
          }
        }),
        new ExtractTextPlugin({ // define where to save the file
          filename: '[name].bundle.css',
          allChunks: true,
        }),
        new webpack.DefinePlugin({
          'env': JSON.stringify(env.chain),
          'process.env': {
            'NODE_ENV': JSON.stringify("production")
          }
        }),
        new CompressionPlugin({ 
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
          minRatio: 0.8
        }),
        new HtmlWebpackPlugin({
          title: "Wallet - kyber.network",
          template: './app.html.template',
          favicon: './assets/img/favicon.png',
          inject: 'body',
          styleFile: 'app.bundle.css?v=' + Date.now(),
          otherFile: 'other.bundle.css?v=' + Date.now()
        })
      ],
    devServer: {
      compress: true,
      disableHostCheck: true,
    }
  }
};


// var indexConfig = function (env) {
//   var HtmlWebpackPlugin = require('html-webpack-plugin')
//   var dist = env.chain ? '/dist/' + env.chain : '/src'
//   return {
//     entry: [ __dirname + dist + '/app.min.js',__dirname + dist + '/other.min.js'],
//     output: {
//       path: __dirname + dist,
//       filename: 'client.min.js?v=' + Date.now()
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         title: "Wallet - kyber.network",
//         template: './src/app.html.template',
//         favicon: './src/assets/img/favicon.png',
//         inject: 'body',
//         styleFile: 'app.bundle.css?v=' + Date.now(),
//         otherFile: 'other.bundle.css?v=' + Date.now()
//       })
//     ]
//   }
// }

module.exports = [scriptConfig]
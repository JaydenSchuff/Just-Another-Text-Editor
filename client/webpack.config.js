const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
       // HtmlWebpackPlugin for generating HTML files
       new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main'], // Which entry point to include
      }),

      // WebpackPwaManifest for generating a manifest.json file
      new WebpackPwaManifest({
        name: 'My App',
        short_name: 'App',
        description: 'My Progressive Web App',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
          },
        ],
      }),

      // Workbox InjectManifest plugin for service worker
      new InjectManifest({
        swSrc: './src/sw.js', // Path to your service worker script
      }),
    ],
    module: {
      rules: [
        // CSS loader rule
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
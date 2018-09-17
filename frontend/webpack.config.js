const webpack = require('webpack');

const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: 'src/public',
    historyApiFallback: true,
    port: 8080,
    host: '0.0.0.0',
    public: 'ec2-35-183-116-111.ca-central-1.compute.amazonaws.com',
  },
  devtool: 'eval',
  output: {
    filename: 'index.jsx',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2016'] },
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/public/index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'src/public' },
    ], '.'),
    new webpack.DefinePlugin({
      'process.env': {
        ENDPOINT: JSON.stringify(process.env.ENDPOINT || 'http://ec2-35-183-116-111.ca-central-1.compute.amazonaws.com/:9000/api'),
      },
    }),
  ],
};

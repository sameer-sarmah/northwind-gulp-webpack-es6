const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractCSS= require('extract-text-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  context: path.join(__dirname, 'src'),
  entry: {
    product: './app/product.component',
    vendor:"jquery"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        //use: ['style-loader','css-loader'],
        use :ExtractCSS.extract({	
        fallback: "style-loader",
				use: {
					loader: "css-loader",
					options: {
						sourceMap: true
					}
				}}),
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpg)$/,
        use: ['file-loader'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    hot: true,
    historyApiFallback: true

  },
  resolve:{
    alias:{
      "styles": path.resolve(__dirname, 'src/styles'),
      "assets": path.resolve(__dirname, 'src/assets'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
      chunks: ['common','vendor','product'],
      filename: 'index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["common","bootstrap","vendor"]
    }),
    new ExtractCSS({
			filename: "[name].css"
    })
    //,new Uglify()
  ]
};
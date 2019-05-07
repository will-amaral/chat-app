const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: './client/src/index.js',
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
			{
				test: /\.(sass|css|scss)$/, 
				use: [
					process.env.NODE_ENV == 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({template: './client/public/index.html'}),
		new MiniCssExtractPlugin()
	],
};

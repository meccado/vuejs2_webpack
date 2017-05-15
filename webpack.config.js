var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var WebpackCleanPlugin = require('webpack-clean-plugin');

module.exports = {
    entry: {
       app:  [
           './src/app.js', 
           './src/app.scss'
       ],
    } ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    // devServer: {
    //     contentBase: path.join(__dirname, "dist"),
    //     compress: true,
    //     port: 9000
    // },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: ['babel-loader'], 
                // query: {
                //     presets: ["es2015"]
                // }
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            { 
                test: /\.(png|jpe?g|gif|svg)$/, 
                loaders: [
                    {
                        loader: 'file-loader', 
                            options: {
                                name: 'images/[name].[hash].[ext]'
                            }
                    },
                    'img-loader'
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '', 'src', 'index.html'),
            inject: 'body',
            filename: 'index.html'
        }),
        new ExtractTextWebpackPlugin({
            filename: '[name].[chunkhash].css',
            disable: false,
            allChunks: true
        }),
        new WebpackCleanPlugin({
            //on: "emit",
            path: ['./static', './dist']
        }),

        // function (){
        //     this.plugin('done', stats => {
        //         require('fs').writeFileSync(
        //             path.join(___dirname, 'dist/manifest.json'),
        //             JSON.stringify(stats.toJson().assetsByChunkName)
        //         );
        //     });
        // }
        
    ]   
}


if(process.env.NODE_ENV === 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    )
}
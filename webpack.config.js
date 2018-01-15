const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
module.exports = {
    entry:'./src/index.js',
    devtool: 'inline-source-map',
    plugins:[
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        }),
        // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ],
    output:{
        filename:'bundle.js',
        path: path.resolve(__dirname,'build'),
        publicPath:'./'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                'babel-loader',
                ],
                exclude: /node_modules/
            },{
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9', // React doesn't support IE8 anyway
                                ],
                                flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                ],
            },{
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },{
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            }
        ],
    }
}
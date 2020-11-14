const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const HtmlWebpackPlugin = require ("html-webpack-plugin");

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';

module.exports = {

    entry: "./dev",

    output: {
        path: path.resolve(__dirname, "site"),
        filename: "bundle.[chunkhash].js"
    },

    mode: env,

    watch: isDev,

    devtool: isDev && "eval-source-map",

    devServer: {
        contentBase: path.resolve(__dirname, "site"),
        host: "localhost",
        port: 9090,
        historyApiFallback: true
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {

                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.svg$/,
                use: [
                    "babel-loader",
                    "svg-react-loader"
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|webp)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: isDev? "[name]-[hash].[ext]" : "images/[hash].[ext]"
                    }
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: "css-loader"
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: isDev ? '[local]-[hash:base64:5]' : '[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require("autoprefixer")()
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },

    plugins: [
        new WebpackMd5Hash(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'dev/static'),
                    to: path.resolve(__dirname, 'site')
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "./dev/template/index.html",
            filename: "index.html"
        }),
        new MiniCSSExtractPlugin({
            filename: 'style.[chunkhash].css'
            }
        ),
    ]

};
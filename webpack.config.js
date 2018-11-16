const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require('webpack');
var root = path.resolve(__dirname);

module.exports = [
    {
    // mode: 'production',
    //entry – tên của file hoặc một mảng những file mà chúng ta muốn include
    name: "pro",
    entry: {
        index :['./src/index.js'],
        js:[  "./src/js/jquery-3.3.1.min.js",
            "./src/js/bootstrap.min.js"]


    },
    //output– là một object chứa những thiết lập output
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                // test: value là chuỗi regex so khớp với các định dạng file, khi trình phân tích đi qua test nó sẽ nạp các file này để chuẩn bị cho quá trình xử lý
                test: /\.html$/,

                use: [

                    {
                        loader: 'html-loader',
                        options: {
                            // minimize: true,
                            removeComments: true,
                            collapseWhitespace: true,
                            minifyCSS:true,
                        },
                    }],
            },
            {
                test: /\.jpg$/,
                loader: 'url-loader',
                // truyền cho các option cho nó
                query: {
                    limit: 100000,
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader?name=[path]-[name].[ext]",
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    "css-loader",
                    "sass-loader"
                ]}
        ],
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js$/,
                exclude: /(node_module| bower_components)/,
                include: root,
                cache: true,
                parallel: true,
                // sourceMap: true, // set to true if you want JS source maps
                // extractComments: true,

            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        // splitChunks: {
        //     cacheGroups: {
        //         styles: {
        //             name: 'styles',
        //             test: /\.css$/,
        //             chunks: 'all',
        //             enforce: true
        //         }
        //     }
        // }
    },


    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new MiniCssExtractPlugin({
        //     filename:  '[name]-[id].css',
        //     chunkFilename:  '[id].[hash].css',
        // }),
        new HtmlWebpackPlugin({
            template: path.resolve(root, 'src/index.html'),
            title:'Test',
            excludeChunks:['index.html'],
            // hash: true, //them thẻ <script> với đường link đính kèm 1 mã hash
            cache: true, //cache file nếu có ko co thay đổi thì ko bundle lại
            showErrors: false, //neu co loi sẽ ghi vào file html
            // minify: false, //false: ko minify html ngước lại tru: minify html
            filename: 'index.html',
            // favicon: 'src/favicon.ico', //them file favicon vào trang html
            // /*nạp các nhánh javascript bundle vào file html*/
            // chunks: ['app', 'publicJS/ex-common', 'publicJS/ex2', 'publicJS/ex1', 'app-home'],
            // chunksSortMode: function (a, b) {
            //     return (a.names[0] > b.names[0]) ? 1 : -1;
            // }, //sắp xếp lại các file script chèn vào theo đúng thứ tự
            // inject: 'body' //có 2 gia trị là body và head (chèn mã script vào nơi tương ứng)
        })
    ]
},
    {
        mode: "production",
        name:"test",
        entry: {
            test:'./src/test.js',
            // lib:'./src/lib.js',
            // another: './src/another.js',

        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: '[name].bundle.js',// format name của bundle
            filename: '[name].js'
        },
        module: {
            rules: [{
                test: /\.(sc|sa|c)ss$/,
                use: [
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                     'css-loader',
                    'sass-loader'
                ]
            },
                // {
                //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                //     loader: 'url-loader?limit=100000'
                // },
                // {
                //     // test: value là chuỗi regex so khớp với các định dạng file, khi trình phân tích đi qua test nó sẽ nạp các file này để chuẩn bị cho quá trình xử lý
                //     test: /\.html$/,
                //
                //     use: [
                //
                //         {
                //             loader: 'html-loader',
                //             options: {
                //                 // minimize: true,
                //                 removeComments: true,
                //                 collapseWhitespace: true,
                //                 minifyCSS:true,
                //             },
                //         }],
                // }
            ]
        },
        // optimization: {
        //     splitChunks: {
        //         chunks: "all",
        //         // Kích thước tối thiểu, tính theo byte, cho một đoạn được tạo ra.
        //         minSize: 0,
        //     //     maxSize: 0,
        //     //     minChunks: 1,
        //     //     maxAsyncRequests: 5,
        //     //     maxInitialRequests: 3,
        //     //     automaticNameDelimiter: '~',
        //     //     name: true,
        //     //     cacheGroups: {
        //     //         vendors: {
        //     //             test: /[\\/]node_modules[\\/]/,
        //     //             priority: -10
        //     //         },
        //     //         default: {
        //     //             minChunks: 2,
        //     //             priority: -20,
        //     //             reuseExistingChunk: true
        //     //         }
        //     //     }
        //     }
        // },
        // plugins: [
        //     new CleanWebpackPlugin(['dist']),
        //     new MiniCssExtractPlugin({
        //         filename: 'test.css',
        //         chunkFilename:  '[id].test.css',
        //     }),
        //     new HtmlWebpackPlugin({
        //         title: 'Code Splitting'
        //     })
        //
        // ]

    }
];


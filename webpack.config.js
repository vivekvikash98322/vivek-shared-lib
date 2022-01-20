const  webpack =  require('webpack');
const path = require('path')

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    mode: "production",
    output: {
        publicPath: ASSET_PATH,
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "umd",
        library: "vivek-shared-lib"
    },
    module: {
        rules: [
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
                  "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
                ],
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    externals: {
        react: "react"
    },
    plugins: [
        // This makes it possible for us to safely use env vars on our code
        new webpack.DefinePlugin({
          'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
      ]
}
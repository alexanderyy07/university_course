var path = require('path');

module.exports = {
    entry: './client/js/app.js',
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: false
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread'],
                    compact: false
                },
                exclude: /node_modules\/(?!(react-file-viewer)\/).*/,
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss'],
    },
    // postcss: function() {
    //     return [
    //       require('postcss-import')({ // Import all the css files...
    //         onImport: function (files) {
    //             files.forEach(this.addDependency); // ...and add dependecies from the main.css files to the other css files...
    //         }.bind(this) // ...so they get hot–reloaded when something changes...
    //       }),
    //       require('postcss-simple-vars')(), // ...then replace the variables...
    //       require('postcss-focus')(), // ...add a :focus to ever :hover...
    //       require('autoprefixer')({ // ...and add vendor prefixes...
    //         browsers: ['last 2 versions', 'IE > 8'] // ...supporting the last 2 major browser versions and IE 8 and up...
    //       }),
    //       require('postcss-reporter')({ // This plugin makes sure we get warnings in the console
    //         clearMessages: true
    //       })
    //     ];
    // },
    // target: "web", // Make web variables accessible to webpack, e.g. window
    // stats: {
    //     colors: true
    // },
    // devtool: 'source-map'
};
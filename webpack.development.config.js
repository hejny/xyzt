const configs = [];

configs.push(
    Object.assign({}, require('./webpack.common.config.js'), {
        mode: 'development',
        output: {
            filename: 'main.dev.browser.js',
            path: __dirname + '/dist/',
            libraryTarget: 'var',
            library: 'Vector',
        },
    }),
);

module.exports = configs;

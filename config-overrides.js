const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

// const theme = require('./package.json').theme;

module.exports = function override(config, env) {
    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [ tsImportPluginFactory({
            libraryDirectory: 'es',
            libraryName: 'antd-mobile',
            style: true,
            }) ]
        })
    };

    config = rewireLess.withLoaderOptions({
        // modifyVars: theme,
        javascriptEnabled: true
    })(config, env);

    return config;
};
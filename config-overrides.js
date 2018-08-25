const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin');
const { getLoader } = require('react-app-rewired');
const { updateConfig } = require('react-app-rewire-antd-theme');

const rewireLess = require('react-app-rewire-less');

// const theme = require('./package.json').theme;

const themeOptions = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd-mobile'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  mainLessFile: path.join(__dirname, './src/index.less'),
  themeVariables: [],
  indexFileName: 'index.html',
  generateOnce: false,
  publicPath: ''
}

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
            before: [
                tsImportPluginFactory([{
                    libraryDirectory: 'es',
                    libraryName: 'antd-mobile',
                    style: true
                },{
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true
                }])
            ]
        })
    };

    config = rewireLess.withLoaderOptions({
    //      modifyVars: theme,
        javascriptEnabled: true
    })(config, env);

    config = updateConfig(config, env, themeOptions);
 
    return config;
};
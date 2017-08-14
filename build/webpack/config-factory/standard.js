var path=require('path');
var webpack=require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var AssetPrecachePlugin = require('asset-precache-webpack-plugin');
var autoprefixer=require('autoprefixer');
var fs=require('fs');

module.exports=function(option){
    var projectPath=path.resolve(__dirname,'../../..');
    var codePath=path.resolve(projectPath,'code');
    var distPath=path.resolve(projectPath,'dist');
    var entryPath=path.resolve(codePath,'entry');
    var viewPath=path.resolve(codePath,'view');
    var storePath=path.resolve(codePath,'store');
    var wrapperPath=path.resolve(codePath,'wrapper');
    var mixinFactoryPath=path.resolve(codePath,'mixin-factory');
    var pluginPath=path.resolve(codePath,'plugin');
    var krVuePath=path.resolve(codePath,'kr-vue');

    var babelLoaderConf={
        loader:'babel-loader',
        options:{
            presets:['es2015','stage-0','stage-1'],
            plugins:['transform-decorators-legacy']
        }
    };
    var entries=(function (extra){
        var entries={
            js:{},
            html:[]
        };
        try{
            fs.readdirSync(entryPath).forEach(function(entry){
                var dir=path.resolve(entryPath,entry);
                var stat=fs.lstatSync(dir);
                if(stat.isDirectory()){
                    var js=path.resolve(dir,'index.js');
                    var html=path.resolve(dir,'index.html');
                    var favicon=path.resolve(dir,'favicon.ico');
                    try{
                        fs.lstatSync(js);
                        fs.lstatSync(html);
                        var htmlOption={};
                        entries.js[entry]=extra.concat(js);

                        if(option.hotReplace){
                            entries.js[entry].push(`!file-loader!${html}`);
                        }

                        htmlOption={
                            filename:path.basename(html),
                            template:html,
                            inject:false
                        };
                        try{
                            fs.lstatSync(favicon);
                            htmlOption.favicon=favicon;
                        }
                        catch(e){}
                        entries.html.push(new HtmlWebpackPlugin(htmlOption));

                    }
                    catch(e){}
                }
            });
        }
        catch(e){}
        return entries;
    })(['babel-polyfill']);
    var result={
        context:codePath,
        entry:entries.js,
        output:{
            path:distPath,
            filename:'[name].[chunkhash:8].js',
            chunkFilename:'[name].[chunkhash:8].chunk.js'
        },
        plugins:[new webpack.HashedModuleIdsPlugin()].concat(entries.html),
        resolve:{
            extensions:['.js', '.vue', '.json'],
            alias:{
                'project':projectPath,
                'vue':'vue/dist/vue.common.js',
                'store':storePath,
                'view':viewPath,
                'wrapper':wrapperPath,
                'plugin':pluginPath,
                'mixin-factory':mixinFactoryPath,
                'kr-vue':krVuePath,
            }
        },
        resolveLoader:{
            modules: [
                path.join(projectPath,'node_modules'),
                path.join(projectPath,'build/webpack/loader'),
            ],
        },
        module:{
            rules:[
                {
                    test: /\.(gif|jpg|png|woff|woff2|svg|eot|ttf)\??.*$/,
                    //include:[codePath],
                    use:[{
                        loader:'url-loader',
                        options:{
                            limit:option.inlineFileLimit?option.inlineFileLimit:(1024*8),
                            name:'assets/[path][name]-[hash].[ext]',
                        }
                    }]
                },
                {
                    test: /\.vue$/,
                    include:[codePath],
                    use: [{
                        loader: 'vue-loader',
                        options: {
                            postcss: {
                                plugins: [autoprefixer({browsers: ['>1%']})]
                            },
                            cssModules:{
                                camelCase:true,
                                localIdentName:'[local]-[hash:base64:5]'
                            },
                            loaders:{
                                js:[babelLoaderConf],
                            }
                        }
                    }]
                }, {
                    test: /\.js$/,
                    include:[codePath],
                    use: [babelLoaderConf]
                }, {
                    test: /\.css$/,
                    use: ['style-loader','css-loader']
                }
            ],
        }
    };
    if(option.publicPath){
        result.output.publicPath=option.publicPath;
    }
    if(option.hotReplace){
        result.plugins.push(new webpack.HotModuleReplacementPlugin());
        var host=option.host;
        var port=option.port;
        var extra=['webpack/hot/dev-server','webpack-dev-server/client?http://'+host+':'+port+'/'];
        Object.keys(result.entry).map(function (key) {
            result.entry[key] = extra.concat(result.entry[key])
        });
        result.output.filename='[name].[hash:8].js';
    }
    if(option.uglify){
        result.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));
    }
    if(option.independentStyles){
        result.module.rules[1].use[0].options.extractCSS=true;
        result.plugins=[new ExtractTextPlugin({
            filename:'styles.[contenthash].css',
            allChunks:true
        })].concat(result.plugins);
    }
    if(option.friendlyError){
        result.plugins.push(new FriendlyErrorsPlugin());
    }
    if(option.productionEnv){
        result.plugins.push(new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }));
        result.resolve.alias.vue='vue/dist/vue.min.js';
    }
    if(option.commonChunk){
        result.plugins.push(new webpack.optimize.CommonsChunkPlugin('common'));
    }
    if(option.precache){
        result.plugins.push(new AssetPrecachePlugin({}));
    }
    return result;
};
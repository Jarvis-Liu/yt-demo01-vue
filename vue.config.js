const path = require('path');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
module.exports = {
	configureWebpack: (config)=>{
    config.plugins.push(new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: path.join(__dirname, './src/Skeleton.js'),		//骨架屏配置
        },
      },
      minimize: true,
      quiet: true,
    }))
  },
	lintOnSave: false,		//eslint检验
	publicPath:'./',    // 公共路径
	productionSourceMap:true,  // 生产环境下(false) 分离文件以查看错误行
	outputDir: process.env.NODE_ENV === "development" ? 'devdist' : 'dist', // 不同的环境打不同包名
    // 生产环境是否生成 sourceMap 文件
	devServer: {   // 配置服务器
		host: '0.0.0.0',
        port:8081,
        open:true,
        https:false,
        overlay: {
            warnings: true,
            errors: true
        },
		proxy: {
			"/api" : {
				target: "http://localhost:8080",
				changeOrigin: true,
				pathRewrite: {
					"^/api": '/mock'
				}
			}
		}
	},
	css: {
	    // 是否使用css分离插件 ExtractTextPlugin(使用骨架屏时必须打开)
	    extract: true,
	    // 开启 CSS source maps?
	    sourceMap: false,
	    // 启用 CSS modules for all css / pre-processor files.
	    modules: false
	}
}
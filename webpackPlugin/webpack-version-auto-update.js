const fs = require('fs-extra');
const {  DefinePlugin } = require('webpack');
const path = require('path');


class WebpackVersionAutoUpdate {
  constructor(options) {
    this.isDev = false
    this.currentTime = `${new Date().getTime()}`;
    this.options = options;
  }

  apply(compiler ) {
    compiler.hooks.beforeRun.tap('WebpackVersionAutoUpdate', (compiler) => {
      if (compiler.options.mode === 'development') {
        this.isDev = process.env.NODE_ENV === 'development'
      }
    });
    
    // 创建app端需要使用的版本号文件
    compiler.hooks.afterEmit.tap('WebpackVersionAutoUpdate', (compilation) => {
      const outDir = this.options.outputDir;
      if (!this.isDev) {
        const targetPath = path.join(outDir, 'version');
        fs.outputFileSync(targetPath, this.currentTime)
      }
    });

    // 将版本号设置为全局静态常量
    compiler.options.plugins.push(
      new DefinePlugin({
        'process.env': {
          __APP_VERSION__: JSON.stringify(this.currentTime),
        },
      })
    );
  }
}

module.exports = WebpackVersionAutoUpdate;
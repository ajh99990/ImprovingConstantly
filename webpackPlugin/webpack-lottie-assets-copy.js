const fs = require('fs-extra');

function copyFile(pendingFiles) {
  for (let file of pendingFiles.values()) {
    fs.copySync(file.originPath, file.targetPath)
  }
}
const pluginName = "webpackLottieAssetsCopy"
class WebpackLottieAssetsUrlFormater {
  constructor() {
    this.isDev = process.env.NODE_ENV === 'development'
  }
  apply(compiler) {
    compiler.hooks.afterEmit.tap(pluginName, (compilation) => {
      const data = compilation.lottieJsonLoaderData;
      if (data&&!this.isDev) {
        for (let item of data) {
          copyFile(item[1])
        }
      }
    });
  }
}

module.exports = WebpackLottieAssetsUrlFormater;
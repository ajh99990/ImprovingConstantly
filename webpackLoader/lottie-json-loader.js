const _ = require("lodash")
const path = require('path');

module.exports = function (source) {
  //data.json文件所在路径
  const filePath = this.resourcePath;
  const pathRule = /\/assets\/jsonImg\/(?:[\w-]+\/)*data\.json/
  const isMatch = pathRule.test(filePath)
  const outputOptions = this._compilation.options.output;
  const outDir = outputOptions.path
  const pendingFiles = new Map()
  const base = '/'

  if (isMatch) {
    const json = JSON.parse(source);
    const assetsList = json.assets || []
    for (let item of assetsList) {
      const assetsUrl = item.u;
      if (assetsUrl && _.endsWith(assetsUrl, 'images/')) {
        //资源路径
        const originPath = path.resolve(filePath, '..', 'images', item.p)
        const assetsPath = path.resolve(__dirname, '../assets');
        const pre = path.relative(assetsPath, originPath)
        //目标路径
        const targetPath = path.join(outDir, pre);

        pendingFiles.set(originPath, { originPath, targetPath })
        item.u = ""
        //访问路径
        const resourcePath = path.join(base, pre);

        if (_.startsWith(resourcePath, 'https')) {
          item.p = `${resourcePath.replace(':/', '://')}`
        } else {
          item.p = `${resourcePath}`
        }
      }
    }

    /** 将数据传给plugin */
    const { _compilation } = this;
    if (_compilation) {
      if (!_compilation.lottieJsonLoaderData) {
        _compilation.lottieJsonLoaderData = new Map();
      }
      _compilation.lottieJsonLoaderData.set(filePath, pendingFiles)// 将数据附加到compilation对象上
    }
    return JSON.stringify(json, null, 2);
  }

  return source;
};
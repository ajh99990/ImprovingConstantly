import type { App } from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export const setupAutoImport = (app: App) => {
  const requireComponent = require.context('@/components', false, /\.(vue|js)$/)
  requireComponent.keys().forEach((fileName: string) => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
      // 获取和目录深度无关的文件名
      camelCase(fileName.split('/').pop()?.replace(/\.\w+$/, ''))
    )
    app.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
}
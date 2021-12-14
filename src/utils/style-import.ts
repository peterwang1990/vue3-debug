import { App } from 'vue'
// import 'element-plus/dist/index.css'
// import { ElPagination } from 'element-plus'

/**
 * 按需导入 Element Plus 组件
 * Vite 插件 https://github.com/element-plus/vite-plugin-element-plus
 * @param app {App}
 */
export default function styleImport(app: App) {
  // [ElPagination].forEach((v) => {
  //   app.use(v)
  // })
  return app
}

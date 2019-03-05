module.exports = {
  // history 模式需要后台配置 并且publicPath不支持使用相对地址
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 输出位置
  outputDir: "dist",
  // save时候启动eslint
  lintOnSave: process.env.NODE_ENV !== "production",
  // 静态资源目录位置
  assetsDir: "assets",
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 实现开发eslint警告
  devServer: {
    host: "localhost",
    // 自动打开浏览器
    open: true,
    // 页面显示警告与错误
    overlay: {
      warnings: true,
      errors: true
    }
  }
};

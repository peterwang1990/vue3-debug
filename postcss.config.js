module.exports = () => {
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          "Android 4.1",
          "iOS 7.1",
          "Chrome > 31",
          "ff > 31",
          "ie >= 8",
          "last 10 versions", // 所有主流浏览器最近10版本用
        ],
        grid: true,
      },
      'postcss-pxtorem': {
        rootValue(val) {
          // console.log(val)
          let file = val['file']
          // console.log(file)
          return (file && file.indexOf("style/mobile") > -1) ? 117 : 192
        },
        propList: ['*'],
        unitPrecision: 2
      }
    }
  }
}

/*
 * @Date: 2021-05-19 13:10:59
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-19 14:51:26
 * @FilePath: /elm-app/vue.config.js
 * "http://121.5.32.253:3000",
 */

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: process.env.NODE_ENV !== "development" ? "http://127.0.0.1:3000" : "http://121.5.32.253:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
}
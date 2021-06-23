/*
 * @Date: 2021-05-19 13:10:59
 * @LastEditors: wanting
 * @LastEditTime: 2021-05-19 14:51:26
 * @FilePath: /elm-app/vue.config.js
 */

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
}
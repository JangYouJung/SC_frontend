const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: false,
  },
  devServer: {
    client: {
      webSocketURL: {
        hostname: "sc-chatting.com",
        pathname: "/ws",
        port: 8080,
        protocol: "ws",  
      },
    },
  },
  productionSourceMap: false,
});

/* 기존 코드
client: {
      webSocketURL: {
        hostname: "localhost",
        pathname: "/ws",
        port: 8080,
        protocol: "ws",
*/
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: false,
  },
  devServer: {
    client: {
      webSocketURL: {
        hostname: "localhost",
        pathname: "/ws",
        port: 8080,
        protocol: "ws",
      },
    },
  },
  productionSourceMap: false,
});

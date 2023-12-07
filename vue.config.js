const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: false,
  },
  devServer: {
    client: {
      webSocketURL: {
        hostname: "sc_backend_service",
        pathname: "/api",
        port: 8080,
        protocol: "http",  
      },
    },
  },
  productionSourceMap: false,
});

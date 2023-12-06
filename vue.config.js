const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: false,
  },
  devServer: {
    proxy: {
      "/ws": {
        target: "http://sc-backend-service:8080", // 백엔드 서비스의 클러스터 내부 DNS 이름과 포트
        ws: true,
        changeOrigin: true,
      },
    },
  },
  productionSourceMap: false,
});

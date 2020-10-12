module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/base.scss";',
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
};

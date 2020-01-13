module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/styles/_variables.scss";`
      }
    }
  },
  publicPath: '/dist'
};

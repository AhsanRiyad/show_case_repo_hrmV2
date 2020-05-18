module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  pwa: {

  },
  devServer: { port: 3000 },
  publicPath: process.env.NODE_ENV === 'production' ? '/hrm-babl-v2/' : '/'

}
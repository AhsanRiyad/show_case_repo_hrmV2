module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: { port: 3000 },
  publicPath: process.env.NODE_ENV === 'production' ? '/hrm-babl-v2/' : '/hrm-babl-v2/'
}
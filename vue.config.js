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
  publicPath: process.env.NODE_ENV === 'production' ? '/hrm-babl-v2/' : '/',



  pwa: {
    name: 'NDC92',
    start_url: './profile',
    themeColor: '#6200ea',
    backgroundColor: '#6200ea',
    msTileColor: '#6200ea',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#6200ea',
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/registerServiceWorker.js',
      // ...other Workbox options...
    },
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }

}
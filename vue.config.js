module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: './',
  outputDir: 'docs',
  configureWebpack:{
    performance: {
      hints: false
    }
  }
}
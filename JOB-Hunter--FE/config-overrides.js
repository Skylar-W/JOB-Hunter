/* 
  定义加载配置的 js 模块
*/
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackModuleRule
} = require('customize-cra');
module.exports = override(
  //按需加载
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true,
    // style: 'css',
  }),

  // addLessLoader({
  //   lessOptions: {
  //     javascriptEnabled: true,
  //     modifyVars: { '@brand-primary': 'red' }
  //   }
  // }),

  addWebpackModuleRule({
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      {
        loader: require.resolve('style-loader')
      },
      {
        loader: require.resolve('css-loader')
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          lessOptions: {
            modifyVars: { '@brand-primary': 'orange' },
            javascriptEnabled: true,
          }
        }
      }
    ]
  }),
  // //less模块化配置
  // addWebpackModuleRule({
  //   test: /\.module\.less$/,
  //   use: [
  //     {
  //       loader: require.resolve('style-loader')
  //     },
  //     {
  //       loader: require.resolve('css-loader'),
  //       options: {
  //         modules: {
  //           localIdentName: '[local]_[hash:8]'
  //         }
  //       }
  //     },
  //     {
  //       loader: require.resolve('less-loader'),
  //       // options: {
  //       //   javascriptEnabled: true,
  //       //   sourceMap: true,
  //       //   modifyVars: { '@brand-primary': '#f97325' }
  //       // }
  //     }
  //   ]
  // })
)
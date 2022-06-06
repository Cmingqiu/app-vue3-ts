module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位
      viewportWidth: 750, // 视口宽度，等同于设计稿宽度
      unitPrecision: 5, // 精确到小数点后几位
      propList: ['*'],
      viewportUnit: 'vw', // 需要转换成为的单位
      // selectorBlackList: [],
      minPixelValue: 1, // 最小的像素单位值
      mediaQuery: false, // 是否转换媒体查询中设置的属性值
      replace: true, // 替换包含vw的规则，而不是添加回退
      exclude: [/node_modules/],
      landscape: false, // 是否自动加入 @media (orientation: landscape)，其中的属性值是通过横屏宽度来转换的
      landscapeUnit: 'vw', // 横屏单位
      landscapeWidth: 1334 // 横屏宽度
    }
  }
}

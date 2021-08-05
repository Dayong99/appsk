// mescroll 全局配置
const GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    supply: 200, // 补帧动画的过渡时长 (只对android小程序生效,用于解决android小程序下拉卡顿的问题)
    offset: 80 // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '-- 已经没有更多了 --', // 没有更多数据的提示文本
    offset: 400, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "/static/messagecenter.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '暂无内容' // 提示
    }
  }
}

export default GlobalOption

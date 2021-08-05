<template>
    <view class="stack">
      <view class="stack-item" v-for="(item, index) in pages" @click="next"
      :style="[transformIndex(index),transform(index)]"
      @touchmove.stop.capture="touchmove"
      @touchstart.stop.capture="touchstart"
      @touchend.stop.capture="touchend"
      @touchcancel.stop.capture="touchend"
      @mousedown.stop.capture="touchstart"
      @mouseup.stop.capture="touchend"
      @mousemove.stop.capture="touchmove"
      @mouseout.stop.capture="touchend"
      @webkit-transition-end="onTransitionEnd(index)"
      @transitionend="onTransitionEnd(index)">
        <view class="type1">{{item.plateNo}}</view>
		<view><text>物资类型:</text>{{item.inOutType_dictText}}</view>
		<view><text>材料名称:</text>{{item.materialsSpare}}</view>
		<view><text>发料单位:</text>{{item.materialCompany}}</view>
		<view><text>毛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重:</text>{{item.grossWeight}}</view>
		<view><text>皮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重:</text>{{item.freightWeight}}</view>
		<view><text>净&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重:</text>{{item.suttleWeight}}</view>
		<view><text>偏差结果:</text>{{item.offsetResult_dictText}}</view>
		<view><text>登记时间:</text>{{item.registTime}}</view>
		<view class="type10">
			<text>共<text class="sw">{{pages.length}}</text>条记录，当前是第<text class="sw">{{index+1}}</text>条记录</text>
			<text class="detacent" @click="details(item)">详情></text>
		</view>
		<view class="type11">
			<image src="../../static/typegh.png" class="hw100v"></image>
			<text style="line-height: 45rpx;" class="sw" v-if="item.inOutType==3">发料</text>
			<text style="line-height: 45rpx;" class="sw" v-if="item.inOutType==2">收料</text>
			<text v-if="item.inOutType==1" class="sw">直进直出</text>
		</view>
      </view>
    </view>
</template>
<script>
import detectPrefixes from './detect-prefixes.js'
export default {
  props: {
    stackinit: {
      type: Object,
      default: []
    },
    pages: {
      type: Array,
      default: {}
    }
  },
  data () {
    return {
      basicdata: {
        start: {},
        end: {}
      },
      temporaryData: {
		   // detectPrefixes()
        prefixes:{
			hasTranslate3d:true,
			transform:"transform",
			transition:"transition",
			transitionEnd:"transitionend"
		},	
        offsetY: '',
        poswidth: 0,
        posheight: 0,
        lastPosWidth: '',
        lastPosHeight: '',
        lastZindex: '',
        rotate: 0,
        lastRotate: 0,
        visible: this.stackinit.visible || 3,
        tracking: false,
        animation: false,
        currentPage: this.stackinit.currentPage || 0,
        opacity: 1,
        lastOpacity: 0,
        swipe: false,
        zIndex: 10
      }
    }
  },
  computed: {
    // 划出面积比例
    offsetRatio () {
		
      let width = 320
      let height = 320
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let offsetHeight = height - Math.abs(this.temporaryData.posheight)
      let ratio = 1 - (offsetWidth * offsetHeight) / (width * height) || 0
      return ratio > 1 ? 1 : ratio
    },
    // 划出宽度比例
    offsetWidthRatio () {
      let width = this.offsetWidth
      let offsetWidth = width - Math.abs(this.temporaryData.poswidth)
      let ratio = 1 - offsetWidth / width || 0
      return ratio
    }
  },
  mounted () {
	  console.log(this.temporaryData.prefixes)
    // 绑定事件
    this.$on('next', () => {
      this.next()
    })
    this.$on('prev', () => {
      this.prev()
    })
  },
  methods: {
	  details(info){
		 console.log(info)
		uni.navigateTo({
			url:'/pages/wagondetail/wagondetail?info='+JSON.stringify(info)
		})
	  },
    touchstart (e) {
	console.log(e)
      if (this.temporaryData.tracking) {
        return
      }
      // 是否为touch
      if (e.type === 'touchstart') {
        if (e.touches.length > 1) {
          this.temporaryData.tracking = false
          return
        } else {
          // 记录起始位置
          this.basicdata.start.t = new Date().getTime()
          this.basicdata.start.x = e.touches[0].clientX
          this.basicdata.start.y = e.touches[0].clientY
          this.basicdata.end.x = e.touches[0].clientX
          this.basicdata.end.y = e.touches[0].clientY
          // offsetY在touch事件中没有，只能自己计算
          this.temporaryData.offsetY = e.touches[0].pageY
        }
      // pc操作
      } else {
        this.basicdata.start.t = new Date().getTime()
        this.basicdata.start.x = e.clientX
        this.basicdata.start.y = e.clientY
        this.basicdata.end.x = e.clientX
        this.basicdata.end.y = e.clientY
        this.temporaryData.offsetY = e.offsetY
      }
      this.temporaryData.tracking = true
      this.temporaryData.animation = false
    },
    touchmove (e) {
      // 记录滑动位置
      if (this.temporaryData.tracking && !this.temporaryData.animation) {
        if (e.type === 'touchmove') {
          e.preventDefault()
          this.basicdata.end.x = e.touches[0].clientX
          this.basicdata.end.y = e.touches[0].clientY
        } else {
          e.preventDefault()
          this.basicdata.end.x = e.clientX
          this.basicdata.end.y = e.clientY
        }
        // 计算滑动值
        this.temporaryData.poswidth = this.basicdata.end.x - this.basicdata.start.x
        this.temporaryData.posheight = this.basicdata.end.y - this.basicdata.start.y
        let rotateDirection = this.rotateDirection()
        let angleRatio = this.angleRatio()
        this.temporaryData.rotate = rotateDirection * this.offsetWidthRatio * 15 * angleRatio
      }
    },
    touchend (e) {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 滑动结束，触发判断
      // 判断划出面积是否大于0.4
      if (this.offsetRatio >= 0.4) {
        // 计算划出后最终位置
        let ratio = Math.abs(this.temporaryData.posheight / this.temporaryData.poswidth)
        this.temporaryData.poswidth = this.temporaryData.poswidth >= 0 ? this.temporaryData.poswidth + 200 : this.temporaryData.poswidth - 200
        this.temporaryData.posheight = this.temporaryData.posheight >= 0 ? Math.abs(this.temporaryData.poswidth * ratio) : -Math.abs(this.temporaryData.poswidth * ratio)
        this.temporaryData.opacity = 0
        this.temporaryData.swipe = true
        this.nextTick()
      // 不满足条件则滑入
      } else {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.swipe = false
        this.temporaryData.rotate = 0
      }
    },
    nextTick () {
      // 记录最终滑动距离
      this.temporaryData.lastPosWidth = this.temporaryData.poswidth
      this.temporaryData.lastPosHeight = this.temporaryData.posheight
      this.temporaryData.lastRotate = this.temporaryData.rotate
      this.temporaryData.lastZindex = 20
      // 循环currentPage
      this.temporaryData.currentPage = this.temporaryData.currentPage === this.pages.length - 1 ? 0 : this.temporaryData.currentPage + 1
      // currentPage切换，整体dom进行变化，把第一层滑动置最低
      this.$nextTick(() => {
        this.temporaryData.poswidth = 0
        this.temporaryData.posheight = 0
        this.temporaryData.opacity = 1
        this.temporaryData.rotate = 0
      })
    },
    onTransitionEnd (index) {
      let lastPage = this.temporaryData.currentPage === 0 ? this.pages.length - 1 : this.temporaryData.currentPage - 1
      // dom发生变化正在执行的动画滑动序列已经变为上一层
      if (this.temporaryData.swipe && index === lastPage) {
        this.temporaryData.animation = true
        this.temporaryData.lastPosWidth = 0
        this.temporaryData.lastPosHeight = 0
        this.temporaryData.lastOpacity = 0
        this.temporaryData.lastRotate = 0
        this.temporaryData.swipe = false
        this.temporaryData.lastZindex = -1
      }
    },
    prev () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.offsetWidth
      this.temporaryData.poswidth = -width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '-3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    next () {
      this.temporaryData.tracking = false
      this.temporaryData.animation = true
      // 计算划出后最终位置
      let width = this.offsetWidth
      this.temporaryData.poswidth = width
      this.temporaryData.posheight = 0
      this.temporaryData.opacity = 0
      this.temporaryData.rotate = '3'
      this.temporaryData.swipe = true
      this.nextTick()
    },
    rotateDirection () {
      if (this.temporaryData.poswidth <= 0) {
        return -1
      } else {
        return 1
      }
    },
    angleRatio () {
      let height = this.offsetHeight
      let offsetY = this.temporaryData.offsetY
      let ratio = -1 * (2 * offsetY / height - 1)
      return ratio || 0
    },
    inStack (index, currentPage) {
      let stack = []
      let visible = this.temporaryData.visible
      let length = this.pages.length
      for (let i = 0; i < visible; i++) {
        if (currentPage + i < length) {
          stack.push(currentPage + i)
        } else {
          stack.push(currentPage + i - length)
        }
      }
      return stack.indexOf(index) >= 0
    },
    // 非首页样式切换
    transform (index) {
      let currentPage = this.temporaryData.currentPage
      let length = this.pages.length
      let lastPage = currentPage === 0 ? this.pages.length - 1 : currentPage - 1
      let style = {}
      let visible = this.temporaryData.visible
      if (index === this.temporaryData.currentPage) {
        return
      }
      if (this.inStack(index, currentPage)) {
        let perIndex = index - currentPage > 0 ? index - currentPage : index - currentPage + length
        style['opacity'] = '0.6'
        style['transform'] = 'translate3D(0,0,' + -1 * 60 * (perIndex - this.offsetRatio) + 'px' + ')'
        style['zIndex'] = visible - perIndex
        if (!this.temporaryData.tracking) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
        }
      } else if (index === lastPage) {
        style['transform'] = 'translate3D(' + this.temporaryData.lastPosWidth + 'px' + ',' + this.temporaryData.lastPosHeight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.lastRotate + 'deg)'
        style['opacity'] = this.temporaryData.lastOpacity
        style['zIndex'] = this.temporaryData.lastZindex
        style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
        style[this.temporaryData.prefixes.transition + 'Duration'] = 300 + 'ms'
      } else {
        style['zIndex'] = '-1'
        style['transform'] = 'translate3D(0,0,' + -1 * visible * 60 + 'px' + ')'
      }
      return style
    },
    // 首页样式切换
    transformIndex (index) {
      if (index === this.temporaryData.currentPage) {
        let style = {}
        style['transform'] = 'translate3D(' + this.temporaryData.poswidth + 'px' + ',' + this.temporaryData.posheight + 'px' + ',0px) ' + 'rotate(' + this.temporaryData.rotate + 'deg)'
        style['opacity'] = this.temporaryData.opacity
        style['zIndex'] = 10
        if (this.temporaryData.animation) {
          style[this.temporaryData.prefixes.transition + 'TimingFunction'] = 'ease'
          style[this.temporaryData.prefixes.transition + 'Duration'] = (this.temporaryData.animation ? 300 : 0) + 'ms'
        }
        return style
      }
    }
  }
}
</script>
<style>
  .stack {
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 1000px;
    perspective-origin: 50% 150%;
    -webkit-perspective: 1000px;
    -webkit-perspective-origin: 50% 150%;
    margin: 0;
    padding: 0;
	line-height: 54rpx;
	font-size: 28rpx;
	color:#57585A;
  }
  .stack-item{
    background: #fff;
    height: 100%;
    width: 92%;
    border-radius: 4px;
   /* text-align: center; */
    overflow: hidden;
    position: absolute;
    opacity: 0;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: auto;
	padding-left: 51rpx;
	margin-bottom:100rpx;
  }
  .stack-item img {
    width: 100%;
    display: block;
    pointer-events: none;
  }
  .stack-container li.move-back {
    /* http://matthewlein.com/ceaser/ */
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1); /* older webkit */
    -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1.515);
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.470, 1.515);
  }
  .type1{
	  font-size: 42rpx;
	  font-family: 'PingFang SC';
	  font-weight: 800;
	  color: #181616;
	  margin-top:48rpx;
	  margin-bottom:49rpx;
  }
  .type10{
	  display: flex;
	  justify-content: space-between;
  }
  .type10 text:nth-child(1){
  	  color:#ff9a52;
  	  z-index: 999;
	  font-size: 24rpx;
	  margin-left: 8rpx;
  }
  .type10 text:nth-child(2){
	  margin-left: 8rpx;
  }
  .type10 .detacent{
	  padding-right: 33rpx;
	  color:#235FED;
	  z-index: 999;
	   
  }
  .type11{
	position: absolute;
	right:30rpx;
	top:0;
	width: 55rpx;
	height: 123rpx;
	line-height: 26rpx;
	font-size: 22rpx;
	color:#fff;
   }
   .type11 text{
	   position: fixed;
	   top:0;
	   right:30rpx;
	   width: 30rpx;
	   height: 123rpx;
   }
   .stack view text{
	   margin-right:10rpx;
   }
   .stack .stack-item:nth-child(1){
	   
   }
</style>

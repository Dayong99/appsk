<template>
  <view class="boxinput">
		<view class="imagebox">
		 <image src="../../static/fangda.png" class="hw100v"></image>
		</view>
		<input class="search" placeholder="请输入搜索关键字" @input="open">			
	  </input>
  </view>
</template>

<script>
  export default {
    name: 'comm-input',
    data() {
      return {
      }
    },
    methods: {
      open(e) {
		this.$emit('chang',e.detail.value)
      }
    }
  }
</script>

<style>
  /* 搜索 */
  .boxinput{
  	width: 690rpx;
  	margin:0 auto;
  	display: flex;
  }
  .imagebox{
  	width: 25rpx;height:25rpx;
  	margin:35rpx -70rpx 0 20rpx;
  	z-index: 99;
  }
  .search{
    width:615rpx;
    height:75rpx;
    margin:0 auto;
    margin-top:20rpx;
    background:rgba(248,248,248,1);
    border-radius:38rpx;
    position: relative;
    padding-left: 75rpx;
    font-size:30rpx;
    font-family:'PingFang SC';
    font-weight:bold;
    color:rgba(196,196,196,1);
  }
  .search .image{
    width:70rpx;
    height: 70rpx;
    position: absolute;
    top: 21rpx;
    left: 24rpx;
    
  }
</style>

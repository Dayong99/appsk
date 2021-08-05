<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">台座详情</view>
  		<view>
  			<text v-if="false">下一题</text>
  		</view>
  	</view>
	<view class="essential">
		<view class="detaillist">
			<view>预制场编号</view>
			<view>1</view>
		</view>
		<view class="detaillist">
			<view>预制台座编号</view>
			<view>1</view>
		</view>
		<view class="detaillist">
			<view>预制台座长(m)</view>
			<view>1</view>
		</view>
		<view class="detaillist">
			<view>预制台座宽(m)</view>
			<view>1</view>
		</view>
		<view class="detaillist">
			<view>预制台座宽(高)</view>
			<view>1</view>
		</view>
		<view class="detaillist">
			<view>预制梁类型</view>
			<view>1</view>
		</view>
	</view>
  </view>
</template>
<script>
  export default {
	  data(){
		  return{
			  current:0
		  }
	  },
    computed: {
    },
	
    methods: {
      /// 跳转打开新窗口
      fnOpenWin(type) {
        uni.navigateTo({
          url: `/pages/news/${type}/${type}`
        })
      },
	  goback(){
		  uni.navigateBack()
	  },
	  fnbarClick(val){
	  		this.current=val
	  },
	  previewImg(logourl) {
		  let _this = this;
		  let imgsArray = [];
		  imgsArray[0] = logourl
		  uni.previewImage({
			  current: 0,
			  urls: imgsArray
		  });
	  },
    }
  }
</script>

<style>
	page{
		background: #eee;
	}
	.head{
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #235FED, #235FED);
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}
	.safe{
		  width: 70%;
		  padding-left:80rpx;
	}
	/* 样式 */
	.editpent{
		background: #fff;
		width: 100%;
	}
	.editpent .inputsq{
		border-bottom: 1px solid #E6E6E6;
		width: 573rpx;
		padding-bottom:21rpx;		
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #B6C2CE;
	}
	.itemedit{
		height: 124rpx;
		line-height: 146rpx;
		width: 100%;
	}
	.itemedit .a1{
		width: 177rpx;
		padding-left:32rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.persons{
		margin-top:10rpx;
		width: 83rpx;
		height: 83rpx;
		/* position: absolute;
		top:20rpx;
		left: 190rpx; */
	}
	.itemedit text{
		height: 1rpx;
		width: 573rpx;
		background: #D9E2E9;
		margin-top:125rpx;
	}
	
	/* 新增 */
	.beamtotal{
		height:93rpx;
		line-height: 93rpx;
		display: flex;
		background: #fff;
	}
	.beamtotal view{
		width: 50%;
		text-align: center;
	}
	.beamtotal text{
		padding-bottom: 26rpx;
	}
	.beamcurrent{
		color: #235FED;
		border-bottom: 4rpx solid #235FED;
	}
	.essential{
		background: #fff;
	}
	.essential .detaillist{
		display: flex;
		border-bottom: 1rpx soldi #EAE7E7;
		justify-content: space-between;
		height: 106rpx;
		line-height: 106rpx;
		border-bottom: 1rpx solid #EAE7E7;
		padding-left: 47rpx;
		padding-right: 53rpx;
	}
	.essential .detaillist view:nth-child(1){
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.essential .detaillist view:nth-child(2){
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #979BA4;
	}
	.recordetailbox{
		background: #fff;
		margin-top:19rpx;
	}
	.recordetail{
		width: 565rpx;
		margin:0 auto;
		border-left:3rpx solid red;
		padding-left:31rpx;
		position: relative;
		border-bottom: 1rpx solid #EAE7E7;
		padding-bottom: 38rpx;
	}
	.recordetail .data{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #979BA4;
		padding-top:45rpx;
		margin-bottom: 40rpx;
	}
	.recordetail .process{
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #181616;
	}
	.square{
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background: red;
		border-radius: 50%;
		top:50rpx;
		left:-12rpx
	}
	.currentdateprocess{
		color:#235FED
	}
</style>

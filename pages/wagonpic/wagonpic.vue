<template>
  <view style="background: #fff;">
	  <view class="head flex mauto cwhite sw f34r">
	  	<view class="boximgs mt8r" @tap="goback">
	  		<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
	  	</view>
	  	<view class="safe fcenter">磅单图库</view>
	  	<view>
	  		<text v-if="chosenext">下一题</text>
	  	</view>
	  </view>
	  <view class="wagdetail c555 svb">
		  <view>
			  <view style="margin-top:24rpx;">进场抓拍</view>
			  <view class="enter">
				  <view>
					  <image :src="infoPic.inUpPic" @tap="previewImg(infoPic.inUpPic)" mode="" class="hw100v"></image>
				  </view>
				  <view>
					  <image :src="infoPic.inDownPic" @tap="previewImg(infoPic.inDownPic)" mode="" class="hw100v"></image>
				  </view>
				  <view>
								  <image :src="infoPic.inLeftPic" @tap="previewImg(infoPic.inLeftPic)" mode="" class="hw100v"></image>
				  </view>
				  <view>
					  <image :src="infoPic.inRightPic" mode="" @tap="previewImg(infoPic.inRightPic)" class="hw100v"></image>
				  </view>
			  </view>
		  </view>
		 <view>
			 <view>离场抓拍</view>
			 <view class="enter">
				  <view>
					  <image :src="infoPic.outUpPic" mode="" @tap="previewImg(infoPic.outUpPic)" class="hw100v"></image>
				  </view>
				  <view>
					  <image :src="infoPic.outDownPic" @tap="previewImg(infoPic.outDownPic)" mode="" class="hw100v"></image>
				  </view>
				  <view>
								  <image :src="infoPic.outLeftPic" @tap="previewImg(infoPic.outLeftPic)" mode="" class="hw100v"></image>
				  </view>
				  <view>
					  <image :src="infoPic.outRightPic" @tap="previewImg(infoPic.outRightPic)" mode="" class="hw100v"></image>
				  </view>
			 </view>
		 </view>
		 <view>
			 <view>拍照留底</view>
			 <view class="photopic">
				  <view>
					  <image :src="infoPic.photograph" @tap="previewImg(infoPic.photograph)" mode="" class="hw100v"></image>
				  </view>
			 </view>
		 </view>
	  </view>
  </view>
</template>

<script>
 
 
  
  

  export default {
    components: {
   
    },

    data() {
      return {
		chosenext:false,
		infoPic:{}
      }
    },

    onLoad(options) {
		console.log(345)
		console.log(JSON.parse(options.infoPic))
		if(options&&options.infoPic){
			this.infoPic=JSON.parse(options.infoPic)
		}
    },

    computed: {
    
     
    },
	onReady: function (res) {
	        
	    },
	onUnload(){
		
	},
    methods: {
		goback(){
			uni.navigateBack()
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
		background: #fff;
	}
	.titel{
		margin-top:33rpx;
		margin-bottom: 34rpx;
	}
	.videoboxs{
		width: 708rpx;
		height: 443rpx;
	}
	.head{
		width: 694rpx;
		height: 153rpx;
		padding-left: 28rpx;
		padding-right:28rpx;
		line-height: 193rpx;
		position: fixed;
		background: linear-gradient(0deg, #235FED, #235FED);
		z-index: 999;
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
	}
	.safe{
		  width: 77%;
		  margin-left:80rpx;
	}
	.wagdetail{
		margin-left: 26rpx;
		padding-top:153rpx;
	}
	.enter{
		
	}
	.enter view{
		float: left;
		height: 243rpx;
		width: 340rpx;
		margin-right: 14rpx;
		margin-top:13rpx;
		margin-bottom: 13rpx;
	}
	.enter view:nth-last-child(1){
		margin-bottom: 32rpx;
	}
	.photopic view{
		width: 699rpx;
		height: 472rpx;
		margin-bottom: 100rpx;
		margin-top:13rpx;
	}
</style>

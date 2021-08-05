<template>
  <view style="background: #fff;">
	  <view class="head flex mauto cwhite sw f34r">
	  	<view class="boximgs mt8r" @tap="goback">
	  		<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
	  	</view>
	  	<view class="safe fcenter">磅单详情</view>
	  	<view>
	  		<text v-if="chosenext">下一题</text>
	  	</view>
		<view style="width: 44rpx;height:40rpx;" class="mt8r">
			<image src="../../static/cenp.png" @click="wagongpic()" mode="" class="hw100v"></image>
		</view>
	  </view>
	  <view class="wagdetail" style="padding-top:153rpx">
		  <view class="flex listwag">
			  <view>过磅人</view>
			  <view></view> 
			  <view>{{infoDate.registrar}}</view>
		  </view>
		  <view class="flex listwag">
			  <view>登记时间</view>
			  <view></view>
			  <view>{{infoDate.registTime}}</view>
		  </view>
		  <view class="flex listwag">
			  <view>车牌号</view>
			  <view></view>
			  <view>{{infoDate.plateNo}}</view>
		  </view>
		  <!-- <view class="flex listwag">
			  <view>进场称重</view>
			  <view></view>
			  <view>{{infoDate.inWeight}}</view>
		  </view> -->
		  <!-- <view class="flex listwag">
		  			  <view>皮重</view>
		  			  <view></view>
		  			  <view>{{infoDate.freightWeight}}</view>
		  </view> -->
		  <view class="flex listwag">
		  			  <view>进场类型</view>
		  			  <view></view>
		  			  <view>{{infoDate.inType_dictText}}</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>物资类型</view>
		  			  <view></view>
		  			  <view>{{infoDate.inOutType_dictText}}</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>材料名称</view>
		  			  <view></view>
		  			  <view>{{infoDate.materialsSpare}}</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>发料单位</view>
		  			  <view></view>
		  			  <view>{{infoDate.materialCompany}}</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>单位</view>
		  			  <view></view>
		  			  <view>m³</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>换算系数</view>
		  			  <view></view>
		  			  <view>1m³=2.34t</view> 
		  </view>
		  <view class="flex listwag">
		  			  <view>运单数量</view>
		  			  <view></view>
		  			  <view>{{infoDate.waybillNum}}</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>扣量</view>
		  			  <view></view>
		  			  <view>{{infoDate.deductionValue}}</view>
		  </view>
		  <view class="flex listwag">
		  			  <view>备注</view>
		  			  <view></view>
		  			  <view>{{infoDate.remarks}}</view>
		  </view>
	  </view>
	  <view style="height:20rpx;background: #e7e7e7;"></view>
	  <view class="wagdetail">
	  		  <view class="flex listwag">
	  			  <view>毛重</view>
	  			  <view></view>
	  			  <view>{{infoDate.grossWeight}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  			  <view>皮重</view>
	  			  <view></view>
	  			  <view>{{infoDate.freightWeight}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  			  <view>净重</view>
	  			  <view></view>
	  			  <view>{{infoDate.suttleWeight}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  			  <view>实际重量</view>
	  			  <view></view>
	  			  <view>{{infoDate.realWeight}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  		  			  <view>运单重量</view>
	  		  			  <view></view>
	  		  			  <view>{{infoDate.waybillWeight}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  		  			  <view>实际数量</view>
	  		  			  <view></view>
	  		  			  <view>{{infoDate.realNum}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  		  			  <view>实际偏差</view>
	  		  			  <view></view>
	  		  			  <view>{{infoDate.realOffset}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  		  			  <view>正负差</view>
	  		  			  <view></view>
	  		  			  <view>{{infoDate.posiNegaDiff}}</view>
	  		  </view>
	  		  <view class="flex listwag">
	  		  			  <view>偏差结果</view>
	  		  			  <view></view>
	  		  			  <view>{{infoDate.offsetResult_dictText}}</view>
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
		infoDate:{},
		infoPic:''
      }
    },

    onLoad(options) {
		console.log(options)
      if (options && options.info) {
			this.infoDate=JSON.parse(options.info)
			this.infoPic=options.info
		}
    },

    computed: {
    
     
    },
	onReady: function (res) {
	        
	    },
	onUnload(){
		
	},
    methods: {
		wagongpic(){
			console.log(33)
			uni.navigateTo({
				url:'/pages/wagonpic/wagonpic?infoPic='+this.infoPic
			})
		},
		goback(){
			uni.navigateBack()
		}
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
		
	}
	.wagdetail .listwag{
		height: 110rpx;
		line-height: 110rpx;
		border-bottom: 1rpx solid #EAE7E7;
	}
	.wagdetail .listwag view:nth-child(1){
		margin-left:49rpx;
		margin-right:19rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
		width: 125rpx;
	}
	.wagdetail .listwag view:nth-child(2){
		height:83rpx;
		width:1rpx;
		background: #EAE7E7;
		margin-top:20rpx;
	}
	.wagdetail .listwag view:nth-child(3){
		margin-left: 26rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #555555;
	}
</style>

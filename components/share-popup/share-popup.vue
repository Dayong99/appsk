<template>
  <view class="posia posi-all0 z700" v-if="visible">
    <view class="posif posi-all0 anima-punch-in3 bgblack-a3" @tap="$_close"></view>
    <view class="posif tp510r bgwhite anima-slide-up3 br14r fcenter">
		<view v-if="rong">
			<view class="lent sw c666 f29r">恭喜您完成本次阅读，获得 <text class="cee">{{title}}</text>分</view>
			<view class="imgbox mauto">
				<image src="../../static/zujian.png" mode="" class="hw100v"></image>
			</view>
		</view>
		<view class="h185r w100v" v-if="sorry">
			<img src="../../static/zujian3.png" alt="" class="hw100v">
		</view>
		<view class="tent sw f29r c666 mt84r mb81r" v-if="sorry">
			抱歉，您今日已阅读过该文抱歉，您今日已阅读过该文抱歉
		</view>
		<view class="contione sw f28r cwhite mauto" @tap="$_close">继续阅读</view>
	</view>
     <view class="posia p103 errors" @tap="$_close">
		 <image src="../../static/error.png" alt="" class="hw100v"></image>
	 </view>
  </view>
</template>

<script>
  /**  
   * 分享弹出层组件
   * 通过ref调用open打开
   */
  export default {
    name: 'share-popup',

    data() {
      return {
        visible: false,
        item: {},
		rong:true,
		sorry:false
      }
    },
	props:{
		title:{
			type:String
		}
	},
    methods: {
      open(e) {
        this.item = e;
        this.visible = true;
      },
      $_close() {
        this.visible = false;
      }, 
    }
  }
</script>

<style>
  .lent{
	  margin-top:71rpx;
	  margin-bottom: 68rpx;
  }
  .imgbox{
	  width: 302rpx;
	  height: 193rpx;
	  margin-bottom: 75rpx;
  }
  .contione{
	  width: 299rpx;
	  height: 65rpx;
	  background: linear-gradient(255deg, #477CF3 0%, #649BFF 100%);
	  box-shadow: 0rpx 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
	  border-radius: 32rpx;
	  line-height: 65rpx;
  }
  .errors{
	  width: 50rpx;
	  height: 50rpx;
  }
  .tent{
	  width: 465rpx;
	  margin-left: 45rpx;
  }
</style>

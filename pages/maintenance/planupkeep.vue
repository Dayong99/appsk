<template>
  <view class="" style="position: fixed;top:0;bottom: 0;z-index: 999;width: 100%;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">保养计划</view>
  		<view class="qrcode">
  			<!-- <image src="../../static/fangkuai.png" class="hw100v"></image> -->
  		</view>
  	</view>
	<view class="maintain">
		<mescroll-uni :top="150" @down="downCallback" @up="upCallback" @init="mescrollInit">
			<view v-for="(item,index) in getmaintain" :key="index" class="beamListbox" >
				<view class="beamList" style="">
					<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
						<view class="startend">
							<text style="display:inline-block;">
								计划时间:{{item.planStartTime}}至{{item.planTerminationTime}}
							</text>
						</view>
					</view>
					<view class="plancontent">
						<view v-for="child in item.deviceMaintainPlanSubList" class="planchildlist">
							 <view class="planterm">
								<text class="goplan" style="background: #B0B0B0;">{{child.maintainStatus_dictText}}</text>
								<text class="godetails">{{child.maintainContent}}</text>
							</view>
							<view class="contengbox">
								<view class="botmeg">
									<image class="ren" src="../../static/dingwei2.png"></image>
									<text style="display: inline-block;margin-right: 35rpx;">{{child.maintainers}}</text>
									<image class="locations" src="../../static/dingwei1.png"></image>
									<text>{{child.maintainers}}</text>
								</view>
								 <view class="routing" @click="searcgvaky('maintain',child)">去保养</view>
							</view> 
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni> 
	</view>
  </view>
</template>
<script>
 import {upkeepplan} from '@/api/AlbumServer.js'
  export default {
	data(){
		return{
			mescroll:null,
			current:0,
			timeOutBlack:0,
			clickRefresh:false,
			status:{
				inspect:true,
				upkeep:false,
				service:false
			}
		}
	},
    computed: {
	  getmaintain(){
		  return this.$store.getters['album/getmaintain']
	  }
    },
	
    methods: {
		searcgvaky(url,item){
			let items=JSON.stringify(item)
			uni.navigateTo({
				url:`./${url}?val=${items}&a=1`
			})
		},
      /// 跳转打开新窗口
      fnOpenWin(type) {
        uni.navigateTo({
          url: `/pages/news/${type}/${type}`
        })
      },
	  goback(){
		  uni.navigateBack()
	  },
	  mescrollInit(mescroll) {
	    this.mescroll = mescroll;
	  },
	  /// 下拉刷新的回调
	  downCallback(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	  		 this.mescroll.resetUpScroll()
	  },
	  /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
	  upCallback(mescroll) {
	    upkeepplan({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
	    }).then(violaRes => {
			if(mescroll.num==1){
				this.$store.commit('album/maintainList',violaRes.data.result.records)
			}else{
				this.$store.commit('album/maintainList',this.getmaintain.concat(violaRes.data.result.records))
			}
	      mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >= mescroll.size);
	    }).catch(() => {
	      mescroll.endErr();
	    })
	  }
    }
  }
</script>

<style>
	page{
		background: #E8E8E8;
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
	.qrcode{
		width: 33rpx;
		height: 33rpx;
	}
	.beamList{
		width: 705rpx;
		/* height: 450rpx; */
		background: #FFFFFF;
		border-radius: 7rpx;
		margin:19rpx auto;
	}
	.beamtotal{
		height:93rpx;
		line-height: 93rpx;
		display: flex;
		background: #fff;
		position: relative;
	}
	.beamtotal view{
		width: 50%;
		text-align: center;
	}
	.beamtotal text{
		padding-bottom: 26rpx;
	}
	.nameplan{
		display: flex;
		height: 93rpx;
		border-bottom: 1px solid #eee;
		justify-content: space-between;
		width: 590rpx;
		padding-left: 46rpx;
		padding-right: 46rpx;
		margin:0 auto;
	}
	.nameplan .startend text{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
		line-height: 94rpx;
	}
	.plantime{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #86878A;
		line-height: 93rpx;
	}
	.nameplan .startend text{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.plancontent{
		margin:0 auto;
	}
	.plancontent .planterm{
		margin-bottom: 30rpx;
		margin-top:24rpx;
	}
	.plancontent .planterm .goplan{
		width: 75rpx;
		height: 33rpx;
		background: #235FED;
		border-radius: 3rpx;
		font-size: 21rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		display: inline-block;
		text-align: center;
	}
	.plancontent .planterm .godetails{
	/* 	display: inline-block; */
		vertical-align: middle;
		margin-left: 8rpx;
		line-height: 50rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.planchildlist{
		border-bottom: 1rpx solid #eee;
		padding-left: 33rpx;
		padding-right: 33rpx;
		margin:0 auto;
		padding-bottom: 39rpx;
	}
	.botmeg{
		display: flex;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #86878A;
	}
	.botmeg .ren{
		width: 18rpx;
		height: 24rpx;
		margin-top:6rpx;
		margin-right: 13rpx;
	}
	.botmeg .locations{
		width: 17rpx;
		height: 25rpx;
		margin-top:6rpx;
		margin-right: 13rpx;
	}
	.contengbox{
		display: flex;
		justify-content: space-between;
	}
	.contengbox .routing{
		width: 120rpx;
		height: 53rpx;
		background: linear-gradient(90deg, #649BFF, #477CF3);
		box-shadow: 0px 7rpx 33rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 27rpx;
		font-size: 27rpx;
		text-align: center;
		line-height: 53rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin-top: -10rpx;
	}
</style>

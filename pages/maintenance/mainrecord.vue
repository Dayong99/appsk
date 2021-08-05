<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">维保记录</view>
  		<view>
  			<text v-if="false">下一题</text>
  		</view>
  	</view>
	<view class="producerecord">
		<view class="recordetailbox">
			<mescroll-uni @down="downCallback1" @up="upCallback1" :top="175">
				<view v-for="item in mainrecord" class="planlists">
					<view class="recordetail">
						<view class="data">{{item.operatorTime}}</view>
						<view class="process">{{operatorTypes[item.operatorType]}}</view>
						<view class="mainperson">保养人:{{item.operator}}</view>
						<view class="remkes">保养描述:{{item.describes}}</view>
						<view class="photo" v-if="item.filePath">
							<image :src="item.filePath" class="hw100v"></image>
						</view>
						<view class="square"></view>
						<view class="perch"></view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>	
  </view>
</template>
<script>
	import {maintrecord} from '@/api/AlbumServer.js'
  export default {
	  data(){
		  return{
			  operatorTypes:['保养','申报维修','维修','停用','启用','抽检'],
			  current:0,
			  basic:{}
		  }
	  },
    computed: {
		mainrecord(){
			return this.$store.getters['album/mainrecord']
		}
    },
	onLoad(options){
		if(options&&options.val){
			this.basic=JSON.parse(options.val)
		}
	},
    methods: {
      /// 跳转打开新窗口
      fnOpenWin(type) {
        uni.navigateTo({
          url: `/pages/news/${type}/${type}`
        })
      },
	  downCallback1(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	    mescroll.resetUpScroll()
	  },
	  /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
	  upCallback1(mescroll) {
	    maintrecord({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
	    }).then(violaRes => {
	      if (mescroll.num == 1) {
	        this.$store.commit('album/mainrecordList', violaRes.data.result.records)
	      } else {
	        this.$store.commit('album/mainrecordList', this.mainrecord.concat(violaRes.data.result.records))
	      }
	      mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >= mescroll.size);
	    }).catch(() => {
	      mescroll.endErr();
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
		background: #fff;
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
	.essential{
		margin-top: 19rpx;
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
		width: 100%;
		background: #fff;
		margin-top:14rpx;
	}
	.planlists{
		width: 100%;
		background: #fff;
	}
	.recordetail{
		width: 565rpx;
		margin: 0 auto;
		border-left:3rpx solid #EAE7E7;
		padding-left:31rpx;
		position: relative;
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #979BA4;
	}
	.recordetail .data{
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #979BA4;
		padding-top:41rpx;
		margin-bottom: 27rpx;
	}
	.recordetail:nth-child(1) .data{
		color:#235FED
	}
	.recordetail:nth-child(1) .process{
		color:#235FED
	}
	.recordetail:nth-child(1) .square{
		background:#235FED
	}
	.recordetail .process{
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #181616;
		margin-bottom: 18rpx;
	}
	.recordetail .remkes{
		line-height: 25px;
	}
	.recordetail .photo{
		width: 253rpx;
		height: 167rpx;
		margin-top:5px;
	}
	.square{
		position: absolute;
		width: 20rpx;
		height: 20rpx;
		background: #EAE7E7;
		border-radius: 50%;
		top:50rpx;
		left:-12rpx
	}
	.currentdateprocess{
		color:#235FED
	}
	.perch{
		height: 2rpx;
		width: 588rpx;
		background: #e7e7e7;
		margin-top:42rpx;
	}
</style>

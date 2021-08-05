<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">小箱梁详情</view>
  		<view>
  			<text v-if="false">下一题</text>
  		</view>
  	</view>
  	<view class="beamtotal">
  		<view>
  			<text @click="fnbarClick(0)" :class='{beamcurrent:current==0}'>生产记录</text>
  		</view>
  		<view>
  			<text @click="fnbarClick(1)" :class='{beamcurrent:current==1}'>基本属性</text>
  		</view>
  	</view>
	<view class="producerecord" v-if="current==0">
		<view class="recordetailbox">
			 <mescroll-uni @down="downCallback1" @up="upCallback1" :top="260">
				<view class="planlists">
					<view v-for="(item,index) in clockListtime" :key="index" class="recordetail">
						<view class="data">{{item.updateTime}}</view>
						<view class="process">{{item.operator}}做了{{item.structStatusSort_dictText}}</view>
						<view class="remkes">{{item.remarks}}</view>
						<view class="recordarea"></view>
						<view class="photo">
							<image :src="item.filePath" class="hw100v"></image>
						</view>
						<view class="square"></view>
					</view>
				</view>
			</mescroll-uni> 
		</view>
	</view>	
	<view class="essential" v-if="current==1">
		<view class="detaillist">
			<view>关联台座</view>
			<view>{{basic.pedestalId_dictText?basic.pedestalId_dictText:'暂无'}}</view>
		</view>
		<view class="detaillist">
			<view>桥名</view>
			<view>{{basic.bridgeName}}</view>
		</view>
		<view class="detaillist">
			<view>桥孔编号</view>
			<view>{{basic.bridgeHoleNumber}}</view>
		</view>
		<view class="detaillist">
			<view>对应墩号</view>
			<view>{{basic.correspondingPierNumber}}</view>
		</view>
		<view class="detaillist">
			<view>梁编号</view>
			<view>{{basic.beamNumber}}</view>
		</view>
		<view class="detaillist">
			<view>中/边梁</view>
			<view>{{basic.centerOrSideBeam}}</view>
		</view>
		<view class="detaillist">
			<view>理论跨径(cm)</view>
			<view>{{basic.theoreticalSpan}}</view>
		</view>
		<view class="detaillist">
			<view>标准梁长(cm)</view>
			<view>{{basic.standardBeamLength}}</view>
		</view>
		<view class="detaillist">
			<view>(N-1)号墩顶伸缩缝类型</view>
			<view>{{basic.n1pierTopExpansionJointType}}</view>
		</view>
		<view class="detaillist">
			<view>(N)号墩顶伸缩缝类型</view>
			<view>{{basic.npierTopExpansionJointType}}</view>
		</view>
		<view class="detaillist">
			<view>预制梁长(cm)</view>
			<view>{{basic.prefabricatedBeamLength}}</view>
		</view>
		<view class="detaillist">
			<view>梁长差值(cm)</view>
			<view>{{basic.beamLengthDifference}}</view>
		</view>
		<view class="detaillist">
			<view>小箱梁预制横坡i(%)</view>
			<view>{{basic.smallBgpcsI}}</view>
		</view>
		<view class="detaillist">
			<view>砼方量(m³)</view>
			<view>{{basic.concreteVolume}}</view>
		</view>
		<view class="detaillist">
			<view>HRB400</view>
			<view>{{basic.hrb400}}</view>
		</view>
		<view class="detaillist">
			<view>HRB300</view>
			<view>{{basic.hpb300}}</view>
		</view>
		<view class="detaillist">
			<view>钢绞线(kg)</view>
			<view>{{basic.steelStrand}}</view>
		</view>
	</view>
  </view>
</template>
<script>
	import {clocktime} from '@/api/AlbumServer.js'
  export default {
	  data(){
		  return{
			  current:0,
			  basic:{}
		  }
	  },
    computed: {
		clockListtime(){
			return this.$store.getters['album/clockListtime']
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
	    clocktime({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
	    }).then(violaRes => {
	      if (mescroll.num == 1) {
	        this.$store.commit('album/clockList', violaRes.data.result.records)
	      } else {
	        this.$store.commit('album/clockList', this.clockListtime.concat(violaRes.data.result.records))
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
		margin-top:19rpx;
	}
	.planlists{
		width: 100%;
		background: #fff;
		padding-top:35rpx;
	}
	.recordetail{
		width: 565rpx;
		margin: 0 auto;
		border-left:3rpx solid #EAE7E7;
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
	}
	.recordetail .remkes{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #979BA4;
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
</style>

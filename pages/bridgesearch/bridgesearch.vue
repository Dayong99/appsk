<template>
  <view class="posir" style="overflow-y: scroll;height: 100%;">
	  <view class="boxinputSearc">
	  	<view class="stance"></view>
	  	<view class="flexr-jsb inputSearch">
	  		<image src="../../static/hlw.png" class="arroent" @tap="cuents"></image>
	  		<input type="text" placeholder="通过预制场或预制台座编号搜索" v-model="valuekiss">
	  		<image src="../../static/cab.png" class="rongs" @tap="cancels"></image>
	  		<view class="sw c181 f32r" @tap="serchValue()">搜索</view>
	  	</view>
	  </view>
	  <view style="overflow-y: scroll;height: 100%;margin-top:150rpx;padding-bottom:80rpx;">
		<view>
			<mescroll-uni @down="downCallback" @up="upCallback" :top="150" :isShowEmpty="isShowEmpty">
				<view v-for="(item,index) in pedestal" :key="index" class="beamListbox">
					<view class="beamList" style="height:380rpx;">
						<view class="nameplan">
							<view>
								<view class="leisure" style="display: inline-block;">{{item.status_dictText}}</view>
								<text style="display:inline-block;">{{item.prefabricatedSiteNumber}}#预制场{{item.prefabricatedPedestalNumber}}#预制台座</text>
							</view>
							<view class="plan" style="margin-left: 1rpx;" @click="releent(item)">关联梁</view>
						</view>
						<view class="beamnumber">
							<view style="font-size: 27rpx;margin-top:14rpx;">
								<view>预制台座长(m): {{item.prefabricatedPedestalLength}}</view>
								<view>预制台座宽(m): {{item.prefabricatedPedestalWidth}}</view>
								<view>预制台座高(m):{{item.prefabricatedPedestalHeight}}</view>
								<view>预制梁类型：{{item.prefabricatedBeamType}}</view>
							</view>
						</view>
						<view class="gobeamdetail" @click="godado(item)">
							详情>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
		</view>
  </view>
</template>

<script>
import {
  dado
} from "@/api/AlbumServer.js"
  export default {
    components: {
	 
    },

    // props: {
    //   // 连续触发刷新
    //   refresh: {
    //     type: Boolean,
    //     default: false
    //   }
    // },

    data() {
      return {
		  isShowEmpty:false,
        // 滚动区实例
        mescroll: null,
		namecong:'积分商城',
		newlistDate:[],
		abt:'',
		shopnum:0,
		current:0,
		price:0,
		giftList:[],
		valuekiss:'',
		shopListnums:[],
		vdeowLsti:[],
		cuentping:false
        // 
      }
    },

    watch: {
      // 监听底部导航双击触发
      // refresh(newVal) {
      //   if (newVal) this.fnRefreshData();
      // }
    },
	onLoad(options){
		if(options&&options.abt){
			this.abt=options.abt
		}
	},
	onShow(){
		console.log(this.abt)
		this.serchValue();
	},
    computed: {
		pedestal() {
		  return this.$store.getters['album/pedestalList']
		},
    },

    methods: {
		cancels(){
			this.valuekiss=''
		},
		serchValue(){
			dado({
			  pageNo: 1,
			  pageSize:"",
			  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
			  keyword:this.valuekiss
			}).then(violaRes => {
				violaRes.data.result.records.length>0?this.isShowEmpty=false:this.isShowEmpty=true;
				console.log(violaRes)
				 this.$store.commit('album/pedestalListpent', violaRes.data.result.records)
			})
		},
		cuents(){
			uni.navigateBack()
		},
	  downCallback(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	    mescroll.resetUpScroll()
	  },
	  releent(val){
	  	console.log(val)
	  	uni.navigateTo({
	  		url:'../relevance/relevance?valent='+JSON.stringify(val)
	  	})
	  },
	  godado(val){
		  uni.navigateTo({
			url:'../datodetail/datodetail'
		  })
	  },
	  upCallback(mescroll) {
	    dado({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
	    }).then(violaRes => {
			violaRes.data.result.records.length>0?this.isShowEmpty=false:this.isShowEmpty=true;
	      if (mescroll.num == 1) {
	        this.$store.commit('album/pedestalListpent', violaRes.data.result.records)
	      } else {
	        this.$store.commit('album/pedestalListpent', this.pedestal.concat(violaRes.data.result.records))
	      }
	      mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >= mescroll.size);
	    }).catch(() => {
	      mescroll.endErr();
	    })
	  }
      /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
    
	 
    }
  }
</script>

<style>
	.shopitem{
		width: 344rpx;
		height: 460rpx;
		margin-right: 19rpx;
	}
	.imgboxList{
		width: 315rpx;
		height: 260rpx;
		margin:14rpx;
	}
	.scroek{
		padding-left: 21rpx;
		padding-right: 16rpx;
		margin-top:10rpx;
		margin-bottom: 12rpx;
	}
	.addjian{
		float: right;
		display: flex;
	}
	.formBtn{
	  display: flex;
	  width: 701rpx;
	  padding-left: 27rpx;
	  padding-right: 22rpx;
	  height: 100rpx;
	  position: fixed;
	  bottom: 0;
	  background: #FFFFFE;
	  justify-content: space-between;
	  line-height: 100rpx;
	}
	.formBtn .button{
	  width: 170rpx;
	  height: 70rpx;
	  background: #649aff;
	  border-radius: 35rpx;
	  font-size: 28rpx;
	  font-family: 'PingFang SC';
	  font-weight: bold;
	  color: #FEFFFF;
	  line-height: 70rpx;
	  text-align: center;
	  margin-top:17rpx;
	}
	.formBtn image{
	  width: 38rpx;
	  height: 38rpx;
	  vertical-align: middle;
	  margin-top:-6rpx;
	  margin-right: 16rpx;
	}
	
	/* 搜索 */
		.boxinputSearc{
			position: fixed;
			height: 153rpx;
			z-index: 100;
			background: white;
			border-bottom: 1px solid #EEEEEE;
		}
		.stance{
			height: 52rpx;
			width: 750rpx;
			background: #fff;
		}
		.arroent{
			width: 21rpx;
			height: 38rpx;
			margin-top: 31rpx;
		}
		.inputSearch{
			padding-left: 28rpx;
			padding-right: 35rpx;
			line-height: 101rpx;
			height: 101rpx;
			position: relative;
		}
		.inputSearch input{
			width: 537rpx;
			height: 64rpx;		
			background: #F6F7F9;
			border-radius: 10rpx;		
			font-size: 31rpx;
			font-family: 'PingFang SC';
			font-weight: 500;
			color: #B6C2CE;
			margin-top:18rpx;
			padding-left: 17rpx;
		}
		.uni-input-input,.uni-input-wrapper{
			height: 64rpx!important;
		}
		.rongs{
			width: 35rpx;
			height: 35rpx;
			position: absolute;
			top:35rpx;
			right: 140rpx;
		}
		.read{
			  width:78rpx;
			  height: 35rpx;
			  margin-right: 10rpx;
			  margin-top:4px;
		}
		.crpent{
			float: left!important;
			width: 320rpx;
			padding-left: 20rpx;
			padding-right: 25rpx!important;
		}
		
		.megpent{
			width: 321rpx;
			height: 339rpx;
			top:305rpx;
			left: 211rpx;
			position: fixed;
		}
		.boxmesg{
			width: 100%;
			position: fixed;
			top:705rpx;
			left:0;
		}
		.videobox{
			  width:635rpx;
			  height:361rpx;
		}
		.read{
			  width:78rpx;
			  height: 35rpx;
			  margin-right: 10rpx;
			  margin-top:4px;
			  margin-left: 37rpx;
		}
		/* .contList{
			  margin-bottom:18rpx;
		} */
		.videoList{
			  width:690rpx;
			  height:580rpx;
		}
		
		
		.hjkle{
			  padding-top: 25rpx;
			  padding-bottom: 25rpx;
			  padding-left: 30rpx;
			  padding-right: 30rpx;
		}
		.titlemang{
			  width:85%;
		}
		
		/* 新增 */
		.beamList{
			width: 680rpx;
			height: 450rpx;
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
			width: 610rpx;
			margin:0 auto;
		}
		.nameplan view{
			display: flex;
		}
		.nameplan .produced{
			width: 75rpx;
			height: 33rpx;
			background: #E7541E;
			border-radius: 3rpx;
			font-size: 21rpx;
			font-family: 'PingFang SC';
			font-weight: 500;
			color: #FFFFFF;
			margin:31rpx 0rpx 29rpx 0rpx;
		}
		.nameplan text,.plan{
			line-height: 93rpx;
		}
		.nameplan text{
			font-size: 32rpx;
			font-family: 'PingFang SC';
			font-weight: 800;
			color: #181616;
		}
		.nameplan .plan{
			font-size: 27rpx;
			font-family: 'PingFang SC';
			font-weight: bold;
			color: #235FED;
			/* margin-left:199rpx; */
		}
		.beamnumber{
			font-size: 27rpx;
			font-family: 'PingFang SC';
			font-weight: 500;
			color: #57585A;
			line-height: 53rpx;
			display: flex;
			margin-left: 39rpx;
			margin-right: 35rpx;
		}
		.beamnumber .beamchild{
			width: 50%;
		}
		.beamnumber .beamchild view{
			line-height: 60rpx;
		}
		.beamnumber .beamchild:nth-child(2){
			text-align: right;
		}
		.gobeamdetail{
			text-align: right;
			margin-right: 33rpx;
			font-size: 27rpx;
			font-family: 'PingFang SC';
			font-weight: 500;
			color: #235FED;
			margin-top:9rpx;
		}
		.leisure{
			width: 67rpx;
			height: 33rpx;
			background: #2EA62E;	
			font-size: 24rpx;
			font-family: 'PingFang SC';
			font-weight: bold;
			color: #FFFFFF;
			border-radius: 3rpx;
			margin-top:29rpx;
			text-align: center;
			margin-right: 7rpx;
			margin-left: 2rpx;
		}
</style>

<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">智慧梁场</view>
			<view>
				<image src="../../static/fenxi.png" class="fenxi" @click="ecahrtgo"></image>
			</view>
		</view>
		<view class="beamtotal">
			<view>
				<text @click="fnbarClick(0)" :class='{beamcurrent:current==0}'>小箱梁</text>
			</view>
			<view>
				<text @click="fnbarClick(1)" :class='{beamcurrent:current==1}'>台座</text>
			</view>
		</view>
		<view class="boxsrocll" v-if="current==0">
			<scroll-view class="scroll-bar-find" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto"
			  :scroll-with-animation="true">
			  <view v-for="(tab,index) in tabBars" :key="tab.id" class="scroll-bar-finditem" :id="tab.id" :data-current="tab.current" :class="{'scroll-bar-finditemsh':indexList.indexOf(index)>-1}" @tap="fntabClick(tab,index)">
			    {{tab.structStatus}}
			  </view>
			</scroll-view>
			<view class="morescreen" @click="moreVal
			()">更多筛选</view>
		</view> 
		<view class="boxsrocll" v-if="current==1">
			<view class="searchvalu">
				<view class="free" @tap="freeClick()" :class="{freetime:freealrent}">空闲</view>
				<view class="serachinput">
					<image src="../../static/fangdajing1.png" class="fangdajing"></image>
					<input type="text" placeholder="通过预制场或预制台座编号" @focus="searcgvaky">
				</view>
			</view>
		</view>
		<view v-if="current==0">
			<view>
				<mescroll-uni @down="downCallback" @up="upCallback" :top="330" :isShowEmpty="isShowEmpty" @init="mescrollInit">
				  <view v-for="(item,index) in beamfieldList" :key="index" class="beamListbox" >
						<view class="beamList">
							<view class="nameplan">
								<view>
									<view class="produced" v-if="item.structStatusSort_dictText" style="margin-right: 7rpx;">{{item.structStatusSort_dictText}}</view> 
									<text style="display:inline-block;width:380rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.bridgeName}}</text>
								</view>
								<view class="plan" @click="updateprocess(item)">更新进度</view>
							</view>
							<view class="beamnumber">
								<view class="beamchild">
									<view>桥孔编号:{{item.bridgeHoleNumber}}</view>
									<view>对应桥墩:{{item.correspondingPierNumber}}</view>
									<view>梁编号:{{item.beamNumber}}</view>
									<view>中/边梁:{{item.centerOrSideBeam}}</view>
								</view>
								<view class="beamchild">
									<view>理论跨径(cm):{{item.theoreticalSpan}}</view>
									<view>标准梁长(cm):{{item.standardBeamLength}}</view>
									<view>预准梁长(cm):{{item.prefabricatedBeamLength}}</view>
									<view>砼方量(m³):{{item.concreteVolume}}</view>
								</view>
							</view>
							<view class="corre">关联台座:{{item.pedestalId_dictText?item.pedestalId_dictText:'暂无'}}</view>
							<view class="gobeamdetail" @click="godetail(item)">
								详情>
							</view>
						</view>
					</view>
				</mescroll-uni>
			</view>
		</view>
		<view v-if="current==1">
			<mescroll-uni @down="downCallback1" @up="upCallback1" :top="330" @init="mescrollInit">
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
</template>
<script>
import {
  beamfield,beamfieldstatus,dado
} from "@/api/AlbumServer.js"
  export default {
	  data(){
		  return{
			  scrollInto: "recommend",
			  current:0,
			  currenttab:0,
			  tabBars:[],
			  indexList:[],
			  indexListval:'',
			  sercode:{},
			  freealrent:false,
			  isShowEmpty:false,
			  mescroll:null
		  }
	  },
    computed: {
	  beamfieldList() {
	    return this.$store.getters['album/beamfieldList']
	  },
	  pedestal() {
	    return this.$store.getters['album/pedestalList']
	  },
    },
	onLoad(){
		this.init();
	},
	onShow(){
		// console.log(222)
		// console.log(this.sercode)
		// let data={
		// 	pageNo: 1,
		// 	pageSize: '',
		// 	relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		// }
		// data=Object.assign(this.sercode,data)
		// beamfield(data).then(violaRes=>{
		// 	this.$store.commit('album/beamfieldList', violaRes.data.result.records)
		// 	violaRes.data.result.records.length>0?this.isShowEmpty=false:this.isShowEmpty=true;
			 
		// 	// this.tabBars=res.data.result.records;
		// })
		this.mescroll.resetUpScroll()
	},
    methods: {
		mescrollInit(mescroll) {
		  this.mescroll = mescroll;
		},
		ecahrtgo(){
			uni.navigateTo({
				url:'../echartspage/echartspage'
			})
		},
		releent(val){
			console.log(val)
			uni.navigateTo({
				url:'../relevance/relevance?valent='+JSON.stringify(val)
			})
		},
		searcgvaky(){
			uni.navigateTo({
				url:'../bridgesearch/bridgesearch'
			})
		},
		init(){
			let data={
				pageNo: 1,
				pageSize: '',
				 relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
			}
			beamfieldstatus(data).then(res=>{
				this.tabBars=res.data.result.records;
			})
		},
      /// 跳转打开新窗口
      fnOpenWin(type) {
        uni.navigateTo({
          url: `/pages/news/${type}/${type}`
        })
      },
	  godetail(val){
		  uni.navigateTo({
		  	url:'../beamfieldDetail/beamfieldDetail?val='+JSON.stringify(val)
		  })
	  },
	  godado(val){
		  uni.navigateTo({
		  	url:'../datodetail/datodetail'
		  })
	  },
	  goback(){
		  uni.navigateBack()
	  },
	  fnbarClick(val){
		this.current=val
	  },
	  fntabClick(tab,index){
		  console.log(index)
		  this.indexListval=''
		  let arrIndex = this.indexList.indexOf(index);
		  console.log("数组索引", arrIndex)
		  if (arrIndex > -1) {
		  	this.indexList.splice(arrIndex, 1)
		  } else {
		  	this.indexList.push(index)
		  }	
		this.indexList.forEach(a=>{
			this.indexListval+=(this.tabBars[a].tenantIdSort)+','
		})
		this.indexListval=this.indexListval.substring(0,this.indexListval.length-1)
		this.mescroll.resetUpScroll()
		//  beamfield({
		//    pageNo: 1,
		//    pageSize:"",
		//    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		//    structStatusSorts:this.indexListval.substring(0,this.indexListval.length-1)
		//  }).then(violaRes => {
		// 	 console.log(violaRes)
		// 	 violaRes.data.result.records.length>0?this.isShowEmpty=false:this.isShowEmpty=true;
		//       this.$store.commit('album/beamfieldList', violaRes.data.result.records)		 
		//  }).catch(() => {
		
		//  })
	  },
	  unique(arr) {
	    const res = new Map();
	    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
	  },
	  updateprocess(val){
		  console.log(val)
		  uni.navigateTo({
		  	url:'../updateprogress/updateprogress?val='+JSON.stringify(val)
		  })
	  },
	  moreVal(){
		uni.navigateTo({
			url:'../moreout/moreout'
		})  
	  },
	  freeClick(){
		  this.freealrent=!this.freealrent
			dado({
			   pageNo: 1,
			   pageSize: "",
			   relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
				status:this.freealrent?1:''
			 }).then(violaRes => {
				 console.log(violaRes)
				  this.$store.commit('album/pedestalListpent', violaRes.data.result.records)
			})
	  },
	  /// 下拉刷新的回调
	  downCallback(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	    this.mescroll.resetUpScroll()
	  },
	  /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
	  upCallback(mescroll) {
	    beamfield({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		  structStatusSorts:this.indexListval
	    }).then(violaRes => {
			violaRes.data.result.records.length>0?this.isShowEmpty=false:this.isShowEmpty=true;
	      if (mescroll.num == 1) {
	        this.$store.commit('album/beamfieldList', violaRes.data.result.records)
	      } else {
	        this.$store.commit('album/beamfieldList', this.beamfieldList.concat(violaRes.data.result.records))
	      }
	      mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >= mescroll.size);
	    }).catch(() => {
	      mescroll.endErr();
	    })
	  },
	  downCallback1(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	    this.mescroll.resetUpScroll()
	  },
	  /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
	  upCallback1(mescroll) {
	    dado({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
	    }).then(violaRes => {
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
	.beamcurrent{
		color: #235FED;
		border-bottom: 4rpx solid #235FED;
	}
	.scroll-bar-find {
	  display: flex;
	  flex-direction: row;
	  white-space: nowrap;
	  flex-wrap: nowrap;
	  overflow: hidden;
	  margin-top:29rpx;
	  margin-bottom: 21rpx;
	  width: 75%;
	  border-right:1rpx solid #fff;
	  margin-left: 28rpx;
	}
	
	/* 滑动scroll导航条项*/
	.scroll-bar-finditem {
	  display: inline-block;
	  line-height: 57rpx;
	  padding-left: 15rpx;
	  padding-right: 15rpx;
	  height: 57rpx;
	  background: #F9F9F9;
	  border-radius: 2rpx;
	  text-align: center;
	  font-size: 24rpx;
	  color:#7A7C80;
	  margin-right: 10rpx;
	  margin-left:10rpx;
	}
	
	.scroll-bar-finditemsh {
	  color: #313131;
	  background: #E4ECFF;
	  border: 1px solid #235FED;
	}
	.boxsrocll{
		position: relative;
	}
	.morescreen{
		position: absolute;
		right: 35rpx;
		top:0rpx;
		line-height: 57rpx;
		width: 117rpx;
		height: 57rpx;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #7A7C80;
		background: #F9F9F9;
		border-radius: 2rpx;
		text-align: center;
	}
	.searchvalu{
		margin-top:29rpx;
		margin-bottom: 21rpx;
		margin-left: 38rpx;
		display: flex;
	}
	.serachinput{
		width: 557rpx;
		height: 57rpx;
		background: #F9F9F9;
		display: flex;
		border-radius: 2rpx;
		margin-left: 13rpx;		
	}
	.uni-input-placeholder{
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #cecece;
		height: 57rpx;
		line-height: 65rpx;
	}
	.free{
		width: 110rpx;
		height: 57rpx;
		background: #F9F9F9;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		line-height: 57rpx;
		text-align: center;
		font-weight: 500;
		color: #7A7C80;
		border-radius: 2rpx;
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
	.fangdajing{
		width: 27rpx;
		height: 27rpx;
		margin-left: 20rpx;
		margin-top:15rpx;
		margin-right: 13rpx;
	}
	.freetime{
		background: #E4ECFF;
		border: 1px solid #235FED;
	}
	.corre{
		margin-left: 38rpx;
		margin-top:10rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
	}
	.fenxi{
		width: 37rpx;
		height: 37rpx;
		margin-top:-12rpx;
		vertical-align: middle;
		display: inline-block;
	}
</style>

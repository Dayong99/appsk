<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">扫一扫</view>
			<view class="check" @click="searcgvaky('gorectifyorder')">
			
			</view>
		</view>
		<view>
			<mescroll-uni @down="downCallback" @up="upCallback" :top="152" @init="mescrollInit">
			  <view v-for="item in getstand" class="beamListbox" >
					<view class="beamList" style="padding-bottom: 2rpx;">
						<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
							<view class="startend">
								<text style="display:inline-block;">
									{{item.deviceName}}
								</text>
							</view>
							<view class="plantime" @tap="fnOpenWin('adjunct',item.attachment)">附件></view>
						</view>
						<view class="plancontent">
							<view>
								<view>设备编号:{{item.deviceNumber}}</view>
								<view>指定操作人:{{item.operator_dictText}}</view>
								<view>设备位置:{{item.deviceLocation}}</view>
							</view>
							<view>
								<view>运行状态:{{item.deviceRunStatus_dictText}}</view>
								<!-- <view>保养状态:{{item.maintainStatus_dictText}}</view> -->
							</view>
						</view>
						<view class="spot" v-if="item.deviceRunStatus==1">
							<view @tap="searcgvaky('equipment',item)">维修</view>
							<view @tap="searcgvaky('maintain',item)">保养</view>
							<view @tap="searcgvaky('spot',item)">抽检</view>
							<view @tap="searcgvaky('mainrecord',item)">维保记录</view>
						</view>
						<view class="spot spots" v-if="item.deviceRunStatus==0">
							<view @tap="searcgvaky('service',item)">申报维修</view>
							<view @tap="searcgvaky('spot',item)">抽检</view>
							<view @tap="searcgvaky('mainrecord',item)">维保记录</view>
						</view>
					</view>
				</view>
			</mescroll-uni> 
		</view>
  </view>
</template>
<script>
import {
  devicestand
} from "@/api/AlbumServer.js"
  export default {
	  data(){
		  return{
			  scrollInto: "recommend",
			  currenttab:0,
			  inspectionStatusList:['未巡检','已巡检'],
			  orderList1:['去整改','去验收','验收'],
			  tabBars1:['待整改','待验收','已验收','超时'],
			  tabBars:['正常','待维修','停用'],
			  indexList:[],
			  indexList1:[],
			  indexListval:'',
			  sercode:{},
			  plantime:['日计划','周计划','月计划'],
			  mescroll: null,
			  freealrent:false,
			  isShowEmpty:false,
			  pngList:[],
			  orderList:['待整改','待验收','已验收'],
			  inspectionStatus:'',
			  planType:'',
			  inspectionResult:'',
			  isTimeout:'',
			  searchIdString:'',
			  repairIsOutTime:'',
			  deviceid:''
		  }
	  },
    computed: {
	  getstand() {
	    return this.$store.getters['album/getstand']
	  }
    },
	onLoad(options){
		if(options&&options.datas){
			this.deviceid=options.datas
		}
	},
	onShow(){
		// this.deviceRunStatus=this.sercode.deviceRunStatus
		// this.mescroll.resetUpScroll(true)
	},
    methods: {
		searcgvaky(val,item){
			if(item){
				let items=JSON.stringify(item)
				if(items=='maintain'){
					uni.navigateTo({
						url:`./${val}?val=${items}&a=3`
					})
				}else{
					uni.navigateTo({
						url:`./${val}?val=${items}`
					})
				}
			}else{
				uni.navigateTo({
					url:`./${val}`
				})
			}
		},
      /// 跳转打开新窗口
      fnOpenWin(val,type) {
		  if(!type){
			  uni.showToast({
			  	title:'暂无附件',
				icon:'none'
			  })
		  }else{
			uni.navigateTo({
			  url: `./${val}?val=${type}`
			})  
		  }
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
		this.inspectionStatus=''
		this.planType=''
		this.inspectionResult=''
		this.isTimeout=''
		this.searchIdString=''
		this.repairIsOutTime=''
		this.indexList=[]
		this.indexList1=[]
		this.fnRefreshData();
	  },
	  fntabClick1(tab,index){
		  console.log(index)
		  let arrIndex = this.indexList1.indexOf(index);
		  console.log("数组索引", arrIndex)
		  if (arrIndex > -1) {
			this.indexList1.splice(arrIndex, 1)
		  } else {
			this.indexList1.push(index)
		  }	
		  if(this.indexList1.includes(3)){
			  this.searchIdString=this.indexList1.toString()
			  this.searchIdString=this.searchIdString.substring(0,this.searchIdString.length-2)
			  this.repairIsOutTime=1
		  }else{
			  this.searchIdString=this.indexList1.toString()
			  this.repairIsOutTime=0
		  }
		  this.mescroll[this.current].resetUpScroll(true)
	},
	  fntabClick(tab,index){
		  let arrIndex = this.indexList.indexOf(index);
		  let indexListpre=[]
		  if (arrIndex > -1) {
		  	this.indexList.splice(arrIndex, 1)
		  } else {
		  	indexListpre.push(tab)
			this.indexList.push(index)
		  }	
		  this.mescroll.resetUpScroll(true)
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
	  fnRefreshData() {
	   // this.mescroll[this.current].scrollTo(0, 300);
	    setTimeout(() => {
	      this.mescroll.resetUpScroll(true)
	    }, 500)
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
	    devicestand({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
		  id:this.deviceid
	  	  // relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		  // runStatus:this.indexList.toString()?this.indexList.toString():'',
		  // key:this.sercode.key?this.sercode.key:''
	    }).then(violaRes => {
			if(mescroll.num==1){
				this.$store.commit('album/standList',violaRes.data.result.records)
			}else{
				this.$store.commit('album/standList',this.getstand.concat(violaRes.data.result.records))
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
		  width: 67%;
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
	
	/* 加 */
	.nameplan .plaint{
		width: 25rpx;
		height: 25rpx;
		margin-top:2rpx;
		margin-right: 15rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.nameplan text{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #E7541E;
		line-height: 93rpx;
	}
	.nameplan .plan{
		width: 120rpx;
		height: 53rpx;
		line-height: 53rpx;
		text-align: center;
		background: linear-gradient(90deg, #649BFF, #477CF3);
		box-shadow: 0px 7rpx 33rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 27rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin-top:20rpx;
	}
	.hiddendanger{
		width: 584rpx;
		margin:24rpx auto;
	}
	.hiddendanger .step{
		width: 75rpx;
		height: 33rpx;
		background: #235FED;
		border-radius: 3rpx;
		font-size: 21rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		display: inline-block;
		margin-right: 12rpx;
		line-height: 34rpx;
	}
	.hiddendanger .step1{
		background: #B0B0B0;
	}
	.hiddendanger text{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
		line-height: 40rpx;
	}
	.hiddendanger .pngList{
		margin-top:25rpx;
		display: flex;
		margin-bottom: 19rpx;
	}
	.pngList .pngClass:nth-of-type(even){
		margin-right: 21rpx;
		margin-left: 21rpx;
	}
	.pngList .pngClass{
		width: 191rpx;
		height:133rpx;
	}
	.pngList .pngClass image{
		width: 100%;
		height: 100%;
	}
	.inspection{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #86878A;
		line-height: 40rpx;
	}
	.gobeamdetail{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #235FED;
		float: right;
	}
	.check{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FEFFFF;
		margin-right: 34rpx;
		line-height: 190rpx;
		z-index: 999;
	}
	/* 验收图片 */
	.accept text{
		
	}
	.accept image{
		width: 25rpx;
		height: 25rpx;
		vertical-align: middle;
		display: inline-block;
		z-index: 999;
		margin-right: 8rpx;
	}
	/* 巡检计划 */
	.nameplan .startend text{
		font-size: 33rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		color: #181616;
	}
	.plantime{
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #235FED;
		line-height: 90rpx;
	}
	/* 此页面新加css */
	.plancontent{
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
		display: flex;
		justify-content: space-between;
		padding-left: 40rpx;
		padding-right: 36rpx;
		line-height: 62rpx;
		margin-top:20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;
	}
	.spot{
		display: flex;
		height: 69rpx;
		line-height: 69rpx;
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #235FED;
		margin-top:14rpx;
		margin-bottom: 14rpx;
	}
	.spot view{
		text-align: center;
	}
	.spot view{
		width: 176rpx;
	}
	.spot view:nth-child(2){
		border-right: 1rpx solid #eee;
		border-left: 1rpx solid #eee;
	}
	.spot view:nth-child(3){
		border-right: 1rpx solid #eee;
	}
	.spots view{
		width: 235rpx!important;
	}
	.empty-tip{
		text-align: center;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #979BA4;
	}

</style>

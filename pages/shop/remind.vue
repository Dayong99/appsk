<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">{{quality_safe_inspection}}</view>
			<view class="check">
				
			</view>
		</view>
		<view>
			<view>
				<mescroll-uni @down="downCallback" @up="upCallback" :top="155" @init="mescrollInit" v-if="current==0">
				  <view v-for="(item,index) in getcommon" :key="index" class="beamListbox" >
						<view class="beamList" style="padding-bottom: 2rpx;">
							<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
								<view class="startend">
									<text style="display:inline-block;">
										{{item.messageContent.timeStr}}:
									</text>
									<text>
										{{item.messageContent.time}}
									</text>
								</view>
								<!-- <view class="plantime">{{plantime[item.planType]}}</view> -->
							</view>
							<view class="plancontent" v-if="item.messageContent.childList">
								<view v-for="child in item.messageContent.childList" class="planchildlist">
									<view class="planterm">
										<text class="godetails">{{child.content}}</text>
									</view>
									<view class="contengbox">
										<view class="botmeg">
											<image class="ren" src="../../static/dingwei2.png"></image>
											<text style="display: inline-block;margin-right: 35rpx;">{{child.extInfo}}</text>
											<image class="locations" src="../../static/dingwei1.png"></image>
											<text>{{child.messageReceiver}}</text>
										</view>
										 <view class="routing" @click="searcgvaky('gomsg',temCode)">{{quality_safe}}</view>
									</view>
								</view>
							</view>
							<view class="plancontent" v-if="!item.messageContent.childList">
								<view class="planchildlist">
									<view class="planterm">
										<text class="godetails">{{item.messageContent.content}}</text>
									</view>
									<view class="planimg" v-for="tool in item.messageContent.filePath.split(',')">
										<image :src="tool"></image>
									</view>
									<view class="contengbox" v-if="!item.messageContent.extTime">
										<view class="botmeg">
											<image class="ren" src="../../static/dingwei2.png"></image>
											<text style="display: inline-block;margin-right: 35rpx;">{{item.messageContent.messageReceiver}}</text>
											<image class="locations" src="../../static/dingwei1.png"></image>
											<text>{{item.messageContent.messageReceiver}}</text>
										</view>
										 <view class="routing" @click="searcgvaky('gomsg',temCode)">{{quality_safe}}</view>
									</view>
									<view class="contengbox rectify" v-if="item.messageContent.extTime">
										<view class="">
											<view>
												<text v-if="quality_safe_inspection=='待整改提醒'">巡检人:</text>
												<text style="display: inline-block;margin-right: 35rpx;">{{item.messageContent.messageReceiver}}</text>
											</view>
											<view>
												<text>整改期限:</text>
												<text>{{item.messageContent.messageReceiver}}</text>
											</view>
										</view>
										 <view class="routing gorectify" @click="searcgvaky('gomsg',temCode)">{{quality_safe}}</view>
									</view>
								</view>
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
  megremindList,msggo
} from "@/api/AlbumServer.js"
  export default {
	  data(){
		  return{
			  scrollInto: "recommend",
			  current:0,
			  currenttab:0,
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
			  temCode:'',
			  quality_safe_inspection:'',
			  quality_safe:''
		  }
	  },
    computed: {
	  getcommon() {
	    return this.$store.getters['album/getcommon']
	  }
    },
	onLoad(options){
		if(options&&options.temCode){
			this.temCode=options.temCode
			console.log(this.temCode)
			if(this.temCode=='quality_safe_inspection'){
				this.quality_safe_inspection='安全巡检'
				this.quality_safe='去巡检'
			}else if(this.temCode=='device_checked'){
				this.quality_safe_inspection='待检查提醒'
				this.quality_safe='去检查'
			}else if(this.temCode=='device_maintained'){
				this.quality_safe_inspection='待保养提醒'
				this.quality_safe='去保养'
			}else if(this.temCode=='device_repaired'){
				this.quality_safe_inspection='待维修提醒'
				this.quality_safe='去维修'
			}else if(this.temCode=='quality_safe_accepted'){
				this.quality_safe_inspection='待验收提醒'
				this.quality_safe='去验收'
			}else if(this.temCode=='quality_safe_rectified'){
				this.quality_safe_inspection='待整改提醒'
				this.quality_safe='去整改'
			}else if(this.temCode=='quality_safe_accepted_yes'){
				this.quality_safe_inspection='验收提醒'
				this.quality_safe='去验收'
			}
			this.msginit()
		}
	},
	onShow(){
		this.mescroll.resetUpScroll(true)
	},
    methods: {
		msginit(){
			let data={
				messageType:this.temCode,
				username:this.$store.getters['user/getAccountInfoData'].username
			}
			msggo(data).then(res=>{
				console.log(res)
			})
		},
		hiddendetails(val){
			hiddendanger({planId:val.id}).then(res=>{
				console.log(res)
				if(res.status==200&&res.data.result.records.length){
					let data=res.data.result.records[0]
					if(data.repairPath){
						data.repairPath=data.repairPath.split(',')
					}
					if(data.inspectPath){
						data.inspectPath=data.inspectPath.split(',')
					}
					uni.navigateTo({
						url:'../gorectifydetail/gorectifydetail?valent='+JSON.stringify(data)
					})
				}
			})
		},
		searcgvaky(val,item){
			if(item){
				if(val=='gorectifydetail'){
					console.log(item)
					if(item.repairPath){
						item.repairPath=item.repairPath.split(',')
					}
				}
				if(val=='gomsg'){
					console.log(item)
					if(item=='quality_safe_inspection'){
						uni.navigateTo({
							url:`../gorouteimg/gorouteimg?valent=${items}`
						})
					}else if(item=='device_checked'){
						uni.navigateTo({
							url:`../maintenance/examine?valent=${items}`
						})
					}else if(item=='device_maintained'){
						uni.navigateTo({
							url:`../maintenance/maintain?valent=${items}`
						})
					}else if(item=='device_repaired'){
						uni.navigateTo({
							url:`../maintenance/equipment?valent=${items}`
						})
					}else if(item=='quality_safe_accepted'){
						uni.navigateTo({
							url:`../gocheck/gocheck?valent=${items}`
						})
					}else if(item=='quality_safe_rectified'){
						uni.navigateTo({
							url:`../gocheck/gocheck?valent=${items}`
						})
					}else if(item=='quality_safe_accepted_yes'){
						uni.navigateTo({
							url:`../gocheck/gocheck?valent=${items}`
						})
						
					}
					
					
				}
				let items=JSON.stringify(item)
				uni.navigateTo({
					url:`../${val}/${val}?valent=${items}`
				})
			}else{
				uni.navigateTo({
					url:`../${val}/${val}`
				})
			}
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
		  uni.reLaunch({
		  	url:'../index/index?current=1'
		  })
	  },
	 
	  unique(arr) {
	    const res = new Map();
	    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
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
	    megremindList({
	       pageNo: mescroll.num,
	       pageSize: mescroll.size,
	  	   // relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		   messageType:this.temCode,
		   username:''
	    }).then(violaRes => {
			violaRes.data.result.records.forEach(a=>{
				a.messageContent=JSON.parse(JSON.parse(a.messageContent))
			})
			console.log(violaRes.data.result.records)
			if(mescroll.num==1){
				this.$store.commit('album/commonList',violaRes.data.result.records)
			}else{
				this.$store.commit('album/commonList',this.getcommon.concat(violaRes.data.result.records))
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
		padding-left: 34rpx;
		padding-right: 33rpx;
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
		width: 630rpx;
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
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.plantime{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #86878A;
		line-height: 93rpx;
	}
	.plancontent{
		margin:0 auto;
	}
	.plancontent .planterm{
		margin-bottom: 26rpx;
		margin-top:25rpx;
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
	.contengbox{
		display: flex;
		justify-content: space-between;
	}
	.rectifydata{
		display: inherit!important;
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
	.planchildlist{
		border-bottom: 1rpx solid #eee;
		padding-left: 33rpx;
		padding-right: 33rpx;
		margin:0 auto;
		padding-bottom: 39rpx;
	}
	.routresult{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #2EA62E;
	}
	.routresult image{
		width: 25rpx;
		height: 25rpx;
		vertical-align: middle;
		margin-top:-3rpx;
		margin-right: 4rpx;
	}
	.nearmiss text{
		display: block;
		width: 213rpx;
		height: 40rpx;
		background: #DBE6FF;
		border: 1rpx solid #8FADF2;
		border-radius: 3rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		line-height: 40rpx;
		font-weight: 500;
		padding-left: 15rpx;
		color: #235FED;
		margin-bottom: 20rpx;
	}
	.planimg{
		width: 641rpx;
		height: 139rpx;
		margin-bottom: 20rpx;
	}
	.planimg image{
		height: 139rpx;
		width: 199rpx;
	}
	.rectify{
		font-size: 28rpx;
		font-family: 'PingFang';
		font-weight: 500;
		color: #86878A;
	}
	.gorectify{
		margin-top:10rpx!important;
	}
</style>

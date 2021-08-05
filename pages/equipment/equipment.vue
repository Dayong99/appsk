<template>
  <view class="" style="position: fixed;top:0;bottom: 0;z-index: 999;width: 100%;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">设备维保</view>
  		<view class="qrcode">
  			<!-- <image src="../../static/fangkuai.png" class="hw100v"></image> -->
  		</view>
  	</view>
  	<view class="pulldown">
		<view v-for="(item,index) in pulldownList" class="maintepng" @click="pulldownClick(item.url,index)">
			<image :src="item.imgs"></image>
			<view>{{item.text}}</view>
		</view>
	</view>
	<view class="flex" style="padding-bottom: 5rpx;">
	  <view class="recenttask" :class="{'tabcolor':current == 0}" @tap="fnBarClick(0)">检查任务</view>
	  <view class="recenttask" :class="{'tabcolor':current == 1}" @tap="fnBarClick(1)">保养任务</view>
	   <view class="recenttask" :class="{'tabcolor':current == 2}" @tap="fnBarClick(2)">维修任务</view>
	</view>
	<view class="maintain">
		<!-- 滑动切换视图 -->
		<swiper class="maintainswiper" :current="current" @change="fnBarClick">
		  <!-- 检查 -->
		  <swiper-item>
		    <mescroll-uni v-if="status.inspect" @down="downCallback" @up="upCallback" @init="mescrollInit">
		        <view v-for="(item,index) in getinspecttask" :key="index" class="beamListbox" >
		      		<view class="beamList" style="">
		      			<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
		      				<view class="startend">
		      					<text style="display:inline-block;">
		      						计划时间:{{item.planStartTime}}<text style="display:inline-block;margin:0 8rpx;">至</text>{{item.planTerminationTime}}
		      					</text>
		      				</view>
		      			</view>
		      			<view class="plancontent">
		      				<view v-for="child in item.deviceInspectionPlanSubList" class="planchildlist">
		      					 <view class="planterm">
		      						<text class="goplan" style="background: #B0B0B0;">{{child.inspectionStatus_dictText}}</text>
		      						<text class="godetails">{{child.inspectionContent}}</text>
		      					</view>
		      					<view class="contengbox">
		      						<view class="botmeg">
		      							<image class="ren" src="../../static/dingwei2.png"></image>
		      							<text style="display: inline-block;margin-right: 35rpx;">{{child.inspectors}}</text>
		      							<image class="locations" src="../../static/dingwei1.png"></image>
		      							<text>{{child.inspectors}}</text>
		      						</view>
		      						 <view class="routing" @click="searcgvaky('examine',child)">去检查</view>
		      					</view> 
		      				</view>
		      			</view>
		      		</view>
		      	</view>
		    </mescroll-uni> 
		  </swiper-item>
		
		  <!-- 保养 -->
		  <swiper-item>
		    <mescroll-uni v-if="status.upkeep" @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view v-for="(item,index) in getupkeep" :key="index" class="beamListbox" >
					<view class="beamList" style="">
						<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
							<view class="startend">
								<text style="display:inline-block;">
									计划时间:{{item.planStartTime}}<text style="display:inline-block;margin:0 8rpx;">至</text>{{item.planTerminationTime}}
								</text>
							</view>
						</view>
						<view class="plancontent">
							<view v-for="child in item.deviceMaintainPlanSubList" class="planchildlist">
								 <view class="planterm">
									<!-- <text class="goplan" style="background: #B0B0B0;">{{child.maintainStatus_dictText}}</text> -->
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
		  </swiper-item> 
		  <swiper-item>
			  <mescroll-uni v-if="status.service" @down="downCallback" @up="upCallback" @init="mescrollInit">
				<view v-for="(item,index) in getservice" :key="index" class="beamListbox" >
					<view class="beamList" style="">
						<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
							<view class="startend">
								<text style="display:inline-block;">
									计划时间:{{item.planStartTime}}<text style="display:inline-block;margin:0 8rpx;">至</text>{{item.planTerminationTime}}
								</text>
							</view>
						</view>
						<view class="plancontent">
							<view v-for="child in item.deviceInspectionPlanSubList" class="planchildlist">
								 <view class="planterm">
									<text class="goplan" style="background: #B0B0B0;">{{child.inspectionStatus_dictText}}</text>
									<text class="godetails">{{child.inspectionContent}}</text>
								</view>
								<view class="contengbox">
									<view class="botmeg">
										<image class="ren" src="../../static/dingwei2.png"></image>
										<text style="display: inline-block;margin-right: 35rpx;">{{child.inspectors}}</text>
										<image class="locations" src="../../static/dingwei1.png"></image>
										<text>{{child.inspectors}}</text>
									</view>
									 <view class="routing" @click="searcgvaky('equipment',child)">去检查</view>
								</view> 
							</view>
						</view>
					</view>
				</view>
			  </mescroll-uni>
		  </swiper-item> 
		</swiper>
	</view>
  </view>
</template>
<script>
 import {inspecttask,upkeeptask,servicetask} from '@/api/AlbumServer.js'
  export default {
	data(){
		return{
			mescroll:[null,null,null],
			current:0,
			pulldownList:[{text:'检查计划',imgs:'../../static/jianchajihua.png',url:'planaudit'},
			{text:'保养计划',imgs:'../../static/baoyangjihua.png',url:'planupkeep'},
			{text:'申报维修',imgs:'../../static/shenbaoweixiu.png',url:'service'},
			{text:'设备台账',imgs:'../../static/shebeitaizhang.png',url:'standing'},
			{text:'扫一扫',imgs:'../../static/saoyisaos.png',url:'qrcode'}],
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
	  getinspecttask() {
	    return this.$store.getters['album/getinspecttask']
	  },
	  getupkeep(){
		  return this.$store.getters['album/getupkeep']
	  },
	  getservice(){
		  return this.$store.getters['album/getservice']
	  }
    },
	
    methods: {
      /// 跳转打开新窗口
      searcgvaky(item,type) {
		  let types=JSON.stringify(type)
        uni.navigateTo({
          url: `/pages/maintenance/${item}?val=${types}`
        })
      },
	  pulldownClick(url,val){
		  if(val==4){
			uni.scanCode({
			    success: function (res) {
			        console.log('条码类型：' + res.scanType);
			        console.log('条码内容：' + res.result);
					let result=res.result;
					console.log(result)
					uni.navigateTo({
						url:`/pages/maintenance/${url}?datas=${result}`
					})
			    }
			});  
		  }else{
			  uni.navigateTo({
			  	url:`/pages/maintenance/${url}`
			  })
		  }
	  },
	  goback(){
		  uni.navigateBack()
	  },
	  fnBarClick(e){
		  console.log(e)
		  let current = e.hasOwnProperty("detail") ? e.detail.current : e;
		  if (typeof e == 'number' && this.current == current) {
		    this.timeOutBlack += 1;
		    if (!this.clickRefresh && this.timeOutBlack >= 2) {
		      this.clickRefresh = true;
		      // 定时器重置
		      this.timeOutBlack = setTimeout(() => {
		        // 清除定时器
		        clearTimeout(this.timeOutBlack)
		        // 连续触发记录重置
		        this.timeOutBlack = 0;
		        // 刷新值关
		        this.clickRefresh = false;
		      }, 5000);
		    }
		    return;
		  } else {
		  	console.log(current)
		    // 改变顶部导航选中 
		    this.current = current;
		    // 首次选中激活顶部导航关联页状态 
			if (!this.status.inspect && current == 0) this.status.inspect = true;
		    if (!this.status.upkeep && current == 1) this.status.upkeep = true;
			if (!this.status.service && current == 2) this.status.service = true;
		    // 清除定时器
		    clearTimeout(this.timeOutBlack)
		    // 连续触发记录重置
		    this.timeOutBlack = 0;
			 this.mescroll[this.current].scrollTo(0, 300);
		    // 刷新值关
		    this.clickRefresh = false;
		  }
	  },
	  mescrollInit(mescroll) {
	    this.mescroll[this.current] = mescroll;
	  },
	  /// 下拉刷新的回调
	  downCallback(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	  		 this.mescroll[this.current].resetUpScroll()
	  },
	  /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
	  upCallback(mescroll) {
	    [inspecttask,upkeeptask,servicetask][this.current]({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
	    }).then(violaRes => {
			if(this.current==0){
				if(mescroll.num==1){
					this.$store.commit('album/taskList',violaRes.data.result.records)
				}else{
					this.$store.commit('album/taskList',this.getinspecttask.concat(violaRes.data.result.records))
				}
			}else if(this.current==1){
				if(mescroll.num==1){
					this.$store.commit('album/upkeepList',violaRes.data.result.records)
				}else{
					this.$store.commit('album/upkeepList',this.getupkeep.concat(violaRes.data.result.records))
				}
			}else if(this.current==2){
				if(mescroll.num==1){
					this.$store.commit('album/serviceList',violaRes.data.result.records)
				}else{
					this.$store.commit('album/serviceList',this.getservice.concat(violaRes.data.result.records))
				}
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
	.maintepng{
		display: inline-block;
		margin:26rpx;
	}
	.maintepng:nth-child(1){
		margin-left: 26rpx;
	}
	.maintepng image{
		width: 96rpx;
		height: 96rpx;
		font-size: 25rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.maintepng view{
		font-size: 25rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.pulldown{
		background: #fff;
		text-align: center;
	}
	.beamList{
		width: 705rpx;
		/* height: 450rpx; */
		background: #FFFFFF;
		border-radius: 7rpx;
		margin:0rpx auto;
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
		border-radius: 27rpx;
		font-size: 27rpx;
		text-align: center;
		line-height: 53rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin-top: -10rpx;
	}
	.recenttask{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
		margin-top:44rpx;
		margin-left: 25rpx;
		padding-bottom: 26rpx;
	}
	.tabcolor{
		color: #235FED;
	}
	.maintain{
		position: relative;
		top:0rpx;
		bottom: 0;
		height: 100%;
		width: 100%;
	}
	.maintainswiper{
		position: absolute;
		top:0;
		height: 500px;
		width: 100%;
	}
</style>

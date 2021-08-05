<template>
	<view class="clone-all">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">云巡检信息</view>
		</view>
		<view style="margin-top: 160rpx;">
			<view class="Cloud-inspection pa-all">
				<view class="Cloud-inspection-tit">
					云巡检情况
					</view>
				<view class="Cloud-inspection-sele">
					<view class="uni-padding-wrap" v-for="(item,index) in JNList" :key="index">
					            <view class="uni-title">{{item.name}}</view>
					            <view class="ra-tu">
					                <label class="radio rad-fis"><radio value="r1" :checked="item.status === 0"  disabled />无</label>
					                <label class="radio"><radio value="r1"  :checked=" item.status === 1" disabled />有</label>
					            </view>
					</view>
				</view>
			</view>
		    <view class="interval"></view>
			<view class="stairway-upa pa-all">上报问题</view>
			<view class="content" v-if="showImg">
				<cloudTimeAxis :dataArray="dataArray"></cloudTimeAxis>
				
			</view>
			<view class="content-img" v-else >
				<image src="../../static/emptys.png"></image>
				<view class="content-tit">水库状态完好，暂无问题上报</view>
			</view>
		</view>
	    
	</view>
</template>

<script>
	import cloudTimeAxis from '@/components/cloudTimeAxis/cloudTimeAxis.vue'
	import {queryListAppMainSub} from '@/api/AlbumServer.js'
	export default {
		components:{
			cloudTimeAxis
		},
		data(){
			return {
				lists:{},
				safetyId:'',
				JNList:[],
				dataArray:{},
				showImg:false
				}
			
		},
		onLoad(option) {
			this.lists =  JSON.parse(decodeURIComponent(option.lists));
			this.safetyId = this.lists.safetyId 
			this.JNList = JSON.parse(this.lists.checkPointInfo)
		},
		onShow() {
			this.queryListAppMainSubList()
		},
		methods:{
			queryListAppMainSubList(){
				let _that = this
				let arr = {
					id: this.safetyId,
					relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
				queryListAppMainSub(arr).then(res => {
					if(_that.safetyId){
						_that.dataArray = res.data.result[0]
						_that.showImg = true
					}else {
						_that.showImg = false
					}
				})
			},
			goback(){
				uni.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style scoped>
	.head{
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		position: fixed;
		z-index: 999;
		top: 0%;
		background-color: #208FE7;
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
	
	.fo-w {
		font-weight: Bold;
		font-family: PingFang-SC-Bold;
	}
	.pa-all{
		padding: 0rpx 28rpx;
	}
	.clone-all {
		
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
	}
	.Cloud-inspection{
		/* height: 442rpx; */
		background-color: #FFFFFF;
	}
	.Cloud-inspection-tit{
		height: 110rpx;
		line-height: 110rpx;
		color: #208FE7;
		font-size: 32rpx;
	}
	.stairway-upa{
		height: 114rpx;
		line-height: 114rpx;
		color: #208FE7;
		font-size: 32rpx;
		border-bottom: 1rpx solid #CCCCCC;
	}
	.Cloud-inspection-sele{
		/* height: 328rpx; */
	}
	.uni-padding-wrap{
		height: 64rpx;
		line-height: 64rpx;
		display: flex;
		font-size: 26rpx;
		justify-content: space-between;
	}
	.ra-tu{
		color: #666666;
	}
	
	.rad-fis{
		margin-right: 36rpx;
	}
	.interval{
		height: 12rpx;
		background-color: #CCCCCC;
		margin: 30rpx 0rpx;
	}
	element.style {
		background-color: #208FE7;
	}
	.content-img {
		text-align: center;
		margin-top: 80rpx;
	}
	.content-tit {
		margin-top: 22rpx;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 28rpx;
		color: #999999;
	}
</style>

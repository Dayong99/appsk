<template>
	<view class="time-app">
		<view class="box-top">
			<view class="right-box-top">
				<view class="folt-lef" v-if="showRectification">
					<view class="title-all">
						<view class="dot"></view>
						<text class="tit-all " :class="{timeTit:this.safetySubList!==0}">{{this.safetySubList===0?'验收合格':'验收不合格'}}</text>
					    <text class="time-tw">{{this.safetySubList.checkTime}}</text>
					</view>
					<view>
						<!-- {{item.content}} -->
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">验收意见：</text>
							<text class="Reservoir-test-row">{{this.safetySubList.checkDescribe}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">位置：</text>
							<text class="Reservoir-test-row">{{dataArray.checkPointId_dictText}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">验收人：</text>
							<text class="Reservoir-test-row">{{this.safetySubList.checkPerson}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">验收结果：</text>
							<text class="Reservoir-test-row">{{this.safetySubList.checkStatus}}</text>
						</view>
						<view>
							<text class="Reservoir-test-title">处理照片：</text>
							<view class="The-problem-photo">
								<image v-for="(sec,index) in checkPah" :key="index" :src="sec"></image>
							</view>
							
						</view>
					</view>
				</view>
				<view class="folt-lef" v-if="showAcceptance">
					<view class="title-all">
						<view class="dot"></view>
						<text class="tit-all">已整改</text>
					    <text class="time-tw">{{this.safetySubList.repaiTime}}</text>
					</view>
					<view>
						<!-- {{item.content}} -->
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">隐患类型:</text>
							<text class="Reservoir-test-row">{{dataArray.checkPointInfo_dictText}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">位置：</text>
							<text class="Reservoir-test-row">{{dataArray.checkPointId_dictText}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">整改人：</text>
							<text class="Reservoir-test-row">{{dataArray.repairer}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">整改描述：</text>
							<text class="Reservoir-test-row">{{this.safetySubList.repairDescribe}}</text>
						</view>
						<view>
							<text class="Reservoir-test-title">处理照片：</text>
							<view class="The-problem-photo">
								<image v-for="(sec,index) in repairPath" :key="index" :src="sec"></image>
							</view>
							
						</view>
					</view>
				</view>
				
				<view class="folt-lef">
					<view class="title-all">
						<view class="dot"></view>
						<text class="tit-all">{{'问题信息'}}</text>
					    <text class="time-tw">{{dataArray.inspectTime}}</text>
					</view>
					<view>
						<!-- {{item.content}} -->
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">隐患类型:</text>
							<text class="Reservoir-test-row">{{dataArray.checkPointInfo_dictText}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">位置：</text>
							<text class="Reservoir-test-row">{{dataArray.checkPointId_dictText}}</text>
						</view>
						<view class="Reservoir-test">
							<text class="Reservoir-test-title">问题描述：</text>
							<text class="Reservoir-test-row">{{dataArray.problemContent}}</text>
						</view>
						<view>
							<text class="Reservoir-test-title">问题图片：</text>
							<view class="The-problem-photo">
								<image v-for="(item,index) in this.pigImg" :key="index" :src="item"></image>
							</view>
							
						</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['dataArray'],
		data() {
			return {
				showRectification:false, ///  判断是否有整改信息
				showAcceptance: false,   //判断是否有验收信息
				showTo:false,
				safetySubList:{},
				pigImg:[],
				checkPah:[],  //验收图片
				repairPath:[],   //整改
			}
		},
		onLoad() {
		},
		mounted() {
			
			if( this.dataArray.safetySubList.length > 0 ) {
				this.safetySubList = this.dataArray.safetySubList[0]
				this.showRectification = true
				this.showAcceptance = true
				this.repairPath = this.safetySubList.repairPath.split(',')
				this.checkPah =  this.safetySubList.checkPah.split(',')
			} else {
				this.showRectification = false
				this.showAcceptance = false
			}
			this.pigImg = this.dataArray.problemPhotos.split(',')
		},
		onShow(){
		},
		methods: {
		}
	}
</script>

<style scoped="scoped" lang="less">
	.time-app {
		padding: 34rpx 28rpx 0rpx 28rpx;
		font-size: 26rpx;
		font-weight: Bold;
		font-family: PingFang-SC-Bold;
	}
	.abarbeitung{
		float: right;
		width: 122rpx;
		height: 60rpx;
		line-height: 60rpx;
		background-color: #208FE7;
		text-align: center;
		border-radius: 30rpx;
		font-size: 26rpx;
		color: #FFFFFF;
	}
.box-top{
	width: 100%;
	min-height: 120rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	.left-box-top{
		width: 180rpx;
		text-align: center;
		color: rgba(198,198,198,1);
		font-size: 20rpx;
	}
	.line{
		width: 4rpx;	
		background-color: rgba(228,231,237,1);
		margin: 0 20rpx 0 20rpx;
		.dot{
			width: 20rpx;
			height: 20rpx;
			// background-color: rgba(228,231,237,1);
			
			border-radius: 50%;
			position: relative;
			left: -10rpx;
		}
	}
	.Reservoir-test {
		height: 40rpx;
		line-height: 40rpx;
	}
	.Reservoir-test-title {
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		color: #999999;
		margin-right: 20rpx;
	}
	.Reservoir-test-row {
		color: #333333;
	}
	.right-box-top{
		flex: 1;
		padding: 0 0 20rpx 0;
		.title-all {
			height:40rpx;
			line-height: 20rpx;
			.dot {
				width: 21rpx;
				height: 21rpx;
				background: #208FE7;
				border-radius: 50%;
				position: absolute;
				left: 32rpx;
			}
		}
	}
}
.tit-all {
	margin-right: 20rpx;
	color: #208FE7;
}
.timeTit {
	color: #F18424;
	
}
.time-tw {
	color: #999999;
}
//激活元素
.active{
	background-color: rgba(44,143,233,1) ;
}
// 隐藏元素
.none{
	background-color: #CCCCCC ;
}
.The-problem-photo image {
	margin: 20rpx 0rpx;
	width: 204rpx;
	height: 160rpx;
	margin-right: 12rpx;
	
}
.folt-lef {
	padding-left: 40rpx;
}
</style>
 

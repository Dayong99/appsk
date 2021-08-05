<template>
	<view>
		<view class="time-app foot-all" v-for="item in listTo" :key="item.id">
			<view class="app-top">
				<view class="app-top-le">
					<view v-if="item.orderStatusMain==0">
						<image class="image-list" src="../../static/gantanhao.png"></image>
						<text class="text-list">巡检时间：{{item.inspectTime}}</text>
					</view>
					<view v-else>
						<text class="text-list1">整改时间：{{item.repaiTime}}</text>
					</view>
				</view>
				<view class="app-top-ri" v-if="item.orderStatusMain==0" @tap="yesword(item)">{{'去整改'}}</view>
				<view class="app-top-ri" v-if="item.orderStatusMain==1" @tap="yesword(item)">{{'去验收'}}</view>
				<view v-if="item.orderStatusMain===2 && item.checkStatus ===1">
					<image class="image-list" src="../../static/gantanhao.png"></image>
					<text class="text-list">验收不合格</text>
				</view>
				<view v-if="item.orderStatusMain===2 && item.checkStatus ===0">
					<image class="image-list" src="../../static/dagou.png"></image>
					<text class="text-list1">验收合格</text>
				</view>
			</view>
			<view class="app-con">
				<text class="app-con-text"
					:class="{Acceptance:item.orderStatusMain===2}">{{item.orderStatusMain_dictText}}</text>
				<text class="app-con-text-tw">{{item.problemContent}}</text>
			</view>
			<view class="app-img-lists" v-if="item.problemPhotos===null">

			</view>
			<view class="app-img-lists" v-else>
				<image class="app-img-lists-fi" v-for="(item,index) in item.problemPhotos.split(',')" :src="item"
					@click="previewImg(item)"></image>
			</view>
			<view class="app-butt">
				<view v-if="item.orderStatusMain==0">巡检人：{{item.inspector_dictText}}</view>
				<view v-else-if="item.orderStatusMain==1">整改人：{{item.repairer_dictText}}</view>

				<view v-else>验收人：{{item.inspector_dictText}}</view>
				<view>整改期限：{{item.rectificationPeriod}}</view>
			</view>
			<view class="app-fo-ri" @tap="JumpDetails(item)"><text>隐患整改详情</text>
				<image class="app-fo-ri-img" src="../../static/xq.png"></image>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: ['listTo'],
		data() {
			return {
				listDate: this.listTo,
			}
		},
		computed: {

		},
		mounted() {},
		methods: {
			// 图片放大
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					urls: imgsArray
				});
			},
			yesword(item) {
				console.log('item',item)
				let parentVal = JSON.stringify(item)
				if (item.orderStatusMain == 0) {
					// 跳转到去整改模块
					uni.navigateTo({
						url: '/pages/gorectify/gorectify?valentInqualityPolling=' + parentVal
					})

				} else if (item.orderStatusMain == 1) {
					console.log('跳转到验收模块parentVal', parentVal)
					//跳转到验收模块
					uni.navigateTo({
						url: '/pages/gocheck/gocheck?valentInqualityPolling=' + parentVal
					})

				}
			},
			// 跳转到隐患整改详情页面
			JumpDetails(item) {
				let lists = JSON.stringify(item)
				uni.navigateTo({
					url: '/pages/gorectifydetail/gorectifydetail?lists=' + lists
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.foot-all {
		font-weight: Medium;
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
	}

	.time-app {
		padding: 8rpx 30rpx 40rpx 40rpx;
		font-size: 26rpx;
		font-weight: Bold;
		font-family: PingFang-SC-Bold;
		background-color: #FFFFFF;
		margin-top: 20rpx;

		.app-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid #ffeeeeee;
			padding-bottom: 12rpx;

			.text-list {
				color: #E7541E;
			}

			.text-list1 {
				color: #2EA62E;
			}

			.image-list {
				width: 28rpx;
				height: 28rpx;
				margin-right: 8rpx;
				vertical-align: middle;
			}

			.app-top-le {
				.text-list {
					color: #E7541E;
				}

				.text-list1 {
					color: #181616;
				}

				.image-list {
					width: 28rpx;
					height: 28rpx;
					margin-right: 12rpx;
				}
			}

			.app-top-ri {
				width: 120rpx;
				height: 48rpx;
				line-height: 48rpx;
				background-color: #208FE7;
				border-radius: 32rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		.app-con {

			line-height: 80rpx;
			margin-bottom: 22rpx;

			.app-con-text {
				display: inline-block;
				width: 96rpx;
				height: 44rpx;
				line-height: 44rpx;
				background-color: #208FE7;
				color: #FFFFFF;
				text-align: center;
				border-radius: 8rpx;
				margin-right: 12rpx;
			}

			.Acceptance {
				background-color: #B0B0B0;
			}

			.app-con-text-tw {
				color: #181616;
			}
		}

		.app-img-lists {
			.app-img-lists-fi {
				width: 200rpx;
				height: 140rpx;
				margin-right: 20rpx;
			}

			.app-img-lists-fi:last-child {
				padding-right: 0px;
			}
		}

		.app-butt {
			color: #86878A;
			height: 112rpx;
			line-height: 52rpx;
		}

		.app-fo-ri {
			display: flex;
			justify-content: flex-end;
			color: #235FED;

			.app-fo-ri-img {
				width: 16rpx;
				height: 28rpx;
				margin-top: 4rpx;
				margin-left: 12rpx;
			}
		}
	}
</style>

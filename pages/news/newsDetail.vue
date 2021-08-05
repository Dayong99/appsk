<template>
	<view>
		<view style="position: fixed;width: 100%;z-index: 100;">
			<view style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
				<view class="head flex mauto cwhite sw f34r">
					<view class="boximgs mt8r" @tap="goback">
						<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
					</view>
					<view class="safe fcenter">新闻详情</view>
				</view>
			</view>
		</view>
		<view style="padding-top: 180rpx;">
			<view style="font-size: 40rpx;padding: 10rpx 30rpx;font-weight: bold;">{{newsTitle}}
			</view>
			<view
				style="z-index: 99; display: flex;justify-content: space-between;padding: 0 30rpx; font-size: 30rpx;opacity: 0.7;margin: 20rpx 0; border-bottom: 2rpx solid #eee;">
				<view>上传时间：{{createTime}}</view>
				<view>上传人：{{createBy}}</view>
			</view>

			<view style="display: flex;justify-content: center;flex-direction: column;padding: 5rpx 20rpx 5rpx 25rpx;"
				v-html="newsContent">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: '',
				newsTitle: '',
				createTime: '',
				createBy: '',
				newsContent: '',
				// news:''
			}
		},
		onLoad(option) {
			console.log('option', option)
			this.item = JSON.parse(decodeURIComponent(option.item))
			this.newsTitle = this.item.newsTitle
			this.createTime = this.item.createTime
			this.createBy = this.item.createBy
			this.newsContent = this.item.newsContent
			// console.log('this.item', this.newsTitle, this.createTime, this.createBy, this.newsContent)

			// this.news = option.news
			// console.log('this.news',this.news)
		},
		methods: {
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);
	}

	.boximgs {
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}

	.safe {
		width: 70%;
		padding-left: 80rpx;
	}
</style>

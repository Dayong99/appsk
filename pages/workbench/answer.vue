<template>
	<view style="position: fixed;z-index: 100;overflow: hidden;">
		<view
			style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;width: 750rpx;">
			<view style="width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7); " class="flex mauto cwhite sw f34r">
				<view style="width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx; " class="mt8r" @tap="goback">
					<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
				</view>
				<view style="width: 67%;
		padding-left: 80rpx; " class="fcenter">安全知识答题</view>

			</view>
		</view>
		<view
			style="font-size: 40rpx; font-weight: bold; padding: 30rpx 0rpx;display: flex;justify-content:center; background-color: #FFFFFF;border-bottom: 1rpx solid #EEEEEE;">
			每日一答
		</view>
		<view
			style="display: flex;flex-direction: row;width: 750rpx;background-color: #FFF0C7;margin-top: 10rpx;padding: 10rpx 0rpx 10rpx 25rpx;">
			<view>倒计时 </view>
			<view style="color: #E7541E;">00:18</view>
			<view>正确完成可获取</view>
			<view style="color: #E7541E;">+3</view>
			<view>分</view>
		</view>
		<view>
			<image src='../../static/workbench/singleMultiple.png'
				style="width: 105rpx;height: 46rpx;margin: 30rpx 0 30rpx 0;z-index: 101;">
			</image>
			<view style="margin-top: -60rpx;z-index: 102;">单选</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			goback() {
				uni.navigateBack()
			},
		}
	}
</script>

<style>

</style>

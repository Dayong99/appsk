<template>
	<view style="display: flex;justify-content: space-between;align-items: center; margin: 40rpx 30rpx 0 25rpx;">
		<view style="display: flex;">
			<image style="width: 200rpx; height: 150rpx;" src="../../static/AI/float.png"></image>
			<view>
				<view style="display: flex;margin: 0 15rpx 15rpx;align-items:center">
					<view style="background-color: #20BDF1;font-size: 29rpx;margin-top: 6rpx; padding: 0rpx 15rpx 4rpx;border-radius: 25rpx;color: #FFFFFF;">未审核
					</view>
					<view>水面漂浮物</view>
				</view>
				<view style="margin: 0 15rpx;">
					<view>关联设备:红山水库</view>
					<view style="opacity: 0.7;">{{this.time}}</view>
				</view>
			</view>
		</view>
		<view
			style="height: 40rpx; margin-right: 20rpx; background-color: #208FE7;font-size: 37rpx; padding: 4rpx 32rpx 21rpx 35rpx;color: #FFFFFF;border-radius: 40rpx;"
			@click="AIDetail">审核</view>
	</view>
</template>

<script>
</script>

<style>
</style>

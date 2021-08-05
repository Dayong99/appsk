<template>
	<view style="position: fixed;z-index: 100;overflow: hidden;background-color: #E8E8E8;">
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
		padding-left: 80rpx; " class="fcenter">文章列表</view>
				<view style="position: absolute; margin-left: 670rpx;margin-top: 5rpx;">
					<image style="width: 37rpx; height: 37rpx;" src="../../static/reservoirSum/search.png"
						@click="searchArticle"></image>
				</view>
			</view>
		</view>
		<view @click="goArticle"
			style="padding: 30rpx 30rpx; width: 690rpx;display: flex;flex-direction: column;justify-content: center; background-color: #FFFFFF;border-bottom: 1rpx solid #EEEEEE;">
			<view style="display: flex;flex-direction: row;padding: 0rpx 0rpx 10rpx 0rpx;">
				<view
					style="background-color: #E7541E;padding:5rpx 5rpx 0rpx 5rpx;border-radius: 6rpx;color: #FFFFFF;font-size: 25rpx;">
					未阅读</view>
				<view
					style="padding:0 5rpx;font-weight: bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 500rpx;">
					水利部安排部署2021年水库度汛工作</view>
			</view>
			<view style="display: flex;flex-direction: row;justify-content: space-between;padding-top: 5rpx;">
				<view style="display: flex;flex-direction: row;font-size: 28rpx;color: #979BA4;">
					<view>观看该视频可获取</view>
					<view>+3分</view>
				</view>
				<view style="font-size: 28rpx;color: #979BA4;">上传人：张三</view>
			</view>
			<view style="font-size: 28rpx;color: #979BA4;padding-top: 5rpx;">上传时间：2020-12-5 12:16:19</view>
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
			searchDetail() {
				uni.navigateTo({
					/*一定要写绝对路径，这样在浏览器上和手机上才能都能跳转，
					如果写相对路径，手机端是不能跳转的*/
					url: "/pages/reservoirSum/search"
				})
			},
			searchArticle() {
				uni.navigateTo({
					url: "/pages/workbench/searchArticle"
				})
			},
			goArticle(){
				uni.navigateTo({
					url:'/pages/workbench/goArticle'
				})
			}
		}
	}
</script>

<style>

</style>

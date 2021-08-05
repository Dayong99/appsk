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
		padding-left: 80rpx; " class="fcenter">文章详情</view>

			</view>
		</view>
		<view
			style="padding: 30rpx 30rpx; width: 690rpx;display: flex;flex-direction: column;justify-content: center; background-color: #FFFFFF;border-bottom: 1rpx solid #EEEEEE;">
			<view style="display: flex;flex-direction: row;padding: 0rpx 0rpx 10rpx 0rpx;">
				<view style="padding:0 5rpx;font-weight: bold;width: 650rpx;">
					水利部安排部署2021年水库度汛工作</view>
			</view>
			<view style="display: flex;flex-direction: row;justify-content: space-between;padding-top: 5rpx;">
				<view style="font-size: 28rpx;color: #979BA4;padding-top: 5rpx;">上传时间：2020-12-5 12:16:19</view>
				<view style="font-size: 28rpx;color: #979BA4;">上传人：张三</view>
			</view>
		</view>
		<view
			style="display: flex;flex-direction: row;width: 750rpx;background-color: #FFF0C7;margin-top: 10rpx;padding: 10rpx 0rpx 10rpx 25rpx;">
			<view>还需阅读</view>
			<view style="color: #E7541E;">100%</view>
			<view>，获取</view>
			<view style="color: #E7541E;">+3</view>
			<view>分</view>
		</view>
		<view style="display: flex;justify-content: center;flex-direction: column;">
			<view style="text-indent: 2em;padding: 10rpx 30rpx;line-height: 50rpx;">
				本站讯 在南方地区已经入汛、北方地区即将入汛之际，4月27日，水利部召开水库安全度汛视频会议，深入学习贯彻习近平总书记关于防灾减灾救灾和水库大坝安全的重要讲话指示批示精神，认真落实李克强总理关于防汛抗旱工作的重要批示要求以及全国防汛抗旱工作电视电话会议部署，分析研判水库安全度汛形势，安排部署2021年水库安全度汛工作。水利部部长李国英出席会议并讲话，水利部副部长魏山忠主持会议。
			</view>
			<view style="text-indent: 2em;padding: 0rpx 30rpx;line-height: 50rpx;">
				住房城乡建设部、交通运输部、水利部、农业农村部、应急部、能源局有关司局负责同志和国家电网、中国华能、中国大唐、中国华电、国家电投、中国三峡、国家能源集团等单位有关负责同志在主会场参加会议，各省（自治区、直辖市）水利（水务）厅（局）和新疆生产建设兵团水利局、各流域管理机构负责同志在各地分会场参加会议。
			</view>
			
		</view>
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

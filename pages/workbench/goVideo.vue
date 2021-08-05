<template>
	<view style="background-color: #FFFFFF;">
		<view style="position: fixed;z-index: 100;overflow: hidden;background-color: #FFFFFF;width: 750rpx;">
			<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;">
				<view class="head flex mauto cwhite sw f34r">
					<view class="boximgs mt8r" @tap="goback">
						<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
					</view>
					<view class="safe fcenter">视频详情</view>
				</view>
			</view>
		</view>
		<view>
			<view
				style="border-radius: 15rpx; padding: 180rpx 0rpx;display: flex;flex-direction: column;justify-content: center; background-color: #FFFFFF;">
				<!-- <mescroll-uni @down="" @up="" :top="330" @init=""> -->
				<view style="display: flex;flex-direction: row;padding: 0rpx 25rpx;">
					<view style="font-weight: bold;font-size: 40rpx;">中国是怎么修建水利大坝的？机器从空中运过去，还以为是特效</view>
				</view>
				<view
					style="display: flex;flex-direction: row;justify-content: space-between;padding: 5rpx 25rpx 0 25rpx;padding-bottom: 25rpx;border-bottom: 1rpx solid #EEEEEE;">
					<view style="font-size: 28rpx;color: #979BA4;padding-top: 5rpx;">上传时间：2020-12-5 12:16:19</view>
					<view style="font-size: 28rpx;color: #979BA4;">上传人：张三</view>
				</view>
				<view
					style="display: flex;flex-direction: row;width: 750rpx;background-color: #FFF0C7;margin-top: 10rpx;padding: 10rpx 0rpx 10rpx 25rpx;">
					<view>还需观看</view>
					<view style="color: #E7541E;">00：30</view>
					<view>，获取</view>
					<view style="color: #E7541E;">+3</view>
					<view>分</view>
				</view>
				<view style="margin-left: 25rpx;margin-top: 30rpx;">
					<video style="width: 700rpx;height: 455rpx;" src='/static/video.mp4'></video>
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
			searchDetail() {
				console.log("kkkkkk")
				uni.navigateTo({
					/*一定要写绝对路径，这样在浏览器上和手机上才能都能跳转，
					如果写相对路径，手机端是不能跳转的*/
					url: "/pages/reservoirSum/search"
				})
			},
			toDetail() {
				console.log("ssssss")
				uni.navigateTo({
					url: "/pages/reservoirSum/detail"
				})
			},
			// @init
			mescrollInit(mescroll) {
				this.mescroll[this.current] = mescroll;
			},
			/// @down下拉刷新的回调
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.mescroll[this.current].resetUpScroll()
			},
			/// @up上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				[safepolling, hiddendanger][this.current]({
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					orderStatusS: this.searchIdString,
					repairIsOutTime: this.repairIsOutTime,
					inspectionStatus: this.inspectionStatus,
					planType: this.planType,
					inspectionResult: this.inspectionResult,
					isTimeout: this.inspectionResult,
					orderType: 0
				}).then(violaRes => {
					if (this.current == 0) {
						if (mescroll.num == 1) {
							this.$store.commit('album/schemeList', violaRes.data.result.records)
						} else {
							this.$store.commit('album/schemeList', this.schemeing.concat(violaRes.data.result
								.records))
						}
					}
					if (this.current == 1) {
						violaRes.data.result.records.forEach(a => {
							if (a.inspectPath) a.inspectPath = a.inspectPath.split(',')
						})

						if (mescroll.num == 1) {
							this.$store.commit('album/dangerList', violaRes.data.result.records)
						} else {
							this.$store.commit('album/dangerList', this.dangeimg.concat(violaRes.data.result
								.records))
						}
					}
					violaRes.data.result.records.length > 0 ? this.isShowEmpty = false : this.isShowEmpty = true;
					mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >=
						mescroll.size);
				}).catch(() => {
					mescroll.endErr();
				})
			}
		}
	}
</script>

<style>
	.beamList {
		width: 705rpx;
		/* height: 450rpx; */
		background: #FFFFFF;
		border-radius: 7rpx;
		margin: 19rpx auto;
	}

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
		width: 67%;
		padding-left: 80rpx;
	}

	.text {
		text-align: center;
		font-weight: 400;
		padding-top: 17rpx;
		font-size: 37rpx;
	}

	.layout {
		/* display: table; */
		padding: 30rpx;
	}

	.left {

		display: table-cell;
		vertical-align: middle;
		width: 240rpx;
		height: 200rpx;
		background: #dbefff;
		border-radius: 15rpx 0 0 15rpx;
		text-align: center;
		/* border-right: 1rpx solid #007AFF; */

	}

	.center {
		display: table-cell;
		vertical-align: middle;
		width: 240rpx;
		height: 200rpx;
		background: #dbefff;
		text-align: center;

	}

	.right {
		display: table-cell;
		vertical-align: middle;
		width: 240rpx;
		height: 200rpx;
		background: #dbefff;
		text-align: center;
		border-radius: 0 15rpx 15rpx 0;
		/* border-left: 1rpx solid #007AFF; */

	}
</style>

<template>
	<view class="" style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;">
		<app-head :title="title" @back="goBack"></app-head>

		<!-- <view class="layout" style="display: flex;justify-content: space-around;">
			<!-- <view style="display: flex;margin-top: 70rpx;">
				<image style="width: 120rpx;height: 120rpx;" src="../../static/workbench/floating.png"></image>
				<view class="left">
					<view>12例</view>
					<view>水面漂浮物</view>
				</view>
			</view> -->
		<!-- 	<view style="display: flex; margin-top: 70rpx;">
				<image style="width: 120rpx;height: 120rpx;" :src="list.appPic"></image>
				<view class="right">
					<view>{{list.code}}</view>
					<view>{{list.text}}</view>
				</view>
			</view>
		</view> -->
		<view style="display: flex;justify-content: space-between;background-color: #eee;padding: 20rpx 0;">
			<view style="margin-left: 30rpx;">AI行为监测</view>
			<view class="More-and-more" @click="JumpAIMonitoring">更多<image class="true-fan" src="../../static/xq.png"></image></view>
		</view>
		<mescroll-uni ref="ani" @up="upCallback" :fixed="true" @down="downCallback" :down="down" 
			:up="up" :top="220" @init="mescrollInit">
			<timeAxis :listTo="reservoirSituation"></timeAxis>
		</mescroll-uni>
	</view>
</template>

<script>
	import appHead from '@/components/appHead/appHead'
	import timeAxis from '@/components/time_axis/time_axis'
	// import MescrollMixin from '@/uni_modules/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import {
		vcsEventMonitorResult,
		getMonitorResult
	} from "@/api/AlbumServer.js"

	export default {

		// mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				isShowToTop: true, //开启回到顶部按钮
				mescroll: {},
				up: {
					auto: false //默认开始不执行上拉
				},
				down: {
					auto: false //默认开始不执行下拉
				},
				list: {},
				reservoirSituation: [], //水库列表
				title: 'AI监测',
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
			}
		},
		components: {
			appHead,
			timeAxis
		},
		onLoad(option) {
			this.vcsevent()
			
		},
		onShow() {
			console.log(this)
		},
		methods: {
			//点击更多跳转
			JumpAIMonitoring(){
				uni.navigateTo({
					url: `/pages/AiMonitoring/AiMonitoring`
				})
			},
			// 获取水库汇总所有信息
			mescrollInit(mescroll) {
				// this.mescroll = mescroll;
				// console.log('this.mescroll', this.mescroll)
				let arr = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					column: 'checkState',
					order: 'asc',
				}
				getMonitorResult(arr).then(res => {
					if (res.data.code !== 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					} else {
						if (mescroll.num == 1) this.reservoirSituation = []
						mescroll.endSuccess()
						// console.log('111111', mescroll.endSuccess())
						this.reservoirSituation = this.reservoirSituation.concat(res.data.result.records)

					}
				})
			},
			/// 下拉刷新的回调，默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			downCallback(mescroll) {
				console.log('downCallbackAI')
				mescroll.resetUpScroll()

			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {

				console.log(mescroll)

				let arr = {
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					column: 'checkState',
					order: 'asc',
				}
				getMonitorResult(arr).then(res => {
					console.log('获取水库汇总所有信息' + mescroll.num, res)
					if (res.data.code !== 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					} else {
						if (mescroll.num == 1) this.reservoirSituation = []
						mescroll.endSuccess()
						if (res.data.result.records.length !== 0) {
							mescroll.endSuccess()
							this.reservoirSituation = this.reservoirSituation.concat(res.data.result.records)
						} else {
							mescroll.endErr()
						}


					}

				})
			},
			// MonitorResultList(){
			// 	getMonitorResult().then(res => {
			// 		let   {code,result} = res.data
			// 		if(code===200) {
			// 			this.reservoirSituation = result.records
			// 			// console.log(this.reservoirSituation)
			// 		}

			// 	})
			// },
			//AI监测统计
			vcsevent() {
				vcsEventMonitorResult().then(res => {
					let {
						code,
						result
					} = res.data
					console.log(result)
					if (code === 200) {
						this.list = result[0]
					}

				})
			},
			goBack() {
				uni.navigateBack();
			},
			AIDetail() {
				uni.navigateTo({
					url: "/pages/workbench/AIDetail"
				})
			}

		}
	}
</script>

<style lang="less" scoped>
	.true-fan {
		width: 15rpx;
		height: 27rpx;
		margin-left: 10rpx;

	}

	.device_cont {
		.scroll_cont {
			.item {
				padding: 44upx 40upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #EAE7E7;
				font-size: 32upx;

				.title {
					color: #444444;
				}

				.check {
					color: #235FED;
				}
			}

		}
	}

	.layout {
		padding: 30rpx;
	}

	.left {
		display: table-cell;
		vertical-align: middle;
		height: 150rpx;
		text-align: left;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}

	.right {
		display: table-cell;
		vertical-align: middle;
		height: 150rpx;
		text-align: left;
		border-radius: 0 15rpx 15rpx 0;
		margin-left: 10rpx;
		margin-top: 10rpx;
	}
	.More-and-more {
		    margin-right: 30rpx;
		    color: rgb(0, 122, 255);
		    display: flex;
		    align-items: center;
			font-family: PingFang-SC-Medium;
			font-weight: Medium;
			font-size: 28rpx;
	}
</style>

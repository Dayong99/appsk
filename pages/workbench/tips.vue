<template>
	<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;">
		<view class="flex mauto cwhite sw f34r" style="width: 100%;height: 153rpx;line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);">
			<view class="mt8r" style="width: 21rpx;height: 38rpx;padding-left: 30rpx;" @tap="goback">
				<image src="../../static/fanhui1.png" class="hw100v"></image>
			</view>
			<view class="fcenter" style="width: 67%;padding-left: 80rpx;">消息列表</view>
		</view>
		<view
			style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-top: 20rpx;">
			<!-- 各类消息 -->
			<view @click="goTask" v-if="checkNum !=0"
				style="width: 700rpx;background-color: #FFFFFF;border-radius: 10rpx;margin-bottom: 18rpx;">
				<view style="display: flex;flex-direction: row;">
					<view style="width: 15rpx;height: 15rpx;background-color: #E7541E;
					margin: 25rpx 10rpx 0rpx 10rpx; border-radius: 15rpx;">
					</view>
					<view style="font-size: 40rpx;font-weight: bolder;padding: 5rpx 0;">验收提醒</view>
				</view>
				<view style="margin-left: 35rpx;opacity: 0.6;padding-bottom: 5rpx;font-size: 30rpx;">
					您有<span>{{checkNum}}</span>条验收任务，请及时验收!
				</view>
				<view style="margin-left: 35rpx;opacity: 0.6;padding-bottom: 5rpx;font-size: 30rpx;">{{time}}</view>
			</view>
			<view @click="goTask" v-if="rectifyNum !=0"
				style="width: 700rpx;background-color: #FFFFFF;border-radius: 10rpx;margin-bottom: 18rpx;">
				<view style="display: flex;flex-direction: row;">
					<view style="width: 15rpx;height: 15rpx;background-color: #E7541E;
					margin: 25rpx 10rpx 0rpx 10rpx; border-radius: 15rpx;">
					</view>
					<view style="font-size: 40rpx;font-weight: bolder;padding: 5rpx 0;">整改提醒</view>
				</view>
				<view style="margin-left: 35rpx;opacity: 0.6;padding-bottom: 5rpx;font-size: 30rpx;">
					您有<span>{{rectifyNum}}</span>条整改任务，请及时整改!
				</view>
				<view style="margin-left: 35rpx;opacity: 0.6;padding-bottom: 5rpx;font-size: 30rpx;">{{time}}</view>
			</view>
			<view @click="goPolling" v-if="pollingNum !=0"
				style="width: 700rpx;background-color: #FFFFFF;border-radius: 10rpx;margin-bottom: 18rpx;">
				<view style="display: flex;flex-direction: row;">
					<view style="width: 15rpx;height: 15rpx;background-color: #E7541E;
					margin: 25rpx 10rpx 0rpx 10rpx; border-radius: 15rpx;">
					</view>
					<view style="font-size: 40rpx;font-weight: bolder;padding: 5rpx 0;">巡检提醒</view>
				</view>
				<view style="margin-left: 35rpx;opacity: 0.6;padding-bottom: 5rpx;font-size: 30rpx;">
					您有<span>{{pollingNum}}</span>条巡检任务，请及时巡检!
				</view>
				<view style="margin-left: 35rpx;opacity: 0.6;padding-bottom: 5rpx;font-size: 30rpx;">{{time}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		hiddendanger, //整改状态数据
		resRepair, //巡检计划数据
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
				datas: '', //隐患整改单数据获取
				rectifyNum: 0,
				checkNum: 0,
				pollingNum: 0,
				pollingData: '',
			}
		},
		onLoad() {
			uni.$on('refreshData2', () => {
				this.rectifyNum = 0
				this.getDatas()
			})
			uni.$on('refreshData', () => {
				this.checkNum = 0
				this.getDatas()
			})
			this.getDatas()
			this.getPollingData()
			// this.rectifyNum = JSON.parse(decodeURIComponent(options.datas)).rectifyNum
			// this.checkNum = JSON.parse(decodeURIComponent(options.datas)).checkNum
			// this.pollingNum = JSON.parse(decodeURIComponent(options.datas)).pollingNum
		},
		methods: {
			goback() {
				uni.navigateBack({

				})
			},
			// 获取整改状态数据去整改、去验收任务条数
			getDatas() {
				let arr = {
					pageNo: 1,
					pageSize: 100,
					// orderStatusMain: '' //0-待整改 1-待验收 2-已验收
				}
				hiddendanger(arr).then(res => {
					if (res.data.code == 200) {
						// 获取整改状态数据
						this.rectifyNum = 0
						this.checkNum = 0
						this.datas = res.data.result.records;
						for (let i = 0; i < this.datas.length; i++) {
							if (this.datas[i].orderStatusMain == 0) {
								this.rectifyNum++
							} else if (this.datas[i].orderStatusMain == 1) {
								this.checkNum++
							}
						}
					} else {
						uni.showToast({
							title: "整改状态数据获取失败！",
							icon: 'none',
							duration: 1000
						});
					}
				})
			},
			// 巡检计划列表查询，获取巡检任务条数
			getPollingData() {
				let params = {
					// reservoirId: this.reservoirId, //从水库保养地图页过来时传过来的水库id，需要传到更多筛选页，且要传回来
					personPhone: this.$store.getters['user/getAccountInfoData'].phone, //巡检人手机号，需要传到更多筛选页，且要传回来

					orderType: '', //计划类型：0、评分计划，1、养护计划,多个用逗号隔开，默认为空
					planType: '', //计划类型：0、日计划，1、周计划，2、月计划,多个用逗号隔开，默认为空
					isTimeout: '', //是否超时：0 否、1 是，多个用逗号隔开，默认为空
					inspectionStatus: '', //巡检状态：0 未巡检、1 已巡检，多个用逗号隔开，默认为空
					inspectionResult: '', //巡检结果：0 正常、1 异常，多个用逗号隔开，默认为空

					pageNo: 1, //第几页，默认第一页
					pageSize: 999, //每页能显示多少条数据，默认10条
				}
				// 巡检计划列表查询，获取巡检任务条数
				resRepair(params).then(res => {
					if (res.data.code == 200) {
						this.pollingData = res.data.result.records
						this.pollingNum = this.pollingData.length
						console.log("巡检任务pollingNum", this.pollingNum)

					} else {
						uni.showToast({
							title: "巡检计划数据获取失败！",
							icon: 'none',
							duration: 1000,
						})
					}
				})
			},
			// 去隐患整改单页面
			goTask() {
				uni.navigateTo({
					url: '/pages/qualityPolling/qualityPolling'
				})
			},
			// 去水库保养地图页
			goPolling() {
				uni.navigateTo({
					url: '/pages/workbench/reservoirRepair'
				})
			}
		}
	}
</script>

<style>

</style>

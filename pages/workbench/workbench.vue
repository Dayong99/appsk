<template>
	<view>
		<view style="width: 100%;
				height: 153rpx;
				line-height: 193rpx;
				background: linear-gradient(0deg, #208FE7, #208FE7);">
			<view style="font-weight: bold;color: #FFFFFF;text-align: center;">我的工作台</view>
		</view>

		<!-- 3D轮播 -->
		<view>
			<swiper style="width: 750rpx;height: 300rpx;background-color: #fff;" @change="" previous-margin="0rpx"
				interval="2500" duration="500" next-margin="0rpx" circular autoplay indicatorDots>
				<block v-for="(item,index) in bannerImg" :key="index">
					<swiper-item style="box-sizing: border-box;position: relative;">
						<image style="position: absolute;width: 750rpx;height: 335rpx;z-index: 5;opacity: 1;"
							:src="item" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 消息滚动 -->
		<view style="margin-top: 30rpx;display: flex; border-bottom: 20rpx solid #eeeeee;">
			<!-- <image src="../../static/workbench/trumpet.png" style="width: 30rpx;height: 30rpx;margin-left: 30rpx;">
			</image> -->
			<!-- <view style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-bottom: 10rpx;">{{this.messsage}}
			</view> -->
			<swiper @click="goTips" style="width: 750rpx;height: 60rpx;background-color: #fff;" @change=""
				previous-margin="0rpx" interval="3000" duration="500" next-margin="0rpx" :vertical="true" circular
				autoplay :indicatorDots="false">
				<block v-for="(item,index) in imgTip" :key="index">
					<swiper-item style="box-sizing: border-box;display: flex;padding-top: 10rpx;">
						<image :src="item" style="width: 30rpx;height: 30rpx;margin-left: 30rpx;">
						</image>
						<view v-if="checkNum != 0"
							style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-top: 5rpx;">
							您有<span>{{checkNum}}</span>条验收任务，请及时验收!
						</view>
						<view v-else style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-top: 5rpx;">
							暂无验收任务!
						</view>
					</swiper-item>
					<swiper-item style="box-sizing: border-box;display: flex;padding-top: 10rpx;">
						<image :src="item" style="width: 30rpx;height: 30rpx;margin-left: 30rpx;">
						</image>
						<view v-if="rectifyNum != 0"
							style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-top: 5rpx;">
							您有<span>{{rectifyNum}}</span>条整改任务，请及时整改!
						</view>
						<view v-else style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-top: 5rpx;">
							暂无整改任务!
						</view>
					</swiper-item>
					<swiper-item style="box-sizing: border-box;display: flex;padding-top: 10rpx;">
						<image :src="item" style="width: 30rpx;height: 30rpx;margin-left: 30rpx;">
						</image>
						<view v-if="pollingNum != 0"
							style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-top: 5rpx;">
							您有<span>{{pollingNum}}</span>条巡检任务，请及时巡检!
						</view>
						<view v-else style="transform: translate(0,-12rpx);padding-left: 10rpx;padding-top: 5rpx;">
							暂无巡检任务!
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view class="lists-all">
			<view class="Data-management" v-for="item in appLists" :key="item.id" @click="partyCulture(item.appUrl)">
				<image class="imageItem" :src='item.appPic'></image>
				<view class="item">{{item.appPermissionName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		banner,
		hiddendanger, //整改状态数据
		resRepair, //巡检计划数据
		menuList, //app列表
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				bannerImg:[],
				datas: '', //隐患整改单数据获取
				rectifyNum: 0,
				checkNum: 0,
				pollingNum: 0,
				pollingData: '',
				appLists: [], //app列表
				imgList: [
					"../../static/news/swiperImg.png",
					"../../static/news/swiperImg.png",
					"../../static/news/swiperImg.png",
					"../../static/news/swiperImg.png",
				], //接口获取图片的url
				imgTip: [
					"../../static/workbench/trumpet.png",
					"../../static/workbench/trumpet.png",
					"../../static/workbench/trumpet.png",
				],
				// 用户名
				userName: "李丽丽",
				// 用户身份
				UserIdentity: "巡检人",
				// 用户责任
				UserDuty: "责任人",
				// 消息提示
				messsage: "张建军已将任务整改，请您及时验收！",
			}
		},
		onLoad() {
			this.banners()
			this.menuaAppAll()
			this.getDatas()
			this.getPollingData()
			uni.$on('refreshData2', () => {
				this.rectifyNum = 0
				this.getDatas()
				console.log('当去整改页面整改成功时刷新整改数据')
			})
			uni.$on('refreshData', () => {
				this.checkNum = 0
				this.getDatas()
				console.log('当去验收页面整改成功时刷新验收数据')
			})
			console.log('执行了onLoad')
		},
		// mounted() {
		// 	this.menuaAppAll()
		// 	this.getDatas()
		// 	this.getPollingData()
		// },
		mounted() {
			console.log('执行了mounted')

		},
		methods: {
			banners() {
				banner({
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					useType: 1
				}).then(res => {
					if (res.data.code == 200) {
						let bannerImgs = res.data.result
						console.log('bannerImgs', bannerImgs)
						for (let i = 0; i < bannerImgs.length; i++) {
							console.log('bannerImgs[i]', bannerImgs[i].imagePath.split(','))
							this.bannerImg = this.bannerImg.concat(bannerImgs[i].imagePath.split(','))
						}
						console.log('banner', this.bannerImg)
					} else {
						uni.showToast({
							title: '获取banner失败！'
						})
					}
				})
			},
			//我的工作台功能列表
			menuaAppAll() {
				menuList({
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds ? this.$store
						.getters['user/getAccountInfoData'].relTenantIds : 7,
					// relTenantIds: 7
				}).then(res => {
					console.log(res)
					if (res.data.code === 0) {
						this.appLists = res.data.result
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					}
					// this.permissionInfos = res.data.result;
				})
			},
			// 点击每个功能跳转到相应页面
			partyCulture(url) {
				// file:///F:/aoz-cloud-app/pages/party-culture/partyCulture.vue
				console.log(`/pages${url}`)
				uni.navigateTo({
					url: `/pages${url}`
				})
				// uni.navigateTo({
				// 	url: "/pages/workbench/TheReservoirLandscape"
				// })
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
			// 去消息列表页面
			goTips() {
				let datas = {
					rectifyNum: this.rectifyNum,
					checkNum: this.checkNum,
					pollingNum: this.pollingNum,
				}
				uni.navigateTo({
					// url: `/pages/workbench/tips?datas=${encodeURIComponent(JSON.stringify(datas))}`
					url: `/pages/workbench/tips`
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.coont {
		background-color: #FFFFFF;
	}

	.lists-all {
		padding: 60rpx 56rpx 60rpx 60rpx;
		background-color: #FFFFFF;
		font-weight: Medium;
		font-family: PingFang-SC-Medium;
		font-size: 26rpx;
		color: #333333;
		display: flex;
		flex-wrap: wrap;
	}

	.Data-management {
		width: 104rpx;
		text-align: center;
		flex: 25%;

		.imageItem {
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 20rpx;

		}

		.item {
			margin-bottom: 66rpx;
		}
	}

	.mage-rigt-ko {
		margin-right: 0rpx;
	}

	.text {
		text-align: center;
		font-weight: 400;
		padding-top: 17rpx;
		font-size: 37rpx;
	}

	.into {
		width: auto;
		height: auto;
		color: white;
		border-radius: 12rpx;
		padding: 3rpx 13rpx 6rpx 13rpx;
		position: absolute;
		margin-top: -95rpx;
		margin-left: 70rpx;
	}
</style>

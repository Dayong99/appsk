<template>
	<view>
		<!-- 头部 -->
		<view style="position: fixed;z-index: 100;">
			<view>
				<image style="position: relative;width: 750rpx;height: 400rpx;" src="../../static/workbench/bg.png">
				</image>
			</view>
			<view style="margin-top: -30rpx;">
				<view>
					<image class="imgBack" src="../../static/workbench/fh.png" @click="goBack"></image>
				</view>
				<view class="navChar">点位巡检</view>
			</view>
			<view style="margin-top: 30rpx;position: absolute;">
				<view style="display: flex;">
					<view
						style="margin-top: -110rpx;margin-left: 30rpx;width: auto;color: white;font-weight: bold;font-size: 50rpx;">
						{{this.content}}
					</view>
					<view style="margin-top: -82rpx;margin-left: 25rpx;color: white;font-size: 24rpx;">{{this.time}}
					</view>
					<map @click="go" style="margin-top: -140rpx;margin-left: 200rpx;
					width: 100rpx;height: 100rpx;" :longitude="longitude" :latitude="latitude" scale="13"></map>
				</view>
			</view>
		</view>

		<!-- 检查项 -->
		<view style="padding-top: 410rpx;z-index: 99;">
			<view
				style="margin-top: -10rpx;display: flex;justify-content: space-between;border-bottom: 2rpx solid #dbdbdd;"
				v-for="(item,index) in reservoirPointInfo" :key="index" @click="toggle('center',item.id,item)">
				<view style="display: flex;">
					<image style="width: 80rpx;height: 80rpx; margin: 26rpx 0 19rpx 50rpx;"
						src="../../static/workbench/item.png"></image>
					<view style="margin-top: 40rpx;margin-left: 20rpx;">{{item.pointName}}</view>
				</view>
				<view style="text-align: right;margin-right: 60rpx;">
					<span style="display: inline-block;width: 68rpx; margin-top:40rpx;margin-right: 40rpx;"
						:class="['successColour','failureColour'][item.status]">{{["正常","异常"][item.status]}}</span>
					<image style="margin-top: 45rpx;width: 22rpx;height: 30rpx;" src="../../static/workbench/imgGo.png">
					</image>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<uni-popup ref="popup" :animation="false" v-show="uniPopup">
			<view
				style="margin-top: 120rpx;background-color: #fff;width: 500rpx;height: auto;border-radius: 10rpx;padding: 40rpx;">
				<!-- 文字提示部分 -->
				<view class="tooltip">
					{{this.pointInfo.checkPoint_dictText}}
				</view>
				<!-- 本来这里是所有的隐患类型，但上报问题页里也有隐患类型，所以没必要在这里展示
				 只要看到了问题，就上报，在上报问题页选隐患类型，做整改描述，这样就可以详尽的上报问题-->
				<!-- 				<view class="tip">
					{{this.pointInfo.checkContent}}
				</view> -->
				<!-- 操作按钮部分-->
				<view class="normalBox">
					<button class="normal" @click="dialogClose(1)">正常</button>
				</view>
				<view class="abnormalBox">
					<button class="abnormal" @click="goProblem">异常</button>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import {
		// getReservoir,
		reservoirPoint, //水库所有点位
		resRepair, //点位巡检信息
		reservoirPointOK, //点位巡检正常接口
		deviceList
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				reserIdToMonitor: '',//去视频地图页面所传水库id，因为是往nvue页面传需要做兼容
				// 实时时间
				// time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
				// 	3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
				reservoirPointInfo: '', //水库所有点位信息
				reserId: '', //水库id
				pointInfo: {}, //点位信息
				checkPoint: '', //点位id
				polling: true,
				longitude: null, //水库经度
				latitude: null, //水库纬度
				content: '', //水库名
				singleReservoir: [], //巡检页水库信息
				reservoir: null, //水库数据
				status: null, //巡查项状态值
				uniPopup: '', //弹出层v-if值
				time: new Date().toISOString().slice(0, 10).replace(/-/g, "/"),
				pollingType: "1"
			}
		},
		onLoad(option) {
			console.log('上报问题返回数据', option)
			// 如果是从“上报问题”页面（或者为了在上传点位正常后刷新本页面）返回本“点位巡检”页的，则带有status，且其值为1(异常)
			if (option.problemData) {
				this.status = JSON.parse(decodeURIComponent(option.problemData)).status
				this.uniPopup = JSON.parse(decodeURIComponent(option.problemData)).uniPopup
				this.longitude = JSON.parse(decodeURIComponent(option.problemData)).longitude
				this.latitude = JSON.parse(decodeURIComponent(option.problemData)).latitude
				this.content = JSON.parse(decodeURIComponent(option.problemData)).content
				this.reserId = JSON.parse(decodeURIComponent(option.problemData)).reservoirId
				let cloudD = JSON.parse(decodeURIComponent(option.problemData))
				console.log('cloudD', cloudD)
			} else { //否则就是从“地图页”跳转到本“点位巡检”页的
				// plus.os.name === 'Android'
				console.log("option", option)
				this.reservoir = JSON.parse(decodeURIComponent(option.reservoir));
				this.longitude = this.reservoir[0].longitude
				this.latitude = this.reservoir[0].latitude
				this.content = this.reservoir[0].label.content
				// 水库id因为是从nvue页面过来的系统兼容
				if (plus.os.name === 'Android') {
					this.reserId = this.reservoir[0].id.slice(3)
					this.reserIdToMonitor = 'aoz' + this.reserId
					console.log("this.reserIdToMonitor", this.reserIdToMonitor)
				} else {
					this.reserId = this.reservoir[0].id
					this.reserIdToMonitor = this.reserId
					console.log("this.reserIdToMonitor", this.reserIdToMonitor)
				}
			}

			// setTimeout(() => {
			// 	this.letGetReservoir()
			// }, 500)
			setTimeout(() => {
				this.getPointInfo()
			}, 600)
		},
		methods: {
			// 获取该水库所有点位
			getPointInfo() {
				let arr = {
					reservoirId: this.reserId,
					pageNo: 1,
					pageSize: 100,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
				reservoirPoint(arr).then(res => {
					if (res.data.code === 200) {
						this.reservoirPointInfo = res.data.result.records
						console.log('水库所有点位信息', this.reservoirPointInfo)
						if (this.reservoirPointInfo.length == 0) {
							uni.showToast({
								title: '暂无点位信息',
								icon: 'none',
								duration: 1000
							});
						}
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					}
				})
			},

			// 打开基础内容
			toggle(type, checkPoint, item) {
				console.log('checkPoint', checkPoint, item)
				this.status = item.status
				this.uniPopup = true
				this.type = type
				this.$refs.popup.open()
				this.checkPoint = checkPoint
				// 获取某点位的巡检信息，并展示于对话框
				let params = {
					checkPoint: this.checkPoint, //点位id
					reservoirId: this.reserId, //水库id

					pageNo: 1,
					pageSize: 100,
				}
				resRepair(params).then(res => {
					console.log('获取巡检点位信息所传参数params', params, res)
					if (!res) {
						uni.showToast({
							title: "没有查询到!",
							icon: 'none'
						})
					} else {
						this.pointInfo = res.data.result.records[0].planSubList[0]
						console.log("获取巡检点位信息", this.pointInfo)
					}
				})
			},
			// 对话框正常、取消按钮
			dialogClose() {
				this.msgType = 'info'
				this.message = '点击了对话框的取消按钮'
				this.$refs.popup.close()
				console.log('点击正常时', this.status)
				let data = {
					checkPoint: this.checkPoint, //点位id
					// inspectTime: this.time,//巡检日期
					inspectionResult: 0,
					inspector: this.$store.getters['user/getAccountInfoData'].phone, //检查人-巡检人,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds, //租户
					reservoirId: this.reserId
				}
				console.log('点位巡检页点位正常上传参数2', data)
				reservoirPointOK(data).then(res => { //调用接口，上传巡检结果0-正常
					console.log('点位巡检页点位正常上传参数', data)
					if (res.status == 200) {
						uni.showToast({
							title: '提交成功!'
						})
						// 刷新本页面
						setTimeout(() => {
							let data = {
								longitude: this.longitude,
								latitude: this.latitude,
								content: this.content,
								reservoirId: this.reserId
							}
							// 提交成功后跳转到回扫码结果页，并传递以上参数
							uni.redirectTo({
								url: `/pages/workbench/reservoirPolling?problemData=${encodeURIComponent(JSON.stringify(data))}`,
							})
						}, 500)
					} else {
						uni.showToast({
							title: '提交失败'
						})
					}
				})
			},
			// 对话框异常、进入上报问题页按钮
			// 将水库数据通过路由传给“上报问题”页
			goProblem() {
				this.status = 1
				this.uniPopup = false
				let data = {
					pollingType: this.pollingType,
					problemType: 'cloudProblem',
					isCloud: 1, //点位巡检异常
					// 否则跳转至查询页时只有这巡检计划数据，而实际上是容许有其他计划数据的
					checkPoint: this.checkPoint, //点位id
					reservoirId: this.reserId, // 水库id

					status: this.status,
					uniPopup: this.uniPopup,
					longitude: this.longitude,
					latitude: this.latitude,
					content: this.content,
				}
				uni.redirectTo({
					url: `/pages/gorectifyorder/gorectifyorder?cloudData=${encodeURIComponent(JSON.stringify(data))}`
				})
			},
			// 去监控地图页面
			go() {
				uni.navigateTo({
					url: `/pages/workbench/monitorMap?longitude=${this.longitude}&latitude=${this.latitude}&reservoirId=${this.reserIdToMonitor}`
				})
			},
			goBack() {
				setTimeout(() => {
					uni.$emit('mark', {
						polling: 9
					})
				}, 500)
				uni.navigateTo({
					// url: `/pages/workbench/cloudPolling?polling=${this.polling}`
					url: '/pages/workbench/cloudPolling'
				})
			},
		}
	}
</script>

<style lang="less">
	.popup {}

	.tooltip {
		font-size: 50rpx;
		text-align: center;
	}

	.tip {
		padding: 30rpx;
		color: #666666
	}

	.normalBox {
		margin-top: 70rpx;
	}

	.normal {
		border-radius: 50rpx;
		width: 340rpx;
		height: 90rpx;
		background: #1dbc60;
		color: #FFFFFF;
	}

	.abnormalBox {
		margin-top: 30rpx;
	}

	.abnormal {
		border-radius: 50rpx;
		width: 340rpx;
		height: 90rpx;
		background: #f18424;
		color: #FFFFFF;
	}

	.img {}

	.imgBack {
		position: absolute;
		margin-top: -277rpx;
		margin-left: 40rpx;
		width: 22rpx;
		height: 30rpx;
	}


	.navChar {
		position: absolute;
		margin-top: -286rpx;
		margin-left: 375rpx;
		transform: translate(-50%, 0%);
		color: white;
	}



	.successColour {
		color: #1DBC60;
	}

	.failureColour {
		color: #F18424;
	}
</style>

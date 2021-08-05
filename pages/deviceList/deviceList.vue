<template>
	<view style="position: relative;z-index: 999;height:100%;">
		<app-head style="position: fixed;width: 750rpx;z-index: 100;" :title="title" @back="goBack"></app-head>
		<view style="padding-top: 150rpx;z-index: 99;" class="device_cont">
			<scroll-view class="scroll_cont">
				<view class="item" v-for="(item,index) in deviceList" :key="index" @click="toVideoSurveillance(item)">
					<text class="title">{{item.deviceName}}</text>
					<text class="check">查看</text>
				</view>
				<view v-show="isLoadMore">
					<!--loading加载提示处-->
					<uni-load-more :status="loadStatus"></uni-load-more>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import appHead from '@/components/appHead/appHead'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {
		deviceList
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				title: '视频监控',
				pageNo: 1,
				pageSize: 10,
				deviceList: [],
			}
		},
		components: {
			appHead,
			uniLoadMore
		},
		onLoad(option) {

		},
		onShow() {
			this.getDeviceList()
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			getDeviceList() {
				let params = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					deviceCatagory: 'camera',
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
				deviceList(params).then(res => {
					if (res.data.code == 200 && res.data.result.records.length > 0) {
						this.deviceList = res.data.result.records
						console.log(this.deviceList)
						if (res.data.code == 200) {
							if (res.data.result.records) {
								// this.deviceList = res.data.result.records;
								this.deviceList = this.deviceList.concat(res.data.result.records);
								console.log(this.deviceList)
								if (res.data.result.records.length < this.pageSize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
									this.isLoadMore = true;
									this.loadStatus = 'noMore'
								} else {
									this.isLoadMore = false;
								}
							} else {
								this.isLoadMore = true;
								this.loadStatus = 'noMore'
							}
						} else { //接口请求失败的处理
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							this.isLoadMore = false;
							if (this.pageNo > 1) {
								this.pageNo -= 1
							}
						}
					}
				});
			},
			toVideoSurveillance(item) {
				uni.navigateTo({
					url: `/pages/videoSurveillance/videoSurveillance?id=${item.id}&deviceNumber=${item.deviceNumber}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
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
</style>

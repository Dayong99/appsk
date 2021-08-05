<template>
	<view>
		<!-- 头部 -->
		<view>
			<view style="height: 70rpx;background-color: #E8E8E8;"></view>
			<image class="img" :src="singleReservoir.renderings?singleReservoir.renderings:'../../static/sk-img.png'"></image>
			<image style="position: fixed; display: block;margin-top: -360rpx;margin-left: 20rpx;
		width: 50rpx;
		height: 50rpx;
		padding-left: 20rpx;
		z-index: 999;
		"
				src="./../../static/workbench/goBack.png" @click="goBack"></image>
		</view>
		<view style="position: absolute;
		margin-top: -110rpx;
		margin-left: 30rpx;
		">
		
			<view style="display: flex;height: auto;">
				<view style="font-size: 50rpx;color: #FFFFFF; ">{{singleReservoir.reservoirName}}</view>
				<view
					style="background:linear-gradient(#FFED71, #FFCB04); letter-spacing:8rpx; margin: 18rpx 0 0 15rpx; color: #000000;width: auto;font-size: 24rpx;height: 38rpx;padding: 4rpx 8rpx 4rpx 12rpx;border-radius: 25rpx; background-color: #fdd512;">
					{{singleReservoir.reservoirType_dictText}}
				</view>
			</view>
		</view>
		<!-- 基本信息 -->
		<view class="baseInfo">
			<view style="display: flex;margin-top: 20rpx;margin-left: 20rpx;">
				<image style="width: 37rpx;height: 37rpx;" src="../../static/reservoirSum/baseInfo.png"></image>
				<view style="margin-left: 10rpx;margin-top: -14rpx;color: #007AFF;font-size: 40rpx;">基本信息</view>
			</view>
			<view style="display: flex;margin-left: 60rpx;">
				<view style="opacity:0.5 ;">所属乡镇:</view>
				<view
					style="font-weight: bold;position: absolute;font-size: 25rpx;margin-left: 155rpx;margin-top: 7rpx;color: #333333;">
					{{singleReservoir.township}}</view>
			</view>
			<view style="display: flex;margin-left: 60rpx;">
				<view style="opacity:0.5;">所在河流:</view>
				<view
					style="font-weight: bold;position: absolute;font-size: 25rpx;margin-left: 155rpx;margin-top: 7rpx;color: #333333;">
					{{singleReservoir.river}}</view>
			</view>
			<!--
			// renderings:item.renderings,//水库照片
			// reservoirName:item.reservoirName,//水库名称
			// reservoirType_dictText: item.reservoirType_dictText,//水库类型
			// township:item.township,//所属乡镇
			// river:item.river,//所在河流
			// damType_dictText:item.damType_dictText,//大坝类型
			// maxDamHeight:item.maxDamHeight,//大坝高度
			// longitude:item.longitude,//大坝经度
			// longitude:item.longitude,//大坝经度
			// personPhone: this.$store.getters['user/getAccountInfoData'].phone, //实际来自于注册用户 -->
			<view style="display: flex;margin-left: 60rpx;">
				<view style="opacity:0.5 ;">大坝类型:</view>
				<view
					style="font-weight: bold;position: absolute;font-size: 25rpx;margin-left: 155rpx;margin-top: 7rpx;color: #333333;">
					{{singleReservoir.damType_dictText}}
				</view>
			</view>
			<view style="display: flex;margin-left: 60rpx;">
				<view style="opacity:0.5 ;">坝高:</view>
				<view
					style="font-weight: bold;position: absolute;font-size: 25rpx;margin-left: 85rpx;margin-top: 7rpx;color: #333333;">
					{{singleReservoir.maxDamHeight}}m</view>
			</view>
			<!-- <view style="display: flex;margin-left: 60rpx;"> -->
				<!-- <view style="opacity:0.5 ;">水库巡查员:</view>
				<view
					style="font-weight: bold;position: absolute;font-size: 32rpx;margin-left: 182rpx;margin-top: 2rpx; color: #333333;">
					李丽丽</view> -->
				<!-- <view
					style="font-weight: 400;position: absolute;font-size: 38rpx;margin-left: 220rpx;color: #007AFF;border-bottom: 4rpx solid #007AFF;"
					@click="phone">
					15888888888</view> -->

			<!-- </view> -->
			<view style="display: flex;margin-left: 60rpx;">
				<image style="width: 25rpx; height: 30rpx;margin-left: 185rpx;margin-top: 10rpx;"
					src="../../static/reservoirSum/location.png"></image>
				<view @click="goMap"
					style="font-weight: 400;position: absolute;font-size: 38rpx;margin-left: 215rpx;margin-top: -5rpx; color: #007AFF;">
					查看水库位置</view>
			</view>

			<!-- 水位信息 -->
			<view>
				<view style="display: flex;margin-top: 110rpx;margin-left: 20rpx;">
					<image style="width: 37rpx;height: 37rpx;" src="../../static/reservoirSum/baseInfo.png"></image>
					<view style="display: flex; justify-content: space-between;">
						<view style="margin-left: 10rpx;margin-top: -14rpx;color: #007AFF;font-size: 40rpx;">水位水量</view>
						<view style="margin-left: 130rpx;margin-top: -3rpx;font-size: 30rpx;opacity: 0.7;">
							更新于:{{this.time}}</view>
					</view>
				</view>
				<view style="display: flex;margin-top: 25rpx;justify-content: space-around;">
					<view>
						<image style="position: relative; width: 320rpx; height: 173rpx;padding-left: 40rpx;"
							src="../../static/reservoirSum/water-level.png"></image>
						<view
							style="position: absolute;margin-left: 50rpx; margin-top: -173rpx;color: white;font-size: 40rpx;font-weight: 400;">
							36.00m</view>
						<view
							style="position: absolute;margin-left: 50rpx;margin-top: -123rpx;color: white;font-size: 30rpx;font-weight: 400;">
							当前水位</view>
						<view
							style="position: absolute;margin-left: 50rpx;margin-top: -95rpx;color: white;font-size: 30rpx;font-weight: 400;">
							—</view>
					</view>
					<view>
						<image style="position: relative; width: 320rpx; height: 173rpx;padding-right: 40rpx;"
							src="../../static/reservoirSum/reservoir-capacity.png"></image>
						<view
							style="position: absolute;margin-left: 10rpx; margin-top: -173rpx;color: white;font-size: 40rpx;font-weight: 400;">
							{{singleReservoir.totalCapacity}}万m³</view>
						<view
							style="position: absolute;margin-left: 10rpx; margin-top: -123rpx;color: white;font-size: 30rpx;font-weight: 400;">
							库容</view>
						<view
							style="position: absolute;margin-left: 10rpx; margin-top: -95rpx;color: white;font-size: 30rpx;font-weight: 400;">
							—</view>
					</view>
				</view>
				<view style="display: flex;margin-top: 40rpx;margin-left: 20rpx;">
					<image style="width: 37rpx;height: 37rpx;" src="../../static/reservoirSum/baseInfo.png"></image>
					<view style="margin-left: 10rpx;margin-top: -14rpx;color: #007AFF;font-size: 40rpx;">水库介绍</view>
				</view>
				<view style="display: flex;justify-content: center;">
					<view style="position: absolute;text-indent: 2em;padding: 10rpx 10rpx 10rpx 0rpx;width: 700rpx;" v-html="singleReservoir.reservoirSurvey">
						{{singleReservoir.reservoirSurvey}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getReservoir
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				singleReservoir: [], //单个水库信息
				reservoirList: '', //水库汇总
				id: '', //页面加载时从水库汇总页传过来的水库id
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
			}
		},
		onBackPress(options) {
		            // uni.showModal({
		            //     title: '提示',
		            //     content: '是否退出本页？',
		            //     success: function(res) {
		            //         if (res.confirm) {
		            //             uni.switchTab({
		            //             	url:'/pages/reservoirSum/reservoirSum'
		            //             })
		            //         } else if (res.cancel) {
		            //             console.log('用户点击取消');
		            //         }
		            //     }
		            // });
					uni.switchTab({
						url:'/pages/reservoirSum/reservoirSum'
					})
		            return true;
		        },
		onLoad(options) {
			this.id = JSON.parse(decodeURIComponent(options.data)).id
			console.log('传过来的id', this.id)
			setTimeout(() => {
				this.getData()
			}, 200)
		},
		
		methods: {
			getData() {
				let arr = {
					pageNo: 1,
					pageSize: 1000,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
				getReservoir(arr).then(res => {
					if (res.data.code !== 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					} else {
						this.reservoirList = res.data.result.records
						let r = this.reservoirList.filter(v => v.id == this.id)
						this.singleReservoir = r[0]
					}
				})
			},
			goMap() {
				uni.navigateTo({
					url: `/pages/workbench/monitorMap?longitude=${this.singleReservoir.longitude}&latitude=${this.singleReservoir.latitude}`
				})
			},
			goBack() {
				// uni.navigateBack({
				// 	delta:1
				// })//存在bug：退回桌面
				uni.switchTab({
					url:'/pages/reservoirSum/reservoirSum'
				})
			},
			phone() {
				uni.makePhoneCall({
					phoneNumber: '1588888888'
				});
			},
			
		}
	}
</script>

<style>
	.baseInfo::before {
		content: "";
		width: 750rpx;
		height: 320rpx;
		border-bottom: 25rpx solid #eee;
		position: absolute;
	}

	.img {
		position: relative;
		width: 750rpx;
		height: 400rpx;
	}

	

	.reservoir {}

	.reservoir-type {
		position: absolute;
		margin-top: -110rpx;
		margin-left: 130rpx;
		color: white;
		color: white;
	}

	.search {
		position: relative;
	}

	.imgCla {
		position: absolute;
		width: 100%;
		z-index: 998;
		height: 562.5rpx;
	}
</style>

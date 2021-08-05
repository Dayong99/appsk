<template>
	<view>
		<!-- 两个子元素一个靠右一个居中布局 -->
		<!-- <view style="display: flex;width: 100%;">
			<view style="margin-left: 375rpx;transform:translate(-50%);margin-top: 10rpx;font-weight: 400;
		padding-top: 17rpx;font-size: 37rpx;">水库汇总</view>
			<view style="margin-left: 170rpx;">
				<image style="width: 35rpx; height: 35rpx;margin-top: 40rpx;" src="../../static/search.png"
					@click="searchDetail"></image>
			</view>
		</view> -->
		<!-- <view style="position: relative;margin-bottom: 30rpx;">
			<view style="float: left; margin-left:375rpx;transform:translate(-50%);margin-top: 10rpx;font-weight: 400;
		padding-top: 17rpx;font-size: 37rpx;">水库汇总</view>
			<view style="margin-left: 700rpx;">
				<image style="width: 37rpx; height: 37rpx;margin-top: 30rpx;" src="../../static/search.png"
					@click="searchDetail"></image>
			</view>
		</view> -->
		<view style="position: fixed;z-index: 100;overflow: hidden;background-color: #FFFFFF;">
			<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;">
				<view class="flex mauto cwhite sw f34r" style="width: 100%;height: 153rpx;line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);">
					<view style="margin-left: 375rpx;transform: translate(-50%,0);">水库汇总</view>
					<view style="position: absolute; margin-left: 670rpx;margin-top: 5rpx;">
						<image style="width: 37rpx; height: 37rpx;" src="../../static/reservoirSum/search.png"
							@click="searchDetail"></image>
					</view>
				</view>
			</view>

			<view style="z-index: 99;width: 750rpx;">
				<view style="display: flex;margin: 30rpx 30rpx 20rpx 30rpx;">
					<view style="display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 355rpx;
					height: 200rpx;
					background: #dbefff;
					border-radius: 15rpx 0 0 15rpx;
					z-index: 100;
					margin-right: -10rpx;">
						<view style="font-weight: bold;">{{this.typeLittle}}</view>
						<view>{{"小(1)型水库"}}</view>
					</view>

					<view style="background-color: #208FE7;width: 1rpx;height: 60rpx;margin-top: 73rpx;z-index: 101;">
					</view>

					<!-- 	<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;width: 240rpx;
							height: 200rpx;
							background: #dbefff;
							">
						<view style="font-weight: bold;">{{"2"}}</view>
						<view>{{"中型水库"}}</view>
					</view>
				
					<view style="background-color: #208FE7;width: 1rpx;height: 60rpx;margin-top: 73rpx;z-index: 101;">
					</view> -->

					<view style="display: flex;
					    align-items: center;
					    flex-direction: column;
					　　justify-content:center;
						width: 355rpx;
						height: 200rpx;
						background: #dbefff;
						border-radius:0 15rpx 15rpx 0;
						z-index: 100;
						margin-left: -10rpx;">
						<view style="font-weight: bold;">{{this.typeBig}}</view>
						<view>{{"小(2)型水库"}}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 水库 -->
		<mescroll-uni @init="mescrollInit" @up="upCallback" @down="downCallback" :up="upOption" :down="down"
			:fixed="true" :top="400">
			<view style="margin-left: 10rpx; display: flex; border-bottom: 1rpx solid #f3f3f3;" @click="toDetail(item)"
				v-for="(item,index) in reservoirList" :key="index">
				<image :src="item.renderings ? item.renderings : ''"
					style="padding: 10rpx;width: 220rpx;height: 170rpx;position: relative;">
				</image>
				<image style="width:100rpx;height: 40rpx;position: absolute;margin-left: 10rpx;margin-top: 10rpx;"
					src="../../static/reservoirSum/normal.png"></image>
				<view style="display: flex;flex-direction: column;justify-content: space-around;margin-left: 10rpx;">
					<view style="display: flex;align-items: center;">
						<view style="padding-right:15rpx;font-size: 36rpx;font-weight: bold;margin-top: 10rpx;">
							{{item.reservoirName}}
						</view>
						<view>|</view>
						<view style="padding-left: 15rpx;margin-top: 6rpx;opacity: 0.6;">{{item.township}}</view>
					</view>
					<view style="opacity: 0.6;">
						<view>类型：{{item.reservoirType_dictText}}</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		getReservoir //水库汇总列表
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				typeLittle: 0,
				typeBig: 0,
				reservoirAll: [], //所有水库信息
				searchType: 'reservoirDetail',
				reservoirSumItem: '',
				mescroll: {},
				upOption: {
					textNoMore: '到底儿了 >_<',
					use: true,
					auto: false, //默认开始不执行上拉
				},
				down: {
					use: true,
					auto: true //默认开始不执行下拉
				},
				isShowNoMore: '',
				list: {},
				pageNo: 1,
				pageSize: 10,
				current: '',
				pages: '',
				reservoirList: [], //水库汇总列表
			}
		},
		onLoad() {

		},
		methods: {
			// 获取所有水库信息
			getAllReservoir() {
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
						this.reservoirAll = res.data.result.records;
						this.typeLittle = 0
						this.typeBig = 0
						for (let i = 0; i < this.reservoirAll.length; i++) {
							if (this.reservoirAll[i].reservoirType_dictText == "小(1)型") {
								this.typeLittle++
							}
						}
						for (let i = 0; i < this.reservoirAll.length; i++) {
							if (this.reservoirAll[i].reservoirType_dictText == "小(2)型") {
								this.typeBig++
							}
						}
					}
				})
			},
			// 获取水库汇总第一页信息
			mescrollInit(mescroll) {
				this.getAllReservoir()
				this.mescroll = mescroll;
			},
			// 下拉刷新的回调
			downCallback(mescroll) {
				/**
				 * 重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 然后触发upCallback方法 )
				 *  mescroll.resetUpScroll()
				 * 这里是不能用这个方法的，因为不能调upCallback方法，upCallback方法是用来加载下一页的。
				 * 所以只能用mescrollInit方法
				 */
				mescroll.resetUpScroll()
			},
			// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				getReservoir({
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}).then(atteRes => {
					if (mescroll.num == 1) {
						this.reservoirList = atteRes.data.result.records
					} else {
						this.reservoirList = this.reservoirList.concat(atteRes.data.result.records)
					}
					console.log('atteRes', atteRes.data.result.records.length, mescroll.size)
					mescroll.endSuccess(atteRes.data.result.records.length, atteRes.data.result.records.length >=
						mescroll.size);
					// mescroll.endBySize(atteRes.data.result.records.length, atteRes.data.result.total);
				}).catch(() => {
					mescroll.endErr();
				})
			},
			// 搜索
			searchDetail() {
				uni.navigateTo({
					/*一定要写绝对路径，这样在浏览器上和手机上才能都能跳转，
					如果写相对路径，手机端是不能跳转的*/
					url: `/pages/reservoirSum/search?data=${this.searchType}`
				})
			},
			toDetail(item) {
				let data = {
					id: item.id, //水库id
				}
				uni.redirectTo({
					url: `/pages/reservoirSum/detail?data=${encodeURIComponent(JSON.stringify(data))}`
				})

			}
		}
	}
</script>

<style>
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

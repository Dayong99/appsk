<template>
	<!-- 搜索框 -->
	<view>
		<view style="position: fixed;z-index: 100;width: 750rpx;">
			<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;">
				<view class="head flex mauto cwhite sw f34r">
					<view class="boximgs mt8r" style="margin-top: 20rpx;margin-left: 10rpx;" @tap="goback">
						<image src="../../static/fanhui1.png" class="hw100v"></image>
					</view>
					<!-- 搜索图标和输入框 -->
					<view style="width: 67%;padding-left: 30rpx;margin-top: 25rpx; fcenter">
						<!-- <image src="../../static/reservoirSum/search.png" style="width: 36rpx; height: 36rpx;background-color: #eee;border-radius: 5rpx 0 0 5rpx;
					padding: 15rpx 0rpx 19rpx 12rpx; border-radius: 15rpx 0 0 15rpx;"></image> -->
						<!-- focus="true"手机端进入默认弹出键盘 -->
						<input style="background-color: #eee;text-indent:20rpx; color: #000000;width: 540rpx;border-radius: 0 5rpx 5rpx 0;
			margin-top: 50rpx;padding: 12rpx 0 12rpx 0; border-radius:10rpx;" v-model="inputValue" @confirm="search" @blur="search" confirm-type="search"
							placeholder-class="icon iconfont icon-bianji1" :placeholder="icon" type="text" />
					</view>
					<view style="position: absolute;padding: 0 20rpx 0 10rpx; margin-left: 640rpx;margin-top: 10rpx;"
						@click="search">搜索</view>
				</view>
			</view>

			<!-- 搜索结果 -->
			<view style="z-index: 99;width: 750rpx;background-color: #FFFFFF;">
				<view
					style="display: flex;align-items: center;justify-content: space-between;
					box-sizing: border-box;">
					<view class="searchHis">
						<view style="margin-left: 30rpx;">搜索结果</view>
						<image src="../../static/reservoirSum/delect.png"
							style="width: 30rpx; height: 30rpx;margin: 10rpx 0rpx 10rpx 520rpx;" @click="empty" ></image>
					</view>
				</view>
			</view>
		</view>
		<view style="padding-top: 240rpx; width: 750rpx;display: flot;flex-wrap: wrap;z-index: 99;">
			<view v-for="(item, index) in searchHistoryList" :key="index">
				<view style="height: 60rpx;border-bottom: 1rpx solid #eeeeee;padding-top: 20rpx; padding-left: 30rpx;width: 750rpx;" 
				@click="nextPage(item)">{{ item }}</view>
			</view>
		</view>

	</view>
	</view>

</template>

<script>
	import {
		getReservoir //水库汇总列表
	} from "@/api/AlbumServer.js"
	export default {
		data() {
			return {
				reservoirId: '',
				reservoirInfo: [], //所有水库信息
				icon: '请输入水库名称',
				inputValue: '', //搜索框输入字符串
				keywords: [], //搜索项
				searchHistoryList: [], //所有关键字&搜索历史记录
			};
		},
		onLoad(options) {
			this.searchType = options.data
			console.log('从水库保养地图页跳转到搜索页this.searchType ', this.searchType)
			let list = uni.getStorage({
				key: 'searchList'
			});
			// console.log(list[1].data);
			// if (list[1].data) {
			// 	this.searchHistoryList = JSON.parse(list[1].data);
			// }
			this.reservoirName()
		},
		methods: {
			// 获取所有水库名称
			reservoirName() {
				let arr = {
					pageNo: 1,
					pageSize: 1000,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}
				// 水库汇总数据
				getReservoir(arr).then(res => {
					if (res.data.code !== 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					} else {
						this.reservoirInfo = res.data.result.records // 所有水库信息
						for (let i = 0; i < this.reservoirInfo.length; i++) {
							this.keywords.push(this.reservoirInfo[i].reservoirName)
						}
					}
				})
			},
			nextPage(item){
				console.log('nextPagee',item)
					if (this.searchType == 'location') {
						console.log('跳转到水库保养地图页', this.searchType)
						console.log('搜索框输入的文本', item)
						this.reservoirInfo.find((v) => {
							if (v.reservoirName == item)
								this.longitude = v.longitude,
								this.latitude = v.latitude
						})
						uni.navigateTo({
							url: `/pages/workbench/reservoirRepair?longitude=${this.longitude}&latitude=${this.latitude}`
						})
					} else if (this.searchType == 'searchPolling') {
						console.log('跳转到云巡检地图页', this.searchType)
						console.log('搜索框输入的文本', item)
						this.reservoirInfo.find((v) => {
							if (v.reservoirName == item)
								this.longitude = v.longitude,
								this.latitude = v.latitude
						})
						uni.navigateTo({
							url: `/pages/workbench/cloudPolling?longitude=${this.longitude}&latitude=${this.latitude}`
						})
					} else if (this.searchType == 'reservoirDetail') {
						this.reservoirInfo.find((v) => {
							if (v.reservoirName == item)
								this.reservoirId = v.id
						})
						let data = {
							id: this.reservoirId, //水库id
						}
						uni.navigateTo({
							url: `/pages/reservoirSum/detail?data=${encodeURIComponent(JSON.stringify(data))}`
						})
					} else {
						uni.navigateTo({
							url: "/pages/reservoirSum/detail",
						})
					}
			},
			goback() {
				uni.navigateBack()
				//清空历史记录
				uni.removeStorage({
					key: 'searchList'
				});
				this.searchHistoryList = [];
			},
			onNavigationBarButtonTap(e) {
				console.log(JSON.stringify(e))
				console.log("llllll")
			},
			search() {
				if (this.inputValue === '') {
					uni.showModal({
						title: '内容不能为空'
					});
				} 
				else {
					this.searchHistoryList = []
					for(let i = 0;i<this.keywords.length;i++){
						if(this.keywords[i].indexOf(this.inputValue)>=0){
							console.log('this.keywords[i]',this.keywords[i])
							this.searchHistoryList.push(this.keywords[i])
						}
					}
					// console.log('this.searchHistoryList',this.searchHistoryList)
					// if (this.searchHistoryList.length = 0){
					// 	uni.showToast({
					// 				title: '没有找到'
					// 			});
					// }
				// else {
				// 	/*
				// 	如果搜索内容不为空并且在searchHistoryList里找不到相同的内容（也就是搜索内容是新的），
				// 	则将搜索内容放入uni.setStoraged的第一位
				// 	*/
				// 	// 如果输入内容不符合关键字（绝对搜索）则返回没有找到,并且将搜索记录放在最前
				// 	if (!this.keywords.includes(this.inputValue)) {
				// 		uni.showToast({
				// 			title: '没有找到'
				// 		});
				// 		this.searchHistoryList.unshift(this.inputValue);
				// 		uni.setStorage({
				// 			key: 'searchList',
				// 			data: JSON.stringify(this.searchHistoryList)
				// 		});
				// 	} else {
				// 		//如果有搜索记录符合关键字，则删除之前的旧记录，
				// 		//将新的搜索记录重新push到搜索历史记录数组首位，并跳转详情页
				// 		let i = this.keywords.indexOf(this.inputValue);
				// 		this.searchHistoryList.splice(i, 1);
				// 		this.searchHistoryList.unshift(this.inputValue);
				// 		uni.hideKeyboard()
						
					// 	if (this.searchType == 'location') {
					// 		console.log('跳转到水库保养地图页', this.searchType)
					// 		console.log('搜索框输入的文本', this.inputValue)
					// 		this.reservoirInfo.find((v) => {
					// 			if (v.reservoirName == this.inputValue)
					// 				this.longitude = v.longitude,
					// 				this.latitude = v.latitude
					// 		})
					// 		uni.navigateTo({
					// 			url: `/pages/workbench/reservoirRepair?longitude=${this.longitude}&latitude=${this.latitude}`
					// 		})
					// 	} else if (this.searchType == 'searchPolling') {
					// 		console.log('跳转到云巡检地图页', this.searchType)
					// 		console.log('搜索框输入的文本', this.inputValue)
					// 		this.reservoirInfo.find((v) => {
					// 			if (v.reservoirName == this.inputValue)
					// 				this.longitude = v.longitude,
					// 				this.latitude = v.latitude
					// 		})
					// 		uni.navigateTo({
					// 			url: `/pages/workbench/cloudPolling?longitude=${this.longitude}&latitude=${this.latitude}`
					// 		})
					// 	} else if (this.searchType == 'reservoirDetail') {
					// 		this.reservoirInfo.find((v) => {
					// 			if (v.reservoirName == this.inputValue)
					// 				this.reservoirId = v.id
					// 		})
					// 		let data = {
					// 			id: this.reservoirId, //水库id
					// 		}
					// 		uni.navigateTo({
					// 			url: `/pages/reservoirSum/detail?data=${encodeURIComponent(JSON.stringify(data))}`
					// 		})
					// 	} else {
					// 		uni.navigateTo({
					// 			url: "/pages/reservoirSum/detail",
					// 		})
					// 	}
					// }

				}
				
				
			},
			//清空历史记录
			empty() {
				uni.showToast({
					title: '已清空'
				});
				uni.removeStorage({
					key: 'searchList'
				});

				this.searchHistoryList = [];
			}
		},

	};
</script>

<style>
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

	.page {
		background-color: white;
	}

	.search {
		width: 100%;
		height: 50rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		margin: 8rpx 5rpx 8rpx 0rpx;
		padding-top: 45rpx;
	}



	.searchHis {
		display: flex;
		width: 100%;
		margin: 20rpx 5rpx 8rpx 0rpx;
		background-color: #eee;
		padding: 10rpx 0;
	}
</style>

<template>
	<!-- 搜索框 -->
	<view>
		<view style="position: fixed;z-index: 100;width: 750rpx;">
			<view style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;">
				<view class="head flex mauto cwhite sw f34r">
					<view class="boximgs mt8r" @tap="goback">
						<image src="../../static/fanhui1.png" class="hw100v"></image>
					</view>
					<!-- 搜索图标和输入框 -->
					<view style="width: 67%;
			padding-left: 30rpx;margin-top: 25rpx; fcenter">
						<!-- <image src="../../static/reservoirSum/search.png" style="width: 36rpx; height: 36rpx;background-color: #eee;border-radius: 5rpx 0 0 5rpx;
					padding: 15rpx 0rpx 19rpx 12rpx; border-radius: 15rpx 0 0 15rpx;"></image> -->
						<!-- focus="true"手机端进入默认弹出键盘 -->
						<input style="background-color: #eee;color: #000000;
			width: 550rpx;
			border-radius: 0 5rpx 5rpx 0;
			margin-top: 40rpx;
			padding: 12rpx 0 12rpx 0; border-radius:10rpx;" v-model="inputValue" @confirm="search" confirm-type="search"
							placeholder-class="icon iconfont icon-bianji1" :placeholder="icon" type="text" />
					</view>
					<view style="position: absolute;padding: 0 20rpx 0 10rpx; margin-left: 640rpx;margin-top: 5rpx;"
						@click="search">搜索</view>
				</view>
			</view>

			<!-- 搜索记录 -->
			<view style="z-index: 99;width: 100%;background-color: #FFFFFF;">
				<view
					style="display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0px 5px;">
					<view class="searchHis">
						<view>搜索记录</view>
						<image src="../../static/reservoirSum/delect.png"
							style="width: 30rpx; height: 30rpx;margin: 10rpx 0rpx 10rpx 540rpx;" @click="empty"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 260rpx 0 0 10rpx; width: 100%;
		display: flot;
		flex-wrap: wrap;z-index: 99;">
			<view v-for="(item, index) in searchHistoryList" :key="index">
				<text>{{ item }}</text>
			</view>
		</view>

	</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				icon: '请输入搜索内容',
				inputValue: '',
				keywords: [
					"a", "s", "d"
				],
				searchHistoryList: [

				] //所有关键字&搜索历史记录
			};
		},
		onLoad() {
			let list = uni.getStorage({
				key: 'searchList'
			});
			// console.log(list[1].data);
			// if (list[1].data) {
			// 	this.searchHistoryList = JSON.parse(list[1].data);
			// }
		},
		methods: {
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
				} else {
					/*
					如果搜索内容不为空并且在searchHistoryList里找不到相同的内容（也就是搜索内容是新的），
					则将搜索内容放入uni.setStoraged的第一位
					*/
					// 如果输入内容不符合关键字（绝对搜索）则返回没有找到搜索,并且将搜索记录放在最前
					if (!this.keywords.includes(this.inputValue)) {
						uni.showToast({
							title: '没有找到'
						});
						this.searchHistoryList.unshift(this.inputValue);
						uni.setStorage({
							key: 'searchList',
							data: JSON.stringify(this.searchHistoryList)
						});
					} else {
						//如果有搜索记录符合关键字，则删除之前的旧记录，
						//将新的搜索记录重新push到数组首位，并跳转详情页
						let i = this.keywords.indexOf(this.inputValue);
						this.searchHistoryList.splice(i, 1);
						this.searchHistoryList.unshift(this.inputValue);
						// uni.showToast({
						// 	title: '不能重复搜索'
						// });
						// uni.setStorage({
						// 	key: 'searchList',
						// 	data: JSON.stringify(this.searchHistoryList)
						// });
						uni.hideKeyboard()
						uni.navigateTo({
							url: "/pages/workbench/goVideo",
						})
					}

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

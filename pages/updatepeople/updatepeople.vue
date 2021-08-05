<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r" style="width: 750rpx;">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">{{name}}</view>
		</view>
		<view>
			<treeList :treeData="treeData" v-on:parentClick="parentClick"></treeList>
		</view>
	</view>
</template>
<script>
	import treeList from '@/components/treeList/treeList.vue'
	import {
		personTree
	} from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				treeData: {
					title: '请选择',
					id: 0,
					children: []

				},
				name: '人员列表'
			}
		},
		computed: {

		},
		components: {
			treeList
		},
		onLoad(options) {
			console.log(options)
			if (options.name) {
				this.name = options.name
				this.treeData.title = '选择' + options.name
			}
			this.initTree();
		},
		methods: {
			/// 跳转打开新窗口
			fnOpenWin(type) {
				uni.navigateTo({
					url: `/pages/news/${type}/${type}`
				})
			},
			goback() {
				uni.navigateBack()
			},
			parentClick: function(val) {
				console.log(val)
				let pages = uni.getCurrentPages();
				let prev = pages[pages.length - 1];
				prev.$vm.serios = item;
				uni.navigateBack({
					delta: 1
				});
			},
			initTree() {
				let data = {
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					hasPerson: 1
				}
				personTree().then(res => {
					if (res.status == 200) {
						this.treeData.children = res.data.result
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
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
		width: 70%;
		padding-left: 80rpx;
	}

	/* 样式 */
	.editpent {
		background: #fff;
		width: 100%;
	}

	.editpent .inputsq {
		border-bottom: 1px solid #E6E6E6;
		width: 573rpx;
		padding-bottom: 21rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #B6C2CE;
	}

	.itemedit {
		height: 124rpx;
		line-height: 146rpx;
		width: 100%;
	}

	.itemedit .a1 {
		width: 177rpx;
		padding-left: 32rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}

	.persons {
		margin-top: 10rpx;
		width: 83rpx;
		height: 83rpx;
		/* position: absolute;
		top:20rpx;
		left: 190rpx; */
	}

	.itemedit text {
		height: 1rpx;
		width: 573rpx;
		background: #D9E2E9;
		margin-top: 125rpx;
	}
</style>

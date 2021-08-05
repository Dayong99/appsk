<template>
	<view class="page">
		<app-head :title="title" @back="goBack"></app-head>
		<view class="blue"></view>
		<view class="page_cont">
			<view class="page_head">
				<text class="title">压力机试验</text>
				<image></image>
			</view>
			
			<view class="data">试验数据信息</view>
			
			<view class="cont_item" @click="toList">
				<view class="info">
					<text class="title">已完成试验:</text>
					<text class="data">{{doneAmount}}</text>
				</view>
				<image></image>
			</view>


			
		</view>
	</view>
</template>

<script>
	import appHead from '@/components/appHead/appHead'
	import { countEndFlag } from '@/api/AlbumServer.js'
	export default {
		data() {
			return {
				title: "压力机",
				doneAmount: null
			}
		},
		components: {
			appHead
		},
		onLoad(option) {
			this.getCountEndFlag();
		},
		onShow() {
			
		},
		methods: {
			goBack() {
				uni.navigateBack();
			},
			getCountEndFlag() {
				countEndFlag({
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds
				}).then(res => {
					if(res.data.code == 200 && res.data.result.yes != null) {
						this.doneAmount = res.data.result.yes;
					}
					
				})
			},
			toList() {
				uni.navigateTo({
				  url: '/pages/experimentList/experimentList'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page{
		position: absolute;
		top: 0; bottom: 0; left: 0; right: 0;
		background: #E8E8E8;
		overflow: hidden;
		.blue{
			height: 80upx;
			background: #235FED;
		}
		.page_cont{
			height: 100%;
			background: #fff;
			margin: 0 16upx;
			margin-top: -40upx;
			border-top-left-radius: 16upx;
			border-top-right-radius: 16upx;
			padding: 0 24upx;
		}
		.page_head{
			padding-top: 34upx;
			.title{
				color: #181616;
				font-size: 33upx;
				font-weight: 800;
			}
			image{
				margin-top: 34upx;
				margin-bottom: 62upx;
				height: 316upx;
				background: url(../../static/punch/punchBanner.png) no-repeat;
				background-size: cover;
				width: 100%;
			}
		}
		.data{
			font-weight: 800;
			font-size: 33upx;
			margin-bottom: 42upx;
		}
		.cont_item{
			color: #fff;
			height: 175upx;
			background: #4D96FF;
			border-radius: 14upx;
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 32upx;
			image{
				width: 40upx; height: 40upx; background: pink;
			}

			.info{
				 line-height: 87upx;
				.title{font-size: 33upx; margin-right: 34upx; line-height: 87upx;}
				.data{font-size: 56upx; line-height: 87upx;}
			}
		}
		
	}
</style>

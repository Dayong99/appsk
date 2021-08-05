<template>
	<view>
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @click="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">{{name}}</view>
		</view>
		<view class="cont-title">  
			<view class="titlt-all">{{lists.title}}</view>
		</view>
		<view class="tit-bor"></view>
		<view class="conct-all-lists" v-html="lists.content">
			
		</view>
	</view>
</template>

<script>
	import {getAppDetail} from '@/api/AlbumServer.js'
	export default {
		data(){
			return {
				name: "石岭河水库",
				id:'',
				lists:{}
			}
		},
		onLoad(item) {
			this.name = item.name
			this.id = item.id
		},
		onShow() {
			this.getAppDetailLists(this.id)
		},
		methods:{
			goback() {
				uni.navigateBack()
			},
			getAppDetailLists(arr){
				let _that = this
				getAppDetail(arr).then(res => {
					if(res.data.code === 200) {
						_that.lists = res.data.result[0] 
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		position: fixed;
		z-index: 999;
		background-color: #208FE7;
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
	.cont-title {
		padding: 33rpx 33rpx;
		.titlt-all {
			font-family: PingFang-SC-Heavy;
			font-weight: Heavy;
			color: #181616;
			font-size: 42rpx;
			line-height: 70rpx;
			text-align: center;
			
		}
	}
	.tit-bor {
		border-bottom: 1rpx solid #EEEEEE;
	}
	.conct-all-lists {
		padding: 40rpx 56rpx 40rpx 49rpx;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 33rpx;
		color: #181616;
		line-height: 70rpx;
		// text-align: center;
		// display: table-cell;
		// vertical-align: middle;
		
	}
	/deep/image {
		 width: 100%;
		 height: 100%;
	}
	/deep/img {
		width: 100%;
		height: 100%;
	}
</style>

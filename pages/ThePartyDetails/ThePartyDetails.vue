<template>
	<view class="cont">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">{{title}}详情</view>
		</view>
		<view class="delck-conct">
			<view class="cont-The-title">
				{{lists.title}}
			</view>
			<view class="cont-time-all">
				<text>上传时间：{{lists.createTime}}</text>
				<text>上传人：{{lists.remarks}}</text>
			</view>
		</view>
		<view class="bor-conct"></view>
		<view class="conct-all-lists" v-html="lists.content">
		</view>
	</view>
</template>

<script>
	import {getQueryById,VrActivity} from '@/api/AlbumServer.js'
	export default {
		data(){
			return {
				title:'党建',
				index:1,  //1是党建，2是文章
				lists:{}
			}
		},
		onLoad(option) {
			this.index = option.index
			if(option.index === '1') {
				this.title = '党建'
				this.VrActivityList(option.id)
			}else {
				this.title = '文章'
				this.getQueryByIdLists(option.id)
			}
		},
		methods:{
			//查询党团详情
			VrActivityList(arr){
				let _that = this
				VrActivity(arr).then(res => {
					if(res.data.code === 200){
						_that.lists = res.data.result
					}
				})
			},
			// 查询文章详情
			getQueryByIdLists(arr){
				let _that = this
				getQueryById(arr).then(res => {
					if(res.data.code === 200){
						_that.lists = res.data.result
					}
				})
			},
			//返回
			goback(){
				uni.navigateBack()
			},
		}
	}
</script>

<style scoped lang="less">
	.cont {
		overflow: hidden;
		white-space: normal;
		word-break: break-all;
		}
	.head {
		width: 100%;
		height: 153rpx;
		position: fixed;
		z-index: 999;
		line-height: 193rpx;
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
	.delck-conct {
		margin-top: 160rpx;
		padding:35rpx 33rpx 0rpx 33rpx ;
		.cont-The-title{
			font-family: PingFang-SC-Heavy;
			font-weight: Heavy;
			color: #181616;
			font-size: 42rpx;
			line-height: 70rpx;
		}
		.cont-time-all {
			display: flex;
			font-family: PingFang-SC-Medium;
			font-weight: Medium;
			color: #666666;
			font-size: 25rpx;
			margin-top: 34rpx;
			justify-content: space-between;
			
			margin-bottom: 19rpx;
		}
	}
	.bor-conct {
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

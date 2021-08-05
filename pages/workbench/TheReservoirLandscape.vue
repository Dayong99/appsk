<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
		<!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @click="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">水库风光</view>
		</view>
		<view class="content">
			<template v-if="showTrue">
			  <waterfallsFlow :list="lists"  @wapper-lick="DetailsTheReservoir" imageSrcKey="coverPic">
			    <template v-slot:default="item">
			            <view class="cnt">
			              <view class="title">{{item.reservoirId_dictText}}</view>
			              <!-- <view class="text">{{666666}}</view> -->
			            </view>
			    </template>
			  </waterfallsFlow>
			</template>
			<view v-else  class="show-title">
				<image src="../../static/emptys.png"></image>
				<view class="show-cont">暂无水库图片</view>
			</view>
		</view>
		<!-- <view class="image-alls">
		<view class="imagt-TOP">
			<image src="../../static/banner.png"></image>
			<text class="imagt-fl">5555</text>
		</view>
		<view class="imagt-TOP">
			<image src="../../static/banner.png"></image>
			<text class="imagt-fl">5555</text>
		</view>
	</view> -->
	</view>
</template>
<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
	import {getReservoirScene} from '@/api/AlbumServer.js'
	export default {
		 components: { waterfallsFlow },
		data() {
			return {
				document: [],
				number: '',
				showTrue: true,
				lists: [],
			}
		},
		computed: {

		},
		onLoad() {},
		onShow() {
			this.getReservoirSceneLists()
		},
		methods: {
			getReservoirSceneLists(){
				let arr = {
					pageNo:1,
					pageSize:10,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					column: 'shortTime',
					order: 'desc',
				}
				let _that = this
				getReservoirScene().then(res =>{
					if(res.data.code === 200) {
						_that.lists = res.data.result.records
						if(!_that.lists) return _that.showTrue = false
					}
				})
			},
			goback() {
				uni.switchTab({
					url: '/pages/workbench/workbench'
				})
			},
			DetailsTheReservoir(item){
			  uni.navigateTo({
			    url: `/pages/ViewTheDetails/ViewTheDetails?name=${item.reservoirId_dictText}&id=${item.id}`
				})
			}
		}
	}
</script>

<style scoped lang="less">
	page {
		background: #fff;
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

	.image-alls {
		padding: 26rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.imagt-TOP {
		/* flex: 50%; */
		width: 100%;
		position: relative;
	}

	.imagt-fl {
		width: 322rpx;
		height: 40rpx;
		line-height: 40rpx;
		position: absolute;
		background-image: linear-gradient(to right, #000000FF, #00000000);
		left: 0;
		bottom: 10rpx;
		padding-left: 12rpx;
		font-weight: Medium;
		font-family: PingFang-SC-Medium;
		font-size: 20rpx;
		color: #FFFFFFFF;
	}


	.content {
	  padding: 20rpx;
	  .cnt {
	    // padding: 20rpx;
		width: 100%;
		height: 35rpx;
		line-height: 35rpx;
		padding-left: 13rpx;
		position: absolute;
		bottom: 0rpx;
		background: linear-gradient(90deg, #000000, rgba(0, 0, 0, 0));
		color: #FFFFFF;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 21rpx;
		opacity: 0.8;
	  }
	}
	.show-title {
		margin-top: 156rpx;
		text-align: center;
		.show-cont {
			margin-top: 22rpx;
			font-family: PingFang-SC-Medium;
			font-weight: Medium;
			color: #999999;
			font-size: 28rpx;
		}
	}
</style>

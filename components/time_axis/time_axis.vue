<template>
	<view class="content" >
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="text-area">
			<view class="arr-lists" v-for="item in listTo" :key="item.id" @click="reExamined(item)">
					<view>
						<image :src="item.picUrl"></image>
					</view>
					<view class="list-left">
						<view class="left-lis">
							<text class="butt" :class="{buttFis:item.checkState==1,butt2:item.checkState==2}">{{item.checkState_dictText}} </text>
							<text>{{item.eventMonitorId_dictText | dictTextFilt }}</text>
						</view>
						<view class="left-lis">
							<text class="coc-lis">关联设备:&nbsp;{{item.reservoirId_dictText}}</text>
						</view class="left-lis">
						<view class="left-lis-co">{{item.shortTime}}</view>

					</view>
					<view class="re-examined" v-if="item.checkState==='0'">
						审核
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['listTo'],
		// props: {
		// 	// listTO
		// 	listTo:{
		// 	        type:Object
		// 	        }
		// },
		data() {
			return {
				listTwo:{},
				showTo:false
			}
		},
		filters:{
			dictTextFilt(data){
				if (data.length < 6) return data
				let arr = data.slice(0,6)
				return  arr + '...'
			}
		},
		mounted(){
			
			// // console.log(222)
			// console.log('555',this.listTo)
		},
		methods: {
			
			reExamined(item){
				let textObj = encodeURIComponent(JSON.stringify(item))
				uni.navigateTo({
					url: '/pages/workbench/AIDetail?textObj='+ textObj
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.bgc1 {
		background-color: #32C54E;
	}
	.bgc2 {
		background-color: #C5C7CA;
	}
	.text-area {

		.arr-lists {
			padding: 36rpx 28rpx 0 28rpx;
			height: 180rpx;
			display: flex;
			border-bottom: 1rpx solid #EEEEEE;
			// position: absolute;
			image {
				width: 200rpx;
				height: 144rpx;
			}
			.re-examined {
				top: 56rpx;
				width: 122rpx;
				height: 60rpx;
				color: #FFFFFF;
				background-color: #208FE7;
				line-height: 60rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
				text-align: center;
			}
			.list-left {
				margin-left: 22rpx;
				font-weight: Medium;
				font-family: PingFang-SC-Medium;
				font-size: 28rpx;
				width: 354rpx;
				.left-lis {
					height: 50rpx;
					line-height: 50rpx;
					margin-bottom: 4rpx;
					.butt {
						width: 98rpx;
						height: 40rpx;
						line-height: 36rpx;
						text-align: center;
						background-color: #20BDF1;
						display: inline-block;
						color: #FEF6EB;
						border-radius: 18rpx;
						font-size: 22rpx;
						margin-right: 16rpx;
					}
					.buttFis{
						background-color: #32C54E;
					}
					.butt2 {
						background-color: #C5C7CA;
					}
					.coc-lis {
						color: #666666;
					}


				}
				.left-lis-co{
					color: #999999;
				}
			}
		}
		.arr-lists:last-child {
			border-bottom: 0rpx;
		}
	}
</style>


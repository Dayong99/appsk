<template>
	<view >
		<view class="Group-activities" v-for="(item,index) in VrActivityLists" :key="index" @click="PartyDetails(item)">
			<image class="Group-activities-img" :src="item.pic | filtList "></image>
			<!-- <image class="Group-activities-img" src="../../static/my/item1-3.png"></image> -->
			<view style="line-height: 50rpx; width: 431rpx;">
				<view class="Group-activities-tit">{{item.title | filtTitle}}</view>
				<view class="Group-activities-tim">	
					<text>创建时间：</text>
					<text>{{item.createTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['VrActivityLists'],
		data(){
			return {
				
			}
		},
		filters:{
			//筛选图片
			filtList(value){
				// console.log(value.split(','))
				// value.split(',')
				return value.split(',')[0]
			},
			filtTitle(data){
				if (data.length <26) return data 
				return data.slice(0,26) + '...'
			}
		},
		mounted() {
			// console.log('88888',this.VrActivityLists)
		},
		methods:{
			PartyDetails(item){
				this.$emit('PartyDetails',item)
			}
		}
	}
</script>

<style>
	.Group-activities {
		display: flex;
		padding: 30rpx 30rpx;
		border-bottom: 1rpx solid #EAE7E7;
	},
	.Group-activities-img {
		width: 212rpx;
		height: 152rpx;
		margin-right: 26rpx;
	}
	.Group-activities-tit {
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		color: #333333;
		font-size: 31rpx;
		height: 100rpx;
		overflow: hidden;
	}
	.Group-activities-tim {
		font-size: 26rpx;
		color: #A5A4AB;
	}
</style>

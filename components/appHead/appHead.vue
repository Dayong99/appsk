<template>
	<view>
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			title: {
				type: String,
				default: "埃欧哲"
			}
		},
		methods: {
			goback() {
				this.$emit('back')
			}
		}
	}
</script>

<style>
	.head{
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}
	.safe{
		  width: 70%;
		  padding-left:80rpx;
	}
</style>

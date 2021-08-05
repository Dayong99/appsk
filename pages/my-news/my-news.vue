<template>
	<view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">

		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">个人信息</view>

		</view>
		<!-- <view class="editpent">
  		<view class="flex itemedit posir">
  			<view class="a1">头像</view>
			<image src="../../static/touxiang.png" mode="" class="persons" @tap="previewImg(srcIMG)"></image>
  			<text class=""></text>
  		</view>
  		<view class="flex itemedit">
  			<view class="a1">姓名</view>
  			<view class="inputsq">{{newsTotalData.personName?newsTotalData.personName:newsTotalData.realname}}</view>
  		</view>
  		<view class="flex itemedit">
  			<view class="a1">年龄</view>
  			<view class="inputsq">{{newsTotalData.age?newsTotalData.age:agesuser}}</view>
  		</view>
  		<view class="flex itemedit" v-if="newsTotalData.workName">
  			<view class="a1">班组</view>
  			<view class="inputsq">{{newsTotalData.workName}}</view>
  		</view>
		<view class="flex itemedit" v-if="newsTotalData.email">
			<view class="a1">邮箱</view>
			<view class="inputsq">{{newsTotalData.email}}</view>
		</view>
		<view class="flex itemedit">
			<view class="a1">身份证</view>
			<view class="inputsq">{{newsTotalData.idNumber?newsTotalData.idNumber:''}}</view>
		</view>
		<view class="flex itemedit">
			<view class="a1">手机</view>
			<view class="inputsq">{{newsTotalData.phone?newsTotalData.phone:''}}</view>
		</view>
  	</view> -->
		<view class="wagdetail">
			<view class="flex listwag">
				<view>头像</view>
				<view></view>
				<view>
					<image src="../../static/avatar.png" mode="" class="persons" @tap="previewImg(srcIMG)"></image>
				</view>
			</view>
			<view class="flex listwag">
				<view>姓名</view>
				<view></view>
				<view>
					{{this.$store.getters['user/getAccountInfoData'].username?this.$store.getters['user/getAccountInfoData'].username:this.$store.getters['user/getAccountInfoData'].personName}}
				</view>
			</view>
			<view class="flex listwag">
				<view>年龄</view>
				<view></view>
				<view>{{newsTotalData.age?newsTotalData.age:agesuser}}</view>
			</view>
			<view class="flex listwag" v-if="newsTotalData.workName">
				<view>班组</view>
				<view></view>
				<view>{{newsTotalData.workName}}</view>
			</view>
			<view class="flex listwag" v-if="newsTotalData.email">
				<view>邮箱</view>
				<view></view>
				<view>{{newsTotalData.email}}</view>
			</view>
			<view class="flex listwag">
				<view>身份证</view>
				<view></view>
				<view>{{newsTotalData.idNumber?newsTotalData.idNumber:''}}</view>
			</view>
			<view class="flex listwag">
				<view>手机</view>
				<view></view>
				<view>
					{{this.$store.getters['user/getAccountInfoData'].phone?this.$store.getters['user/getAccountInfoData'].phone:''}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		computed: {
			newsTotalData() {
				return this.$store.getters['user/getAccountInfoData']
			},
			srcIMG() {
				return this.$store.state.baseUrl + "/sys/common/static/" + this.$store.getters['user/getAccountInfoData']
					.headPic
			},
			agesuser() {
				if (this.$store.getters['user/getAccountInfoData'].age) {
					return this.$store.getters['user/getAccountInfoData'].age
				}
				if (this.$store.getters['user/getAccountInfoData'].birthday) {
					return (new Date).getFullYear() - this.$store.getters['user/getAccountInfoData'].birthday.split('-')[0]
				}

			}
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
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
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

	/* 新增 */
	.wagdetail {}

	.wagdetail .listwag {
		height: 110rpx;
		line-height: 110rpx;
		border-bottom: 1rpx solid #EAE7E7;
	}

	.wagdetail .listwag view:nth-child(1) {
		margin-left: 49rpx;
		margin-right: 19rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
		width: 125rpx;
	}

	.wagdetail .listwag view:nth-child(2) {
		height: 83rpx;
		width: 1rpx;
		background: #EAE7E7;
		margin-top: 20rpx;
	}

	.wagdetail .listwag view:nth-child(3) {
		margin-left: 26rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #555555;
	}
</style>

<template>
	<view class="">
		<!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">修改密码</view>
		</view>
		<!-- <view class="editpent">
		<view class="flex itemedit">
			<view class="q1">账号</view>
			<view class="m12 c181">{{zhanghao}}</view>
		</view>
		<view class="flex itemedit">
			<view class="q1">原始密码</view>
			<input type="text" placeholder="请输入原始密码" v-model="oldword">
		</view>
		<view class="flex itemedit">
			<view class="q1">新密码</view>
			<input type="text" placeholder="请输入新密码" v-model="newword">
		</view>
		<view class="flex itemedit">
			<view class="q1">确认密码</view>
			<input type="text" placeholder="请输入确认密码" v-model="yesnewword">
		</view>
	</view> -->
		<view class="wagdetail">
			<view class="flex listwag">
				<view class="wagongb1" style="text-align: right;">账号</view>
				<view></view>
				<view>
					{{zhanghao}}
				</view>
			</view>
			<view class="flex listwag">
				<view class="wagongb1" style="text-align: right;">原始密码</view>
				<view></view>
				<view>
					<input type="text" placeholder="请输入原始密码" v-model="oldword">
				</view>
			</view>
			<view class="flex listwag">
				<view class="wagongb1" style="text-align: right;">新密码</view>
				<view></view>
				<view>
					<input type="text" placeholder="请输入新密码" v-model="newword">
				</view>
			</view>
			<view class="flex listwag">
				<view class="wagongb1" style="text-align: right;">确认密码</view>
				<view></view>
				<view>
					<input type="text" placeholder="请输入确认密码" v-model="yesnewword">
				</view>
			</view>


		</view>
		<view class="buttonyes" @tap="yesword">确认修改</view>
		<view class="buttoncancel" @tap="goback">取消</view>
	</view>
</template>

<script>
	import {
		changepassword
	} from "@/api/MessageServer.js"
	export default {
		data() {
			return {
				newword: '',
				oldword: '',
				yesnewword: '',
				phone: ''
			}
		},
		computed: {
			zhanghao() {
				this.phone = this.$store.getters['user/getAccountInfoData'].phone
				return this.$store.getters['user/getAccountInfoData'].phone
			}
		},
		methods: {
			goback() {
				uni.navigateBack()
			},
			async yesword() {
				if (this.yesnewword != this.newword) {
					uni.showToast({
						title: '两次密码输入不同',
						icon: 'none'
					})
					return
				}
				try {
					let data = {
						confirmpassword: this.yesnewword,
						oldpassword: this.oldword,
						password: this.newword,
						username: this.phone,
					}
					let resVlue = await changepassword(data)
					console.log(resVlue)
					uni.showToast({
						title: resVlue.data.message,
						icon: 'none'
					})
					this.oldword = ''
					this.newword = ''
					this.yesnewword = ''
				} catch (e) {
					console.log(e)
				}
			},
			/// 跳转用户信息修改
			fnInfoModify() {
				uni.navigateTo({
					url: '/pages/user-info-modify/user-info-modify?id=' + this.$store.getters[
						'user/getUserInfoData'].ID
				})
			},
			/// 跳转绑定手机
			fnBindPhone() {
				uni.navigateTo({
					url: '/pages/bind-phone/bind-phone?mobile=' + this.$store.getters['user/getAccountInfoData']
						.User.Phone
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
		width: 694rpx;
		height: 153rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);
	}

	.boximgs {
		width: 21rpx;
		height: 38rpx;
	}

	.safe {
		width: 70%;
		margin-left: 80rpx;
	}

	/* 样式 */
	/* .editpent input,.editpent .m12{
		border-bottom: 1px solid #D9E2E9;
		margin-top: 50rpx;
		width: 573rpx;
		padding-bottom:21rpx;
	}
	.editpent .m12{
		margin-top:0
	} */
	.itemedit {
		height: 124rpx;
		line-height: 146rpx;
	}

	.itemedit .q1 {
		width: 177rpx;
		margin-left: 32rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}

	.buttonyes,
	.buttoncancel {
		width: 625rpx;
		height: 90rpx;
		border-radius: 45rpx;
		font-size: 35rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin: 0 auto;
		line-height: 90rpx;
		text-align: center;
		color: #fff;
	}

	.buttonyes {
		background: #649AFF;
		box-shadow: 0px 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
		position: fixed;
		bottom: 199rpx;
		left: 63rpx;
	}

	.buttoncancel {
		border: 1px solid #BFBFBF;
		margin-top: 40rpx;
		position: fixed;
		bottom: 69rpx;
		left: 63rpx;
		color: #9C9C9C;
	}

	/* 新增 */
	.wagdetail {}

	input {
		height: 110rpx;
		line-height: 110rpx;
	}

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

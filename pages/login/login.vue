<template>
	<view class="posir jkent">
		<!-- 顶部封面 -->
		<image class="w100v mb64r" src="/static/banner.png" mode="widthFix"></image>
		<!-- 表单 -->
		<image src="../../static/avatar.png" class="touxiang posia"></image>
		<view class="mlr64r">
			<view class="flexr-jsc flex-aic bbs2r h112r">
				<!-- <i-icon type="shouji" size="56" color="#FF6699"></i-icon> -->
				<image class="my" src="../../static/my.png"></image>
				<input class="flex-fitem mlr18r" v-model="mobile" placeholder="请输入手机号码" :maxlength="11" />
			</view>
			<view class="flexr-jsc flex-aic bbs2r h112r mt64r">
				<!-- <i-icon type="mima" size="56" color="#FF6699"></i-icon> -->
				<image class="suo" src="../../static/suyo.png"></image>
				<input class="flex-fitem mlr18r" type="text" :password="isPasswd" v-model="password"
					placeholder="请输入初始密码" :maxlength="26" />
				<i-icon :type="isPasswd ? 'mimabukejian' : 'mimakejian'" size="56" color="#8f8f94"
					@click="isPasswd = !isPasswd"></i-icon>
			</view>
			<view class="flexr-jsb f28r cgray mt28r">
				<view class="funderline">
					<label style=" margin-top:-8rpx;">
						<checkbox :checked='rememberPsw' @tap="rememberPsw =! rememberPsw"
							style="transform: scale(0.7);" /><text style="vertical-align: middle;">记住密码</text>
					</label>
				</view>
				<view></view>
			</view>
			<view class="privacy f26r cgray" >
				<text <text class="square" v-if="prents" @tap="pentcetp">
				</text>
				<text class="square" v-if="!prents" @tap="pentcetp">
					<text class="childsquare"></text>
				</text>
				请详细阅读西峡县智慧水利<text style="color:#ff9900" @click="privacys">隐私政策</text>
			</view>
			<button style="margin-top: 30rpx;" class="loginsent" hover-class="btn-hover" @tap="fnLogin" :disabled="isLogin"
				:loading="isLogin">登录</button>

		</view>
	</view>
</template>

<script>
	// 登录
	import {
		getRsaText
	} from "@/api/CommonServer.js"


	import {
		mobileReg
	} from "@/utils/CommonUtil.js"
	import {
		loginByPhone,
		getUserInfo,
		getNeteaseIMToken
	} from "@/api/UserServer.js"
	import {
		getSigninInfo,
	} from "@/api/HanbiServer.js"
	import {
		getMessageNoReadCount,
	} from "@/api/MessageServer.js"

	export default {
		data() {
			return {
				// 密码可见状态
				isPasswd: true,
				// 登录状态
				isLogin: false,
				// 手机号
				mobile: '',
				// 密码
				password: '',
				rememberPsw: false,
				prents: true,
				cid: ''
			};
		},
		onReady() {
			// 置空导航标题

		},
		onLoad(options) {
			if (options && options.cid) {
				this.cid = options.cid
			}
			//页面加载完成，获取本地存储的用户名及密码
			const mobile = uni.getStorageSync('mobile');
			const password = uni.getStorageSync('password');
			// console.log("22",mobile)
			if (mobile && password) {
				this.mobile = mobile;
				this.password = password;
			} else {
				this.mobile = "";
				this.password = "";
			}
		},

		methods: {
			// 隐私政策
			pentcetp() {
				this.prents = !this.prents
			},
			// 登录提交
			async fnLogin() {
				// 检查手机号格式
				if (this.mobile == '') {
					uni.showToast({
						title: '请输入正确账号',
						icon: 'none'
					})
					return
				}
				if (this.password == '') {
					uni.showToast({
						title: '请输入初始密码',
						icon: 'none'
					})
					return
				}
				if (this.prents) {
					uni.showToast({
						title: '请勾选隐私政策',
						icon: 'none'
					})
					return
				}
				// 进行登录
				this.isLogin = true;
				try {
					let params = {
						username: this.mobile,
						password: this.password,
						clientId: this.cid
					}
					console.log(params)
					let rsaRes = await getRsaText(params);
					console.log(rsaRes)
					if (!rsaRes.data.success) {
						uni.showToast({
							title: rsaRes.data.message,
							icon: 'none'
						})
						this.isLogin = false;
						return
					} else {
						this.isLogin = false;
						if (rsaRes.data.result.userInfo.userType == "person") {
							this.$store.commit('user/setAccountInfoData', rsaRes.data.result.personInfo);
							console.log('ddgsG',rsaRes.data.result.personInfo)
						} else {
							this.$store.commit('user/setAccountInfoData', rsaRes.data.result.userInfo);
							console.log('ddgsDFSDGG',rsaRes.data.result.userInfo)
						}
						if (this.rememberPsw) { //用户勾选“记住密码”
							uni.setStorageSync('mobile', this.mobile);
							uni.setStorageSync('password', this.password);
						} else { //用户没有勾选“记住密码”
							uni.removeStorageSync('mobile');
							uni.removeStorageSync('password');
							this.mobile = "";
							this.password = "";
						}
						uni.setStorageSync('TOKEN', rsaRes.data.result.token);
						uni.switchTab({
							url:'/pages/index/index'
						})
						let menuList = rsaRes.data.result.permissionInfo;
						menuList.forEach(a => {
							if (a.appUrl) {
								uni.reLaunch({
									url: a.appUrl
								})
							}
						})
					}
				} catch (e) {
					console.log(e)
					uni.showToast({
						title: e.data.message,
						icon: 'none',
						duration: 2000
					})
					this.isLogin = false;
				}
			},
			privacys() {
				console.log(9999)
				uni.navigateTo({
					url: '/pages/intima/intima'
				})
			},
			// 跳转页面
			// fnPage(type) {
			//   if (this.isLogin) return
			//   uni.navigateTo({
			//     url: `/pages/${type}/${type}`
			//   })
			// },
		}

	}
</script>

<style>
	page {
		background: #FFFFFF;
	}

	/*社交账号区域*/
	/*  .social {
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: 5%;
  } */

	/* 线条 */
	/* .line-gr-ctheme {
    height: 4rpx;
    min-width: 56rpx;
    background: linear-gradient(to right, rgba(255, 102, 153, 0), #ff6699);
  }

  .line-gl-ctheme {
    height: 4rpx;
    min-width: 56rpx;
    background: linear-gradient(to left, rgba(255, 102, 153, 0), #ff6699);
  } */
	.privacy {
		margin-top: 105rpx;
		text-align: center;
	}

	.loginsent {
		width: 625rpx;
		height: 90rpx;
		line-height: 90rpx;
		margin: 20rpx auto;
		background: linear-gradient(270deg, #477CF3 0%, #649BFF 100%);
		box-shadow: 0px 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 45rpx;
		font-size: 35rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
	}

	.my {
		width: 32rpx;
		height: 31rpx;
		margin: 10rpx
	}

	.suo {
		width: 30rpx;
		height: 36rpx;
		margin: 10rpx
	}

	.touxiang {
		width: 194rpx;
		height: 194rpx;
		top: 166rpx;
		z-index: 888;
		left: 278rpx;
	}

	.input-placeholder {
		color: #B6C2CE
	}

	.funderline {
		text-decoration: none;
	}

	.square {
		width: 30rpx;
		height: 30rpx;
		vertical-align: middle;
		margin-top: -8rpx;
		border: 1px solid #999;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
	}

	.childsquare {
		width: 15rpx;
		display: inline-block;
		height: 15rpx;
		background: #666;
		border-radius: 50%;
		margin-bottom: 8rpx;
	}
</style>

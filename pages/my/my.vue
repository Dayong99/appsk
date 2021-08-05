<template>
	<view class="posir">
		<view class="headmy">
			<image src="../../static/my/backgroundImg.png" class="hw100v"></image>
		</view>
		<view class="myent posia">
			<view class="flex" @tap="personmy">
				<view class="flex">
					<image src="../../static/avatar.png" class="touxiangs"></image>
					<view>
						<view style="margin-top: 70rpx;font-weight: bold;margin-left: -30rpx;width: 200rpx;">
							{{this.$store.getters['user/getAccountInfoData'].username?this.$store.getters['user/getAccountInfoData'].username:this.$store.getters['user/getAccountInfoData'].personName}}
						</view>
						<view class="ca5 f24r sw">{{newsTotalData.workName?newsTotalData.workName:newsTotalData.post}}
						</view>
					</view>
				</view>
				<view class="arrows" style="margin-left: 250rpx;">
					<image src="../../static/myarr.png" class="hw100v"></image>
				</view>
			</view>
			<view class="horizontal"></view>
			<view class="flex hl104r sw f28r c181">
				<view>
					<image src="../../static/shouji.png" class="phone"></image>
					<text>{{this.$store.getters['user/getAccountInfoData'].phone?this.$store.getters['user/getAccountInfoData'].phone.substr(0,3):'0000'}}***{{this.$store.getters['user/getAccountInfoData'].phone?this.$store.getters['user/getAccountInfoData'].phone.substr(7,this.$store.getters['user/getAccountInfoData'].phone.length):'0000'}}</text>
				</view>
				<view>
					<image src="../../static/shenfen.png" class="card"></image>
					<text>{{newsTotalData.idNumber?newsTotalData.idNumber.substr(0,3):'0000'}}****{{newsTotalData.idNumber?newsTotalData.idNumber.substr(7,newsTotalData.idNumber.length):"0000"}}</text>
				</view>
			</view>
		</view>

		<view class="botedit bgwhite mauto sw c181 f30r">
			<!-- 我的任务 -->
			<view class="flexr-jsb" @tap="goMyTask()">
				<view class="flex">
					<image src="../../static/my/my-task.png" class="mysuo"></image>
					<view class="characters">我的任务</view>
				</view>
				<view>
					<view class="arrows botnet">
						<image src="../../static/myarr.png" class="hw100v"></image>
					</view>
				</view>
			</view>
			<!-- 云巡检记录 -->
			<view class="flexr-jsb" @tap="goRecord()">
				<view class="flex">
					<image src="../../static/my/record.png" class="mysuo"></image>
					<view class="characters">云巡检记录</view>
				</view>
				<view>
					<view class="arrows botnet">
						<image src="../../static/myarr.png" class="hw100v"></image>
					</view>
				</view>
			</view>
			<!-- 修改密码 -->
			<view class="flexr-jsb" @tap="changword()">
				<view class="flex">
					<image src="../../static/my/password.png" class="mysuo"></image>
					<view class="characters">修改密码</view>
				</view>
				<view>
					<view class="arrows botnet">
						<image src="../../static/myarr.png" class="hw100v"></image>
					</view>
				</view>
			</view>
			<!-- <view class="flexr-jsb">
			<view class="flex">
				<image src="../../static/b2.png" class="mysuo"></image>
				<view class="characters">关于我们</view>
			</view>
			<view>
				<view class="arrows botnet">
					<image src="../../static/myarr.png" class="hw100v"></image>
				</view>
			</view>
		</view> -->
			<!-- <view class="flexr-jsb">
			<view class="flex">
				<image src="../../static/b3.png" class="mysuo"></image>
				<view class="characters">设置</view>
			</view>
			<view>
				<view class="arrows botnet">
					<image src="../../static/myarr.png" class="hw100v"></image>
				</view>
			</view>
		</view> -->
		</view>
		<view class="outlogin flexr-jsb bgwhite" @tap="logout">
			<view class="out sw f29r">退出登录</view>
			<view class="outlog">
				<image src="../../static/myarr.png" class="hw100v"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fnUploadUpyunPic
	} from "@/utils/UniUtil.js"
	import {
		modifyUserMainBgPic,
		getUserInfo
	} from "@/api/UserServer.js"
	import {
		getSigninInfo,
	} from "@/api/HanbiServer.js"
	import {
		getMessageNoReadCount,
		logouts
	} from "@/api/MessageServer.js"

	export default {
		props: {
			// 连续触发刷新
			refresh: {
				type: Boolean,
				default: false
			}
		},

		watch: {
			refresh(val) {
				if (val) this.fnRefreshUserInfo();
			}
		},

		computed: {
			getimgSrc(snt) {
				return this.$store.state.baseUrl + "/sys/common/static/" + snt
			},
			// 未读消息数量
			newsTotalData() {
				return this.$store.getters['user/getAccountInfoData']
			},
			srcIMG() {
				return this.$store.state.baseUrl + "/sys/common/static/" + this.$store.getters['user/getAccountInfoData']
					.headPic || '../../static/touxiang.png'
			},
			// // 签到状态
			// signinStatusData() {
			//   return this.$store.getters['getSigninStatusData']
			// },
			// // 用户信息
			// userInfoData() {
			//   return this.$store.getters['user/getUserInfoData']
			// },
		},

		methods: {
			//跳转云巡检记录
			goRecord(){
				uni.navigateTo({
					url: "/pages/cloud-services/AllCloud"
				})
			},
			goMyTask() {
				uni.navigateTo({
					url: "/pages/qualityPolling/qualityPolling"
				})
			},
			personmy() {
				console.log((new Date).getFullYear())
				uni.navigateTo({
					url: '/pages/my-news/my-news'
				})
			},
			logout() {
				console.log('执行了logout')
				let res = logouts();
				console.log('anhi9', res)
				uni.showLoading({
					title: '退出登录',
					mask: true
				})
				setTimeout(() => {
					uni.removeStorageSync('TOKEN');
					uni.hideLoading()
					// 跳转登录
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}, 1500);
			},
			/// 跳转打开新窗口
			changword(type) {
				uni.navigateTo({
					url: '/pages/account-security/account-security'
				})
			},
			/// 跳转用户信息页
			fnUserInfo() {
				uni.navigateTo({
					url: `/pages/user-info/user-info?id=${this.userInfoData.ID}`
				})
			},

			/// 刷新用户信息消息
			fnRefreshUserInfo() {
				// 获得登录用户信息
				getUserInfo(this.userInfoData.ID).then(userinfoRes => {
					// 保存登录用户信息
					this.$store.commit('user/setUserInfoData', userinfoRes.data.Data);
					// 获取未读消息数
					return getMessageNoReadCount()
				}).then(mesRes => {
					// 保存未读消息数
					this.$store.commit('setNewsCountData', mesRes.data.Data)
					// 获取签到信息
					return getSigninInfo()
				}).then(signinRes => {
					// 保存签到信息
					this.$store.commit('setSigninInfoData', signinRes.data.Data)
				})
			}
			//
		}
	}
</script>

<style scoped>
	.flexr-jsb {}

	/* .my-cover {
    display: block;
    width: 100%;
    height: 260rpx;
  }

  .my-avatar {
    position: absolute;
    left: 0;
    top: -56rpx;
  }

  .my-nickname {
    color: #111111;
    font-size: 42rpx;
    margin-left: 150rpx;
  } */
	page {
		background: #e8e8e8;
	}

	.headmy {
		height: 400rpx;
		width: 750rpx;
	}

	.myent {
		height: 306rpx;
		width: 708rpx;
		background: #FFFFFF;
		box-shadow: 0px 3rpx 3rpx 0px rgba(174, 174, 174, 0.23);
		border-radius: 10rpx;
		top: 167rpx;
		left: 21rpx;
	}

	.touxiangs {
		width: 140rpx;
		height: 120rpx;
		margin-top: 54rpx;
		margin-left: 47rpx;
		margin-bottom: 35rpx;
		margin-right: 33rpx;
	}

	.arrows {
		width: 32rpx;
		height: 31rpx;
	}

	.phone {
		width: 15rpx;
		height: 19rpx;
		margin-left: 55rpx;
		margin-right: 10rpx;
	}

	.card {
		width: 23rpx;
		height: 19rpx;
		margin-left: 88rpx;
		margin-right: 10rpx;
	}

	.horizontal {
		width: 666rpx;
		height: 1rpx;
		background: #E6E6E6;
		margin-left: 22rpx;
	}

	.headmys {
		top: 85rpx;
		left: 342rpx;
	}

	.names {
		margin-top: 66rpx;
		margin-bottom: 13rpx;
	}

	.arrows {
		margin-left: 290rpx;
		margin-top: 91rpx;
	}

	.mysuo {
		width: 63rpx;
		height: 62rpx;
		margin: 40rpx 23rpx 0 46rpx;
	}

	/* 底部编辑 */
	.botedit {
		margin-top: 90rpx;
		width: 708rpx;
		box-shadow: 0px 3rpx 3rpx 0px rgba(174, 174, 174, 0.23);
		border-radius: 10rpx;
	}

	.botedit .characters {
		line-height: 140rpx;
	}

	.botnet {
		margin-top: 50rpx;
		margin-right: 65rpx;
	}

	.outlogin {
		width: 708rpx;
		height: 97rpx;
		box-shadow: 0px 3px 3px 0px rgba(174, 174, 174, 0.23);
		border-radius: 10rpx;
		margin: 21rpx auto;
		line-height: 97rpx;
	}

	.out {
		color: #E7541E;
		padding-left: 44rpx;
	}

	.outlog {
		padding-right: 65rpx;
		width: 32rpx;
		height: 31rpx;
		margin-top: 6rpx;
	}
</style>

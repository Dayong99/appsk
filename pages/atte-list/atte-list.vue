<template>
	<view>
		<album-card :input="true" :congint="namecong" :abt="1"></album-card>
		<!-- 滚动内容区 -->
		<mescroll-uni @down="downCallback" @up="upCallback" :down="down" :up="up" @init="mescrollInit" :top="153">
			<block v-for="(user,index) in userAtteUserListData" :key="index">
				<view class="plr18r ptb18r bgwhite bbs2r hjkle" @click="particulars(user.id)">
					<view class="flex conts">
						<view class="bcee read sw f22r cwhite fcenter br4r">{{user.operaStatus==1?'已阅读':'未阅读'}}</view>
						<view class="c181 f33r sw ellipsis titlemang">{{user.title}}</view>
					</view>
					<view class="flexr-jsb c979 f28r mb8r">
						<view>阅读该文章可获取 +{{user.score}} 分</view>
						<view class="perstr">上传人：{{user.createBy_dictText}}</view>
					</view>
					<view class="flexr-jsb c979 sp f28r">上传时间：{{user.createTime}}</view>
				</view>
			</block>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		getUserAtteUserList,
		addUserAtte,
		delUserAtte,
	} from "@/api/UserServer.js"
	import AlbumCard from '@/components/album-card/album-card'
	export default {
		data() {
			return {
				isShowToTop: true, //开启回到顶部按钮
				id: -1,
				namecong: '文章列表',
				mescroll: null,
				up: {
					auto: false //默认开始不执行上拉
				},
				down: {
					auto: true //在初始化完毕之后自动执行一次下拉刷新
				},
			}
		},
		components: {
			AlbumCard
		},
		computed: {
			// 用户
			userAtteUserListData() {
				console.log(this.$store.getters['user/getUserFansListData'])
				return this.$store.getters['user/getUserFansListData']
			},
		},
		onLoad(options) {
			if (options && options.id) {
				this.id = parseInt(options.id)
			}
		},
		onShow() {
			console.log(123)

		},
		methods: {
			particulars(item) {
				uni.navigateTo({
					url: `/pages/album-rank/album-rank?particulars=${item}&timepng=${this.operaStatus}`
				})
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			goback() {
				uni.navigateBack()
			},
			// 下拉刷新的回调
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				console.log('执行了上拉加载')
				getUserAtteUserList({
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					personId: this.$store.getters['user/getAccountInfoData'].id
				}).then(atteRes => {
					if (mescroll.num == 1) {
						this.$store.commit('user/setUserFansListData', atteRes.data.result.records)
					} else {
						this.$store.commit('user/setUserFansListData', this.userAtteUserListData.concat(atteRes
							.data.result.records))
					}
					mescroll.endSuccess(atteRes.data.result.records.length, atteRes.data.result.records.length >=
						mescroll.size);
				}).catch(() => {
					mescroll.endErr();
				})
			},
			// 跳转用户信息页
			// fnUserInfo(id) {
			//   uni.navigateTo({
			//     url: `/pages/user-info/user-info?id=${id}`
			//   })
			// },
			// /// 用户关注
			// fnUserFollow(e) {
			//   // 用户被关注
			//   if (e.UserAtte) {
			//     uni.showModal({
			//       content: '确定要取消关注TA吗？',
			//       success: res => {
			//         if (res.confirm) {
			//           delUserAtte(e.ID).then(delRes => {
			//             if (delRes.data.Data == false) return
			//             this.userAtteUserListData.filter(item => item.ID == e.ID).map(item => item.UserAtte = false)
			//             // 登录用户关注数减
			//             let tempUser = this.$store.getters['user/getUserInfoData']
			//             tempUser.AtteCount--
			//             this.$store.commit('user/setUserInfoData', tempUser)
			//           })
			//         }
			//       }
			//     })
			//     return
			//   } else {
			//     addUserAtte(e.ID).then(addRes => {
			//       if (addRes.data.Data == false) return
			//       this.userAtteUserListData.filter(item => item.ID == e.ID).map(item => item.UserAtte = true)
			//       // 登录用户关注数加
			//       let tempUser = this.$store.getters['user/getUserInfoData']
			//       tempUser.AtteCount++
			//       this.$store.commit('user/setUserInfoData', tempUser)
			//     })
			//   }
			// },
		}
	}
</script>

<style>
	page {
		background: #efefef;
	}

	.read {
		width: 78rpx;
		height: 35rpx;
		margin-right: 10rpx;
		margin-top: 4px;
	}

	.conts {
		margin-bottom: 15rpx;
	}

	.hjkle {
		padding-top: 25rpx;
		padding-bottom: 25rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.titlemang {
		width: 85%;
	}
</style>

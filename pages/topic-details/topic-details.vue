<template>
	<view>
		<view class="headboxs">
			<view class="head flex mauto cwhite sw f34r">
				<view class="boximgs mt8r z5" @tap="goback">
					<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
				</view>
				<view class="safe fcenter z5">积分明细</view>
				<image src="../../static/fen.png" class="fen"></image>
			</view>
			<view class="z5 posia numsscoree">
				<view class="f56r cwhite">{{curScore}}</view>
				<view class="cffe mb19r">当前积分</view>
				<!-- <view class="shopList fcenter f28r" @tap="giftshop()">礼品商城 ></view> -->
			</view>
		</view>

		<!-- <view id="tabbar" class="boxlistd mauto flexr-jsa flex-ais hl90r bgwhite bbdash2r tabbar-fixed nice arrowtoplr" style="margin-top: -120rpx;">
			<view class="f34r fbold fcenter w128r tabbar" :class="{'tabbarsh':current == 0}" @tap="fnBarClick(0)">全部
			</view>
			<view class="f34r fbold fcenter w128r tabbar" :class="{'tabbarsh':current == 1}" @tap="fnBarClick(1)">收入
			</view>
			<view class="f34r fbold fcenter w128r tabbar" :class="{'tabbarsh':current == 2}" @tap="fnBarClick(2)">支出
			</view>
		</view> -->

		<!-- 滚动列表内容 -->
		<mescroll-uni :down="{use:false}" :top="400" @up="upCallback" @init="mescrollInit">
			<!-- 选择导航 -->
			<!-- <view v-if="isFixed" class="hl90r"></view> -->

			<!-- 全部 -->
			<view v-if="status.hottest" :style="{display: current==0 ? 'block' :'none'}"
				class="boxlistd mauto bgwhite arrowbottomlr">
				<view v-for="(infoData,index) in topicHottestListData" :key="index" class="flex boxnet">
					<view class="hw88 smeit">
						<image :src='imagList[infoData.originType]' class="hw100v"></image>
					</view>
					<view class="mt33r rigthscore btce6 pb30r">
						<view class="flexr-jsb sw f32r">
							<view class="c333">{{infoData.originType_dictText}}</view>
							<view class="c2ea">+{{infoData.score}}</view>
						</view>
						<view class="c979 f28r middlbox">
							<text>{{titleList[infoData.originType]}}{{infoData.detail.split('：')[1]}}</text>
							<!-- <text>机械伤害的不安全行为</text> -->
						</view>
						<view class="c979 f28r sp">{{infoData.createTime}}</view>
					</view>
				</view>
			</view>
			<!-- 收入 -->
			<view v-if="status.latest" :style="{display: current==1 ? 'block' :'none'}"
				class="boxlistd mauto bgwhite arrowbottomlr">
				<view v-for="(infoData,index) in topicLatestListData" :key="index" class="flex">
					<view class="hw88 smeit">
						<image :src='imagList[infoData.originType]' class="hw100v"></image>
					</view>
					<view class="mt33r rigthscore btce6 pb30r">
						<view class="flexr-jsb sw f32r">
							<view class="c333">{{infoData.originType_dictText}}</view>
							<view class="c2ea">+{{infoData.score}}</view>
						</view>
						<view class="c979 f28r middlbox">
							<text>{{infoData.detail.split('：')[1]}}</text>
							<!-- <text>机械伤害的不安全行为</text> -->
						</view>
						<view class="c979 f28r sp">{{infoData.createTime}}</view>
					</view>
				</view>
			</view>
			<!-- 支出 -->
			<view v-if="status.hottest" :style="{display: current==2 ? 'block' :'none'}"
				class="boxlistd mauto bgwhite arrowbottomlr">
				<view v-for="(infoData,index) in topicLatestList" :key="index" class="flex topbic">
					<view class="hw88 smeit">
						<image src='../../static/daizi.png' class="hw100v"></image>
					</view>
					<view class="mt33r rigthscore btce6 pb30r">
						<view class="flexr-jsb sw f32r">
							<view class="c333">{{infoData.originType_dictText}}</view>
							<view class="ce75">-{{infoData.score}}</view>
						</view>
						<view class="c979 f28r middlbox">
							<text>{{infoData.detail.split('：')[1]}}</text>
							<!-- <text>机械伤害的不安全行为</text> -->
						</view>
						<view class="c979 f28r sp">{{infoData.createTime}}</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		previewImage
	} from "@/utils/UniUtil.js"
	import {
		getTopicInfo,
		getTopicReplyList,
		addTopicFollow,
		delTopicFollow,
	} from "@/api/TopicServer.js"
	import {
		addUserAtte,
		delUserAtte,
		addUserBlack,
		delUserBlack,
	} from "@/api/UserServer.js"
	import {
		addTop,
		delTop,
		addSave,
		delSave
	} from "@/api/InteractServer.js"


	export default {
		components: {

		},
		data() {
			return {
				imagList: ['../../static/daizi.png', '../../static/shour.png', '../../static/holda.png',
					'../../static/holdb.png', '../../static/daizi.png'
				],
				curScore: '',
				// 选中 最热
				current: 0,
				// 激活顶部导航关联页状态
				status: {
					hottest: true,
					latest: false,
				},
				// 滚动动实例
				mescroll: null,
				// 话题id
				id: 0,
				// 双击刷新
				clickRefresh: false,
				// 刷新间隔
				timeOutTopic: 0,
				// 导航距离顶部
				tabbarTop: 0,
				// 是否固定导航
				isFixed: false,
				titleList: ['1', '视频名:', '文章名:', '题目:', '兑换礼品:']
				//
			};
		},
		onLoad(options) {
			if (options && options.curScore) {
				console.log(options)
				// uni.showLoading({
				//   title: "加载中",
				//   mask: true
				// })
				this.curScore = options.curScore
			}
		},

		computed: {
			// 话题信息
			// topicInfoData() {
			//   return this.$store.getters['topic/getTopicInfoData']
			// },
			// 指出
			topicLatestList() {
				console.log(this.$store.getters['topic/topicLatestList'])
				return this.$store.getters['topic/getTopicReplyInfoData']
			},
			// 全部
			topicLatestListData() {
				return this.$store.getters['topic/getTopicLatestListData']
			},
			// 收入
			topicHottestListData() {
				return this.$store.getters['topic/getTopicHottestListData']
			},
			/// 计算显示图片格
			calImageSrcs() {
				let imgArray = this.topicInfoData.ImageSrcs;
				let suffix = '_200x200.jpg/format/webp'
				if (imgArray) {
					imgArray = imgArray.map(item => item.indexOf(suffix) == -1 ? item += suffix :
						'/static/default_image.png')
				}
				return imgArray
			},
		},

		methods: {
			imgrent(i) {
				console.log(this.imagList[i])
				return this.imagList[i]
			},
			goback() {
				uni.navigateBack()
			},
			/// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {

				this.mescroll = mescroll;
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				let repvalue = ''
				if (this.current == 0) {
					repvalue = null
				} else if (this.current == 1) {
					repvalue = 0
				} else if (this.current == 2) {
					repvalue = 1
				}
				let params = {
					type: repvalue,
					detail: '',
					personId: this.$store.getters['user/getAccountInfoData'].id,
					pageNo: mescroll.num,
					pageSize: mescroll.size
				}
				getTopicReplyList(params).then(res => {
					if (this.current == 0) {
						if (mescroll.num == 1) {
							this.$store.commit('topic/setTopicHottestListData', res.data.result.records);
						} else {
							this.$store.commit('topic/setTopicHottestListData', this.topicHottestListData.concat(
								res.data.result.records))
						}
					}
					if (this.current == 1) {
						if (mescroll.num == 1) {
							console.log(this.topicLatestListData)
							this.$store.commit('topic/setTopicLatestListData', res.data.result.records)
						} else {
							this.$store.commit('topic/setTopicLatestListData', this.topicLatestListData.concat(res
								.data.result.records))
						}
					}
					if (this.current == 2) {
						if (mescroll.num == 1) {
							this.$store.commit('topic/setTopicReplyInfoData', res.data.result.records)
							console.log(res.data.result.records)
						} else {

							this.$store.commit('topic/setTopicReplyInfoData', this.topicLatestList.concat(res.data
								.result.records))
						}
					}
					mescroll.endSuccess(res.data.result.records.length, res.data.result.records.length >= mescroll
						.size);
				}).catch(() => {
					mescroll.endErr();
				})
			},
			/// 滚动事件 (需在up配置onScroll:true才生效)
			// scroll(mescroll) {
			//   if (mescroll.getScrollTop() >= this.tabbarTop) {
			//     this.isFixed = true // 显示悬浮菜单
			//   } else {
			//     this.isFixed = true // 隐藏悬浮菜单 
			//   }
			// },
			/// 设置nav到顶部的距离 (滚动条为0, 菜单顶部的数据加载完毕获取到的数值是最精确的)
			//    setTabbarTop() {
			//      let view = uni.createSelectorQuery().in(this).select('#tabbar');
			//      view.boundingClientRect(data => {
			// console.log(data)
			//        // 到屏幕顶部的距离
			//        this.tabbarTop = data.top+600
			//      }).exec();
			//    },

			/// 顶部导航选项点击
			fnBarClick(current) {
				// 是否当前项点击
				if (this.current == current) {
					this.timeOutTopic += 1;
					// 是否为刷新值和连续触发
					if (!this.clickRefresh && this.timeOutTopic >= 2) {
						// 刷新值开
						this.clickRefresh = true;
						// 获取新数据
						this.mescroll.resetUpScroll();
						// 定时器重置
						this.timeOutTopic = setTimeout(() => {
							// 清除定时器
							clearTimeout(this.timeOutTopic)
							// 连续触发记录重置
							this.timeOutTopic = 0;
							// 刷新值关
							this.clickRefresh = false;
						}, 5000);
					}
				} else {
					// 改变顶部导航选中
					this.current = current;
					// 首次选中激活顶部导航关联页状态
					if (!this.status.latest && this.current == 1) this.status.latest = true;
					// 获取新数据
					this.mescroll.resetUpScroll();
					// 清除定时器
					clearTimeout(this.timeOutTopic)
					// 连续触发记录重置
					this.timeOutTopic = 0;
					// 刷新值关
					this.clickRefresh = false;
				}
				// console.log(this.tabbarTop)
				// 滚动上滑 
				this.mescroll.scrollTo(0, 600);
			},
			/// 预览图片组
			fnPreviewImage(current) {
				let urls = this.topicInfoData.ImageSrcs.map(url => url += "_0.jpg/format/webp")
				previewImage(current, urls)
			},

			/// 话题用户关注
			fnTopicFollow() {
				// 荟吧被关注
				if (this.topicInfoData.TopicFollow) {
					uni.showModal({
						content: '确定要取消关注吗？',
						success: res => {
							if (res.confirm) {
								delTopicFollow(this.topicInfoData.ID).then(delRes => {
									if (delRes.data.Data == false) return
									this.topicInfoData.UserCount--
									this.topicInfoData.TopicFollow = false
								})
							}
						}
					})
					return
				} else {
					addTopicFollow(this.topicInfoData.ID).then(addRes => {
						if (addRes.data.Data == false) return
						this.topicInfoData.UserCount++
						this.topicInfoData.TopicFollow = true
					})
				}
			},


			/// 展卡跳转详情页
			fnCardInfo(e) {
				uni.navigateTo({
					url: `/pages/topicreply-details/topicreply-details?id=${e.ID}&fromPage=topic&current=${this.current}`
				})
			},
			/// 展卡评论跳转详情页
			fnCardComm(e) {
				uni.navigateTo({
					url: `/pages/topicreply-details/topicreply-details?id=${e.ID}&fromPage=topic&current=${this.current}&comm=true`
				})
			},
			/// 展卡跳转用户中心页 
			giftshop(e) {
				uni.navigateTo({
					url: '/pages/signin-record/signin-record'
				})
			},
			/// 展卡点赞 
			// fnCardTop(e) {
			//   let filItem = {};
			//   // 最热
			//   if (this.current == 0) filItem = this.topicHottestListData.filter(item => item.ID == e.ID)[0];
			//   // 最新
			//   if (this.current == 1) filItem = this.topicLatestListData.filter(item => item.ID == e.ID)[0];
			//   let params = {
			//     objecttype: 'topicreply',
			//     objectid: filItem.ID
			//   }
			//   // 用户是否点过赞
			//   if (filItem.UserTop) {
			//     delTop(params).then(delRes => {
			//       if (delRes.data.Data == false) return
			//       filItem.TopCount--;
			//       filItem.UserTop = false
			//     })
			//   } else {
			//     addTop(params).then(addRes => {
			//       if (addRes.data.Data == false) return
			//       filItem.TopCount++;
			//       filItem.UserTop = true
			//     })
			//   }
			// },
			// /// 展卡收藏
			// fnCardSave(e) {
			//   let filItem = {};
			//   // 最热
			//   if (this.current == 0) filItem = this.topicHottestListData.filter(item => item.ID == e.ID)[0];
			//   // 最新
			//   if (this.current == 1) filItem = this.topicLatestListData.filter(item => item.ID == e.ID)[0];
			//   let params = {
			//     objecttype: 'topicreply',
			//     objectid: filItem.ID
			//   }
			//   // 用户是否已收藏
			//   if (filItem.UserSave) {
			//     delSave(params).then(delRes => {
			//       if (delRes.data.Data == false) return
			//       filItem.SaveCount--;
			//       filItem.UserSave = false
			//     })
			//   } else {
			//     addSave(params).then(addRes => {
			//       if (addRes.data.Data == false) return
			//       filItem.SaveCount++;
			//       filItem.UserSave = true
			//     })
			//   }
			// },
			// /// 展卡更多-关注
			// fnCardFollow(e) {
			//   // 用户被关注
			//   if (e.User.UserAtte) {
			//     uni.showModal({
			//       content: '确定要取消关注TA吗？',
			//       success: res => {
			//         if (res.confirm) {
			//           delUserAtte(e.User.ID).then(delRes => {
			//             if (delRes.data.Data == false) return
			//             this.topicHottestListData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
			//               false)
			//             this.topicLatestListData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
			//               false)
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
			//     addUserAtte(e.User.ID).then(addRes => {
			//       if (addRes.data.Data == false) return
			//       this.topicHottestListData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
			//         true)
			//       this.topicLatestListData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
			//         true)
			//       // 登录用户关注数加
			//       let tempUser = this.$store.getters['user/getUserInfoData']
			//       tempUser.AtteCount++
			//       this.$store.commit('user/setUserInfoData', tempUser)
			//     })
			//   }
			// },
			// /// 展卡更多-拉黑
			// fnCardBlack(e) {
			//   // 用户是否被列入黑名单
			//   e.User.Black ? delUserBlack(e.User.ID) : addUserBlack(e.User.ID)
			// },
			/// 展卡更多-跳转举报页
			fnCardReport(e) {
				uni.navigateTo({
					url: `/pages/report/report?id=${e.ID}&type=topicreply`
				})
			},
			//
		}
	}
</script>

<style>
	.headboxs {
		height: 517rpx;
		position: relative;

	}

	.head {
		width: 694rpx;
		padding-left: 28rpx;
		padding-right: 28rpx;
		line-height: 193rpx;
	}

	.boximgs {
		width: 21rpx;
		height: 38rpx;
	}

	.safe {
		width: 70%;
		margin-left: 80rpx;
	}

	/* 列表 */
	.fen {
		position: absolute;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 0;
		height: 100%;
	}

	.numsscoree {
		left: 53rpx;
		top: 184rpx;
	}

	.shopList {
		width: 167rpx;
		height: 56rpx;
		background: #FF8401;
		border-radius: 7rpx;
		line-height: 56rpx;
		color: #FFFAEC;
	}

	.boxlistd {
		width: 694rpx;
	}

	.boxlistd .flex:last-child .rigthscore {
		border-bottom: none !important;
	}

	/* tab切换 */
	.smeit {
		margin-top: 65rpx;
		margin-left: 34rpx;
		margin-right: 32rpx;
	}

	.rigthscore {
		width: 499rpx;
		padding-right: 49rpx;
	}

	.middlbox {
		margin-top: 15rpx;
		margin-bottom: 10rpx;
	}

	.nice {
		margin-top: -90rpx;
	}

	.mescroll-empty {
		background: #fff !important;
		height: 100%;
	}

	.mescroll-uni-content {
		width: 694rpx;
		margin: 0 auto;
		height: 100%;
	}

	.arrowtoplr {
		border-top-right-radius: 10rpx;
		border-top-left-radius: 10rpx;
	}

	.arrowbottomlr {
		border-bottom-right-radius: 10rpx;
		border-bottom-left-radius: 10rpx;
	}
</style>

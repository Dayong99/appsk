<template>
	<view class="conts cont">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">党建文化</view>
		</view>
		<view class="party-titlts">
			<view class="party-Me" :class="{partyBo:index===1}" @click="partyAll(1)">党团活动</view>
			<view class="party-Me" :class="{partyBo:index===2}" @click="partyAll(2)">文章发布</view>
		</view>
		<view class="party-back"></view>
		<mescroll-body ref="mescrollRef" @up="upCallback" :fixed="true" @down="downCallback" :down="down" :up="up">
			<GroupActivities :VrActivityLists="this.VrActivityLists" @PartyDetails="PartyDetails" v-if="index===1">
			</GroupActivities>
			<releaseAnArticle :VrArticleListLists="this.VrArticleListLists" @ClickDetails="ClickDetails"
				v-if="index===2"></releaseAnArticle>
		</mescroll-body>
	</view>
</template>

<script>
	import {
		getVrActivity,
		getVrArticle
	} from "@/api/AlbumServer.js"
	import GroupActivities from '@/components/Group-activities/GroupActivities'
	import releaseAnArticle from '@/components/releaseAnArticle/releaseAnArticle'
	export default {
		components: {
			GroupActivities,
			releaseAnArticle
		},
		data() {
			return {
				isShowToTop: true, //开启回到顶部按钮
				mescroll: {},
				up: {
					auto: false //默认开始不执行上拉
				},
				down: {
					auto: false //默认开始不执行下拉
				},
				index: 1,
				VrActivityLists: [],
				VrArticleListLists: [],
				arr: {
					pageNo: 1,
					pageSize: 10,
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds
				}
			}
		},
		onLoad() {
			if (this.index === 1) {
				this.getVrActivityList(this.arr)
			}
		},
		methods: {
			/// 下拉刷新的回调，默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				let _that = this
				this.arr.pageNo = mescroll.num,
					this.arr.pageSize = mescroll.size
				if (this.index === 1) {
					//请求党团活动
					getVrActivity(this.arr).then(res => {
						if (res.data.code !== 200) {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1000
							});
						} else {
							if (mescroll.num == 1) _that.VrActivityLists = []
							mescroll.endSuccess()
							if (res.data.result.records.length !== 0) {
								mescroll.endSuccess()
								_that.VrActivityLists = _that.VrActivityLists.concat(res.data.result.records)
							} else {
								mescroll.endErr()
							}
						}
					})
				} else {
					//请求党建文章
					getVrArticle(this.arr).then(res => {
						if (res.data.code !== 200) {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1000
							});
						} else {
							if (mescroll.num == 1) _that.VrArticleListLists = []
							mescroll.endSuccess()
							if (res.data.result.records.length !== 0) {
								mescroll.endSuccess()
								_that.VrArticleListLists = _that.VrArticleListLists.concat(res.data.result.records)
							} else {
								mescroll.endErr()
							}


						}

					})
				}

			},
			//点击切换
			partyAll(item) {
				this.index = item
				if (this.index === 2) return this.getVrArticleList(this.arr)
			},
			//请求党团活动
			getVrActivityList(arr) {
				getVrActivity(arr).then(res => {
					if (res.data.code === 200) {
						this.VrActivityLists = res.data.result.records
					}
				})
			},
			//请求党建文章
			getVrArticleList(arr) {
				getVrArticle(arr).then(res => {
					if (res.data.code === 200) {
						this.VrArticleListLists = res.data.result.records
					}
				})
			},
			//点击党建文化跳转详情
			ClickDetails(item) {
				uni.navigateTo({
					url: `/pages/ThePartyDetails/ThePartyDetails?index=${this.index}&id=${item.id}`
				})
			},
			//点击党团详情
			PartyDetails(item) {
				uni.navigateTo({
					url: `/pages/ThePartyDetails/ThePartyDetails?index=${this.index}&id=${item.id}`
				})
			},
			//点击返回上一页
			goback() {
				if (this.index === 1) {
					uni.navigateBack();
				} else {
					uni.navigateBack(2);
				}

			},
		}
	}
</script>

<style scoped>
	.conts {
		font-weight: Heavy;

	}

	.cont {
		overflow: hidden;
		white-space: normal;
		word-break: break-all;
	}

	.head {
		width: 100%;
		height: 153rpx;
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

	.party-titlts {
		height: 84rpx;
		line-height: 84rpx;
		display: flex;
		justify-content: space-around;
		font-weight: Medium;
		font-family: PingFang-SC-Medium;
	}

	.partyBo {
		color: #208FE7;
		border-bottom: 2rpx solid #208FE7;
		font-weight: Bold;
		font-family: PingFang-SC-Bold;
		font-size: 30rpx;
	}

	.party-Me {
		font-size: 30rpx;

	}

	.party-back {
		height: 20rpx;
		background-color: #F4F5F7;
	}
</style>

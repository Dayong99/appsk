<template>
	<view style="top:0;bottom: 0;z-index: 999;height:100%;background-color: #E8E8E8;">
		<view style="position: fixed;width: 100%;z-index: 100;">
			<view class="head flex mauto cwhite sw f34r">
				<view class="safe fcenter">西峡县智慧水库云平台</view>
			</view>
		</view>
		<view style="padding-top: 150rpx;z-index: 99;display: flex;flex-direction: column;">

			<!-- 3D轮播 -->
			<view>
				<swiper style="width: 750rpx;height: 300rpx;background-color: #fff;" @change="" previous-margin="0rpx"
					interval="3000" duration="500" next-margin="0rpx" circular autoplay indicatorDots>
					<block v-for="(item,index) in bannerImg" :key="index">
						<swiper-item style="box-sizing: border-box;position: relative;">
							<image style="position: absolute;width: 750rpx;height: 335rpx;z-index: 5;opacity: 1;"
								:src="item" lazy-load mode="scaleToFill"></image>
						</swiper-item>
					</block>
				</swiper>
			</view>

			<!-- 新闻部分 -->
			<mescroll-uni @init="mescrollInit" @up="upCallback" @down="downCallback" :up="upOption" :down="down"
				:fixed="true" :top="450">
				<view style="display: flex;border-bottom: 1rpx solid #f3f3f3;padding:20rpx;height: 170rpx;
					background-color: #FFFFFF;" @click="toNewsDetail(item)" v-for="(item,index) in newList" :key="index">
					<view style="display: flex;flex-wrap: wrap;align-content: space-between;width: 550rpx;">
						<!-- 标题 -->
						<view style="font-family:PingFang-SC-Bold;color: #333333; width:480rpx; margin-right:10rpx; overflow: hidden;
						-webkit-line-clamp: 2;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical;
						font-weight: bold;">
							{{item.newsTitle}}
						</view>
						<view style="display: flex;font-size: 30rpx;">
							<view style="opacity: 0.5;">{{"新闻动态"}}</view>
							<view style="opacity: 0.5;margin-left: 20rpx;">{{item.createTime}}</view>
						</view>
					</view>
					<view>
						<image :src="item.imgPath"
							style="padding-bottom: 10rpx;width: 220rpx;height: 170rpx;position: relative;">
						</image>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import {
		firstNews,
		banner
	} from "@/api/AlbumServer.js"
	export default {
		components: {

		},
		data() {
			return {
				itemNew: '',
				bannerImg: [],
				newList: [],
				mescroll: null,
				upOption: {
					// textNoMore: '到底儿了 >_<',
					use: true,
					auto: false, //默认开始不执行上拉
				},
				down: {
					use: true,
					auto: true, //初始化完毕之后自动执行一次下拉刷新
				},
				hasNext: true, //上拉是否有值
				isShowNoMore: '',
				pageNo: 1,
				pageSize: 10,
				current: '',
				pages: '',
				total: '',
				skipType: true, //true-首页新闻 false-积分榜单-阅读文章
				time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).substr(0, 4) + new Date(+new Date() + 8 *
					3600 * 1000).toISOString().substr(4, 15).replace(/T/g, " "),
				// time: new Date().toISOString(+new Date() + 8 * 3600 * 1000).slice(0, 19).replace(/T/g, " "),
				swiper: {
					current: 0,
					circular: true,
					indicatorDots: true,
					autoplay: true,
					interval: 2000,
					duration: 500,
				},
				imgList: [
					"../../static/news/swiperImg.png",
					"../../static/news/swiperImg.png",
					"../../static/news/swiperImg.png",
					"../../static/news/swiperImg.png",
				], //接口获取图片的url
				currentIndex: 0,
				showUpImg: true
			}
		},
		onLoad() {
			this.banners()
			// this.skipType = option.skipType
		},
		mounted() {
			// this.getNews()
		},
		methods: {
			banners() {
				banner({
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
					useType: 1
				}).then(res => {
					if (res.data.code == 200) {
						let bannerImgs = res.data.result
						console.log('bannerImgs', bannerImgs)
						for (let i = 0; i < bannerImgs.length; i++) {
							console.log('bannerImgs[i]', bannerImgs[i].imagePath.split(','))
							this.bannerImg = this.bannerImg.concat(bannerImgs[i].imagePath.split(','))
						}
						console.log('banner', this.bannerImg)
					} else {
						uni.showToast({
							title: '获取banner失败！'
						})
					}
				})
			},
			mescrollInit(mescroll) {
				// 方案2
				this.mescroll = mescroll;
				// // 方案1
				// let arr = {
				// 	pageNo: this.pageNo,
				// 	pageSize: this.pageSize,
				// 	column: 'createTime',
				// 	order: 'desc',
				// 	relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				// }
				// firstNews(arr).then(res => {
				// 	if (res.data.code !== 200) {
				// 		uni.showToast({
				// 			title: res.data.message,
				// 			icon: 'none',
				// 			duration: 1000
				// 		});
				// 	} else {
				// 		this.newList = res.data.result.records
				// 		this.current = res.data.result.current
				// 		this.pages = res.data.result.pages
				// 		console.log("init`s current,pages", this.newList, this.pages)
				// 	}
				// })
			},
			// 下拉刷新的回调
			downCallback(mescroll) {
				// 方案2，因为方案一有在最后一页上拉后迅速进入详情的情况，此时提示框仍然在，这会让人产生不舒服，
				// 而且为了遮掩‘加载中’的这一提示框的显示时长不好控制，所以方案一并不是最好的选择
				mescroll.resetUpScroll()
				// // 方案1
				// /**
				//  * 重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 然后触发upCallback方法 )
				//  *  mescroll.resetUpScroll()
				//  * 这里是不能用这个方法的，因为不能调upCallback方法，upCallback方法是用来加载下一页的。
				//  * 所以只能用mescrollInit方法
				//  */
				// setTimeout(() => {
				// 	this.mescrollInit()
				// 	// 隐藏下拉加载状态
				// 	mescroll.endSuccess()
				// }, 500)
			},
			// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				// 方案2
				firstNews({
					pageNo: mescroll.num,
					pageSize: mescroll.size,
					column: 'createTime',
					order: 'desc',
					relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				}).then(atteRes => {
					if (mescroll.num == 1) {
						this.newList = atteRes.data.result.records
					} else {
						this.newList = this.newList.concat(atteRes.data.result.records)
					}
					console.log('atteRes', atteRes.data.result.records.length, mescroll.size)
					mescroll.endSuccess(atteRes.data.result.records.length, atteRes.data.result.records.length >=
						mescroll.size);
					// mescroll.endBySize(atteRes.data.result.records.length, atteRes.data.result.total);
				}).catch(() => {
					mescroll.endErr();
				})
				// 方案1
				// this.current = this.current + 1
				// console.log("上拉时的this.current，this.pages", this.current, this.pages);
				// // 结束上拉加载状态  isShowNoMore=true, 显示无更多数据; isShowNoMore=false, 隐藏上拉加载; isShowNoMore=null, 保持当前状态
				// if (this.current <= this.pages) {
				// 	let arr = {
				// 		pageNo: this.current,
				// 		pageSize: 10,
				// 		column: 'createTime',
				// 		order: 'desc',
				// 		relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
				// 	}
				// 	firstNews(arr).then(res => {
				// 		console.log('获取新闻页第' + this.current + '页信息', res.data.result)
				// 		if (res.data.code !== 200) {
				// 			mescroll.endErr();
				// 		} else {
				// 			this.newList = res.data.result.records
				// 		}
				// 	})
				// 	this.isShowNoMore = false; //隐藏上拉加载（转圈圈）;
				// 	mescroll.endUpScroll(this.isShowNoMore);
				// } else {
				// 	this.isShowNoMore = false; //隐藏上拉加载（转圈圈）;
				// 	mescroll.endUpScroll(this.isShowNoMore);
				// 	setTimeout(() => {
				// 		uni.showToast({
				// 			title: '没有更多数据了>_<',
				// 			icon: 'none',
				// 			duration: 500
				// 		});
				// 	}, 10)
				// }
			},
			//swiper获取选中时的图片id
			// swiperChange(e) {
			// 	this.swiper.current = e.detail.current;
			// },
			// changeImg() {
			// 	this.showUpImg = !this.showUpImg
			// }
			toNewsDetail(item) {
				console.log('item', item)
				this.itemNew = item
				let itemNews = {
					newsTitle: this.itemNew.newsTitle,
					createTime: this.itemNew.createTime,
					createBy: this.itemNew.createBy,
					newsContent: this.itemNew.newsContent.replace(/%/g, '%25'),
				}
				uni.navigateTo({
					url: `/pages/news/newsDetail?item=${encodeURIComponent(JSON.stringify(itemNews))}`
				})
			}
		},
	}
</script>

<style lang="scss">
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
		width: 100%;
	}

	.text {
		text-align: center;
		font-weight: 400;
		margin-top: 70rpx;
		// padding-top: 70rpx;
		font-size: 37rpx;
	}

	// 3D轮播样式
	.imageContainer {}





	.swiperactive {
		width: 97%;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx; */
		height: 305rpx;
		top: 0%;
		transition: all .2s ease-in 0s;
	}

	.zhankai {
		text-align: center;

		.iconfont {
			margin-left: 10rpx;
		}
	}
</style>

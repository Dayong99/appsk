<template>
	<view class="posir" style="overflow-y: scroll;height: 100%;">
		<view class="boxinputSearc">
			<view class="stance"></view>
			<view class="flexr-jsb inputSearch">
				<image src="../../static/hlw.png" class="arroent" @tap="cuents"></image>
				<input type="text" placeholder="请输入搜索关键字" v-model="valuekiss">
				<image src="../../static/cab.png" class="rongs" @tap="cancels"></image>
				<view class="sw c181 f32r" @tap="serchValue()">搜索</view>
			</view>
		</view>
		<view style="overflow-y: scroll;height: 100%;margin-top:150rpx;padding-bottom:80rpx;">
			<view v-if="abt==2">
				<!-- <mescroll-uni @down="downCallback" @up="upCallback" :top="100"> -->
				<view class="plr18r ptb18r mb18r flex crpent" v-for="(item,index) in shopListnums" :key="index">
					<view class="shopitem bgwhite">
						<view class="imgboxList">
							<image :src="item.goodsPic" lazy-load="true" class="hw100v"
								@tap="previewImg(item.goodsPic)"></image>
						</view>
						<view class="c555 sw f30r pl20r">{{item.goodsTitle}}</view>
						<view class="flexr-jsb scroek sw">
							<view class="cee">{{item.score}}积分</view>
							<view class="ca5 f24r">库存{{item.stock}}件</view>
						</view>
						<view class="addjian">
							<view class="hw40" @tap="reduce(index)">
								<image src="../../static/jian.png" class="hw100v"></image>
							</view>
							<view class="mth8r">{{item.numid}}</view>
							<view class="hw40 pr17r" @tap="add(index)">
								<image src="../../static/add.png" class="hw100v"></image>
							</view>
						</view>
					</view>
				</view>
				<!-- </mescroll-uni> -->
				<view class='formBtn'>
					<view class="sw c555 f30r">
						<image src="../../static/ai66.png"></image>
						<text>共 <text class="cee">{{current}}</text>件商品，总计 <text class="cee">{{price}}积分</text></text>
					</view>
					<view class="button" @tap="redeem">立即兑换</view>
				</view>
			</view>
			<view v-if="abt==8">
				<view v-for="(user,index) in vdeowLsti" :key="index">
					<view class="bgwhite videoList m20r" @tap="govideo(user)">
						<view class="videobox ptbrlr">
							<!-- <video id="cideoPlay1" :src="user.videoFile" @play="videoPlay" controls="controls" autoplay="autoplay" class="hw100v"></video>
					<view @tap="videoplay()"></view> -->
							<image class="videoImg hw100v" :src="user.videoPic"></image>
						</view>
						<view class="flex contList">
							<view class="bcee read sw f22r cwhite fcenter br4r">{{user.operaStatus==1?'已观看':'未观看'}}
							</view>
							<view class="f33r cblack sw ellipsis">{{user.title}}</view>
						</view>
						<view class="pl42r mb8r c979 sw flex f28r flexr-jsb">
							<view class="ellipsis">观看该视频可获取 +{{user.score}} 分</view>
							<view class="mr28r ellipsis">上传人：{{user.createBy}}</view>
						</view>
						<view class="pl42r c979 sw f28r ellipsis">{{user.createTime}}</view>
					</view>
				</view>
			</view>
			<!-- <mescroll-uni @down="downCallbacks" @up="upCallbacks" :top="95"> -->
			<view v-if="abt==1">
				<block v-for="(user,index) in newlistDate" :key="index">
					<view class="plr18r ptb18r bgwhite bbs2r hjkle" @click="particulars(user.id)">
						<view class="flex conts">
							<view class="bcee read sw f22r cwhite fcenter br4r" style="margin-left:0">
								{{user.operaStatus==1?'已阅读':'未阅读'}}</view>
							<view class="c181 f33r sw ellipsis">{{user.title}}</view>
						</view>
						<view class="flexr-jsb c979 f28r mb8r">
							<view>阅读该文章可获取 +{{user.score}} 分</view>
							<view>上传人：{{user.createBy}}</view>
						</view>
						<view class="flexr-jsb c979 sp f28r">上传时间：{{user.createTime}}</view>
					</view>
				</block>
			</view>
			<view class="boxmesg" v-if="cuentping">
				<image src="../../static/messagecenter.png" class="megpent"></image>
				<view class="fcenter nonemsg sw f32r c979">暂无消息</view>
			</view>
			<!-- <view class="boxmesg">
			<view class="message posia">
				<image src="../../static/messagecenter.png" class="hw100v"></image>
					<view class="fcenter nonemsg sw f32r c979">暂无消息</view>
			</view>
		</view> -->
			<!-- </mescroll-uni> -->
		</view>
	</view>
</template>

<script>
	import {
		getSpecialList,
		getProductHottestList,
		getProductList,
		shopSearch,
		redepte
	} from '@/api/ShopServer.js';
	import {
		getUserAtteUserList,
		addUserAtte,
		delUserAtte,
		getUserVideoList
	} from "@/api/UserServer.js"


	import AlbumCard from '@/components/album-card/album-card'
	export default {
		components: {
			AlbumCard
		},

		// props: {
		//   // 连续触发刷新
		//   refresh: {
		//     type: Boolean,
		//     default: false
		//   }
		// },

		data() {
			return {
				// 滚动区实例
				mescroll: null,
				namecong: '积分商城',
				valuekiss: "",
				newlistDate: [],
				abt: '',
				shopnum: 0,
				current: 0,
				price: 0,
				giftList: [],
				shopListnums: [],
				vdeowLsti: [],
				cuentping: true
				// 
			}
		},

		watch: {
			// 监听底部导航双击触发
			// refresh(newVal) {
			//   if (newVal) this.fnRefreshData();
			// }
		},
		onLoad(options) {
			if (options && options.abt) {
				this.abt = options.abt
			}
		},
		onShow() {
			console.log(this.abt)
			this.serchValue();
		},
		computed: {
			userAtteUserListData() {
				console.log(23333333333)
				console.log(this.$store.getters['user/getUserAtteUserListData'])
				return this.$store.getters['user/getUserAtteUserListData']
			},
			// 专题列表
			specialListData() {
				return this.$store.getters['shop/getSpecialListData']
			},

			// // 热卖列表
			// productHottestListData() {
			//   return this.$store.getters['shop/getProductHottestListData']
			// },
			// 精选推荐列表
			productBestListData() {
				return this.$store.getters['shop/getProductBestListData']
			},
			// 计算距离顶部距离差异
			calTop() {
				let top = 90;
				// #ifdef H5
				top = 630;
				// #endif
				return top
			}
			//
		},

		methods: {
			govideo(item) {
				let videLook = JSON.stringify(item)
				uni.navigateTo({
					url: `/pages/album-details/album-details?videLook=${videLook}`
				})
			},
			particulars(item) {
				uni.navigateTo({
					url: `/pages/album-rank/album-rank?particulars=${item}&timepng=${this.operaStatus}`
				})
			},
			async redeem() {
				let ieList = [];
				console.log(this.shopListnums)
				this.shopListnums.forEach(a => {
					if (a.numid > 0) {
						ieList.push({
							conversion: a.numid,
							goodsId: a.id,
							personId: this.$store.getters['user/getAccountInfoData'].id,
							relTenantIds: a.relTenantIds,
							score: a.score
						})
					}
				})
				if (ieList.length == 0) {
					uni.showToast({
						title: '请选择商品！',
						icon: 'none'
					})
				} else {
					let data = {
						convertList: ieList,
						totalScore: this.price
					}
					let shopsListt = await redepte(JSON.stringify(data))
					console.log(shopsListt)
					let that = this;
					uni.showModal({
						title: '提示',
						content: '确定兑换此礼品么？',
						success: function(res) {
							if (res.confirm) {
								that.specialListData.forEach(v => {
									v.numid = 0
								})
								that.current = 0;
								that.price = 0;
								uni.showToast({
									title: shopsListt.data.message,
									icon: 'none'
								})
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/punish-list/punish-list'
									})
								}, 500);
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}

			},
			reduce(index) {
				let that = this;
				let carList = that.shopListnums;
				let num = carList[index].numid;
				if (num <= 0) {
					return false;
				} else {
					num = num - 1;
					carList[index].numid = num;
					this.shopListnums = carList
				}
				var sum = 0
				for (var i = 0; i < carList.length; i++) {
					var qC = that.shopListnums[i].numid;
					sum += qC;
				}
				var price = 0;
				if (sum > 0) {
					for (var i = 0; i < carList.length; i++) {
						var qB = that.shopListnums[i].score;
						var qR = that.shopListnums[i].numid;
						price += qB * qR;
					}
				}
				this.current = sum;
				this.price = price
			},
			add(index) {
				let carts = this.shopListnums;
				let num = carts[index].numid;
				num = num + 1;
				carts[index].numid = num;
				this.shopListnums = carts
				var sum = 0
				for (var i = 0; i < carts.length; i++) {
					var qC = this.shopListnums[i].numid;
					sum += qC;
				}
				var price = 0;
				if (sum > 0) {
					for (var i = 0; i < carts.length; i++) {
						var qB = this.shopListnums[i].score;
						var qR = this.shopListnums[i].numid;
						price += qB * qR;
					}
				}
				this.current = sum;
				this.price = price
			},
			serchValue() {
				if (this.abt == 1) {
					getUserAtteUserList({
						title: '*' + this.valuekiss + '*',
						pageNo: 1,
						pageSize: 10000,
						personId: this.$store.getters['user/getAccountInfoData'].id
					}).then(atteRes => {
						console.log(atteRes)
						this.newlistDate = atteRes.data.result.records
						if (this.newlistDate.length == 0) {
							this.cuentping = true;
						} else {
							this.cuentping = false;
						}
					}).catch(() => {

					})
				} else if (this.abt == 2) {
					let params = {
						personId: this.$store.getters['user/getAccountInfoData'].id,
						relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
						goodsTitle: '*' + this.valuekiss + '*',
						pageNo: 1,
						pageSize: 10000
					}
					shopSearch(params).then(res => {
						res.data.result.records.forEach(a => {
							Object.assign(a, {
								numid: 0
							})
						})
						this.shopListnums = res.data.result.records
						if (this.shopListnums.length == 0) {
							this.cuentping = true;
						} else {
							this.cuentping = false;
						}
					})
				} else if (this.abt == 8) {
					getUserVideoList({
						personId: this.$store.getters['user/getAccountInfoData'].id,
						title: '*' + this.valuekiss + '*'
					}).then(atteRes => {
						console.log(atteRes)
						this.vdeowLsti = atteRes.data.result.records
						if (this.vdeowLsti.length == 0) {
							this.cuentping = true;
						} else {
							this.cuentping = false;
						}
					})
				}

			},
			cuents() {
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
			cancels() {
				this.valuekiss = ''
			},
			/// mescroll组件初始化的回调,可获取到mescroll对象
			// mescrollInit(mescroll) {
			//   this.mescroll = mescroll;
			// },
			/// 下拉刷新的回调
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			downCallback(mescroll) {
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			//  upCallback(mescroll) {
			//  		  console.log(1111)
			//  		  let params = {
			//  		    personId:this.$store.getters['user/getAccountInfoData'].id,
			//  		    relTenantIds:1,
			//  		    pageNo: mescroll.num,
			//  		    pageSize: mescroll.size
			//  		  }
			//  		  shopSearch(params).then(res => {
			//  			  console.log(res)
			//  			  if (mescroll.num == 1) {
			//  			    this.$store.commit('shop/setSpecialListData', res.data.result.records)
			//  			  } else {
			//  			    this.$store.commit('shop/setSpecialListData', this.specialListData.concat(res.data.result.records))
			//  			  } 
			//  			  mescroll.endSuccess(res.data.result.records.length, res.data.result.records.length >= mescroll.size);
			//  		})
			// }
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			// upCallback(mescroll) {
			//   if (mescroll.num == 1) {
			//     /// 首次加载专题最热推荐
			//     Promise.all([
			//       getSpecialList({
			//         page: 1,
			//         count: 3
			//       }),
			//       getProductHottestList(),
			//       getProductList({
			//         good: true,
			//         page: mescroll.num,
			//         count: mescroll.size
			//       }),
			//     ]).then(resArray => {
			//       this.$store.commit('shop/setSpecialListData', resArray[0].data.Data)
			//       this.$store.commit('shop/setProductHottestListData', resArray[1].data.Data)
			//       this.$store.commit('shop/setProductBestListData', resArray[2].data.Data)
			//       mescroll.endSuccess(resArray[2].data.Data.length, resArray[2].data.Data.length >= mescroll.size);
			//     }).catch(() => {
			//       mescroll.endSuccess(0, false);
			//     });
			//   } else {
			//     // 推荐商品列表追加
			//     getProductList({
			//       good: true,
			//       page: mescroll.num,
			//       count: mescroll.size
			//     }).then(productRes => {
			//       this.$store.commit('shop/setProductBestListData', this.productBestListData.concat(productRes.data.Data))
			//       mescroll.endSuccess(productRes.data.Data.length, productRes.data.Data.length >= mescroll.size);
			//     }).catch(() => {
			//       mescroll.endErr();
			//     });
			//   }
			// },
			// upCallbacks(mescroll) {
			//   getUserAtteUserList({
			//     pageNo: mescroll.num,
			//     pageSize: mescroll.size,
			//  title:this.valuekiss
			//   }).then(atteRes => {
			//     if (mescroll.num == 1) {
			//       this.$store.commit('user/setUserAtteUserListData', atteRes.data.result.records)
			//     } else {
			//       this.$store.commit('user/setUserAtteUserListData', this.userAtteUserListData.concat(atteRes.data.result.records))
			//     } 
			//     mescroll.endSuccess(atteRes.data.result.records.length, atteRes.data.result.records.length >= mescroll.size);
			//   }).catch(() => {
			//     mescroll.endErr();
			//   })
			// },
			/// 获取新数据
			// fnRefreshData() {
			//   this.mescroll.scrollTo(0, 300);
			//   setTimeout(() => {
			//     this.mescroll.resetUpScroll(true)
			//   }, 1000)
			// },
		}
	}
</script>

<style>
	.shopitem {
		width: 344rpx;
		height: 460rpx;
		margin-right: 19rpx;
	}

	.imgboxList {
		width: 315rpx;
		height: 260rpx;
		margin: 14rpx;
	}

	.scroek {
		padding-left: 21rpx;
		padding-right: 16rpx;
		margin-top: 10rpx;
		margin-bottom: 12rpx;
	}

	.addjian {
		float: right;
		display: flex;
	}

	.formBtn {
		display: flex;
		width: 701rpx;
		padding-left: 27rpx;
		padding-right: 22rpx;
		height: 100rpx;
		position: fixed;
		bottom: 0;
		background: #FFFFFE;
		justify-content: space-between;
		line-height: 100rpx;
	}

	.formBtn .button {
		width: 170rpx;
		height: 70rpx;
		background: #649aff;
		border-radius: 35rpx;
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FEFFFF;
		line-height: 70rpx;
		text-align: center;
		margin-top: 17rpx;
	}

	.formBtn image {
		width: 38rpx;
		height: 38rpx;
		vertical-align: middle;
		margin-top: -6rpx;
		margin-right: 16rpx;
	}

	/* 搜索 */
	.boxinputSearc {
		position: fixed;
		height: 153rpx;
		z-index: 100;
		background: white;
		border-bottom: 1px solid #EEEEEE;
	}

	.stance {
		height: 52rpx;
		width: 750rpx;
		background: #666;
	}

	.arroent {
		width: 21rpx;
		height: 38rpx;
		margin-top: 31rpx;
	}

	.inputSearch {
		padding-left: 28rpx;
		padding-right: 35rpx;
		line-height: 101rpx;
		height: 101rpx;
		position: relative;
	}

	.inputSearch input {
		width: 537rpx;
		height: 64rpx;
		background: #F6F7F9;
		border-radius: 10rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #B6C2CE;
		margin-top: 18rpx;
		padding-left: 17rpx;
	}

	.uni-input-input,
	.uni-input-wrapper {
		height: 64rpx !important;
	}

	.rongs {
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		top: 35rpx;
		right: 140rpx;
	}

	.read {
		width: 78rpx;
		height: 35rpx;
		margin-right: 10rpx;
		margin-top: 4px;
	}

	.crpent {
		float: left !important;
		width: 320rpx;
		padding-left: 20rpx;
		padding-right: 25rpx !important;
	}

	.megpent {
		width: 321rpx;
		height: 339rpx;
		top: 305rpx;
		left: 211rpx;
		position: fixed;
	}

	.boxmesg {
		width: 100%;
		position: fixed;
		top: 705rpx;
		left: 0;
	}

	.videobox {
		width: 635rpx;
		height: 361rpx;
	}

	.read {
		width: 78rpx;
		height: 35rpx;
		margin-right: 10rpx;
		margin-top: 4px;
		margin-left: 37rpx;
	}

	/* .contList{
			  margin-bottom:18rpx;
		} */
	.videoList {
		width: 690rpx;
		height: 580rpx;
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

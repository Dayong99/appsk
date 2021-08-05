<template>
 <view>
	 <view v-if="persona==1">
	 	<view class="homehead">
			<!-- <image class="boximgs" @tap="goback" src="../../static/fanhui1.png"></image> -->
	 		<view class="f34r sw cwhite fcenter posia z100 homeing">安全培训积分兑换</view>
	 		<!-- <image src="../../static/saoyisao.png" class="saoma" @click="scanCode()"></image> -->
	 		<image src="../../static/aaa.png" mode="" class="posia newlogo"></image>
	 		<view class="posia cwhite boxscre fcenter posi292">
	 			<view class="sw f56r">{{objsp.curScore?objsp.curScore:0}}</view>
	 			<view class="sw f28r d6e">当前积分</view>
	 			<view class="c184 detail br7r d6e f28r" @tap="particulars(objsp.curScore)">积分明细 ></view>
	 		</view>
	 	</view>
	 	<view class="scored br10r cwhite fcenter bshow flexr-jsa mauto z100 bgwhite posia">
	 		<view>
	 			<view class="f42r sw l70r cee mt32r">{{objsp.useScore?objsp.useScore:0}}</view>
	 			<view class="c979 l70r f28r">已兑换积分</view>
	 		</view>
	 		<view class="wire"></view>
	 		<view>
	 			<view class="f42r sw l70r cee mt32r">{{objsp.accScore?objsp.accScore:0}}</view>
	 			<view class="c979 l70r f28r">累计积分</view>
	 		</view>
	 	</view>
	 	<view class="inout mauto mt28r" @tap="goshop">
	 		<image src="/static/home/inout.png" alt="" class="hw100v"></image>
	 	</view>
	 	<view class="operation br10r bgwhite mauto mt28r">
	 		<view class="flex" @tap="fnPages('black-list')">
	 			<view class="hw61r mtbrlr">
	 				<image src="/static/home/video.png" mode="" class="hw100v"></image>
	 			</view>
	 			<view class="h170r bbdash2r">
	 				<view class="sw f33r c181 pt46r">观看视频</view>
	 				<view class="sp f28r c979 w533r mt15r">今日观看视频获得+{{objSubject.res2price}}分</view>
	 			</view>
	 		</view>
			<view class="flex" @tap="fnPages('atte-list')">
				<view class="hw61r mtbrlr">
					<image src="/static/home/aitr.png" mode="" class="hw100v"></image>
				</view>
				<view class="h170r bbdash2r">
					<view class="sw f33r c181 pt46r">阅读文章</view>
					<view class="sp f28r c979 w533r mt15r">今日阅读文章获得+{{objSubject.res1price}}分</view>
				</view>
			</view>	
			<view class="flex" @tap="fnPages('comm-list')">
				<view class="hw61r mtbrlr">
					<image src="/static/home/safe.png" mode="" class="hw100v"></image>
				</view>
				<view class="h170r">
					<view class="sw f33r c181 pt46r">安全知识答题</view>
					<view class="sp f28r c979 w533r mt15r">每日一题,用知识换取积分</view>
				</view>
			</view>	
	 	</view>
	 </view>
	 <view v-if="persona==2">
		 <view class="giftchagnes">礼品兑换</view>
		 <view class="userhead">
			 <image src="../../static/user.png" mode="" class="userlog"></image>
			 <image src="../../static/saoq.png" class="saonet" @click="scanCode()"></image>
			 <text class="fcenter posia f28r saowen sw">扫一扫</text>
		 </view>
		<view class="tableList">
			<view class="recodesnt">兑换记录</view>
			<mescroll-uni @down="downCallback" @up="upCallback" :top="667">
			  <view v-for="(item,index) in punishListData" :key="index" class="flex userwh">
						 <view class="recordimg">
							<image class="hw100v" :src="item.goodsPic"></image>
						</view>
						<view class="detailfient">
							<view class="flex mt37r">
								<view class="wh7835 sw f22r cwhite mt5r fcenter" style="background: #B0B0B0;">{{item.drawStatus_dictText}}</view>
								<view class="sw c181 f32r ml10r">{{item.goodsId_dictText}}*{{item.conversion}}</view>
							</view>
							<view class="userling">
								<view class="c979 f25r sw">
									<text>兑换人:</text>
									<text>{{item.personId_dictText}}</text>
								</view>
								<view class="c979 f25r sw">
									<text>兑换积分:</text>
									<text>{{item.score}}分</text>
								</view>
								<view class="c979 f25r sw">
									<text>兑换时间:</text>
									<text>{{item.convertDate}}</text>
								</view>
							</view>
						</view>
			  </view>
			</mescroll-uni>
		</view>
	 </view>
 </view>
</template>

<script>
  import {
    getSquareList,
    getMainList,
    getAtteList
  } from "@/api/TrendServer.js"
  import {
    addTop,
    delTop,
    addSave,
    delSave
  } from "@/api/InteractServer.js"
  import {
    addUserAtte,
    delUserAtte,
    addUserBlack,
    delUserBlack
  } from "@/api/UserServer.js"
  import {
    getUserViolationList
  } from "@/api/CommonServer.js"
  // 动态信息项卡片组件
  export default {
    data() {
      return {
		  names:this.$store.getters['user/getAccountInfoData'].personName,
        status: {
          recommend: true,
          follow: false,
          square: false,
        },
        // 双击刷新
        clickRefresh: false,
        // 刷新间隔
        timeOutHome: 0,
        // 列表最大ID定位
        maxID: [-1, -1, -1],
        // 刷新组件实例 
        mescroll: [],
		objSubject:{},
		persona:1,
		objsp:{}
        //
      }
    },

    watch: {
      // 监听底部导航双击触发
      refresh(val) {
        if (val && !this.clickRefresh) this.fnRefreshData();
      }
    },

    computed: {
      // 推荐列表数据
      mainData() {
        return this.$store.getters['trend/getMainData']
      },
      // 关注列表数据
      atteData() {
        return this.$store.getters['trend/getAtteData']
      },
      // 广场列表数据
      squareData() {
        return this.$store.getters['trend/getSquareData']
      },
	  punishListData() {
	    return this.$store.getters['common/getPunishListData']
	  },
      //
    },
	onLoad(){
		this.$store.getters['user/getAccountInfoData'].userType?this.persona=1:this.persona=2
		// this.menulist();
		 this.initContent();
		 this.PersonIdList()
		
	},
    methods: {
		goback(){
			uni.navigateBack({
				
			})
		},
		async PersonIdList(){
			try{
				let params={personId:this.$store.state.user.accountInfo.id||0}
				let queryByPersonIdList=await getMessageListByType(params)
				console.log(queryByPersonIdList.data)
				this.objsp=queryByPersonIdList.data.result
			}catch(e){
				
			}	
		},
		async initContent(){
			let data={
				relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let themeContent=await subjectCont(data)
			let numVideo=0;
			let numArticle=0;
			let res1price=0;
			let res2price=0;
			await getUserAtteUserList({
			  pageNo: 1,
			  pageSize: 10000,
			  personId:this.$store.getters['user/getAccountInfoData'].id
			}).then(res1 => {
			 console.log(res1)
			  res1.data.result.records.forEach(a=>{
				  if(a.operaStatus==1){
					  numArticle++;
					  res1price+=a.score
				  }
			  })
			})
			console.log(numArticle)
			await getUserVideoList({
			  pageNo: 1,
			  pageSize: 10000,
			  personId:this.$store.getters['user/getAccountInfoData'].id
			}).then(res2 => {
				console.log(res2)
				res2.data.result.records.forEach(b=>{
				  if(b.operaStatus==1){
					  numVideo++;
					  res2price+=b.score
				  }
				})
			})
			this.objSubject={
				videoSubject:themeContent.data.result.records[0].limitVideo,
				articelSubject:themeContent.data.result.records[0].limitArticle,
				numVideo:numVideo,
				numArticle:numArticle,
				res1price:res1price,
				res2price:res2price
			}
			this.$store.commit('album/setAlbumInfoData',JSON.stringify(this.objSubject))
			this.$store.commit('topic/setTopicInfoData', themeContent.data.result.records[0].limitAnswer)
		},
		downCallback(mescroll) {
		  // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
		  mescroll.resetUpScroll()
		},
		/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
		upCallback(mescroll) {
		  getUserViolationList({
		    pageNo: mescroll.num,
		    pageSize: mescroll.size,
			drawStatus:1
			// personId:this.$store.getters['user/getAccountInfoData'].id
		  }).then(violaRes => {
		    if (mescroll.num == 1) {
		      this.$store.commit('common/setPunishListData', violaRes.data.result.records)
		    } else {
		      this.$store.commit('common/setPunishListData', this.punishListData.concat(violaRes.data.result.records))
		    }
		    mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >= mescroll.size);
		  }).catch(() => {
		    mescroll.endErr();
		  })
		},
		
		// 扫码
		scanCode() {
			 uni.scanCode({
				 success: function (res) {
					 uni.navigateTo({
					 	url:'/pages/draw/draw?scant='+res.result
					 })
				 }
			 });
			 
		},
		particulars(tool){
			tool=tool||0
			uni.navigateTo({
			  url: '/pages/topic-details/topic-details?curScore='+tool
			})
		},
      /// mescroll组件初始化的回调,可获取到mescroll对象
      // mescrollInit(mescroll) {
      //   this.mescroll[this.current] = mescroll
      // },
      // /// 下拉刷新的回调
      // downCallback(mescroll) {
      //   this.maxID[this.current] = -1;
      //   // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      //   mescroll.resetUpScroll()
      // },
      // /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      // upCallback(mescroll) {
      //   // 联网获取数据
      //   [getMainList, getAtteList, getSquareList][this.current]({
      //     page: mescroll.num,
      //     maxid: this.maxID[this.current],
      //     count: mescroll.size
      //   }).then(res => {
      //     // 固定项数据往后加载
      //     if (mescroll.num == 1) this.maxID[this.current] = res.data.Data[0].ObjectID;
      //     // 不同标签存入不同数据变量
      //     if (this.current == 0) {
      //       let arrayData = mescroll.num == 1 ? res.data.Data : this.mainData.concat(res.data.Data)
      //       this.$store.commit('trend/setMainData', arrayData)
      //     }
      //     if (this.current == 1) {
      //       let arrayData = mescroll.num == 1 ? res.data.Data : this.atteData.concat(res.data.Data)
      //       this.$store.commit('trend/setAtteData', arrayData)
      //     }
      //     if (this.current == 2) {
      //       let arrayData = mescroll.num == 1 ? res.data.Data : this.squareData.concat(res.data.Data)
      //       this.$store.commit('trend/setSquareData', arrayData)
      //     }
      //     // 数据获取成功关闭loading区
      //     mescroll.endSuccess(res.data.Data.length, res.data.Data.length > 0);
      //   }).catch(() => {
      //     // mescroll.endErr();
      //     mescroll.endSuccess(0, false);
      //   });
      // },

      /// 导航选项双击刷新
      fnRefreshData() {
        this.maxID[this.current] = -1;
        this.mescroll[this.current].scrollTo(0, 300);
        setTimeout(() => {
          this.mescroll[this.current].resetUpScroll(true)
        }, 1000)
      },
      /// 顶部导航选项点击
      fnBarClick(e) {
        let current = typeof e == 'object' ? e.detail.current : e;
        // 是否当前项点击
        if (this.current == current) {
          this.timeOutHome += 1;
          // 是否为刷新值和连续触发
          if (!this.clickRefresh && this.timeOutHome >= 2) {
            // 刷新值开
            this.clickRefresh = true;
            // 获取新数据
            this.fnRefreshData();
            // 定时器重置
            this.timeOutHome = setTimeout(() => {
              // 清除定时器
              clearTimeout(this.timeOutHome)
              // 连续触发记录重置
              this.timeOutHome = 0;
              // 刷新值关
              this.clickRefresh = false;
            }, 5000);
          }
          return;
        } else {
          // 改变顶部导航选中 
          this.current = current;
          // 首次选中激活顶部导航关联页状态
          if (!this.status.follow && current == 1) this.status.follow = true;
          if (!this.status.square && current == 2) this.status.square = true;
          // 清除定时器
          clearTimeout(this.timeOutHome)
          // 连续触发记录重置
          this.timeOutHome = 0;
          // 刷新值关
          this.clickRefresh = false;
        }
      },

      /// 展卡跳转详情页
      fnCardInfo(e) {
        console.log(e.ObjectType);
        if (e.ObjectType == 'trend') {
          uni.navigateTo({
            url: `/pages/trend-details/trend-details?id=${e.ObjectID}&fromPage=home&current=${this.current}`
          })
          return
        }
        if (e.ObjectType == 'album') {
          uni.navigateTo({
            url: `/pages/album-details/album-details?id=${e.ObjectID}&fromPage=home&current=${this.current}`
          })
          return
        }
        if (e.ObjectType == 'topic') {
          uni.navigateTo({
            url: `/pages/topic-details/topic-details?id=${e.ObjectID}&fromPage=home&current=${this.current}`
          })
          return
        }
        if (e.ObjectType == 'topicreply') {
          uni.navigateTo({
            url: `/pages/topicreply-details/topicreply-details?id=${e.ObjectID}&fromPage=home&current=${this.current}`
          })
          return
        }
        if (e.ObjectType == 'video') {
          uni.navigateTo({
            url: `/pages/video-details/video-details?id=${e.ObjectID}&fromPage=home&current=${this.current}`
          })
          return
        }
        if (e.ObjectType == 'word') {
          uni.navigateTo({
            url: `/pages/word-details/word-details?id=${e.ObjectID}&fromPage=home&current=${this.current}`
          })
          return
        }
      },
      /// 展卡评论跳转详情页
      fnCardComm(e) {
        console.log(e.ObjectType);
        if (e.ObjectType == 'trend') {
          uni.navigateTo({
            url: `/pages/trend-details/trend-details?id=${e.ObjectID}&fromPage=home&current=${this.current}&comm=true`
          })
          return
        }
        if (e.ObjectType == 'album') {
          uni.navigateTo({
            url: `/pages/album-details/album-details?id=${e.ObjectID}&fromPage=home&current=${this.current}&comm=true`
          })
          return
        }
        if (e.ObjectType == 'topic') {
          uni.navigateTo({
            url: `/pages/topic-details/topic-details?id=${e.ObjectID}&fromPage=home&current=${this.current}&comm=true`
          })
          return
        }
        if (e.ObjectType == 'topicreply') {
          uni.navigateTo({
            url: `/pages/topicreply-details/topicreply-details?id=${e.ObjectID}&fromPage=home&current=${this.current}&comm=true`
          })
          return
        }
        if (e.ObjectType == 'video') {
          uni.navigateTo({
            url: `/pages/video-details/video-details?id=${e.ObjectID}&fromPage=home&current=${this.current}&comm=true`
          })
          return
        }
      },
      /// 展卡跳转用户中心页 
      fnCardUser(e) {
        uni.navigateTo({
          url: `/pages/user-info/user-info?id=${e.User.ID}`
        })
      },
      /// 展卡跳转荟吧页
      fnCardHuiba(e) {
        uni.navigateTo({
          url: `/pages/huiba-details/huiba-details?id=${e.ID}`
        })
      },
      /// 展卡点赞 
      // fnCardTop(e) {
      //   let filItem = {};
      //   // 推荐
      //   if (this.current == 0) filItem = this.mainData.filter(item => item.ObjectID == e.ObjectID)[0];
      //   // 关注
      //   if (this.current == 1) filItem = this.atteData.filter(item => item.ObjectID == e.ObjectID)[0];
      //   // 广场
      //   if (this.current == 2) filItem = this.squareData.filter(item => item.ObjectID == e.ObjectID)[0];
      //   let params = {
      //     objecttype: filItem.ObjectType,
      //     objectid: filItem.ObjectID
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
      /// 展卡收藏
      // fnCardSave(e) {
      //   let filItem = {};
      //   // 推荐
      //   if (this.current == 0) filItem = this.mainData.filter(item => item.ObjectID == e.ObjectID)[0];
      //   // 关注
      //   if (this.current == 1) filItem = this.atteData.filter(item => item.ObjectID == e.ObjectID)[0];
      //   // 广场
      //   if (this.current == 2) filItem = this.squareData.filter(item => item.ObjectID == e.ObjectID)[0];
      //   let params = {
      //     objectid: filItem.ObjectID,
      //     objecttype: filItem.ObjectType
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
      /// 展卡更多-关注
      // fnCardFollow(e) {
      //   // 用户被关注
      //   if (e.User.UserAtte) {
      //     uni.showModal({
      //       content: '确定要取消关注TA吗？',
      //       success: res => {
      //         if (res.confirm) {
      //           delUserAtte(e.User.ID).then(delRes => {
      //             if (delRes.data.Data == false) return
      //             this.atteData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
      //               false)
      //             this.mainData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
      //               false)
      //             this.squareData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte =
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
      //       this.atteData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte = true)
      //       this.mainData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte = true)
      //       this.squareData.filter(item => item.User.ID == e.User.ID).map(item => item.User.UserAtte = true)
      //       // 登录用户关注数加
      //       let tempUser = this.$store.getters['user/getUserInfoData']
      //       tempUser.AtteCount++
      //       this.$store.commit('user/setUserInfoData', tempUser)
      //     })
      //   }
      // },
      /// 展卡更多-拉黑
      fnCardBlack(e) {
        // 用户是否被列入黑名单
        e.User.Black ? delUserBlack(e.User.ID) : addUserBlack(e.User.ID)
      },
      /// 展卡更多-跳转举报页
      fnCardReport(e) {
        uni.navigateTo({
          url: `/pages/report/report?id=${e.ObjectID}&type=${e.ObjectType}`
        })
      },
	  fnPages(type){
		  console.log(type)
		  uni.navigateTo({
		    url: `/pages/${type}/${type}`
		  })
	  },
	  goshop(){
		  uni.navigateTo({
		  	url:'/pages/signin-record/signin-record'
		  })
	  }
      //
    }
  }
</script>

<style>
	.homehead{
		width: 750rpx;
		height: 554rpx;
		position: relative;
	}
	.newlogo{
		top:0;
		left: 0;
		width: 100%;
	}
	.homeing{
		left: 240rpx;
		top:85rpx;
	}
	.detail{
		width: 100%;
		height: 56rpx;
		line-height: 56rpx;
		margin-top:20rpx
	}
	/* 二级 */
	.scored{
		width: 695rpx;
		height: 186rpx;
		left: 28rpx;
		top:370rpx;
	}
	.inout{
		width: 694rpx;
		height:167rpx;
	}
	.operation{
		width: 691rpx;
		height: 514rpx;
		margin-bottom: 176rpx;
		overflow: hidden;
	}
	.boxscre{
		width: 167rpx;
	}
	.saoma{
		position: absolute;
		right: 30rpx;
		top:90rpx;
		width: 35rpx;
		height: 35rpx;
		z-index: 999;
	}
  /* 主页导航选中高亮 */
  .barsh-home {
    color: #FFFFFF;
    font-size: 36rpx;
    font-weight: bold;
  }
  .wire{
	  width: 1rpx;
	  height: 107rpx;
	  background: #E4E4E4;
	  margin-top:33rpx;
  }
  /* 管理者 */
  .userhead{
	  width: 750rpx;
	  height: 861rpx;
	  position: relative;
  }
  .userhead .userlog{
	  width: 100%;
	  height: 100%;
	  position: absolute;
	  top:0;left: 0;
  }
  .userhead .saonet{
	  position: absolute;
	  width: 193rpx;
	  height: 193rpx;
	  top:243rpx;
	  left: 278rpx;
  }
  .saowen{
	position: absolute;
	top:467rpx;
	left:335rpx;
	color: #D6E2FF;
}


/* 列表 */
	.recordimg{
		width:194rpx;
		height:150rpx;
		margin-top:28rpx;
		margin-right: 21rpx;
		margin-left: 28rpx;
	}
	.detailfient{
		width:516rpx;
	}
	.detailbox{
		color:#FEFFFF;
		width: 111rpx;
		height: 56rpx;
		margin-right: 28rpx;
		margin-top:-20rpx;
		background: linear-gradient(90deg, #649BFF, #477CF3);
		box-shadow: 0rpx 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 28rpx;
		line-height: 56rpx;
	}
	/* 外部 */
	.userwh{
		width: 691rpx;
		margin:0 auto;
		border-bottom: 1rpx solid #eee;
		height: 206rpx;
	}
	.tableList{
		width: 691rpx;
		overflow: hidden;
		height: 917rpx;
		background: #FFFFFF;
		border-radius: 10rpx;		
		position: fixed;
		top:589rpx;
		left:29rpx;
	}
	.recodesnt{
		height: 83rpx;
		line-height: 83rpx;
		margin-left: 31rpx;
		border-bottom: 1rpx solid #eee;
	}
	.mescroll-uni-warp{
		position: absolute;
		top:0;
		width: 100%;
	}
	.giftchagnes{
		position: absolute;
		top:85rpx;
		left: 308rpx;
		z-index: 500;
		font-size: 35rpx;
		font-family: 'PingFang SC';
		font-weight: 700;
		color: #FFFFFF;
	}
	.userling{
		line-height: 35rpx;
	}
	/* 返回 */
	.boximgs{
		position: absolute;
		top: 45px;
		left: 28rpx;
		z-index: 999;
		width: 21rpx;
		height: 37rpx;
	}
</style>

<template>
  <view>
	<album-card :input="true" :congint="namecong" :abt="8"></album-card>
    <!-- 滚动内容区 -->
    <mescroll-uni @down="downCallback" @up="upCallback" :top="153">
      <block v-for="(user,index) in userAtteUserListData" :key="index">
        <view class="bgwhite videoList m20r" @tap="govideo(user)">
			<view class="videobox ptbrlr">
				<!-- <video id="cideoPlay1" :src="user.videoFile" @play="videoPlay" controls="controls" autoplay="autoplay" class="hw100v"></video>
				<view @tap="videoplay()"></view> -->
				<image class="videoImg hw100v" :src="user.videoPic"></image>
			</view>
			<view class="flex contList">
				<view class="bcee read sw f22r cwhite fcenter br4r">{{user.operaStatus==1?'已观看':'未观看'}}</view>
				<view class="f33r cblack sw ellipsis">{{user.title}}</view>
			</view>
			<view class="pl42r mb8r c979 sw flex f28r flexr-jsb">
				<view class="ellipsis">观看该视频可获取 +{{user.score}} 分</view>
				<view class="mr28r ellipsis">上传人：{{user.createBy_dictText}}</view>
			</view>
			<view class="pl42r c979 sw f28r">{{user.createTime}}</view>
        </view>
      </block>
    </mescroll-uni>
  </view>
</template>

<script> 
  import {
    getUserVideoList,
    addUserAtte,
    delUserAtte,
  } from "@/api/UserServer.js"
	import AlbumCard from '@/components/album-card/album-card'
  export default {
	  onNavigationBarButtonTap() {
		  console.log("你点击了按钮")
	  },
	  onNavigationBarSearchInputChanged () {
		  console.log("你输入了信息")
	  },
    data() {
      return {
        id: -1, 
		namecong:'视频列表'
      }
    },
	components:{
		AlbumCard
	},
    computed: {
      // 用户
      userAtteUserListData() {
		  console.log(123)
		  console.log(this.$store.getters['user/getUserAtteUserListData'])
        return this.$store.getters['user/getUserAtteUserListData']
      },
    },
    onLoad(options) {
      if (options && options.id) {
        this.id = parseInt(options.id) 
      }
    },
    methods: {
		
		govideo(item){
			let videLook=JSON.stringify(item)
			uni.navigateTo({
				url:`/pages/album-details/album-details?videLook=${videLook}`
			})
		},
      /// 下拉刷新的回调
      downCallback(mescroll) {
        // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        mescroll.resetUpScroll()
      },
      /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      upCallback(mescroll) {
        getUserVideoList({
          pageNo: mescroll.num,
          pageSize: mescroll.size,
		  personId:this.$store.getters['user/getAccountInfoData'].id
        }).then(atteRes => {
			console.log(mescroll.num)
			console.log(345)
          if (mescroll.num == 1) {
			  console.log(atteRes.data.result.records)
            this.$store.commit('user/setUserAtteUserListData', atteRes.data.result.records)
          } else {
            this.$store.commit('user/setUserAtteUserListData', this.userAtteUserListData.concat(atteRes.data.result.records))
          } 
          mescroll.endSuccess(atteRes.data.result.records.length, atteRes.data.result.records.length >= mescroll.size);
        }).catch(() => {
          mescroll.endErr();
        })
      },
      /// 跳转用户信息页
      fnUserInfo(id) {
        uni.navigateTo({
          url: `/pages/user-info/user-info?id=${id}`
        })
      },
      /// 用户关注
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
  .videoList{
	  width:690rpx;
	  height:580rpx;
  }
  .videobox{
	  width:635rpx;
	  height:361rpx;
  }
  .read{
  	  width:78rpx;
  	  height: 35rpx;
  	  margin-right: 10rpx;
  	  margin-top:4px;
	  margin-left: 37rpx;
  }
  .contList{
	  margin-bottom:18rpx;
  }
</style>

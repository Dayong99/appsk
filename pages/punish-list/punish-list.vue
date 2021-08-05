<template>
  <view>
	  <view class="head flex mauto cwhite sw f34r">
	  	<view class="boximgs mt8r" @tap="goback">
	  		<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
	  	</view>
	  	<view class="safe fcenter">兑换记录</view>
	  	<view>
	  		<text v-if="false">下一题</text>
	  	</view>
	  </view>
    <!-- 滚动内容区 -->
    <mescroll-uni @down="downCallback" @up="upCallback" :top="97">
      <view v-for="(item,index) in punishListData" :key="index" class="flex bgwhite entctron">
        <view class="recordimg">
			<image class="hw100v" :src="item.goodsPic" lazy-load="true" @tap="previewImg(item.goodsPic)"></image>
		</view>
		<view class="detailfient">
			<view class="flex mt37r">
				<view class="bcee wh7835 sw f22r cwhite mt5r fcenter br8r">{{item.drawStatus_dictText}}</view>
				<view class="sw c181 f32r ml10r">{{item.goodsId_dictText}}*{{item.conversion}}</view>
			</view>
			<view class="flexr-jsb l65r">
				<view class="c979 f25r sw">
					<text>兑换积分:</text>
					<text>{{item.score}}分</text>
				</view>
				<view class="detailbox sw fcenter f25r" @tap="gontdetail(item)" v-if="item.drawStatus_dictText=='未领取'">详情</view>
			</view>
			<view class="flexr-jsb c979 f25r sw l20r">
				<view>
					<text>兑换时间:</text>
					<text>{{item.convertDate}}</text>
				</view>
				<view class="pr35r">
					{{item.personId_dictText}}
				</view>
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
    fnFormatDate,
  } from "@/utils/CommonUtil.js"
  import {
    getUserViolationList
  } from "@/api/CommonServer.js"

  export default {
	  data(){
		return{
			names:this.$store.getters['user/getAccountInfoData'].personName
		}  
	  },
    computed: {
      // 处罚公示列表
      punishListData() {
        return this.$store.getters['common/getPunishListData']
      },
    },
    methods: {
		gontdetail(itemVlues){
			let anetml=JSON.stringify(itemVlues)
			uni.navigateTo({
				url:`/pages/org-details/org-details?itemVlues=${anetml}`
			})
		},
		goback(){
			uni.navigateBack()
		},
      /// 下拉刷新的回调
      downCallback(mescroll) {
        // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        mescroll.resetUpScroll()
      },
      /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      upCallback(mescroll) {
        getUserViolationList({
          pageNo: mescroll.num,
          pageSize: mescroll.size,
		  personId:this.$store.getters['user/getAccountInfoData'].id
        }).then(violaRes => {
			// violaRes.data.result.records.forEach(a=>{
			// 	a.goodsPic=this.$store.state.baseUrl+"/sys/common/static/"+a.goodsPic
			// })
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
	  previewImg(logourl) {
	  	  let _this = this;
	  	  let imgsArray = [];
	  	  imgsArray[0] = logourl
	  	  uni.previewImage({
	  		  current: 0,
	  		  urls: imgsArray
	  	  });
	  },
      /// 计算格式友好时间 几天前
      calDatetime(str) {
        let timestamp = new Date(str).getTime();
        return fnFormatDate(timestamp);
      }
    }
  }
</script>

<style>
	.head{
		width: 694rpx;
		height: 153rpx;
		padding-left: 28rpx;
		padding-right:28rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #235FED, #235FED);
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
	}
	.safe{
		  width: 70%;
		  margin-left:80rpx;
	}
	/* 列表 */
	.recordimg{
		width:194rpx;
		height:150rpx;
		margin-top:22rpx;
		margin-right: 19rpx;
		margin-left: 21rpx;
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
		background:#649BFF;
		/* background: linear-gradient(90deg, #649BFF, #477CF3);
		box-shadow: 0rpx 7rpx 35rpx 0px rgba(71, 124, 243, 0.8); */
		border-radius: 28rpx;
		line-height: 56rpx;
	}
	.entctron{
		border-bottom: 1rpx solid #eee;
		height: 200rpx;
	}
</style>

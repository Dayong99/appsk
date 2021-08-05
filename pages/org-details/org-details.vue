<template>
  <view>
	<view class="head flex mauto cwhite sw f34r">
		<view class="boximgs mt8r" @tap="goback">
			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
		</view>
		<view class="safe fcenter">兑换详情</view>
		<view>
			<text v-if="false">下一题</text>
		</view>
	</view>
	<view class="boxdeten">
		<view class="flex">
		  <view class="recordimg">
					<image class="hw100v" :src="changeDeatilsn.goodsPic" @tap="previewImg(changeDeatilsn.goodsPic)"></image>
				</view>
				<view class="detailfient">
					<view class="flex mt19r">
						<view class="bcee wh7835 sw f22r cwhite mt5r fcenter br8r">{{changeDeatilsn.drawStatus_dictText}}</view>
						<view class="sw c181 f32r ml10r">{{changeDeatilsn.goodsId_dictText}}</view>
					</view>
					<view class="l38r mt5r">
						<view class="c181 f25r sw">
							<text>兑换数量:</text>
							<text>{{changeDeatilsn.conversion}}</text>
						</view>
					</view>
					<view class="c181 f25r sw l38r">
						<view>
							<text>兑换积分:</text>
							<text>{{changeDeatilsn.score}}积分</text>
						</view>						
					</view>
					<view class="c181 f25r sw l38r">
						<view>
							<text>兑换人:</text>
							<text>{{changeDeatilsn.personId_dictText}}</text>
						</view>						
					</view>
					<view class="c979 f25r sw l38r">
						<view>
							<text>兑换时间:</text>
							<text>{{changeDeatilsn.convertTime}}</text>
						</view>						
					</view>
				</view>
		</view>
	</view>
	<view class="fcenter mt28r bgwhite sw">
		<view class="f32r c181 l80r">兑换二维码</view>
		<view class="c979 f25r">（可凭借此二维码领取礼品）</view>
		<view class="boxerwei mauto">
			<view class="qrcode">
				<canvas style="width:321rpx;" canvas-id="couponQrcode" class=""></canvas>
			</view>
			<view class="a2 hw44">
				<image src="../../static/a2.png" class=""></image>
			</view>
			<view class="a3 hw44">
				<image src="../../static/a3.png" class=""></image>
			</view>
			<view class="a1 hw44">
				<image src="../../static/a1.png" class=""></image>
			</view>
			<view class="a4 hw44">
				<image src="../../static/a4.png" class=""></image>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
  const qrCode = require('@/utils/weapp-qrcode.js')
  import {
    getOrgInfo,
  } from "@/api/OrgServer.js"
  // HTML富文本解析器
  import uParse from '@/components/gaoyia-parse/parse.vue'
  
  export default {
    components: {
      uParse
    },

    data() {
      return {
        // 活动项信息ID
        orgID: -1,
        // 跳转来源页
        fromPage: '',
        // 来源页标签数据下标
        current: -1,
        // 报名用户
        userArray: [],
		changeDeatilsn:{},
		names:this.$store.getters['user/getAccountInfoData'].personName
      }
    },

    onLoad(options) {
		
		
      if (options && options.itemVlues) {
        console.log(JSON.parse(options.itemVlues));
		this.changeDeatilsn=JSON.parse(options.itemVlues)
		setTimeout(() => {
			console.log(this.changeDeatilsn.id)
			this.couponQrCode(this.changeDeatilsn.id)
		}, 50)
        // this.orgID = parseInt(options.id);
        // if (typeof options.fromPage == 'string') this.fromPage = options.fromPage
        // if (typeof options.current == 'string') this.current = parseInt(options.current)
        // // 获取详情信息
        // uni.showLoading({
        //   title: '加载中',
        //   mask: true
        // })
        // getOrgInfo(this.orgID).then(orgRes => {
        //   this.userArray = orgRes.data.Remark.users
        //   this.$store.commit('org/setOrgInfoData', orgRes.data.Data)
        //   // 导航标题
        //   uni.setNavigationBarTitle({
        //     title: orgRes.data.Data.Name
        //   });
        //   // 延迟关闭load
        //   setTimeout(() => {
        //     uni.hideLoading()
        //   }, 2000)
        // })
      }
    },

    computed: {
      // 组织活动内容信息
      orgInfoData() {
        return this.$store.getters['org/getOrgInfoData']
      },
      /// 计算显示组织封面
      calOrgCover() {
        if (typeof this.orgInfoData.FaceSrc == 'undefined') return '/static/default_image.png'
        return this.orgInfoData.FaceSrc + '_700x700.jpg'
      },
      /// 计算开始时间 格式 2019-12-03 20:12
      calBeginDatetime() {
        let now = new Date(this.orgInfoData.BeginDatetime || '2020-01-01 01:01');
        return fnFormatLocalDate(now);
      },
      /// 计算结束时间 格式 2019-12-03 20:12
      calEndDatetime() {
        let now = new Date(this.orgInfoData.EndDatetime || '2020-01-01 01:01');
        return fnFormatLocalDate(now);
      },
      /// 地址逗号换空格
      calAddress() {
        let addr = this.orgInfoData.AddressNames;
        return !!addr ? addr.split(',').join(' ') : '未知 未知'
      }
      //
    },

    methods: {
		previewImg(logourl) {
			  let _this = this;
			  let imgsArray = [];
			  imgsArray[0] = logourl
			  uni.previewImage({
				  current: 0,
				  urls: imgsArray
			  });
		},
		goback(){
			uni.navigateBack()
		},
		// 二维码生成工具
		couponQrCode(id) {
			new qrCode('couponQrcode', {
				text: id,
				width: 150,
				height: 150,
				colorDark: "#333333",
				colorLight: "#FFFFFF",
				correctLevel: qrCode.CorrectLevel.H
			})
		},
      /// 跳转用户信息页
      fnUserInfo(e) {
        uni.navigateTo({
          url: `/pages/user-info/user-info?id=${e.ID}`
        })
      },
      //
    },
  }
</script>

<style>
  page {
    background: #ffffff;
  }

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
		background: linear-gradient(90deg, #649BFF, #477CF3);
		box-shadow: 0rpx 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 28rpx;
		line-height: 56rpx;
	}
	.boxdeten{
		padding-bottom: 30rpx;
		border-bottom:20rpx solid #efefef;
	}
	.boxerwei{
		margin-top:124rpx;
		width: 321rpx;
		height: 329rpx;
		position: relative;
	}
	.boxerwei image{
		width: 100%;
		height: 100%;
	}
	.a1{
		position: absolute;
		bottom:-30rpx;
		left:-30rpx;
	}
	 .a2{
		position: absolute;
		top:-30rpx;
		left:-30rpx;
	}
	.a3{
		position: absolute;
		top:-30rpx;
		right:-30rpx;
	}
	.a4{
		position: absolute;
		bottom:-30rpx;
		right:-30rpx;
	} 
	.qrcode{
		width: 100%;
		height: 100%;
		position: absolute;
		top:10rpx;
		left:10rpx;
	}
</style>

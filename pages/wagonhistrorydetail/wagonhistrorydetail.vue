<template>
  <view>
	  <view class="headboxs">
		  <view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r z5" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter z5">历史磅单</view>
			<view>
				<text v-if="false">下一题</text>
			</view>
		  </view>
	  </view>
    <!-- 滚动列表内容 -->
	<mescroll-uni :down="{use:false}" :top="50" @up="upCallback" @init="mescrollInit">
	<!-- 选择导航 -->
	  <!-- <view v-if="isFixed" class="hl90r"></view> -->
	  
	  <!-- 全部 -->
	  <view class="wagoncont mauto">
		<view v-for="(infoData,index) in topicHottestListData" :key="index">
			<view class="wagongList bgwhite">
			 <view class="flexr-jsb cartime">
				 <view>{{infoData.plateNo}}</view>
				 <view class="svb" style="color: #57585A;">{{infoData.registTime}}</view>
			 </view>
			 <view class="wagonValue" style="margin-top:10rpx;">材料名称：{{infoData.materialsSpare}}</view>
			 <view class="wagonValue">净 重：{{infoData.suttleWeight}}吨</view>
			 <view class="wagonValue">偏差结果：{{infoData.offsetResult_dictText}}</view>
			 <view class="wagonhisDetail" @click="wagonhisDetail(infoData)">详情></view>
		 </view>
		</view>
	  </view>
	</mescroll-uni>
  </view>
</template>

<script>
	import {
	    getWordContentHTML
	  } from "@/api/WordServer.js"
  export default {
    components: {

    },
    data() {
      return {
		 imagList:['../../static/daizi.png','../../static/shour.png','../../static/holda.png','../../static/holdb.png','../../static/daizi.png'],
		 curScore:'',
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
		dataVal:{}
        //
      };
    },
	computed:{
		// 收料
		topicHottestListData() {
		  return this.$store.getters['word/gethistoryes']
		},
	},
    onLoad(options) {
		console.log(options)
      if (options && options.dataValue) {
		  this.dataVal=JSON.parse(options.dataValue)
      }
    },
    methods: {
		wagonSearch(){
			uni.navigateTo({
				url:'/pages/wagonSearch/wagonSearch'
			})
		},
		imgrent(i){
			console.log(this.imagList[i])
			return this.imagList[i]
		},
		goback(){
			uni.navigateBack()
		},
      /// mescroll组件初始化的回调,可获取到mescroll对象
      mescrollInit(mescroll) {
		  
        this.mescroll = mescroll;
      },
	  wagonhisDetail(info){
		  console.log(info)
		  uni.navigateTo({
			url:'/pages/wagondetail/wagondetail?info='+JSON.stringify(info)
		  })
	  },
      /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      upCallback(mescroll) {
		  console.log(this.dataVal)
        let params = {
		  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
          pageNo: mescroll.num,
          pageSize: mescroll.size
        }
		params=Object.assign(params,this.dataVal)
        getWordContentHTML(params).then(res => {
			res.data.result.records.forEach(a=>{
				 let marternames='';
				  (JSON.parse(a.materialsInfo)).forEach(b=>{
					marternames+=b.materialsName+'、'
				  })
				  a.materialsSpare=marternames.substring(0,marternames.length-1)
			})
			if (mescroll.num == 1) {
			  this.$store.commit('word/historyelist', res.data.result.records);
			} else {
			  this.$store.commit('word/historyelist', this.topicHottestListData.concat(res.data.result.records))
			}
				
          mescroll.endSuccess(res.data.result.records.length, res.data.result.records.length >= mescroll.size);
        }).catch(() => {
          mescroll.endErr();
        })
      }
      //
    }
  }
</script>

<style>
	.headboxs{

	}
  .head{
  	width: 694rpx;	
  	padding-left: 28rpx;
  	padding-right:28rpx;
	height: 153rpx;
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
  .fen{
	  position: absolute;
	  width: 100%;
	  left:0;
	  top:0;
	  z-index: 0;
	  height: 100%;
  }
  .numsscoree{
	  left:53rpx;
	  top:184rpx;
  }
  .shopList{
	  width: 167rpx;
	  height: 56rpx;
	  background: #FF8401;
	  border-radius: 7rpx;
	  line-height: 56rpx;
	  color: #FFFAEC;
  }
  .boxlistd{
	  width: 100%;
	  top:150rpx!important;
	  position: fixed;
   }
   .boxlistd .flex:last-child .rigthscore{
	   border-bottom: none!important;
   }
   /* tab切换 */
   .smeit{
	   margin-top:65rpx;
	   margin-left: 34rpx;
	   margin-right: 32rpx;
   }
   .rigthscore{
	   width: 499rpx;
	   padding-right: 49rpx;
   }
   .middlbox{
	   margin-top:15rpx;
	   margin-bottom: 10rpx;
   }
	
	.mescroll-empty{
		background: #fff!important;
		height: 100%;
	}
	.mescroll-uni-content{
		width: 694rpx;
		margin: 0 auto;
		height: 100%;
	}
	.wagoncont{
		position: relative;
		top:130rpx;
	}
	.wagongList{
		width: 708rpx;
		height: 333rpx;
		maring:0 auto;
		margin-bottom:22rpx;
		border-radius: 7px;
		margin-left: -8rpx;
	}
	.cartime{
		padding-left: 40rpx;
		padding-right: 36rpx;
		padding-top:31rpx;
		padding-bottom:35rpx;
		border-bottom: 1rpx solid #eee;
		font-family: 'PingFang SC';
		font-weight: 800;
		color: #181616;
	}
	.wagonValue{
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
		line-height: 52rpx;
		padding-left: 40rpx;
	}
	.wagonhisDetail{
		float: right;
		font-size: 28rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #235FED;
		padding-right: 35rpx;
	}
	.wagongpng{
		width: 38rpx;
		height: 38rpx;
		margin-left: 55rpx;
		margin-top:8rpx;
	}
	.wagontitle{
		justify-content: space-evenly;
	}
</style>

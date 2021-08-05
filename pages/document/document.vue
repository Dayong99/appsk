<template>
  <view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">资料管理</view>
  	</view>
	  <view class="boxinput">
		  <view class="imagebox">
		     <image src="../../static/fangdajing1.png" class="hw100v"></image>
		  </view>
			<input class="search" type="number" placeholder="请输入搜索关键字" @input="onInput">			
		</input>
	  </view>
	  <view v-for="(item,index) in document" :key="index" class="flex bgwhite entctron">
		<view class="listitem">
			<image class="iconl" src="../../static/wj-close.png"></image>
			<view @click="doucmentchildren(item)" class="douname">{{item.name}}</view>
			<image class="iconr" src="../../static/myarr.png"></image>
		</view>
	  </view>
	  <view v-if="document.length==0" class="vacancy">
		  <image src="../../static/emptys.png"></image>
		  <view>暂无数据</view>
	  </view>
  </view>
</template>
<script>
	import {
	  documentlist
	} from "@/api/AlbumServer.js"
  export default {
	data(){
		return{
			document:[],
			number:''
		}
	},
    computed: {
		
    },
	onLoad(){
		this.init();
	},
    methods: {
		//监听输入框的值
		onInput(e) {
						console.log(e.detail.value)
						this.number = e.detail
						console.log(this.number.value)
					},
      /// 跳转打开新窗口
      fnOpenWin(type) {
        uni.navigateTo({
          url: `/pages/news/${type}/${type}`
        })
      },
	  goback(){
		  uni.navigateBack()
	  },
	  doucmentchildren(item){
		  
		if(item.children){
			console.log(item)
			this.document=item.children
		}else{
			// console.log('5555')
			uni.navigateTo({
			  url: '/pages/pdf/pdf?id='+item.id
			})
		}
	  },
	  init(){
		  documentlist({
		    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		  }).then(violaRes => {
		  	this.document=violaRes.data.result
		  }).catch(() => {
			  
		  })
	  }
    }
  }
</script>

<style>
	page{
		background: #fff;
	}
	.head{
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background-color: #208FE7;
		/* background: linear-gradient(0deg, #235FED, #235FED); */
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}
	.safe{
		  width: 70%;
		  padding-left:80rpx;
	}
	/* 样式 */
	.editpent{
		background: #fff;
		width: 100%;
	}
	.editpent .inputsq{
		border-bottom: 1px solid #E6E6E6;
		width: 573rpx;
		padding-bottom:21rpx;		
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #B6C2CE;
	}
	.itemedit{
		height: 124rpx;
		line-height: 146rpx;
		width: 100%;
	}
	.itemedit .a1{
		width: 177rpx;
		padding-left:32rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #181616;
	}
	.persons{
		margin-top:10rpx;
		width: 83rpx;
		height: 83rpx;
		/* position: absolute;
		top:20rpx;
		left: 190rpx; */
	}
	.itemedit text{
		height: 1rpx;
		width: 573rpx;
		background: #D9E2E9;
		margin-top:125rpx;
	}
	/* 新家 */
	.listitem{
		display: flex;
		width: 100%;
		border-bottom: 1px solid #EAE7E7;
		height:120rpx;
		line-height: 120rpx;
		
	}
	.iconl{
		width: 38rpx;
		height: 33rpx;
		margin:45rpx 23rpx 44rpx 36rpx;
	}
	.douname{
		width: 600rpx;
	}
	.iconr{
		width: 38rpx;
		height: 28rpx;
		margin-top:51rpx;
		margin-right: 40rpx;
	}
	.search{
	  width:615rpx;
	  height:75rpx;
	  margin:0 auto;
	  margin-top:20rpx;
	  background:rgba(248,248,248,1);
	  border-radius:38rpx;
	  position: relative;
	  padding-left: 75rpx;
	  font-size:30rpx;
	  font-family:'PingFang SC';
	  font-weight:bold;
	  color:rgba(196,196,196,1);
	}
	.search .image{
	  width:70rpx;
	  height: 70rpx;
	  position: absolute;
	  top: 21rpx;
	  left: 24rpx;
	  
	}
	.boxinput{
		width: 690rpx;
		margin:0 auto;
		display: flex;
	}
	.imagebox{
		width: 25rpx;height:25rpx;
		margin:35rpx -70rpx 0 20rpx;
		z-index: 99;
	}
	.vacancy image{
		width: 421rpx;
		height: 324rpx;
		margin: 100rpx auto;
		left: 22%;
		top:150rpx;
	}
	.vacancy view{
		text-align: center;
		margin-top:40rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #979BA4;
	}
</style>

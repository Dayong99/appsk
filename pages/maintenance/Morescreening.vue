<template>
  <view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
    <!-- 滚动内容区 -->
	<view class="head flex mauto cwhite sw">
		<view class="boximgs mt8r" @tap="goback">
			<image src="../../static/guanaa.png" class="werrors"></image>
		</view>
		<view class="safe fcenter">更多筛选</view>
		<view>
			<text v-if="false">下一题</text>
		</view>
	</view>
	<view class="planstatus">设备运行状态</view>
	<view class="boxmoreVal">
		<view class="boxmore" @tap="limiteds()" :class="{'currentcolor':limited}">不限</view>
		<view class="boxmore" :class="{'currentcolor':bridgeList.indexOf(index)>-1}" v-for="(item,index) in tabBars" :key="item.id" @tap="planchoseStatus(item,index)">
				{{item}}
		</view>
	</view>
	<!-- <view class="planstatus" style="margin-top:60rpx;">保养状态</view>
	<view class="boxmoreVal">
		<view class="boxmore" :class="{'currentcolor':bridgeList1.indexOf(index)>-1}" v-for="(item,index) in tabBars1" :key="item.id" @tap="planchoseStatus1(item,index)">
				{{item}}
		</view>
	</view> -->
	<view class="keyword">关键字</view>
	<view class="keyboxs">
		<view class="keyname">关键字</view>
		<view class="keyinput">
			<input type="text" placeholder="请输入设备名称/编号关键字" v-model="bridgename">
		</view>
	</view>
	<view class="buttonyes" @tap="yesword">查询</view>
	<view class="buttoncancel" @tap="resetVal">重置</view>
  </view>
</template>
<script>
	import {beamfieldstatus} from '@/api/AlbumServer.js'
  export default {
	 data(){
		return{
			tabBars:['待维修','停用','正常'],
			tabBars1:['不限','待保养','已保养','不保养','停用'],
			index:5,
			array: ['全部','中梁','边梁'],
			bridgename:'',
			bridegnumber:'',
			abutment:'',
			girdernumber:'',
			bridgeList:[],
			bridgeList1:[],
			bridgeString:'',
			limited:true
		} 
	 },
    computed: {

    },
	onLoad(){
	},
    methods: {
		limiteds(){
			this.limited=true;
			this.bridgeList=[];
		},
		planchoseStatus(item,index){
			this.limited=false;
			 this.bridgeString='';
			let choseNumber=this.bridgeList.indexOf(index)
			console.log(choseNumber)
			if(choseNumber>-1){
				this.bridgeList.splice(choseNumber,1)
			}else{
				this.bridgeList.push(index)
			}
		},
		yesword(){
			let data={
				key:this.stringVal(this.bridgename),
				deviceRunStatus:this.bridgeList.toString()
			}
			let pages=getCurrentPages();
			let nowpages=pages[pages.length-1]
			let prevPage=pages[pages.length-2]
			prevPage.$vm.sercode=data
			uni.navigateBack({
				delta:1
			})
		},
		stringVal(val){
			if(val) return '*'+val+'*'
		},
		bindPickerChange(e){
			this.index=e.target.value
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
	  resetVal(){
		this.bridgename=''
		this.bridegnumber=''
		this.abutment=''
		this.girdernumber=''
		this.index=5
		this.bridgeList=[]
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
    }
  }
</script>

<style>
	page{
		background: #fff;
	}
	.head{
		width: 100%;
		height: 100rpx;
		line-height: 165rpx;

	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}
	.safe{
		  width: 70%;
		  padding-left:80rpx;
		font-size: 33rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		color: #313131;
	}
	.keyword{
		font-size: 37rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		margin-left: 34rpx;
		margin-top:38rpx;
		margin-bottom: 36rpx;
		color: #343434;
	}
	.keyboxs{
		display: flex;
		height: 79rpx;
		padding-top:13rpx;
		padding-bottom: 13rpx;
		border-top: 1rpx solid #EAE7E7;
		line-height: 79rpx;
		border-bottom: 1rpx solid #eee;
	}
	.keyname{
		width: 160rpx;
		height: 79rpx;
		border-right:1rpx solid #EAE7E7;
		text-align: right;
		padding-right: 33rpx;
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
	}
	.keyinput{
		width: 526rpx;
		margin-left: 21rpx;
		height: 79rpx;
		line-height: 79rpx;
		margin-top:20rpx;
	}
	.uni-input-placeholder{
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #E3E3E3;
	}
	.boxmore{
		width: 197rpx;
		height: 71rpx;
		background: #F6F6F6;
		border-radius: 5rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		line-height: 71rpx;
		text-align: center;
		font-weight: 500;
		color: #313131;display: inline-block;
		margin:12rpx 0;
		margin-right: 23rpx;
	}
	.currentcolor{
		background: #E4ECFF;
		border: 1rpx solid #235FED;
	}
	.boxmoreVal{
		width: 666rpx;
		margin:30rpx auto;
	}
	.planstatus{
		margin-top:83rpx;
		margin-left: 42rpx;
	}
	.buttonyes,.buttoncancel{
		width: 625rpx;
		height: 90rpx;
		border-radius: 45rpx;		
		font-size: 35rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		margin:0 auto;
		line-height: 90rpx;
		text-align: center;		
		color: #fff;
		position: fixed; 
	}
	.buttonyes{		
		background: #649AFF;
		box-shadow: 0px 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
		bottom: 229rpx;
		left:63rpx;
		margin-top: 340rpx;
	}
	.buttoncancel{		
		border: 1px solid #BFBFBF;
		margin-top:40rpx;
		bottom: 39rpx;
		left:63rpx;
		color: #9C9C9C;
		margin-bottom: 49rpx;
	}
	.werrors{
		width: 29rpx;
		height: 29rpx;
		margin-left: 25rpx;
	}
</style>

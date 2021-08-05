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
	<view class="planstatus">进度状态</view>
	<view class="boxmoreVal">
		<view class="boxmore" :class="{'currentcolor':bridgeList.indexOf(index)>-1}" v-for="(item,index) in tabBars" :key="item.id" @tap="planchoseStatus(item,index)">
				{{item.structStatus}}
		</view>
	</view>
	<view class="keyword">关键字段筛选</view>
	<view class="keyboxs">
		<view class="keyname">桥名</view>
		<view class="keyinput">
			<input type="text" placeholder="请输入桥名关键字" v-model="bridgename">
		</view>
	</view>
	<view class="keyboxs">
		<view class="keyname">桥孔编号</view>
		<view class="keyinput">
			<input type="text" placeholder="请输入桥孔编号" v-model="bridegnumber">
		</view>
	</view>
	<view class="keyboxs">
		<view class="keyname">对应墩号</view>
		<view class="keyinput">
			<input type="text" placeholder="请输入对应墩号" v-model="abutment">
		</view>
	</view>
	<view class="keyboxs">
		<view class="keyname">梁编号</view>
		<view class="keyinput">
			<input type="text" placeholder="请输入梁编号" v-model="girdernumber">
		</view>
	</view>
	<view class="keyboxs" style="border-bottom: 1rpx solid #EAE7E7;">
		<view class="keyname">中/边梁</view>
		<view class="keyinput" style="line-height: 40rpx;">
			<picker @change="bindPickerChange" :value="index" :range="array">
				<view class="uni-input" v-if="index!=5">{{array[index]}}</view>
				<view class="uni-input" style="color: #E3E3E3;" v-if="index==5">请选择中/边梁</view>
			</picker>
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
			tabBars:[],
			index:5,
			array: ['全部','中梁','边梁'],
			bridgename:'',
			bridegnumber:'',
			abutment:'',
			girdernumber:'',
			bridgeList:[],
			bridgeString:''
		} 
	 },
    computed: {

    },
	onLoad(){
		this.init();
	},
    methods: {
		planchoseStatus(item,index){
			 this.bridgeString='';
			let choseNumber=this.bridgeList.indexOf(index)
			console.log(choseNumber)
			if(choseNumber>-1){
				this.bridgeList.splice(choseNumber,1)
			}else{
				this.bridgeList.push(index)
			}
			console.log(this.bridgeList)
			this.bridgeList.forEach(a=>{
				this.bridgeString+=(this.tabBars[a].tenantIdSort)+','
			})
		},
		yesword(){
			let data={
				bridgeName:this.stringVal(this.bridgename),
				bridgeHoleNumber:this.stringVal(this.bridegnumber),
				correspondingPierNumber:this.stringVal(this.abutment),
				beamNumber:this.stringVal(this.girdernumber),
				centerOrSideBeam:this.array[this.index]=='全部'?'':this.array[this.index],
				structStatusSorts:this.bridgeString.substring(0,this.bridgeString.length-1)
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
		init(){
			let data={
				pageNo: 1,
				pageSize: "",
				 relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
			}
			beamfieldstatus(data).then(res=>{
				this.tabBars=res.data.result.records;
			})
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
	}
	.buttonyes{		
		background: #649AFF;
		box-shadow: 0px 7rpx 35rpx 0px rgba(71, 124, 243, 0.8);
	/* 	position: fixed; */
		bottom: 199rpx;
		left:63rpx;
		margin-top: 209rpx;
	}
	.buttoncancel{		
		border: 1px solid #BFBFBF;
		margin-top:40rpx;
		bottom: 69rpx;
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

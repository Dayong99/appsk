<template>
  <view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
    <!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">设备检查</view>
			<view>
				<text v-if="false">下一题</text>
			</view>
		</view>
		<view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>检查时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')">
					<view style="color: #E3E3E3;" v-if="datepent==1">请选择检查时间</view>
					<view v-if="datepent==2">{{datetime}}</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb" @cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>检查人</view>
				<view class="listrig" @tap="declare">
					<input class="uni-input" v-model="updatepeoples" style="" type="text" placeholder="请选择检查人">
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>检查结果</view>
				<view class="listrig">
					<picker @change="bindPickerChange" :value="index" :range="array1" :range-key="'personPhone_dictText'">
						<view class="uni-input" v-if="index!=5">{{array1[index]}}</view>
						<view class="uni-input" style="color: #E3E3E3;" v-if="index==5">请选择检查结果</view>
					</picker>
					<image src="../../static/jkpe.png" class="poarrow"></image>
				</view>
			</view>
		</view>
		<view class="buttonyes" @tap="yesword(1)" v-if="index==1">确定并申报维修</view>
		<view class="buttonyes" @tap="yesword(2)" v-if="index==5||index==0">确定</view>
		<!-- <view class="buttoncancel" @tap="goback">取消</view> -->
	</view>
  </view>
</template>
<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
import {maintadd} from '@/api/AlbumServer.js'
  export default {
	 data(){
		return{
			array1:['正常','异常'],
			datepent:1,
			updatedetails:'',
			index:5,
			showPicker: false,
			date: '2019/01/01',
			time: '15:00:12',
			datetime: '',
			range: ['2019/01/01','2019/01/06'],
			rangetime: ['2019/01/08 14:00','2019/01/16 13:59'],
			value: '',
			type:'datetime',
			updatepeoples:'',
			updateresult:'',
			updatepeopleid:'',
			updateimg:[],
			parentVal:'',
			serios:{},
			local:''
		} 
	 },
    computed: {

    },
	components:{
		MxDatePicker
	},
	onLoad(options){
		if(options.val){
			this.parentVal=JSON.parse(options.val)
			this.local=options.a
		}
		console.log(this.parentVal)
	},
	onShow(){
		this.updatepeoples=this.serios.title;
		this.updatepeopleid=this.serios.key;
	},
    methods: {
		declare(){
			let item='保养人'
			uni.navigateTo({
				url:'../updatepeople/updatepeople?name='+item
			})
		},
		 cI(){
			 let that=this;
			 uni.chooseImage({
				count: 1,
				 sizeType:['copressed'],
				 success(res) {
					//因为有一张图片， 输出下标[0]， 直接输出地址
					 var imgFiles = res.tempFilePaths[0]
					 console.log(imgFiles)
					 // 上传图片
					 // 做成一个上传对象
					 var uper = uni.uploadFile({
						 // 需要上传的地址
						 url:'http://192.168.1.130:9999/sys/common/upload',
						 // filePath  需要上传的文件
						 filePath: imgFiles,
						 name: 'file',
						 header:{'X-Access-Token': uni.getStorageSync('TOKEN') || '',},
						 success:(res) => {
							 console.log(res.data)
							 if (res.statusCode == 200){
								 that.updateimg.push((JSON.parse(res.data)).message)
							 }
						 }
					 });
				}
			 })
		},
		 bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index = e.target.value
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
	  yesword(val){
		  if(!this.updatepeoples||!this.datetime.replace(/\//g,'-')||this.index==5){
			  uni.showToast({
			  	title:'带*号的不能为空',
			  	icon: 'none'
			  })
			  return
		  }
		  let data={
				id:this.parentVal.id,
				inspectionResult:this.index,
				maintainTime:this.datetime.replace(/\//g,'-')+':00',
				userPhone:this.updatepeopleid
		  }
		  console.log(data)
		maintadd(data).then(res=>{
			console.log(res)
			if(res.status==200){
				uni.showToast({
					title:res.data.result
				})
				if(val==1){
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/maintenance/service'
						})
					},1000)
				}else if(val==2){
					setTimeout(()=>{
						uni.navigateBack({
							
						})
					},1000)
				}
				
			}else{
				uni.showToast({
					title:'检查失败'
				})
			}
		})
	  },  
	  onShowDatePicker(type){//显示
			this.showPicker = true;
			this.value = this[type];
		},
		onSelected() {//选择
			this.showPicker = false;
			
		},
		onSelectedb(e){
			this.datepent=2
			this.showPicker = false;
			this.datetime=e.value;
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
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #235FED, #235FED);
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
	.processlist{
		height: 80rpx;
		line-height: 80rpx;
		padding-top:13rpx;
		padding-bottom: 13rpx;
		border-bottom: 1rpx solid #EAE7E7;
		display: flex;
		position: relative;
	}
	.photolist .listleft{
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		height: 80rpx;
		line-height: 80rpx;
		padding-top:13rpx;
		padding-bottom: 13rpx;
		color: #555555;
		width: 150rpx;
		text-align: right;
		padding-right: 27rpx;
	}
	.processlist .listleft{
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
		width: 150rpx;
		border-right: 1rpx solid #EAE7E7;
		text-align: right;
		padding-right: 27rpx;
	}
	.listrig{
		width: 543rpx;
		padding-left: 18rpx;
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		/* color: #E3E3E3; */
	}
	.poarrow{
		position: absolute;
		width: 13rpx;
		height: 23rpx;
		right: 41rpx;
		top:39rpx;
		z-index: -2;
	}
	/* 样式 */
	.start{
		color:red;
		margin-top:14rpx;
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
		position: fixed;
		bottom: 79rpx;
		left:63rpx;
	}
	.buttoncancel{		
		border: 1px solid #BFBFBF;
		margin-top:40rpx;
		position: fixed;
		bottom: 69rpx;
		left:63rpx;
		color: #9C9C9C;
	}
	textarea{
		margin-top:18rpx;
		width: 540rpx;
	}
	.model{
		width: 200rpx;
		height: 167rpx;
		background: #FBFBFB;
		border: 1rpx solid #EAE7E7;
		margin-left: 33rpx;
		float: left;
	}
	.model .adds{
		width: 31rpx;
		height: 31rpx;
		margin-top:55rpx;
		margin-left: 85rpx;
	}
	.model view{
		font-size: 20rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #808184;
		text-align: center;
	}
	.uni-textarea-placeholder{
		color: #E3E3E3;
	}
	.rili{
		width: 30rpx;
		height: 29rpx;
		top:39rpx;
		right: 35rpx;
		position: absolute;
		z-index: -2;
	}
	uni-input{
		padding-top:20rpx;
	}
	.uni-input-placeholder{
		color:#E3E3E3
	}
</style>

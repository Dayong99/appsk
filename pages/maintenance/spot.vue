<template>
  <view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
    <!-- 滚动内容区 -->
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">设备抽检</view>
			<view>
				<text v-if="false">下一题</text>
			</view>
		</view>
		<view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>抽检时间</view>
				<view class="listrig" @click="onShowDatePicker('datetime')">
					<view style="color: #E3E3E3;" v-if="datepent==1">请选择抽检时间</view>
					<view v-if="datepent==2">{{datetime}}</view>
				</view>
				<mx-date-picker :show="showPicker" :type="type" :value="value" @confirm="onSelectedb" @cancel="onSelected" />
				<image src="../../static/rili.png" class="rili"></image>
			</view>
			<view class="processlist">
				<view class="listleft"><text class="start">*</text>抽检人</view>
				<view class="listrig" @tap="declare">
					<input class="uni-input" v-model="updatepeoples" style="" type="text" placeholder="请选择抽检人">
				</view>
				<image src="../../static/jkpe.png" class="poarrow"></image>
			</view>
			<view class="processlist" style="height: 213rpx;">
				<view class="listleft"><text class="start">*</text>抽检描述</view>
				<view class="listrig">
					<textarea placeholder="请输入抽检描述" v-model="updatedetails">
						
					</textarea>
				</view>
			</view>
			<view class="photolist">
				<view class="listleft">图片附件</view>
				<view>
					<view v-for="item in updateimg">
						<view class="model">
							<image :src=item style="width: 100%;height: 100%;"></image>
						</view> 
					</view>
					<view class="model" @tap="cI" v-if="updateimg.length<3">
						<image src="../../static/jiahao.png" class="adds"></image>
						<view>添加附件</view>
					</view>
				</view>
			</view>
		</view>
		<view class="buttonyes" @tap="yesword">提交</view>
		<!-- <view class="buttoncancel" @tap="goback">取消</view> -->
	</view>
  </view>
</template>
<script>
import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
import {serviceadd} from '@/api/AlbumServer.js'
  export default {
	 data(){
		return{
			datepent:1,
			updatedetails:'',
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
			serios:{}
		} 
	 },
    computed: {

    },
	components:{
		MxDatePicker
	},
	onLoad(options){
		console.log(options)
		if(options.val){
			this.parentVal=(JSON.parse(options.val))
		}
	},
	onShow(){
		
	},
    methods: {
		declare(){
			let item='抽检人'
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
						 url:'http://192.168.1.191:9999/sys/common/upload',
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
		bindPickerChange1: function(e) {
			console.log(e.target.value)
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index1 = e.target.value
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
	  yesword(){
		  if(!this.updatepeoples||!this.updatedetails||!this.datetime.replace(/\//g,'-')||this.index1==5){
			  uni.showToast({
			  	title:'带*号的不能为空',
			  	icon: 'none'
			  })
			  return
		  }
		  console.log(this.parentVal)
		  let data={
			  	filePath: this.updateimg.toString(),
			  	operator: this.updatepeoples,
			  	relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,
			  	describes: this.updatedetails,
			  	operatorTime: this.datetime.replace(/\//g,'-')+':00',	
				deviceId:this.parentVal.id,
				operatorType:5,
				sysOrgCode:this.parentVal.sysOrgCode
		  }
		  console.log(data)
			serviceadd(data).then(res=>{
			console.log(res)
			if(res.status==200){
				uni.showToast({
					title:'提交成功'
				})
				setTimeout(()=>{
					uni.redirectTo({
						url:'./standing'
					})
				},1000)
			}else{
				uni.showToast({
					title:'提交失败'
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

<template>
  <view style="background: #fff;position: absolute;top:0;bottom: 0;left: 0;right: 0;width: 100%;height: 100%;">
	  <view class="head flex mauto cwhite sw f34r">
	  	<view class="boximgs mt8r" @tap="goback">
	  		<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
	  	</view>
	  	<view class="safe fcenter">搜索</view>
	  	<view>
	  		<text v-if="chosenext">下一题</text>
	  	</view>
	  </view>
	  <view class="wagdetail" style="padding-top:153rpx">
		  <view class="flex listwag">
			  <view class="wagongb1" style="text-align: right;">车牌号</view>
			  <view></view> 
			  <view>
				  <input type="text" placeholder="请输入车牌号" v-model="carnumber">
			  </view>
		  </view>
		  <view class="flex listwag">
			  <view class="wagongb1">进场类型</view>
			  <view></view>
			 <view class="uni-list-cell-db">
				 <picker @change="bindPickerChange1" :value="index1" :range="array1">
					 <view class="uni-input">{{array1[index1]}}</view>
				 </picker>
			 </view>
			 <view class="arrowicon">
				 <image src="../../static/jkpe.png" class="hw100v"></image>
			 </view>
		  </view>
		  <view class="flex listwag">
			  <view class="wagongb1">物资类型</view>
			  <view></view>
			  <view class="uni-list-cell-db">
				 <picker @change="bindPickerChange2" :value="index2" :range="array2">
					 <view class="uni-input">{{array2[index2]}}</view>
				 </picker>
			  </view>
			  <view class="arrowicon">
			  				 <image src="../../static/jkpe.png" class="hw100v"></image>
			  </view>
		  </view>
		  <view class="flex listwag">
			  <view class="wagongb1">材料名称</view>
			  <view></view>
			  <view class="uni-list-cell-db">
				 <picker @change="bindPickerChange3" :value="index3" :range="array3" range-key="materialsName">
					 <view class="uni-input">{{array3[index3].materialsName}}</view>
				 </picker>
			  </view>
			  <view class="arrowicon">
			  				 <image src="../../static/jkpe.png" class="hw100v"></image>
			  </view>
		  </view>
		  <view class="flex listwag">
			  <view class="wagongb1">偏差结果</view>
			  <view></view>
			  <view class="uni-list-cell-db">
				 <picker @change="bindPickerChange4" :value="index4" :range="array4">
					 <view class="uni-input">{{array4[index4]}}</view>
				 </picker>
			  </view>
			  <view class="arrowicon">
			  		<image src="../../static/jkpe.png" class="hw100v"></image>
			  </view>
		  </view>
		  <view class="flex listwag">
			  <view class="wagongb1">起始时间</view>
			  <view></view>
			 <!-- <view class="uni-list-cell-db">
				  <picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					  <view class="uni-input">{{date}}</view>
				  </picker>
			  </view> -->
			  <picker mode="multiSelector" :range="dateTimeArray"  v-model="dateTime" @change="change" @columnchange="columnchange">
			  	<view>
			  		<input type="text" disabled="true" v-model="upTower" style="text-indent: 20rpx;" placeholder="请输入起止时间" placeholder-class="inputPlace" />
			  	</view>
				<image src="../../static/dates.png" class="wagongicon"></image>
			  </picker>	
				  
		  </view>
		  <view class="flex listwag">
			  <view class="wagongb1">终止时间</view>
			  <view></view>
			 <picker mode="multiSelector" :range="dateTimeArray1"  v-model="dateTime1" @change="change1" @columnchange="columnchange1">
				<view>
					<input type="text" disabled="true" v-model="upTower1" style="text-indent: 20rpx;" placeholder="请输入终止时间" placeholder-class="inputPlace" />
				</view>
					<image src="../../static/dates.png" class="wagongicon"></image>
			 </picker>
		  </view>
	  </view>
	  <view class="serchbutton">
		  <view class="resetVlue" @click="searchVueale">查询</view>
		  <view class="resetVlue cpnets" @click="resettop()">重置</view>
	  </view>
  </view>
</template>

<script>
  const dateTimePicker = require('@/utils/dateTimePicker.js')
  import {
      mongLists
    } from "@/api/WordServer.js"
  export default {
    components: {
	
    },

    data() {
      return {
		carnumber:'',
		chosenext:false,
		index: 0,
		index1: 0,
		index2: 0,
		index3: 0,
		index4: 0,
		array1: [ '直进直出','收料', '发料'],
		array2: ['单物资','多物资'],
		array3: [],
		array4: ['正常', '异常'],
		dateTimeArray: null,
		dateTime: null,
		startYear: 2000,
		endYear: 2050,
		upTower:'',
		upTower1:'',
		dateTimeArray1: null,
		dateTime1: null,
      }
    },

    onLoad(options) {
		 let arr = '2018/09/01 13:00'
		let obj = dateTimePicker.dateTimePicker(this.startYear, this.endYear,arr)
		this.dateTimeArray = obj.dateTimeArray
		this.dateTime = obj.dateTime
		this.dateTimeArray1 = obj.dateTimeArray
		this.dateTime1 = obj.dateTime
		this.init();
    },
	
    computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
     
    },
	onReady: function (res) {
	        
	    },
	onUnload(){
		
	},
    methods: {
		async init(){
			let res=await mongLists();
			if(res.data.success){
				console.log(11111222222)
				this.array3=res.data.result
			}
		},
		resettop(){
			this.carnumber='';
			this.upTower='';
			this.upTower1='';
			this.index=0;
			this.index1=0;
			this.index2=0;
			this.index3=0;
			this.index4=0;
		},
		searchVueale(){
			let data={
				plateNo:this.carnumber,
				inOutType:this.index1+1,
				weighType:this.index2+1,
				materialsName:this.array3[this.index3].materialsName,
				offsetResult:this.index4+1,
				beginTime:this.upTower?this.upTower+":00":'',
				endTime:this.upTower1?this.upTower1+":00":''
			}
			uni.navigateTo({
				url:'/pages/wagonhistrorydetail/wagonhistrorydetail?dataValue='+JSON.stringify(data)
			})
		},
		//时间格式化
		withData(param){
			return param < 10 ? '0' + param : '' + param;
		},
		change(e){
			let value = []
			// e.detail.value.forEach((val,index) => {
			// 	value.push(this.withData(val))
				
			// })
			e.detail.value.forEach((val,index) => { value.push(this.dateTimeArray[index][val]) }) 
			let dateArray =  value[0] + "-" + value[1] + "-" + value[2] + " " + value[3] + ":" + value[4]
			this.upTower = dateArray
		},
		change1(e){
			let value = []
			// e.detail.value.forEach((val,index) => {
			// 	value.push(this.withData(val))
			// })
			e.detail.value.forEach((val,index) => { value.push(this.dateTimeArray1[index][val]) }) 
			let dateArray = value[0] + "-" + value[1] + "-" + value[2] + " " + value[3] + ":" + value[4]
			this.upTower1 = dateArray
		},
		columnchange(e){
			let dateArr = this.dateTimeArray
			let arr = this.dateTime
			//滑动所在列的数据并对其值进行更新
			arr[e.detail.column] = e.detail.value
			//更新展示月份对应的天数（28 or 29 or 30 or 31）
			dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
			//最后把最新的数值赋值到dateTimeArray
			this.dateTimeArray = dateArr
			this.dateTime = arr
		},
		columnchange1(e){
			let dateArr = this.dateTimeArray1
			let arr = this.dateTime1
			//滑动所在列的数据并对其值进行更新
			arr[e.detail.column] = e.detail.value
			//更新展示月份对应的天数（28 or 29 or 30 or 31）
			dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
			//最后把最新的数值赋值到dateTimeArray
			this.dateTimeArray1 = dateArr
			this.dateTime1 = arr
		},
		bindDateChange: function(e) {
			this.date = e.target.value
		},
		bindPickerChange1: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index1 = e.target.value
		},
		bindPickerChange2: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index2 = e.target.value
		},
		bindPickerChange3: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index3 = e.target.value
		},
		bindPickerChange4: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.index4 = e.target.value
		},
		wagongpic(){
			console.log(33)
			uni.navigateTo({
				url:'/pages/wagonpic/wagonpic'
			})
		},
		goback(){
			uni.navigateBack()
		}
     }
  }
</script>

<style>
	page{
		background: #fff;
	}
	.titel{
		margin-top:33rpx;
		margin-bottom: 34rpx;
	}
	.videoboxs{
		width: 708rpx;
		height: 443rpx;
	}
	.head{
		width: 694rpx;
		height: 153rpx;
		padding-left: 28rpx;
		padding-right:28rpx;
		line-height: 193rpx;
		position: fixed;
		background: linear-gradient(0deg, #235FED, #235FED);
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
	}
	.safe{
		  width: 77%;
		  margin-left:80rpx;
	}
	.wagdetail{
		
	}
	.wagdetail .listwag{
		height: 110rpx;
		line-height: 110rpx;
		border-bottom: 1rpx solid #EAE7E7;
	}
	.wagdetail .listwag .wagongb1{
		margin-left:49rpx;
		margin-right:19rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #555555;
		width: 125rpx;
	}
	.wagdetail .listwag view:nth-child(2){
		height:83rpx;
		width:1rpx;
		background: #EAE7E7;
		margin-top:20rpx;
	}
	.wagdetail .listwag view:nth-child(3){
		margin-left: 26rpx;
		font-size: 31rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #555555;
	}
	.resetVlue{
		width: 625rpx;
		margin:0 auto;
		height: 90rpx;
		background: #649AFF;
		border-radius: 45rpx;
		font-size: 35rpx;
		font-family: 'PingFang SC';
		line-height: 90rpx;
		text-align: center;
		margin-top:40rpx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.serchbutton{
		position: fixed;
		bottom:69rpx;
		left: 63rpx;
	}
	input{
		height: 110rpx;
		line-height: 110rpx;
	}
	.uni-list-cell-db{
		width: 70%;
	}
	.wagongicon{
		position: absolute;
		width: 30rpx;
		height: 29rpx;
		right: 38rpx;
		margin-top:-70rpx;
	}
	.arrowicon{
		width: 14rpx;
		height: 24rpx;
		position: absolute;
		right: 38rpx;
	}
	.cpnets{
		border: 1px solid #BFBFBF;
		background: #fff;
		color:#9C9C9C;
	}
</style>

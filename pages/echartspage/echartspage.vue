<template>
  <view class="" style="position: relative;top:0;bottom: 0;background: #fff;z-index: 999;">
    <!-- 滚动内容区 -->
  	<view class="head flex mauto cwhite sw f34r">
  		<view class="boximgs mt8r" @tap="goback()">
  			<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
  		</view>
  		<view class="safe fcenter">统计分析</view>
  		<view>
  			<text v-if="false">下一题</text>
  		</view>
  	</view>
  	
	<view>
		<view>
			<view class="dataclass">
				<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'开始'" :end-text="'结束'" :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
				 <view class="datetext">{{range[0]}} - {{range[1]}}</view>
				 <image class="dateicon" src="../../static/dates.png" @click="onShowDatePicker('range')"></image>
			</view>
		</view>
		<echarts :option="option2" style="height: 448rpx;padding-top:20rpx;" @click="echartsClick"></echarts>
		<view class="contentecharts">
			<view class="echartchild">
				<view>待排产</view>
				<view>个数</view>
			</view>
			<view v-for="item in itemList" class="echartchild">
				<view>{{item.status}}</view>
				<view>{{item.total}}</view>
			</view>
		</view>
	</view>
  </view>
</template>
<script>
	import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue'
	import echarts from '@/components/echarts/echarts.vue'
	import{fnFormats} from '@/utils/CommonUtil.js'
	import {echartstable} from '@/api/AlbumServer.js'
  export default {
	  data(){
		  return{
			  itemList:[],
			  showPicker: false,
			  range: ['2021/01/01','2090/01/06'],
			  type: 'range',
			  value:'',
			  option2:{
			      tooltip: {
			          trigger: 'axis',
			          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			          }
			      },
			      grid: {
			          left: '3%',
			          right: '4%',
			          bottom: '7%',
			          containLabel: true,
					  height:160
			      },
			      xAxis: [
			          {
			              type: 'category',
			              data: [],
			              axisTick: {
			                  alignWithLabel: true
			              },
						  axisLabel: {  
						     interval:0,  
						     rotate:-40  
						  }  
			          }
			      ],
			      yAxis: [
			          {
			              type: 'value'
			          }
			      ],
			      series: [
			          {
			              name: '直接访问',
			              type: 'bar',
			              barWidth: '60%',
			              data: [],
						  itemStyle: {
							  normal: {
								  color:'#649BFF'
								 },
							}
			          }
			      ]
			  }
		  }
	  },
    computed: {
	  newsTotalData() {
	    return this.$store.getters['user/getAccountInfoData']
	  },
	  srcIMG(){
	  		  return this.$store.state.baseUrl+"/sys/common/static/"+this.$store.getters['user/getAccountInfoData'].headPic
	  },
	  agesuser(){
		  if(this.$store.getters['user/getAccountInfoData'].age){
			  return this.$store.getters['user/getAccountInfoData'].age
		  }
		  if(this.$store.getters['user/getAccountInfoData'].birthday){
		  		 return (new Date).getFullYear()-this.$store.getters['user/getAccountInfoData'].birthday.split('-')[0]
		  }
	  }
    },
	components:{
		echarts,MxDatePicker
	},
	onLoad(){
		console.log(fnFormats())
		this.range[0]=fnFormats()
		this.range[1]=fnFormats()
		this.init()
	},
    methods: {
		init(){
			let data={
				relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
				structType:'',
				beginTime:this.range[0].replace(/\//g,'-'),
				endTime:this.range[1].replace(/\//g,'-')
			}
			echartstable(data).then(res=>{
				console.log(res)
				let that=this;
				if(res.status==200&&res.data.result.length>0){
					that.itemList=res.data.result
					res.data.result.forEach(a=>{
						that.option2.xAxis[0].data.push(a.status)
						that.option2.series[0].data.push(a.total)
					})
					console.log(that.option2)
				}else{
					
				}
			})
		},
	onShowDatePicker(type){
		this.showPicker = true;
		this.type=type
		this.value=this[type]
	},
	onSelected(e) {//选择
		this.showPicker = false;
		if(e) {
			this[this.type] = e.value; 
			//选择的值
			console.log('value => '+ e.value);
			//原始的Date对象
			console.log('date => ' + e.date);
			this.init();
		}
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
	.contentecharts{
		border-top:19rpx solid #E8E8E8;
	}
	.contentecharts .echartchild{
		display: flex;
		justify-content: space-between;
		padding-left:66rpx;
		padding-right:64rpx;
		height: 85rpx;
		line-height: 85rpx;
		
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
	}
	.contentecharts .echartchild:nth-child(1){
		font-size: 30rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		color: #57585A;
	}
	.echartchild:nth-of-type(even){
		background: #F7F7F7;
	}
	.dataclass{
		width: 417rpx;
		height: 67rpx;
		margin:33rpx auto;
		border: 1rpx solid #EAE7E7;
		
		
		font-family: 'PingFang SC';
		text-indent: 19rpx;
		font-weight: 500;
		color: #57585A;
		border-radius: 3rpx;
		display: flex;
	}
	.datetext{
		border-right: 1rpx solid #EAE7E7;
		height: 53rpx;
		margin-top:7rpx;
		line-height: 53rpx;
		font-size: 27rpx;
		padding-right: 15rpx;
	}
	.dateicon{
		width: 29rpx;
		height: 28rpx;
		margin:19rpx 19rpx 19rpx 17rpx;
	}
</style>

<template>
  <view style="height:100%;position: absolute;bottom: 0;top:0;width: 100%;background: #efefef;">
	  <view class="head flex mauto cwhite sw f34r">
	  	<view class="boximgs mt8r" @tap="goback">
	  		<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
	  	</view>
	  	<view class="safe fcenter">统计分析</view>
	  	<view>
	  		<text v-if="chosenext">下一题</text>
	  	</view>
	  </view>
	  <view class="echart">
	  			<echarts-el :option="optionb" style="height: 200px;"></echarts-el>
	  </view>
	  <view class="echart">
			<echarts-el :option="option" style="height: 200px;"></echarts-el>
	  </view>
	  <view class="echart">
	  		<echarts-el :option="optionsk" style="height: 200px;"></echarts-el>
	  </view>
	  <view class="echart" style="">
	  		<echarts-el :option="optionso" style="height: 200px;"></echarts-el>
	  </view>
	 
  </view>
</template>

<script>
import EchartsEl from '@/components/echarts/echarts-el.vue'
import {
    getWordInfo
  } from "@/api/WordServer.js"
  export default {
    components: {
		EchartsEl
    },

    data() {
      return {
		chosenext:false,
		optionso:{
			 title: {
			        left: 'center',
			        text: '直进直出统计(每月)',
			    },
		    xAxis:[
				{
				    type: 'category',
				    data: []
				}
			],
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		        data: [],
		        type: 'line',
				areaStyle: {
					normal: {
						color: '#ff9a52' //改变区域颜色
					}
				},
				itemStyle: {
					normal: {
						color: '#ff9a52', //改变折线点的颜色
						lineStyle: {
							color: '#ff9a52' //改变折线颜色
						}
					}
				},
		    }]
		},
		optionsk:{
			 title: {
			        left: 'center',
			        text: '发料统计(每月)',
			    },
		    xAxis:[
				{
				    type: 'category',
				    data: []
				}
			],
		    yAxis: {
		        type: 'value'
		    },
		    series: [{
		        data: [],
		        type: 'line',
				areaStyle: {
					normal: {
						color: '#5757c8' //改变区域颜色
					}
				},
				itemStyle: {
					normal: {
						color: '#5757c8', //改变折线点的颜色
						lineStyle: {
							color: '#5757c8' //改变折线颜色
						}
					}
				},
		    }]
		},
		option: {
			 title: {
			        left: 'center',
			        text: '收料统计(每月)',
			    },
			
			xAxis:[
				{
				    type: 'category',
				    data: []
				}
				
			],
			yAxis: {
			    type: 'value'
			},
			series: [{
			    data: [],
			    type: 'line',
				areaStyle: {
					normal: {
						color: '#86ce6a' //改变区域颜色
					}
				},
				itemStyle: {
					normal: {
						color: '#86ce6a', //改变折线点的颜色
						lineStyle: {
							color: '#86ce6a' //改变折线颜色
						}
					}
				},
			}]
		},
		optionb:{
		    title: {
		        text: '偏差统计(每月)',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'right',
		    },
			color:['#86ce6a','#d35959'],
		    series: [
		        {
		            name: '访问来源',
		            type: 'pie',
		            radius: '50%',
		            data: [],
		            emphasis: {
		                itemStyle: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            },
					itemStyle:{ 
					normal:{ 
					   label:{ 
						  show: true, 
						  formatter: '{b} : {c} ({d}%)' 
						  }, 
						  labelLine :{show:true} 
						  } 
					 }
		        }
		    ]
		}
      }
    },

    onLoad(options) {
	  this.init2()
	  this.init3()
	  this.init4()
	  this.init5()
    },

    computed: {
    
     
    },
	onReady: function (res) {
	        
	    },
	onUnload(){
		
	},
    methods: {
		// 偏差统计
		async init2(){
			let data={
				countType:1,
				inOutType:'',
				timeType:4,
			    relTenantIds:null
			} 
			let res=await getWordInfo(data)    
			if(res.data.success && res.data.result != '暂无数据'){
				let objList=[]
				res.data.result.forEach(a=>{
					if(a.result==1) a.result='正常'
					if(a.result==2) a.result='异常'
					let obj={
						name:a.result,
						value:a.countValue
					}
					objList.push(obj)
				})
				this.optionb.series[0].data=objList
			}
		},
		// 今日收料
		async init3(){
			let data={
				countType:2,
				inOutType:2,
				timeType:4,
			    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordInfo(data)
			if(res.data.success && res.data.result != '暂无数据'){
				res.data.result.forEach(a=>{
					this.option.xAxis[0].data.push(a.countTime)
					this.option.series[0].data.push(a.suttleTotal)
				})
			}
		},
		// 今日发料
		async init4(){
			let data={
				countType:2,
				inOutType:3,
				timeType:4,
			    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordInfo(data)
			if(res.data.success && res.data.result != '暂无数据'){
				res.data.result.forEach(a=>{
					this.optionsk.xAxis[0].data.push(a.countTime)
					this.optionsk.series[0].data.push(a.suttleTotal)
				})
			}
		},
		// 直进直出
		async init5(){
			let data={
				countType:2,
				inOutType:1,
				timeType:4,
			    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordInfo(data)
			if(res.data.success && res.data.result != '暂无数据'){
				res.data.result.forEach(a=>{
					this.optionso.xAxis[0].data.push(a.countTime)
					this.optionso.series[0].data.push(a.suttleTotal)
				})
			}
		},
		goback(){
			uni.navigateBack()
		}
     }
  }
</script>

<style>
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
		top:0;
		z-index: 999;
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
	.echart{
		position: relative;
		top:140rpx;
		width: 708rpx;
		height: 393rpx;
		maring:0rpx auto;
		border-radius: 7px;
		margin-left: 21rpx;
		background: #fff;
		margin-top:30rpx;
	}
</style>

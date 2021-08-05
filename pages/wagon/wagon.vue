<template>
	<view>
	  <view v-if="status.home" :style="{display: current==0 ? 'block' :'none'}">
		<view class="wagonback cwhite f28r">
			<view class="head flex mauto cwhite sw f34r">
				<view class="boximgs mt8r" @tap="goback">
					<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
				</view>
				<view class="safe fcenter">物资管理</view>
				<view>
					<text v-if="false">下一题</text>
				</view>
			</view>
			<view class="heaheader_cont flex monop svb">
				<view class="f36r sw">今日磅单</view>
				<view @click="wagonecharts">统计分析</view>
				<view></view><view></view>
				<view @click="wagonhistory()">历史磅单</view>
			</view>
			<view class="echartsp">
				<echarts :option="option2" style="height: 358rpx;" @click="echartsClick"></echarts>
			</view>
			<view class="norecord" @click="norecord">异常记录&nbsp;></view>
			<view class="flexr-jsa fcenter svb">
				<view class="issue">
					<view class="f38r sw">{{init3s?init3s:0}}<text class="f28r">t</text></view>
					<view class="f24r">今日收料</view>
				</view>
				<view class="issue">
					<view class="f38r sw">{{init4s?init4s:0}}<text class="f28r">t</text></view>
					<view class="f24r">今日发料</view>
				</view>
				<view class="issue">
					<view class="f38r sw">{{init5s?init5s:0}}<text class="f28r">t</text></view>
					<view class="f24r">今日直进直出</view>
				</view>
			</view>
		</view>
		<view class="mid-center">
			<view class="stack-wrapper">
			  <stack ref="stack" :pages="someList" :stackinit="stackinit"></stack>
			</view>
		</view>
	  </view>
	<!--  <shop v-if="status.shop" :style="{display: current==1 ? 'block' :'none'}"></shop> -->
	  <!-- 我的1 -->
	<!--  <my v-if="status.my" :style="{display: current==2 ? 'block' :'none'}"></my>
   <bottom-nav :current="current" :parameter="bottomNav" @current="fnCurrent"></bottom-nav> -->
  </view>
</template>

<script> 
 import BottomNav from '@/components/bottom-nav/bottom-nav'
import Echarts from '@/components/echarts/echarts.vue'
import stack from '@/components/stack/stack.vue'
import My from '@/pages/my/my'
  // 底部导航栏组件-商城
  import Shop from '@/pages/shop/shop'
import {
    getWordList,getWordInfo
  } from "@/api/WordServer.js"
  export default {
    data() {
      return {
		   current: 0,
		  bottomNav: {
		    // 文字颜色
		    "color": "#8E8E8E",
		    // 选中文字颜色
		    "selectedColor": "#4F82ED",
		    // 背景颜色
		    "backgroundColor": "#FFFFFF",
		    // 底部上边线颜色
		    borderColor: "#EEEEEE",
		    // 导航项
		    "list": [{
		        "text": "主页",
		        "icon": "/static/icon-bottom-nav/home_normal.png",
		        "selectedIcon": "/static/icon-bottom-nav/home_select.png"
		      },
		      {
		        "text": "消息中心",
		        "icon": "/static/icon-bottom-nav/shop_normal.png",
		        "selectedIcon": "/static/icon-bottom-nav/shop_select.png"
		      },
		      {
		        "text": "我的",
		        "icon": "/static/icon-bottom-nav/my_normal.png",
		        "selectedIcon": "/static/icon-bottom-nav/my_select.png"
		      }
		    ]
		  },
		  status: {
		    home: true,
		    //find: false,
		    shop: false,
		    my: false,
		    //release: false,
		    //start: true
		  },
		  init3s:'',
		  init4s:'',
		  init5s:'',
		  someList: [
		{
          type1:"浙AU70K7",
		  type2:"11",
		  type3:"2",
		  type4:"",
		  type5:"",
		  type6:"",
		  type7:"",
		  type8:"",
		  type9:"",
		  type10:"",
        },
        {
          html: ''
        },
        {
          html: '<img src="src/img/3.png" alt="03">'
        },
        {
          html: '<img src="src/img/4.png" alt="04">'
        },
        {
          html: '<img src="src/img/5.png" alt="05">'
        },
        {
          html: '<img src="src/img/6.png" alt="06">'
        },
        {
          html: '<img src="src/img/7.png" alt="07">'
        }],
		        stackinit: {
		          visible: 3
		        },
        id: -1, 
		namecong:'文章列表',
		mescroll: null,
		up:{
		  auto:false //默认开始不执行上拉
		},
		 down:{
			  auto:true //默认开始不执行下拉
		},
		option2: {
			  title: {
			            text: '偏差正常率',
			            left: 'center',
			            bottom: '28%',
			            textStyle: {
			                fontSize: '100%',
			                fontWeight: '400',
							color:"#91aff6",
			            }
			        },
			        grid: {
			            top: '1%',
			            left: '1%',
			            right: '1%',
			            bottom: '10%',
			            containLabel: true
			        },
			        color: ["rgba(255,255,255,0)", "#fff", "#3258ca"],
			        series: [
			            {
			                name: '偏差正常率',
			                type: 'pie',
			                startAngle: 310,
							minAngle:0,
			                radius: ['90%', '95%'],
			                legendHoverLink: false,
			                hoverAnimation: false,
			                avoidLabelOverlap: false,
			                labelLine: {
			                    normal: {
			                        show: false
			                    }
			                },
			                data: [
			                    {
			                        value: 30,
			                        name:   '98%',
			                        label:{
			                            position:'center',
			                            color:"#fff",
			                            fontSize: '300%',
										fontWeight: 'bold',
										padding:[-25,0,0,0]
			                        }
			                    },
			                    {
			                        value: 98
			                    },
			                    {
			                        value: 100 - 90
			                    }
			                ]
			            }
			        ]
				
		
		}
	}
    },
	components:{
		stack,
		Echarts,
		BottomNav,
		Shop,
		My
	},
    computed: {
      // 用户
      
    },
    onLoad(options) {
	  this.someList.forEach(a=>{
		  a.html=""
	  })
	  console.log(this.someList)
	  this.init1();
	  this.init2();
	  this.init3();
	  this.init4();
	  this.init5();
    },
	onShow(){
	},
    methods: {
		fnCurrent(index){
			let text = this.bottomNav.list[index].text;
			  // 是否中间单图标点击 
			  if (text) {
			    this.current = index;
			  }
			//   // 首次选中激活底部导航关联页状态
			  if (!this.status.home && index == 0) this.status.home = true;
			  if (!this.status.shop && index == 1) this.status.shop = true;
			  if (!this.status.my && index == 2) this.status.my = true;
		},
		// 今日磅单
		async init1(){
			let data={
			  isToday:"1",
			  pageNo:1,
			  pageSize:10,
			  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordList(data)
			console.log(res)
			if(res.data.success){
				let resLists=res.data.result.records
				resLists.forEach(a=>{
					let marternames='';
					  (JSON.parse(a.materialsInfo)).forEach(b=>{
						marternames+=b.materialsName+'、'
					  })
					  a.materialsSpare=marternames.substring(0,marternames.length-1)
				})
				this.someList=resLists
			}
		},
		// 偏差统计
		async init2(){
			let data={
				countType:1,
				inOutType:'',
				timeType:1,
			    relTenantIds:null
			}
			let res=await getWordInfo(data)
			if(res.data.success && res.data.result != '暂无数据'){
				let conutmong=0;
				let a1=0;
				let a2=0;
				res.data.result.forEach(a=>{
					if(a.result==1) a1=a.countValue
					if(a.result==2) a2=a.countValue
				})
				conutmong=a1/(a1+a2)
				console.log(conutmong)
				this.option2.series[0].data[0].name=(conutmong.toFixed(2))*100+'%'
				this.option2.series[0].data[2].value=100-(conutmong.toFixed(2))*100
			}
		},
		// 今日收料
		async init3(){
			let data={
				countType:2,
				inOutType:2,
				timeType:1,
			    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordInfo(data)
			if(res.data.success){
				this.init3s=res.data.result[0].suttleTotal
			}
		},
		// 今日发料
		async init4(){
			let data={
				countType:2,
				inOutType:3,
				timeType:1,
			    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordInfo(data)
			if(res.data.success){
				this.init4s=res.data.result[0].suttleTotal
			}
		},
		// 直进直出
		async init5(){
			let data={
				countType:2,
				inOutType:1,
				timeType:1,
			    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds
			}
			let res=await getWordInfo(data)
			if(res.data.success){
				this.init5s=res.data.result[0].suttleTotal
			}
		},
		norecord(){
			let data={
				offsetResult:2,
			}
			uni.navigateTo({
				url:'/pages/wagonhistrorydetail/wagonhistrorydetail?dataValue='+JSON.stringify(data)
			})
		},
		echartsClick(params) {
			console.log('点击数据', params)
		},
		wagonhistory(){
			uni.navigateTo({
				url:'/pages/wagonhistory/wagonhistory'
			})
		},
		wagonecharts(){
			uni.navigateTo({
				url:'/pages/wagonecharts/wagonecharts'
			})
		},
		goback() {
			uni.navigateBack();
		},
		/**
		 * 切换数据
		 */
		updateClick() {
			if (this.option === this.option2) {
				this.option = this.option3
			} else {
				this.option = this.option2
			}
		}

		 // prev () {
		 //      this.$refs.stack.$emit('prev')
		 //    },
		 //    next () {
		 //      this.$refs.stack.$emit('next')
		 //    }
    }
  }
</script>

<style>
	.mid-center{
		margin-top:-50rpx;
	}
	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #235fed, #235fed);
	}
	.boximgs {
		width: 21rpx;
		height: 38rpx;
		padding-left: 30rpx;
	}
	.safe {
		width: 70%;
		padding-left: 80rpx;
	}
  .stack-wrapper{
    margin: 0 auto;
    position: relative;
    z-index: 288;
    width: 708rpx;
    height: 651rpx;
    padding: 0;
    list-style: none;
    pointer-events: none;
  }
  .controls{
    position: relative;
    width: 200px;
    /* text-align: center; */
    display:flex;/*Flex布局*/
    display: -webkit-flex; /* Safari */
    justify-content:space-around;
    margin: 0 auto;
    margin-top: 68px
  }
  .controls .button {
    border: none;
    background: none;
    position: relative;
    display: inline-block;
    cursor: pointer;
    font-size: 16px;
    width: 50px;
    height: 50px;
    z-index: 100;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    border-radius: 50%;
    background: #fff;
  }
  .button .next{
    display: inline-block;
    width: 10px;
    height:5px;
    background: rgb(129,212,125);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
    left: -5px;
    top: 2px;
    position: relative;
  }
  .button .next:after{
    content:'/';
    display:block;
    width: 20px;
    height:5px;
    background: rgb(129,212,125);
    -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
  }
  .button .prev{
    display: inline-block;
    width: 20px;
    height:5px;
    background: rgb(230,104,104);
    line-height: 0;
    font-size:0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
  }
  .button .prev:after{
    content:'/';
    display:block;
    width: 20px;
    height:5px;
    background: rgb(230,104,104);
    -webkit-transform: rotate(-90deg);
  }
  .controls .text-hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    color: transparent;
    display: block;
}
.wagonback{
	height:791rpx;
	width: 780rpx;
	width: 100%;
	background: linear-gradient(0deg, #235FED, #235FED);
	z-index: -8;
}
.echartsp{
	z-index: 999;
}
.heaheader_cont{
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
}
/* .monop view:nth-child(1){
	margin-top:91rpx;
	margin-left: 38rpx;
}
.monop view:nth-child(2){
	margin-top:100rpx;
	margin-left: 58rpx;
}
.monop view:nth-child(3){
	margin-top:100rpx;
	margin-left: 251rpx;
} */
.issue view:nth-child(2){
	opacity: 0.5;
	margin-top:14rpx;
}
.norecord{
	position: absolute;
	top:480rpx;
	left: 285rpx;
	width: 180rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	background: #1849BC;
	border-radius: 12rpx;
}
</style>
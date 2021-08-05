<template>
  <view>
	  <view class="head flex mauto cwhite sw f34r">
	  	<view class="boximgs mt8r" @tap="goback">
	  		<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
	  	</view>
	  	<view class="safe fcenter">设备附件</view>
	  	<view>
	  		<text v-if="false">下一题</text>
	  	</view>
	  </view>
	<comm-input @chang="changvalue"></comm-input>
    <!-- 滚动内容区 -->
    <mescroll-uni @down="downCallback" @up="upCallback" :top="255">
      <view v-for="(item,index) in archivesLists" :key="index" class="flex bgwhite entctron">
		<view class="detailfient" @tap="godetails(item)">
			<image src="../../static/xxx.png" class="pdfval" v-if="typeword(item)==1"></image>
			<image src="../../static/ttt.png" class="pdfval" v-if="typeword(item)==2"></image>
			<image src="../../static/ppp.png" class="pdfval" v-if="typeword(item)==3"></image>
			<image src="../../static/word.png" class="pdfval" v-if="typeword(item)==4"></image>
			<image src="../../static/mmm.png" class="pdfval" v-if="typeword(item)==5"></image>
			<image src="../../static/jjj.png" class="pdfval" v-if="typeword(item)==6"></image>
			<view>
				<view class="namepng">{{item.split('/temp/')[1]}}</view>
				<!-- <view style="display: flex;" class="timesize">
					<view>{{item.createTime}}</view>
				</view> -->
			</view>
		</view>
      </view>
    </mescroll-uni>
  </view>
</template>

<script>
import {doucmentLists} from '@/api/AlbumServer.js'
import CommInput from '@/components/comm-input/comm-input'
  export default {
	  data(){
		return{
			archivesList:[],
			type:'',
			name:''
		}  
	  },
	components:{
		CommInput
	},
    computed: {
      resource() {
        return this.$store.getters['common/resource']
      },
	  archivesLists(){
		  var arrList=this.archivesList
		  if(this.name){
			  let newList=arrList.filter(a=>{
			  	if(a.indexOf(this.name)!=-1){
			  		return a
			  	}
			  })
			  return newList
		  }else{
			  return arrList
		  }
	  }
    },
	onLoad(options){
		if(options&&options.val){
			this.archivesList=options.val.split(',')
			console.log(this.archivesList)
		}
	},
    methods: {
		typeword(val){
			let type=val.split('.').slice(val.split('.').length-1);
			if(type=='xls'||type=='xlsx'){
				return 1
			}else if(type=='ppt'){
				return 2
			}else if(type=='pdf'){
				return 3
			}else if(type=='word'){
				return 4
			}else if(type=='mp4'){
				return 5
			}else if(type=='jpg'){
				return 6
			}
		},
		changvalue(val){
			this.name=val;
		},
		godetails(item){
			console.log(item)
			uni.navigateTo({
				url:'../webview/webview?filePath='+item.filePath
			})
		},
		goback(){
			uni.navigateBack()
		},
      /// 下拉刷新的回调
      downCallback(mescroll) {
        // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        mescroll.resetUpScroll()
      },
      /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      upCallback(mescroll) {
        doucmentLists({
          pageNo: mescroll.num,
          pageSize: mescroll.size,
		  archivesTreeId:this.archivesTreeId
        }).then(violaRes => {
			// violaRes.data.result.records.forEach(a=>{
			// 	a.goodsPic=this.$store.state.baseUrl+"/sys/common/static/"+a.goodsPic
			// })
          if (mescroll.num == 1) {
            this.$store.commit('common/resourceList', violaRes.data.result.records)
          } else {
            this.$store.commit('common/resourceList', this.resource.concat(violaRes.data.result.records))
          }
          mescroll.endSuccess(violaRes.data.result.records.length, violaRes.data.result.records.length >= mescroll.size);
        }).catch(() => {
          mescroll.endErr();
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
		width: 694rpx;
		height: 153rpx;
		padding-left: 28rpx;
		padding-right:28rpx;
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
	.detailfient{
		display: flex;
		height: 120rpx;
		line-height: 50rpx;
		border-bottom: 1rpx solid #EAE7E7;
		width: 100%;
	}
	.pdfval{
		width: 39rpx;
		height: 49rpx;
		margin-left: 38rpx;
		margin-right: 34rpx;
		margin-top:36rpx;
	}
	.namepng{
		font-size: 32rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #444444;
		/* margin-top:18rpx; */
		/* margin-bottom: -13rpx; */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width:600rpx;
		line-height: 120rpx;
	}
	.timesize{
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #C5C5C5;
	}
	
</style>

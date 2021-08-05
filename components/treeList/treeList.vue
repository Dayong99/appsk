<template>
  <view>
	<view class="nametotal" :style="{'justify-content':(!treeData.children?'baseline':'space-between')}" @tap="isBranch&&treeData.children?toggle():mentclick(treeData)">
		<view v-if='!treeData.children' class="square">
			<text></text>
		</view>
		<view class="name">{{treeData.title}}</view>
		 <image :src="'../../static/'+(open?'top1.png':'top2.png')" :style="{width:(open?'20rpx':'16rpx'),height:(open?'16rpx':'20rpx')}" class="menu-img" v-if='isBranch&&treeData.children'></image>
	</view>
	  <view style="padding-left: 53rpx;" v-if="isBranch" v-show="!open">
		  <treeList v-for="(item,index) in treeData.children" :treeData="item"></treeList>
	  </view>
  </view>
</template>

<script>
  import {
    treeList
  } from "@/components/treeList/treeList.vue"

  /**  
   * 摄影展示卡组件
   * @property {Object} infoData 信息数据  
   * @event {Function} huiba 荟吧标签 点击事件  
   * @event {Function} click 展示卡 点击事件  
   */
  export default {
	  data(){
		  return{
			  open:true,
			  isBranch:true,
			  index:0
			  
		  }
	  },
    name: 'treeList',
	props:{
		treeData:Object
	},
	components:{
		treeList
	},
	onLoad(){
		console.log(111)
		console.log(this.treeData)
	},
    computed: {

    },
	methods:{
		toggle(){
			console.log(1)
			if(this.isBranch){
					this.open=!this.open
			}
		},
		mentclick(item){
			console.log(2)
			console.log(item)
			// this.$emit('parentClick')
			//   console.log(val)
			let pages=getCurrentPages();
			let prev=pages[pages.length-2];
			prev.$vm.serios=item;
			uni.navigateBack({
				delta: 1
			});
			
		}
	}
  }
</script>

<style scoped>
	.name{
		height: 107rpx;
		line-height: 107rpx;
		padding-left: 35rpx;
	}
	.menu-img{
		width: 29rpx;
		height: 17rpx;
		margin-top:45rpx;
		margin-right: 45rpx;
		
	}
	.nametotal{
		display: flex;
		/* justify-content: space-between; */
		width: 100%;
		border-bottom: 1rpx solid #EAE7E7;
	}
	.square{
		width: 40rpx;
		height: 40rpx;
		border: 1rpx solid #E1E1E1;
		border-radius: 50%;
		margin-top:30rpx;
		margin-right:-10rpx ;
		position: relative;
	}
	.square text{
		width: 13rpx;
		height: 13rpx;
		display: inline-block;
		background: #fff;
		border-radius: 50%;
		margin:14rpx;
	}
	.currents{
		background: #235FED;
	}
</style>

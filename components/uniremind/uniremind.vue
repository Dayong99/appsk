<template>
	<view class="posir pagehome">
	  <view class="head flex mauto cwhite sw f34r">
		<view class="boximgs mt8r">
			
		</view>
		<view class="safe fcenter">{{uniremind}}</view>
		<view>
			<text v-if="false">下一题</text>
		</view>
	  </view>
		<view>
			<mescroll-uni @down="downCallback" @up="upCallback" :top="330" @init="mescrollInit">
				<view v-for="(item,index) in uniremindList" :key="index" class="beamListbox" >
					<view class="beamList" style="">
						<view class="nameplan" style="width: 615rpx;margin-left: -8rpx;">
							<view class="startend">
								<text style="display:inline-block;">
									计划时间:{{item.planStartTime}}<text style="display:inline-block;margin:0 8rpx;">至</text>{{item.planTerminationTime}}
								</text>
							</view>
						</view>
						<view class="plancontent">
							<view v-for="child in item.deviceInspectionPlanSubList" class="planchildlist">
								 <view class="planterm">
									<text class="goplan" style="background: #B0B0B0;">{{child.inspectionStatus_dictText}}</text>
									<text class="godetails">{{child.inspectionContent}}</text>
								</view>
								<view class="contengbox">
									<view class="botmeg">
										<image class="ren" src="../../static/dingwei2.png"></image>
										<text style="display: inline-block;margin-right: 35rpx;">{{child.inspectors}}</text>
										<image class="locations" src="../../static/dingwei1.png"></image>
										<text>{{child.inspectors}}</text>
									</view>
									 <view class="routing" @click="searcgvaky('examine',child)">去检查</view>
								</view> 
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	 export default{
		name:'uniremind',
		props:{
			uniremind:'',
			uniremindList:[]
		},
		data(){
			return{
				mescroll:null,
			}
		},
		computed:{
			
		},
		methods:{
			mescrollInit(mescroll) {
			  this.mescroll = mescroll;
			},
			downCallback(mescroll) {
			  // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			  this.mescroll.resetUpScroll()
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				this.$emit('mescrollList',mescroll)
			},
		}
	}
</script>

<style scoped>
	.message{
		width: 321rpx;
		height: 339rpx;
		top:305rpx;
		left: 211rpx;
	}
	.boxmesg{
		width: 100%;
		position: fixed;
		bottom:130rpx;
		background: #fff;
		left:0;
		top:153rpx;
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
</style>

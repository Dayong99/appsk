<template>
	<view>
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png"  class="hw100v"></image>
			</view>
			<view class="safe fcenter">AI监测详情</view>
		</view>
		<view class="const-screening">
			<view class="screenings">
				<view class="uni-list-cell-left">
					监测时间：
				</view>
				<view class="example-body">
					<uni-datetime-picker v-model="rangeList" type="daterange"  rangeSeparator="至" />
				</view>
			</view>
			<view class="screenings">
				<view class="uni-list-cell-left">
					审核状态：
				</view>
				<view class="uni-list-cell-db">
					<picker   :range="ReviewLists" :value="indexR" range-key="name" @change="bindPickerChangeR"  class="bindPicker-Change">
						<view class="uni-input">{{ReviewLists[indexR].name}}</view>
					</picker>
				</view>
				<image class="uni-list-cell-righ" src="../../static/jkpe.png"></image>
			</view>
			<view class="screenings">
				<view class="uni-list-cell-left">
					关联设备：
				</view>
				<view class="uni-list-cell-db">
					<picker   :range="listTwo" :value="index" range-key="deviceName" @change="bindPickerChange"  class="bindPicker-Change">
						<view class="uni-input">{{listTwo[index].deviceName}}</view>
					</picker>
				</view>
				<image class="uni-list-cell-righ" src="../../static/jkpe.png"></image>
			</view>
			<view style="display: flex; margin-top: 29rpx; justify-content: center;">
				<view style="margin-right: 70rpx;">
					<button class="button-cla" type="mini" @click="TheQueryAi">查询</button>
				</view>
				 <view>
					  <button class="button-cla two-button" type="mini" @click="resetTheQueryAi">重置</button>
				 </view>
				
			</view>
		</view>
		<view class="Screening-results">筛选结果</view>
		<mescroll-uni ref="ani" @up="upCallback" :fixed="true" @down="downCallback" :down="down" auto
			:up="up" :top="660"  v-if="showTu" @init="mescrollInit">
			<timeAxis :listTo="reservoirSituation"></timeAxis>
		</mescroll-uni>
		<view class="kong-reservoirSituation" v-if="!showTu">
			<image class="kong-reservoirSituation-img" src="../../static/Null-data.png"></image>
		</view>
	</view>
</template>

<script>
	import timeAxis from '@/components/time_axis/time_axis';
	import {getNoPageList,getMonitorResult} from '@/api/AlbumServer.js'
	export default {
		components: {
			timeAxis
		},
		data(){
			return {
				rangeList: [],
				isShowToTop: true, //开启回到顶部按钮
				mescroll: {},
				up: {
					auto: false //默认开始不执行上拉
				},
				down: {
					auto: false //默认开始不执行下拉
				},
				arrs: {
					pageNo: 1,
					pageSize: 10,
					column: 'checkState',
					order: 'asc',
				},
				showTu:true,  //
				lists:[],
				index:0,
				mescroll:{},
				indexR:0,
				reservoirSituation: [], //水库列表
				listTwo:[{deviceName:'全部',id:''}],
				ReviewLists:[{name:'全部',index:''},{name:'未审核',index:0},{name:'准确',index:1},{name:'误报	',index:2}]
			}
		},
		onShow() {
			this.getMonitorResultList()
		},
		methods:{
			goback(){
				uni.navigateBack()
			},
			//默认加载
			postMonitorList(arr){
			      let _that = this
				  _that.reservoirSituation = []
					getMonitorResult(arr).then(res => {
						if (res.data.code !== 200) {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1000
							});
						} else {
							_that.mescroll.endSuccess()
							if(res.data.result.records.length > 0){
								_that.reservoirSituation = res.data.result.records
							}else {
								_that.showTu= false
							}
							
							
				
						}
					})
			},
			// 获取水库汇总所有信息
			mescrollInit(mescroll) {
				this.mescroll = mescroll
				this.postMonitorList(this.arrs)
			},
			/// 下拉刷新的回调，默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			/// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
			upCallback(mescroll) {
				this.arrs.pageNo = mescroll.num
				getMonitorResult(this.arrs).then(res => {
					// console.log('获取水库汇总所有信息' + mescroll.num, res)
					if (res.data.code !== 200) {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1000
						});
					} else {
						if (mescroll.num == 1) this.reservoirSituation = []
						this.showTu= false
						mescroll.endSuccess()
						if (res.data.result.records.length !== 0) {
							mescroll.endSuccess()
							this.showTu= true
							this.reservoirSituation = this.reservoirSituation.concat(res.data.result.records)
							
						} else {
							mescroll.endErr()
						}
					}
			
				})
			},
			//选择关联设备
			bindPickerChange(e) {
				this.index = e.target.value
				this.arrs.vcsDeviceId = this.listTwo[this.index].id
			},
			//选择审核状态
			bindPickerChangeR(e){
				this.indexR = e.target.value
				if( e.target.value !== 0) {
					this.arrs.checkState = this.ReviewLists[this.indexR].index
				}
			},
			//查询水库设备
			getMonitorResultList(){
				let _that = this
				getNoPageList({relTenantIds: this.$store.getters['user/getAccountInfoData'].relTenantIds,deviceCatagory: "camera"}).then(res =>{
					if(res.data.code === 200) {
						_that.lists = res.data.result
						_that.lists.forEach(item =>{
							_that.listTwo.push({deviceName:item.deviceName,id:item.id})
						})
					}
				})
			},
			//查询ai
			TheQueryAi(){
				console.log(this.rangeList)
				if(this.rangeList.length>0) {
					this.arrs.shortTime_begin = this.rangeList[0]
					this.arrs.shortTime_end = this.rangeList[1]+' 23:59:59'
				}
				
				this.postMonitorList(this.arrs)
			},
			//重置
			resetTheQueryAi(){
				this.rangeList = []
				this.index = 0
				this.indexR = 0
				this.arrs = {
					pageNo: 1,
					pageSize: 10,
					column: 'shortTime',
					order: 'desc',
				}
				this.postMonitorList(this.arrs)
				
				
			}
		}
		
	}
</script>

<style scoped>
	.head {
		width: 100%;
		height: 153rpx;
		line-height: 193rpx;
		background: linear-gradient(0deg, #208FE7, #208FE7);
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
	.const-screening {
		padding: 33rpx 0rpx 28rpx 0rpx;
	}
	.screenings {
		height: 88rpx;
		line-height: 88rpx;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 28rpx;
		color: #333333;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #EEEEEE;
		padding-left: 33rpx;
		padding-right: 28rpx;
	}
	.uni-list-cell-righ {
		width: 13rpx;
		height: 23rpx;
		margin-left: auto;
	}
/* 	.bindPicker-Change {
		width: 200rpx;
	} */
	.uni-list-cell-left {
		width: 200rpx;
	}
	.uni-list-cell-db {
		width: 100%;
	}
	.button-cla {
		width: 167rpx;
		height: 69rpx;
		background: #208FE7;
		border-radius: 7rpx;
		font-size: 35rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 69rpx;
		text-align: center;
	}
	.two-button {
		border: 1rpx solid #208FE7;
		background-color: #FFFFFE;
		color: #208FE7;
	}
	.Screening-results {
		height: 80rpx;
		line-height: 80rpx;
		padding-left: 33rpx;
		padding-right: 28rpx;
		font-family: PingFang-SC-Medium;
		font-weight: Medium;
		font-size: 28rpx;
		background-color: #EEEEEE;
	}
	.kong-reservoirSituation {
		margin-top: 190rpx;
		text-align: center;
	}
	.kong-reservoirSituation-img {
		width: 324rpx;
		height: 192rpx;
	}
</style>

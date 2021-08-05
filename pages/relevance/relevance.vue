<template>
  <view class="" style="position: relative;top:0;bottom: 0;z-index: 999;height:100%;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">关联梁</view>
			<view>
				<text v-if="false">下一题</text>
			</view>
		</view>
		<view class="beamtotal">
			<view>
				<text @click="fnbarClick(1)" :class='{beamcurrent:current==1}'>制作中</text>
			</view>
			<view>
				<text @click="fnbarClick(2)" :class='{beamcurrent:current==2}'>已制作</text>
			</view>
		</view>
		<view>
			<mescroll-uni @up="upCallback" @down="downCallback" top="240" style="" @init="mescrollInit" :propstext="propstext">
			  <block v-for="(item,index) in manufacturListimg" :key="index" class="beamListbox" v-if="current==1">
					<view class="beamList">
						<view class="nameplan">
							<view>
								<view class="unit"  @tap="choseSquare(item,index)"><text :class="{confirmcolor:index==popuent}"></text></view>
								<view class="produced" v-if="item.structStatusSort_dictText" style="margin-right: 7rpx;">{{item.structStatusSort_dictText}}</view>
								<text style="display:inline-block;width: 350rpx;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{item.bridgeName}}</text>
							</view>
							<view class="plan" @click="updateprocess(item)">更新进度</view>
						</view>
						<view class="beamnumber">
							<view class="beamchild">
								<view>桥孔编号:{{item.bridgeHoleNumber}}</view>
								<view>对应桥墩:{{item.correspondingPierNumber}}</view>
								<view>梁编号:{{item.beamNumber}}</view>
								<view>中/边梁:{{item.centerOrSideBeam}}</view>
							</view>
							<view class="beamchild">
								<view>理论跨径(cm):{{item.theoreticalSpan}}</view>
								<view>标准梁长(cm):{{item.standardBeamLength}}</view>
								<view>预准梁长(cm):{{item.prefabricatedBeamLength}}</view>
								<view>砼方量(m³):{{item.concreteVolume}}</view>
							</view>
						</view>
						<view class="gobeamdetail" @click="godetail(item)">
							详情>
						</view>
					</view>
				</block>
				<block v-for="(item,index) in manufacturListimg" :key="index" class="beamListbox" v-if="current==2">
					<view class="beamList">
						<view class="nameplan" style="width:605rpx;display: flex;justify-content: space-between;padding-left: 33rpx;">
							<view>								
								<view class="produced" v-if="item.structStatusSort_dictText" style="margin-left: 27rpx;margin-right: 9px;">{{item.structStatusSort_dictText}}</view>
								<text style="display:inline-block;width: 350rpx;overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{item.bridgeName}}</text>
							</view>
							<view class="plan" @click="updateprocess(item)">更新进度</view>
						</view>
						<view class="beamnumber">
							<view class="beamchild">
								<view>桥孔编号:{{item.bridgeHoleNumber}}</view>
								<view>对应桥墩:{{item.correspondingPierNumber}}</view>
								<view>梁编号:{{item.beamNumber}}</view>
								<view>中/边梁:{{item.centerOrSideBeam}}</view>
							</view>
							<view class="beamchild">
								<view>理论跨径(cm):{{item.theoreticalSpan}}</view>
								<view>标准梁长(cm):{{item.standardBeamLength}}</view>
								<view>预准梁长(cm):{{item.prefabricatedBeamLength}}</view>
								<view>砼方量(m³):{{item.concreteVolume}}</view>
							</view>
						</view>
						<view class="gobeamdetail" @click="godetail(item)">
							详情>
						</view>
					</view>
				</block>
			</mescroll-uni>
			<!-- <view v-if="manufacturListimg.length==0&&current==1" class="imgauto">
				<view>
					<image src="../../static/emptys.png"></image>
				</view>
				<view>此台座空闲，暂无制作中梁！</view>
			</view> -->
			 <view v-if="manufacturListimg.length==0&&current==1">
				<view class="buttonyes" @tap="yesword">去关联</view>
				<!-- <view class="buttoncancel" @tap="goback">取消</view> -->
			</view> 
			<view class="botrelivev" v-if="manufacturListimg.length!=0&&current==1">
				<view @click="relieve">
					解除关联
				</view>
			</view>
		</view>
  </view>
</template>
<script>
import {
  beamfield,beamfieldstatus,dado,errorelation
} from "@/api/AlbumServer.js"
  export default {
	  data(){
		  return{
			  scrollInto: "recommend",
			  current:1,
			  currenttab:0,
			  tabBars:[],
			  propstext:'此台座空闲，暂无制作中梁！',
			  mescroll:null,
			  indexList:[],
			  indexListval:'',
			  aisleid:'',
			  popuent:-1,
			  removeid:'', //解除ID
			  isShowEmpty:false
		  }
	  },
    computed: {
	  manufacturListimg() {
	    return this.$store.getters['album/manufacturListimg']
	  }
    },
	onLoad(val){
		console.log(val)
		if(val&&val.valent){
			this.aisleid=JSON.parse(val.valent).id
		}
	},
	onShow(){
		this.mescroll.resetUpScroll(true);
	},
    methods: {
		choseSquare(item,val){
			this.removeid=item.id
			this.popuent=val
		},
		relieve(){
			let data={
				ids:this.removeid,
				pedestalId:this.aisleid
			}
			errorelation(data).then(res=>{
				console.log(res)
				if(res.status==200){
					uni.showToast({
						title:'解除关联成功'
					})
				}else{
					uni.showToast({
						title:'解除关联失败'
					})
				}
				this.mescroll.resetUpScroll();
			})
		},
		yesword(){
			uni.navigateTo({
			  url: '../affiliated/affiliated?aisleid='+this.aisleid
			})
		},
      /// 跳转打开新窗口
      fnOpenWin(type) {
        uni.navigateTo({
          url: `/pages/news/${type}/${type}`
        })
      },
	  godetail(val){
		  uni.navigateTo({
		  	url:'../beamfieldDetail/beamfieldDetail?val='+JSON.stringify(val)
		  })
	  },
	  godado(val){
		  uni.navigateTo({
		  	url:'../datodetail/datodetail'
		  })
	  },
	  goback(){
		  uni.navigateBack()
	  },
	  fnbarClick(val){
		this.current=val
		this.mescroll.resetUpScroll();
	  },
	  unique(arr) {
	    const res = new Map();
	    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
	  },
	  updateprocess(val){
		  console.log(val)
		  uni.navigateTo({
		  	url:'../updateprogress/updateprogress?val='+JSON.stringify(val)
		  })
	  },
	  mescrollInit(mescroll) {
	    this.mescroll = mescroll;
	  },
	  downCallback(mescroll) {
	    // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
	    mescroll.resetUpScroll()
	  },
	  /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
	  upCallback(mescroll) {
	    beamfield({
	      pageNo: mescroll.num,
	      pageSize: mescroll.size,
	  	  relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		  pedestalStatus:this.current,
		  pedestalId:this.aisleid
	    }).then(violaRes => {
	      if (mescroll.num == 1) {
	        this.$store.commit('album/manufacturing', violaRes.data.result.records)
	      } else {
	        this.$store.commit('album/manufacturing', this.manufacturListimg.concat(violaRes.data.result.records))
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
		background: #E8E8E8;
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
	.beamList{
		width: 680rpx;
		height: 400rpx;
		background: #FFFFFF;
		border-radius: 7rpx;
		margin:19rpx auto;
	}
	.beamtotal{
		height:93rpx;
		line-height: 93rpx;
		display: flex;
		background: #fff;
		position: relative;
	}
	.beamtotal view{
		width: 50%;
		text-align: center;
	}
	.beamtotal text{
		padding-bottom: 26rpx;
	}
	.nameplan{
		display: flex;
		height: 93rpx;
		border-bottom: 1px solid #eee;
		justify-content: space-between;
		width: 630rpx;
	}
	.nameplan view{
		display: flex;
	}
	.nameplan .produced{
		width: 75rpx;
		height: 33rpx;
		background: #E7541E;
		border-radius: 3rpx;
		font-size: 21rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #FFFFFF;
		margin:31rpx 0rpx 29rpx 0rpx;
	}
	.nameplan text,.plan{
		line-height: 93rpx;
	}
	.nameplan text{
		font-size: 32rpx;
		font-family: 'PingFang SC';
		font-weight: 800;
		color: #181616;
	}
	.nameplan .plan{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #235FED;
	}
	.beamnumber{
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #57585A;
		line-height: 53rpx;
		display: flex;
		margin-left: 39rpx;
		margin-right: 35rpx;
	}
	.beamnumber .beamchild{
		width: 50%;
	}
	.beamnumber .beamchild view{
		line-height: 60rpx;
	}
	.beamnumber .beamchild:nth-child(2){
		text-align: right;
	}
	.gobeamdetail{
		text-align: right;
		margin-right: 33rpx;
		font-size: 27rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #235FED;
		margin-top:9rpx;
	}
	.beamcurrent{
		color: #235FED;
		border-bottom: 4rpx solid #235FED;
	}
	.scroll-bar-find {
	  display: flex;
	  flex-direction: row;
	  white-space: nowrap;
	  flex-wrap: nowrap;
	  overflow: hidden;
	  margin-top:29rpx;
	  margin-bottom: 21rpx;
	  width: 75%;
	  border-right:1rpx solid #fff;
	  margin-left: 28rpx;
	}
	
	/* 滑动scroll导航条项*/
	.scroll-bar-finditem {
	  display: inline-block;
	  line-height: 57rpx;
	  width: 110rpx;
	  height: 57rpx;
	  background: #F9F9F9;
	  border-radius: 2rpx;
	  text-align: center;
	  font-size: 24rpx;
	  color:#7A7C80;
	  margin-right: 10rpx;
	  margin-left:10rpx;
	}
	
	.scroll-bar-finditemsh {
	  color: #235FED;
	  background: #D5E1FF;
	}
	.boxsrocll{
		position: relative;
	}
	.morescreen{
		position: absolute;
		right: 35rpx;
		top:0rpx;
		line-height: 57rpx;
		width: 117rpx;
		height: 57rpx;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #7A7C80;
		background: #F9F9F9;
		border-radius: 2rpx;
		text-align: center;
	}
	.searchvalu{
		margin-top:29rpx;
		margin-bottom: 21rpx;
		margin-left: 38rpx;
		display: flex;
	}
	.serachinput{
		width: 557rpx;
		height: 57rpx;
		background: #F9F9F9;
		display: flex;
		border-radius: 2rpx;
		margin-left: 13rpx;		
	}
	.uni-input-placeholder{
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #cecece;
		height: 57rpx;
		line-height: 65rpx;
	}
	.free{
		width: 110rpx;
		height: 57rpx;
		background: #F9F9F9;
		font-size: 24rpx;
		font-family: 'PingFang SC';
		line-height: 57rpx;
		text-align: center;
		font-weight: 500;
		color: #7A7C80;
		border-radius: 2rpx;
	}
	.leisure{
		width: 67rpx;
		height: 33rpx;
		background: #2EA62E;	
		font-size: 24rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 3rpx;
		margin-top:29rpx;
		text-align: center;
		margin-right: 7rpx;
		margin-left: 38rpx;
	}
	.fangdajing{
		width: 27rpx;
		height: 27rpx;
		margin-left: 20rpx;
		margin-top:15rpx;
		margin-right: 13rpx;
	}
	.mescroll-uni-warp{
		position: fixed;
		top:150rpx;
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
		bottom: 89rpx;
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
	.botrelivev{
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		height: 107rpx;
	}
	.botrelivev view{
		width: 167rpx;
		height: 67rpx;
		background: linear-gradient(255deg, #477CF3 0%, #649BFF 100%);
		box-shadow: 0px 7rpx 33rpx 0px rgba(71, 124, 243, 0.8);
		border-radius: 33rpx;
		line-height: 67rpx;
		font-size: 27rpx;
		text-align: center;
		font-family: 'PingFang SC';
		font-weight: bold;
		color: #FFFFFF;
		float: right;
		margin-right: 33rpx;
		margin-top:20rpx;
	}
	.unit{
		width: 40rpx;
		height: 40rpx;
		border: 1rpx solid #E1E1E1;
		border-radius: 50%;
		margin-top:24rpx;
		margin-right: 21rpx;
		margin-left: 13rpx;
	}
	.unit text{
		width: 13rpx;
		height: 13rpx;
		background: #fff;
		border-radius: 50%;
		margin:14rpx;
	}
	.confirmcolor{
		background: #235FED!important;
	}
	.imgauto{
		width: 403rpx;
		margin:0 auto;
		margin-top:357rpx;
		
		font-size: 29rpx;
		font-family: 'PingFang SC';
		font-weight: 500;
		color: #979BA4;
		text-align: center;
	}
	.imgauto image{
		width: 403rpx;
		height: 310rpx;
	}
</style>

<template>
  <view class="posir">
	<album-card :input="true" :congint="namecong" :abt="2"></album-card>
	 <view class="homehead">
		<image src="../../static/aaa.png" mode="" class="posia newlogo"></image>
	 </view>
	 <view class="posia srene">
		 <image src="../../static/sren.png" class="hw100v"></image>
	 </view>
	 <view class="mt100r bgwhite hl104r recordgo flexr-jsb" @tap="quickList">
		 <view class="sw c181 f33r">兑换记录</view>
		  <view class="laot">
			 <image src="../../static/jkpe.png" mode="" class="hw100v"></image>
		 </view> 
	 </view>
    <!-- 滚动内容区 -->
    <mescroll-uni @down="downCallback" @up="upCallback" :top="610">
		<view class="plr18r ptb18r mb18r flex crpent" v-for="(item,index) in specialListData" :key="index">
		  <view class="shopitem bgwhite br10r">
			<view class="imgboxList">
				<image :src="item.goodsPic" lazy-load="true" class="hw100v" @tap="previewImg(item.goodsPic)"></image>
			</view>
			<view class="c555 sw f30r pl20r">{{item.goodsTitle}}</view>
			<view class="flexr-jsb scroek sw">
				<view class="cee">{{item.score}}积分</view>
				<view class="ca5 f24r">库存{{item.stock}}件</view>
			</view>
			<view class="addjian">
				<view class="hw40" @tap="reduce(index)">
					<image src="../../static/jian.png" class="hw100v"></image>
				</view>
				<view class="mth8r">{{item.numid}}</view>
				<view class="hw40 pr17r" @tap="add(index)">
					<image src="../../static/add.png" class="hw100v"></image>
				</view>
			</view>    
		  </view>
		</view>
    </mescroll-uni>
	<view class='formBtn'>
	  <view class="sw c555 f30r">
		<image src="../../static/ai66.png"></image>
		<text>共 <text class="cee">{{current}}</text>件商品，总计 <text class="cee">{{price}}积分</text></text>
	  </view>
	  <view class="button" @tap="redeem">立即兑换</view>
	</view> 
  </view>
</template>

<script>
  import {
    getSpecialList,
    getProductHottestList,
    shopSearch,
	redepte
  } from '@/api/ShopServer.js';


 import AlbumCard from '@/components/album-card/album-card'
  export default {
    components: {
 
	  AlbumCard
    },

    props: {
      // 连续触发刷新
      refresh: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        // 滚动区实例
        mescroll: null,
		namecong:'积分商城',
		shopnum:0,
		current:0,
		price:0,
		giftList:[]
        // 
      }
    },

    watch: {
      // 监听底部导航双击触发
      refresh(newVal) {
        if (newVal) this.fnRefreshData();
      }
    },

    computed: {
      // 专题列表
      specialListData() {
        return this.$store.getters['shop/getSpecialListData']
      },
	  // userAtteUserListData() {
	  //   return this.$store.getters['user/getUserFansListData']
	  // },
      // // 热卖列表
      // productHottestListData() {
      //   return this.$store.getters['shop/getProductHottestListData']
      // },
      // // 精选推荐列表
      // productBestListData() {
      //   return this.$store.getters['shop/getProductBestListData']
      // },
      // 计算距离顶部距离差异
      calTop() {
        let top = 90;
        // #ifdef H5
        top = 630;
        // #endif
        return top
      }
      //
    },
    methods: {
		quickList(){
			uni.navigateTo({
				url:'/pages/punish-list/punish-list'
			})
		},
		async redeem(){
			 let ieList=[];
			 console.log(this.specialListData)
			  this.specialListData.forEach(a=>{
				if(a.numid>0){
				  ieList.push({
					conversion:a.numid,
					goodsId:a.id,
					personId:this.$store.getters['user/getAccountInfoData'].id,
					relTenantIds:a.relTenantIds,
					score:a.score
				  })
				}     
			  })
			if(ieList.length==0){
				uni.showToast({
					title:'请选择商品',
					icon:'none'
				})
			}else{
				let data={
					convertList:ieList,
					totalScore:this.price
				}
				let shopsListt=await redepte(JSON.stringify(data))
				console.log(shopsListt)
				let that=this;
				uni.showModal({
				    title: '提示',
				    content: '确定兑换此礼品么？',
				    success: function (res) {
				        if (res.confirm) {
							that.specialListData.forEach(v=>{
								v.numid=0
							})
							that.current=0;
							that.price=0;
							uni.showToast({
								title:shopsListt.data.message,
								icon:'none'
							})
							  setTimeout(() => {
								uni.navigateTo({
									url:'/pages/punish-list/punish-list'
								})
							  }, 500);
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				})
			}	
		},
		reduce(index){
		  let that=this;
		  let carList=that.specialListData;
		  let num=carList[index].numid;
		  if (num <= 0) {
			return false;
		  } else {
			num = num - 1;
			carList[index].numid = num;
			this.specialListData=carList
		  }
		  var sum = 0
		  for (var i = 0; i < carList.length; i++) {
			var qC = that.specialListData[i].numid;
			sum += qC;
		  }
		  var price = 0;
		  if (sum > 0) {
			for (var i = 0; i < carList.length; i++) {
			  var qB = that.specialListData[i].score;
			  var qR = that.specialListData[i].numid;
			  price += qB * qR;
			}
		  }
		  this.current=sum;
		  this.price=price
		},
		add(index){
		  let carts = this.specialListData;
		  let num = carts[index].numid;
		  num = num + 1;
		  carts[index].numid = num;
		  this.specialListData=carts
		  var sum = 0
		  for (var i = 0; i < carts.length; i++) {
			var qC = this.specialListData[i].numid;
			sum += qC;
		  }
		  var price = 0;
		  if (sum > 0) {
			for (var i = 0; i < carts.length; i++) {
			  var qB = this.specialListData[i].score;
			  var qR = this.specialListData[i].numid;
			  price += qB * qR;
			}
		  }
		  this.current=sum;
		  this.price=price
		},
      /// mescroll组件初始化的回调,可获取到mescroll对象
      // mescrollInit(mescroll) {
      //   this.mescroll = mescroll;
      // },
      /// 下拉刷新的回调
      downCallback(mescroll) {
        // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        mescroll.resetUpScroll()
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
      /// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
      upCallback(mescroll) {
		  console.log(1111)
		  let params = {
		    personId:this.$store.getters['user/getAccountInfoData'].id,
		    relTenantIds:this.$store.getters['user/getAccountInfoData'].relTenantIds,
		    pageNo: mescroll.num,
		    pageSize: mescroll.size
		  }
		  shopSearch(params).then(res => {
			  console.log(res)
			  res.data.result.records.forEach(a=>{
			  	// a.goodsPic=this.$store.state.baseUrl+"/sys/common/static/"+a.goodsPic
			  	Object.assign(a,{numid:0})
			  })
			  if (mescroll.num == 1) {
			    this.$store.commit('shop/setSpecialListData', res.data.result.records)
			  } else {
			    this.$store.commit('shop/setSpecialListData', this.specialListData.concat(res.data.result.records))
			  } 
			  mescroll.endSuccess(res.data.result.records.length, res.data.result.records.length >= mescroll.size);
		})
        // if (mescroll.num == 1) {
        //   /// 首次加载专题最热推荐
        //   Promise.all([
        //     getSpecialList({
        //       page: 1,
        //       count: 3
        //     }),
        //     getProductHottestList(),
        //     getProductList({
        //       good: true,
        //       page: mescroll.num,
        //       count: mescroll.size
        //     }),
        //   ]).then(resArray => {
        //     this.$store.commit('shop/setSpecialListData', resArray[0].data.Data)
        //     this.$store.commit('shop/setProductHottestListData', resArray[1].data.Data)
        //     this.$store.commit('shop/setProductBestListData', resArray[2].data.Data)
        //     mescroll.endSuccess(resArray[2].data.Data.length, resArray[2].data.Data.length >= mescroll.size);
        //   }).catch(() => {
        //     mescroll.endSuccess(0, false);
        //   });
        // } else {
        //   // 推荐商品列表追加
        //   getProductList({
        //     good: true,
        //     page: mescroll.num,
        //     count: mescroll.size
        //   }).then(productRes => {
        //     this.$store.commit('shop/setProductBestListData', this.productBestListData.concat(productRes.data.Data))
        //     mescroll.endSuccess(productRes.data.Data.length, productRes.data.Data.length >= mescroll.size);
        //   }).catch(() => {
        //     mescroll.endErr();
        //   });
        // }
      },

      /// 获取新数据
      // fnRefreshData() {
      //   this.mescroll.scrollTo(0, 300);
      //   setTimeout(() => {
      //     this.mescroll.resetUpScroll(true)
      //   }, 1000)
      // },
    }
  }
</script>

<style>
	.homehead{
		width: 750rpx;
		height:400rpx;
		position: relative;
	}
	.newlogo{
		top:0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.srene{
		position: absolute;
		left:21rpx;
		top:167rpx;
		width: 708rpx;
		height: 323rpx;
	}
	.recordgo{
		margin-left: 24rpx;
		margin-right: 25rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		border-radius: 10rpx;
	}
	.shopitem{
		width: 344rpx;
		height: 460rpx;
		margin-right: 19rpx;
		border: 1px solid #e9e9e9;
	}
	.imgboxList{
		width: 315rpx;
		height: 260rpx;
		margin:14rpx;
	}
	.scroek{
		padding-left: 21rpx;
		padding-right: 16rpx;
		margin-top:10rpx;
		margin-bottom: 12rpx;
	}
	.addjian{
		float: right;
		display: flex;
	}
	.formBtn{
	  display: flex;
	  width: 701rpx;
	  padding-left: 27rpx;
	  padding-right: 22rpx;
	  height: 100rpx;
	  position: fixed;
	  bottom: 0;
	  background: #FFFFFE;
	  justify-content: space-between;
	  line-height: 100rpx;
	  z-index: 999;
	}
	.formBtn .button{
	  width: 170rpx;
	  height: 70rpx;
	  background: #649aff;
	  border-radius: 35rpx;
	  font-size: 28rpx;
	  font-family: 'PingFang SC';
	  font-weight: bold;
	  color: #FEFFFF;
	  line-height: 70rpx;
	  text-align: center;
	  margin-top:17rpx;
	}
	.formBtn image{
	  width: 38rpx;
	  height: 38rpx;
	  vertical-align: middle;
	  margin-top:-6rpx;
	  margin-right: 16rpx;
	} 
	.crpent{
		float: left;
		width: 320rpx;  
		height: 460rpx;
		padding-left: 20rpx;
		padding-right: 23rpx!important;
	}
	.mescroll-uni-warp{
		width: 100%;
	}
	.laot{
		width: 20rpx;
		height: 35rpx;
		margin-top:7rpx
	}
</style>

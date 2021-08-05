<template>
  <view class="bgwhite headtop">
	<view class="posif" style="left:0;top:0;background: #efefef;z-index: 4;">
		<view class="head flex mauto cwhite sw f34r">
			<view class="boximgs mt8r" @tap="goback">
				<image src="../../static/fanhui1.png" mode="" class="hw100v"></image>
			</view>
			<view class="safe fcenter">安全知识答题</view>
			<view>
				<text v-show="false">下一题</text>
			</view>
		</view>
		<view class="fcenter c181 mtp35r f42r sw bbs2r pb30r">每日一答</view>
		<view class="bfff0 pl33r hl69r w100v mt19r mb35r" v-if="list.operaStatus==0&&list.errAnswer!=-1">
			<text>倒计时 <text class="cee mlr20r">{{list.timeLimit}}</text>，正确完成可获取 <text class="cee"> +{{list.score}} </text>分</text>
		</view>
		<view class="bfff0 pl33r hl69r w100v mt19r mb35r" v-if="list.operaStatus==1||list.errAnswer==-1">
			<text>您今日已做过该题，请明日再答！</text>
		</view>
		<view class="imgboxs mb40r posir">
			<image src="../../static/comlist1.png" class="hw100v"></image>
			<view class="posia chose cwhite f28r sw">{{list.choose}}</view>
		</view>
		
	</view>
	
	<!-- 滚动 -->
	<view style="overflow-y: scroll;position: absolute;width:100%" id="tabg" :style="{top:topsb+'rpx'}">
		<view class="pl50r chosebot pb57r" style="padding-right: 42rpx;">
			<view class="sw c181 f32r">{{list.title}}</view>
			<view class="pl2r" v-if="list.choose=='单选题'">
				<view class="flex mtp45r" v-for="(item,index) in list.cont" @click="select(index,item.name)">
					<view :class="{active1:current==index,activeSize2:chong1==index,active9:numList==index}" class="br50v ball2r-ctheme hw53r fcenter f39r c181">{{item.name}}</view>
					<view class="ml33r pt5r" :class="{activeSize:chong==index,activeSize1:chong1==index,active7:numList==index}">{{item.titel}}</view>
				</view>
			</view>
			<view class="pl2r" v-if="list.choose=='多选题'">
				<view class="flex mtp45r" v-for="(item,index) in list.cont" @click="moreselect(index)">
					<view :class="{'active2':indexList.indexOf(index)>-1}" class="br50v ball2r-ctheme hw53r fcenter f39r c181">{{item.name}}</view>
					<view class="ml33r pt5r">{{item.titel}}</view>
				</view>
			</view>
			<!-- <view class="pl2r flexr-jsa" v-if="list.choose=='判断题'">
				<label class="radio mt32r">
					<view class="br50v ball2r-ctheme hw53r fcenter f39r c181">{{item.name}}</view>
					<text class="">正确</text>
				</label>
				<label class="radio mt32r">
					<view class="br50v ball2r-ctheme hw53r fcenter f39r c181">{{item.name}}</view>
					<text class="">错误</text>
				</label>
			</view> -->
		</view>
		<!-- <view class="bottomcuowu bgwhite" v-if="contain">
			<view class="ptb41r" v-if="rights">
				<image src="../../static/cuowu.png" mode="" class="cuowu"></image>
				<text class="sw cee f33r">很抱歉！您回答错误。标准答案：A</text>
			</view> 
			<view class="boxcars mauto" v-if="rights">
				 <image src="../../static/cars.png" mode="" class="hw100v"></image> 
			</view> 
			<view class="ptb41r" v-if="mistake">
				<image src="../../static/dagou.png" mode="" class="cuowu"></image>
				<text class="sw f33r c2ea">恭喜您！回答正确。你获得<text class="cee">+1</text>分</text>
			</view>
			<view class="boxzheng mauto" v-if="mistake">
				<image src="../../static/zhengque.png" mode="" class="hw100v"></image>
			</view>
		</view> -->
		<view class="ptb24r" v-if="this.list.operaStatus==1&&this.list.errAnswer==null">
			<image src="../../static/dagou.png" mode="" class="cuowu"></image>
			<text class="sw f30r c2ea">恭喜您！回答正确。你获得<text class="cee">+{{list.score}}</text>分</text>
		</view>
		<view class="ptb24r" v-if="this.list.operaStatus==1&&this.list.errAnswer!=-1&&this.list.errAnswer!=null">
			<image src="../../static/cuowu.png" mode="" class="cuowu"></image>
			<text class="sw cee f30r">很抱歉！您回答错误。标准答案：{{list.answer_dictText}}</text>
		</view> 
		<view class="ptb24r" v-if="(this.list.errAnswer==-1)||(this.list.errAnswer==null&&this.list.timeLimit==0)">
			<image src="../../static/cuowu.png" mode="" class="cuowu"></image>
			<text class="sw cee f30r">很抱歉！您回答超时。标准答案：{{list.answer_dictText}}</text>
		</view> 
		<view class="answ" @tap="submita(list)" v-if="list.errAnswer!=-1&&list.operaStatus==0&&list.timeLimit!=0">提交答案</view>
		<view class="answ" @tap="errorct"  v-if="list.errAnswer==-1||list.operaStatus==1||(list.errAnswer==null&&list.timeLimit==0)" style="background: #CADCFF;">提交答案</view>
		<view @click="netten(list.num)" class="nextanset" v-show="chosenext">下一题</view>
		
		<view @tap="goback" class="nextanset" v-show="!chosenext">返回</view>
	</view>
	<view class="boxbttom" :class="{ modelv: botchose }">
		<view class="mask">
			<view class="botti bgwhite bbs2r z100">
				<view class="flexr-jsb">
					<view class="flex">
						<view class="flex">
							<view class="hw44 mt8r mr18r"><image src="../../static/dagou.png" alt="" class="hw100v"></image></view>
							<text class="f34r c181">{{aCounter}}</text>
						</view>
						<view class="flex mlr64r">
							<view class="hw44 mt8r mr18r"><image src="../../static/cuowu.png" alt="" class="hw100v"></image></view>
							<text class="f34r c181">{{bCounter}}</text>
						</view>
						<view class="flex">
							<view class="hw44 mt8r mr18r"><image src="../../static/jifen.png" alt="" class="hw100v"></image></view>
							<text class="f34r c181">{{cCounter}}</text>
						</view>
					</view>
					<view class="" @tap="tiku(list.num)">
						<view class="flex">
							<view class="hw44 mr18r mt8r"><image src="../../static/bank.png" alt="" class="hw100v"></image></view>
							<text class="f34r c181">{{list.num}}/{{choseList.length}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="carsou bgwhite" v-if="botchose">
				<view v-for="(item,index) in choseList" :class="{'rongcuint':item.errAnswer,'rongtent':item.operaStatus==1,'coroent':anwser==index}" class="ball2r-e9e9 br50v hw83 fleft fcenter sw f34r c625" @tap="choseanswer(item,index)">
					{{index+1}}
				</view>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
  import {
    fnFormatDate
  } from "@/utils/CommonUtil.js"
 import {
    bankList,AddScore
  } from "@/api/UserServer.js"
  export default {
    data() {
      return {
        id: -1,
		ticent:true,
		choseValueList:true,
        commentList: [],
		rights:false,
		mistake:false,
		contain:false,
		chosenext:true,
		botchose:false,
		timemy1:'',
		time:10,
		fen:0,
		miao:0,
		list:{},
		anwser:'',
		choseList:[],
		chong:-1,
		chong1:-1,
		current:-1,
		pitch:'',
		numList:-1,
		myids:'',
		aCounter:0,
		bCounter:0,
		cCounter:0,
		dCounter:0,
		indexList:[],
		topsb:480
      }
    },
    onLoad(options) {
	  // this.setTimeCount()
      // if (options && options.id) {
      //   this.id = parseInt(options.id)
      // }
	  
	  this.question()
	   
	  // if(this.choseList.length>0){
		 //  console.log(66666666)
		 //  console.log(this.choseList[0])
	  // 	this.list=this.choseList[0]
	  // }
    },
	components:{
		// AlbumCard
	},
	computed:{
		Answernum() {
		  return this.$store.getters['topic/getTopicInfoData']
		},
	},
    methods: {
		audiences(){
			this.choseValueList=false
		},
		errorct(){
			// uni.showToast({
			// 	title:'您已答题完毕! 不能重复答题',
			// 	icon:'none'
			// })
		},
		async submita(correct){
			this.ticent=false
			console.log(typeof this.list.operaStatus)
			console.log(this.list.operaStatus==1)
			if(correct.choose=="单选题"&&!this.pitch){
				uni.showToast({
					title:'请选择答案',
					icon:'none'
				})
				return;
			}
			if(correct.choose=="多选题"&&this.indexList.length==0){
				uni.showToast({
					title:'请选择答案',
					icon:'none'
				})
				return;
			}
			if(this.list.timeLimit==0){
				uni.showToast({
					title:'答题超时',
					icon:'none'
				})
				let params={
					detail:'',
					originId:this.list.id,
					originType:3,
					personId:this.$store.getters['user/getAccountInfoData'].id,
					score:this.list.score,
					relTenantIds:this.list.relTenantIds,
					type:0,
					errAnswer:-1
				}
				let resScore=await AddScore(params)
				this.list.errAnswer=-1;
			}else if(this.list.operaStatus==1||this.list.errAnswer==-1){
				uni.showToast({
					title:'您已答题完毕! 不能重复答题',
					icon:'none'
				})
			}else{
				if(correct.choose=='单选题'){
					if(this.pitch==correct.answer_dictText){
						
						let params={
							detail:'',
							originId:this.list.id,
							originType:3,
							personId:this.$store.getters['user/getAccountInfoData'].id,
							score:this.list.score,
							relTenantIds:this.list.relTenantIds,
							type:0,
							errAnswer:null
						}
						let resScore=await AddScore(params)
						console.log(resScore)
						this.list.operaStatus=1
						this.mistake=true
						this.chong=this.current
						
						this.cCounter=this.cCounter+this.list.score
						
						this.list.errAnswer=null
						if(this.list.errAnswer==null){
							this.aCounter++;
						}
						console.log(this.list)
						
					}else{
						

						let params={
							detail:'',
							originId:this.list.id,
							originType:3,
							personId:this.$store.getters['user/getAccountInfoData'].id,
							score:this.list.score,
							relTenantIds:this.list.relTenantIds,
							type:0,
							errAnswer:this.pitch
						}
						let resScore=await AddScore(params)
						// this.question();
						this.list.errAnswer=this.pitch
						this.list.operaStatus=1
						this.chong1=this.current
						if(correct.answer_dictText=='A'){this.numList=0}
						else if(correct.answer_dictText=='B'){this.numList=1}
						else if(correct.answer_dictText=='C'){this.numList=2}
						else if(correct.answer_dictText=='D'){this.numList=3}
						this.bCounter++;
						console.log(555555555)
						console.log(this.list)
						console.log(this.list.errAnswer)
						console.log(this.list.operaStatus)
					}
				}else{
					let contcet=correct.answer_dictText.replace("A",'0').replace("B",'1').replace("C",'2').replace("D",'3')					
					let listB=[];
					let listA=[];
					listB=this.indexList;
					listA=contcet.split(',')
					const result = listA.length == listB.length && listA.every(a => listB.some(b => a == b)) && listB.every(_b => listA.some(_a => _a == _b));
					if(result){
						this.mistake=true
						this.chong=this.current
						
						this.cCounter=this.cCounter+this.list.score
						this.list.errAnswer=null
						this.list.operaStatus=1
						if(this.list.errAnswer==null){
							this.aCounter++;
						}
						let params={
							detail:'',
							originId:this.list.id,
							originType:3,
							personId:this.$store.getters['user/getAccountInfoData'].id,
							score:this.list.score,
							relTenantIds:this.list.relTenantIds,
							type:0,
							errAnswer:null
						}
						let resScore=await AddScore(params)
						console.log(resScore)
						
					}else{
						this.rights=true
						this.chong1=this.current
						if(correct.answer_dictText=='A'){this.numList=0}
						else if(correct.answer_dictText=='B'){this.numList=1}
						else if(correct.answer_dictText=='C'){this.numList=2}
						else if(correct.answer_dictText=='D'){this.numList=3}
						this.bCounter++;
						this.list.errAnswer=this.pitch
						this.list.operaStatus=1
						let params={
							detail:'',
							originId:this.list.id,
							originType:3,
							personId:this.$store.getters['user/getAccountInfoData'].id,
							score:this.list.score,
							relTenantIds:this.list.relTenantIds,
							type:0,
							errAnswer:this.pitch
						}
						let resScore=await AddScore(params)
					}
				}		
			}	
			this.clearCount();
		},
		async question(){
			try{
				let param={
					pageNo:1,
					pageSize:1000,
					personId:this.$store.getters['user/getAccountInfoData'].id
				}
				let questionList=await bankList(param)
				 setTimeout(() => {
				  uni.hideLoading()
				}, 200)
				console.log(questionList)
				let questionLists=questionList.data.result.records
				let choseListNew={}
				let choseListVluae=[]
				console.log(2222222333)
				console.log(questionLists)
				questionLists.forEach((a,b)=>{
					choseListNew={
						title:a.question,
						num:b+1,
						choose:a.questionType_dictText,
						answer_dictText:a.answer_dictText,
						score:a.score,
						timeLimit:a.timeLimit,
						relTenantIds:a.relTenantIds,
						id:a.id,
						operaStatus:a.operaStatus,
						errAnswer:a.errAnswer,
						cont:[{
								name:'A',
								id:1,
								titel:a.ptionA							
							},
							{
								name:'B',
								id:2,
								titel:a.ptionB
							},
							{
								name:'C',
								id:3,
								titel:a.ptionC
							},
							{
								name:'D',
								id:4,
								titel:a.ptionD
							}]
					}
					choseListVluae.push(choseListNew)
					if(a.operaStatus==1){
						if(a.errAnswer==-1||a.errAnswer!=null){
							this.bCounter++;
						}else{
							this.aCounter++;
							this.cCounter+=a.score
						}
						this.dCounter+=a.operaStatus
					}
				})
				console.log(12345)
				console.log(this.Answernum)
				this.choseList=choseListVluae
				this.list=choseListVluae[0]
				console.log(this.dCounter)
				console.log(this.Answernum)
				
				
				
				
				console.log(this.list)
				if(this.list.operaStatus==0){
					this.setTimeCount()
				}else{
					if(this.list.choose=='单选题'){
						// if(this.list.operaStatus==1){
							if(this.list.answer_dictText=='A'){
								this.numList=this.chong=0					
							}else if(this.list.answer_dictText=='B'){
								this.numList=this.chong=1
							}else if(this.list.answer_dictText=='C'){
								this.numList=this.chong=2
							}else if(this.list.answer_dictText=='D'){
								this.numList=this.chong=3
							}
					
							if(this.list.errAnswer=='A'){
								this.chong1=0
							}else if(this.list.errAnswer=='B'){
								this.chong1=1
							}else if(this.list.errAnswer=='C'){
								this.chong1=2
							}else if(this.list.errAnswer=='D'){
								this.chong1=3
							}
						
					}else{
						this.indexList=(this.list.answer_dictText.replace('A',0).replace('B',1).replace('C',2).replace('D',3))
						console.log(this.indexList)
					}
					
				}
				if(this.dCounter>this.Answernum||this.dCounter==this.Answernum){
					this.chosenext=false;
					uni.showToast({
						title:'今日答题超限！明日再答',
						icon:'none'
					})
					return;
				}
			}catch(e){
				console.log(e)
			}			
		},
		goback(){
			uni.navigateBack()
		},
		tiku(item){
			console.log(this.list)
			console.log(this.choseList)
			console.log(item)
			console.log(this.list.num)
			this.botchose=!this.botchose
			this.anwser=item-1
		},
		// 单选
		select(item,objvalues){
			console.log(22222)
			console.log(this.list)
			console.log(item)
			console.log(objvalues)
			if(!this.list.errAnswer){
				this.current=item
				this.pitch=objvalues
			}	
		},	
		choseanswer(itemsa,idinex){
			this.current=-2
			if(idinex==this.choseList.length-1){
				this.chosenext=false
			}else{
				this.chosenext=true;
			}
			console.log(itemsa)
			this.anwser=idinex	
			console.log(this.anwser)
			console.log(33333333)
			console.log(this.list)
			this.botchose=false
			console.log(this.choseList)
			this.list=this.choseList[idinex]
			if(itemsa.choose=='单选题'){
					
				if(itemsa.operaStatus==1){
					if(itemsa.errAnswer==-1){
						if(itemsa.answer_dictText=='A'){
							this.numList=this.chong=0					
						}else if(itemsa.answer_dictText=='B'){
							this.numList=this.chong=1
						}else if(itemsa.answer_dictText=='C'){
							this.numList=this.chong=2
						}else if(itemsa.answer_dictText=='D'){
							this.numList=this.chong=3
						}
						this.chong1=-1
					}else{
						if(itemsa.answer_dictText=='A'){
							this.numList=this.chong=0					
						}else if(itemsa.answer_dictText=='B'){
							this.numList=this.chong=1
						}else if(itemsa.answer_dictText=='C'){
							this.numList=this.chong=2
						}else if(itemsa.answer_dictText=='D'){
							this.numList=this.chong=3
						}
										
						if(itemsa.errAnswer=='A'){
							this.chong1=0
						}else if(itemsa.errAnswer=='B'){
							this.chong1=1
						}else if(itemsa.errAnswer=='C'){
							this.chong1=2
						}else if(itemsa.errAnswer=='D'){
							this.chong1=3
						}
						console.log(1033)
					}
					
				}else{
					
			
					if(itemsa.errAnswer==null&&itemsa.timeLimit!=0){
						this.chong1=-1;
						this.numList=-1
						this.chong=-1
						if(this.timemy1){
							this.clearCount()
							this.setTimeCount()
						}else{
							this.setTimeCount()
						}
					}else if((itemsa.errAnswer==null&&itemsa.timeLimit==0)||itemsa.errAnswer==-1){
						if(itemsa.answer_dictText=='A'){
							this.numList=0					
						}else if(itemsa.answer_dictText=='B'){
							this.numList=1
						}else if(itemsa.answer_dictText=='C'){
							this.numList=2
						}else if(itemsa.answer_dictText=='D'){
							this.numList=3
						}
						this.chong1=-1;
						this.chong=-1;
					}
				}
					this.indexList=[]
			}else{
				this.indexList=(itemsa.answer_dictText.replace('A',0).replace('B',1).replace('C',2).replace('D',3))
				console.log(this.indexList)
			}
			
		},
		moreselect(index){
			console.log(index)
			let arrIndex = this.indexList.indexOf(index);
			console.log("数组索引", arrIndex)
			if (arrIndex > -1) {
				this.indexList.splice(arrIndex, 1)
			} else {
				this.indexList.push(index)
			}
			console.log("输出数组", this.indexList)			  
		},
		// 倒计时
	  async setTimeCount(){
		let time = this.list.timeLimit
		// console.log(time)
		// var miao = this.miao
		// var second = Math.floor(time % 60);      
		// var minite = Math.floor((time / 60) % 60); //计算分
		// this.fen=minite
		// this.miao=second
		time--;
		if (time <= 0) {
		  time = 0;
		  
		  this.list.timeLimit=0;
		  console.log(this.list)
		 if(this.list.timeLimit==0||this.list.errAnswer==-1){
			  let params={
				detail:'',
				originId:this.list.id,
				originType:3,
				personId:this.$store.getters['user/getAccountInfoData'].id,
				score:this.list.score,
				relTenantIds:this.list.relTenantIds,
				type:0,
				errAnswer:-1
			  }
			  let resScore=await AddScore(params)
			  this.list.errAnswer=-1;
		 }
		  return false;
		}
		this.list.timeLimit=time;
		this.timemy1=setTimeout(this.setTimeCount, 1000);
	  },
	  clearCount(){
		clearTimeout(this.timemy1)
	  },
	  netten(id){
		  uni.pageScrollTo({
		  	scrollTop:0
		  })
		  this.indexList=[];
		 this.current=-2
		 // this.mistake=false;
		 // this.rights=false;
		 this.chong1=-1;
		 this.numList=-1
		 this.chong=-1
		if(id==this.choseList.length-1){
			this.chosenext=false
		}
		if(this.timemy1){
			this.clearCount()
		}
		this.list=this.choseList[id-1+1]
		console.log(1111111111)
		console.log(this.list)
		console.log(this.timemy1)
		if(this.timemy1){
			 this.clearCount();
			 console.log(this.list)
			 console.log(789)
			 if(this.list.operaStatus==0&&this.list.timeLimit!=0){
				this.setTimeCount();	
				this.ticent=true
			 }else if(this.list.operaStatus==1){
				 this.ticent=false
				// 提交后颜色不能改变
				if(this.list.choose=='单选题'){
						if(this.list.answer_dictText=='A'){
							this.numList=0					
						}else if(this.list.answer_dictText=='B'){
							this.numList=1
						}else if(this.list.answer_dictText=='C'){
							this.numList=2
						}else if(this.list.answer_dictText=='D'){
							this.numList=3
						}
						console.log(this.list)
						if(this.list.errAnswer=='A'){
							this.chong1=0
						}else if(this.list.errAnswer=='B'){
							this.chong1=1
						}else if(this.list.errAnswer=='C'){
							this.chong1=2
						}else if(this.list.errAnswer=='D'){
							this.chong1=3
						}
				}else{
					this.indexList=(this.list.answer_dictText.replace('A',0).replace('B',1).replace('C',2).replace('D',3))
					console.log(this.indexList)
				}
			 }else if(this.list.operaStatus==0&&this.list.timeLimit==0){

				 if(this.list.errAnswer==null&&this.list.timeLimit!=0){
				 	this.chong1=-1;
				 	this.numList=-1
				 	this.chong=-1
				 	if(this.timemy1){
				 		this.clearCount()
				 		this.setTimeCount()
				 	}else{
				 		this.setTimeCount()
				 	}
				 }else if((this.list.errAnswer==null&&this.list.timeLimit==0)||this.list.errAnswer==-1){
				 	if(this.list.answer_dictText=='A'){
				 		this.numList=0					
				 	}else if(this.list.answer_dictText=='B'){
				 		this.numList=1
				 	}else if(this.list.answer_dictText=='C'){
				 		this.numList=2
				 	}else if(this.list.answer_dictText=='D'){
				 		this.numList=3
				 	}
				 	this.chong1=-1;
				 	this.chong=-1;
				 }
			 }
		}else{
			if(this.list.operaStatus==0){
				this.setTimeCount();	
				this.ticent=true
			}else{
				this.ticent=false
			
				// 提交后颜色不能改变
				if(this.list.choose=='单选题'){
					// if(this.list.operaStatus==1){
						if(this.list.answer_dictText=='A'){
							this.numList=this.chong=0					
						}else if(this.list.answer_dictText=='B'){
							this.numList=this.chong=1
						}else if(this.list.answer_dictText=='C'){
							this.numList=this.chong=2
						}else if(this.list.answer_dictText=='D'){
							this.numList=this.chong=3
						}
				
						if(this.list.errAnswer=='A'){
							this.chong1=0
						}else if(this.list.errAnswer=='B'){
							this.chong1=1
						}else if(this.list.errAnswer=='C'){
							this.chong1=2
						}else if(this.list.errAnswer=='D'){
							this.chong1=3
						}
					
				}else{
					this.indexList=(this.list.answer_dictText.replace('A',0).replace('B',1).replace('C',2).replace('D',3))
					console.log(this.indexList)
				}
			} 
		}
	  },
      /// 跳转用户信息页
      fnUserInfo(id) {
        uni.navigateTo({
          url: `/pages/user-info/user-info?id=${id}`
        })
      },
      /// 格式化时间
      calFormatDate(str) {
        return fnFormatDate(new Date(str).getTime())
      }
    }
  }
</script>

<style>
  page {
    background: #efefef;
	height: 100%;
  }
  .safe{
	  width: 70%;
	  margin-left:80rpx;
  }
	 .headtop{
		/* height: 1380rpx; */
		 margin-bottom: 120rpx; 
		 padding-bottom: 10rpx;
	} 
	.chosebot{
		margin-bottom: 21rpx;
	
	}
	.head{
		width: 694rpx;
		height: 153rpx;
		padding-left: 28rpx;
		padding-right:28rpx;
		line-height: 193rpx;
		background-color: #208FE7;
		/* background: linear-gradient(0deg, #235FED, #235FED); */
	}
	.imgboxs{
		width: 130rpx;
		height: 47rpx;
	}
	.boxzheng{
		width: 551rpx;
		height: 332rpx;
	}
	.chose{
		left:13rpx;
		top:1rpx;
	}
	.boximgs{
		width: 21rpx;
		height: 38rpx;
	}
	.boxcars{
		width: 249rpx;
		height:338rpx;
	}
	.cuowu{
		width: 33rpx;
		height: 33rpx;
		vertical-align: middle;
		margin-top:-3rpx;
		padding-left: 124rpx;
		margin-right: 15rpx;
	}
	.bottomcuowu{
		height: 526rpx;
	}
	.active1{
		background: #2EA62E;
		color: #fff;
	}
	.active2{
		background: #2EA62E;
		color: #fff;
	}
	.botti{
		width: 659rpx;
		padding-left: 49rpx;
		padding-right: 44rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.boxbttom{
		position: fixed;
		bottom:0;
		right: 0;
		width:100%;
	}
	/* 蒙版 */
	.mask{
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.carsou{
		height: 490rpx;
	}
	.carsou view{
		margin:17rpx 18rpx;
		line-height: 83rpx;
	}
	.modelv{
		background: rgba(0,0,0,.5);
		z-index:5;
		height: 100%;
		top:0;
	}
	.coroent{
		background: #E9E9E9;
	}
	.answ{
		width: 625rpx;
		height: 90rpx;
		background: #649AFF;
		border-radius: 45rpx;
		font-size: 35rpx;
		font-family: 'PingFang SC';
		font-weight: bold;
		line-height: 90rpx;
		text-align: center;
		color: #FFFFFF;
		margin:0 auto;
	}
	.nextanset{
		width: 625rpx;
		height: 90rpx;
		border: 1rpx solid #BFBFBF;
		border-radius: 45rpx;
		margin:0 auto;
		line-height: 90rpx;
		text-align: center;
		color: #9C9C9C;
		font-family: 'PingFang SC';
		font-weight: bold;
		margin-top:40rpx;
		margin-bottom:88px;
	}
	.activeSize{
		color:#2EA62E
	}
	.activeSize1{
		color:#E7541E
	}
	.activeSize2{
		background: #E7541E;
		color: #fff;
	}
	.active9{
		color:#fff;
		background: #2EA62E;
	}
	.active7{
		color:#2EA62E;
	}
	.rongtent{
		background: #E5F9EE;
		color: #2EA62E
	}
	.rongcuint{
		background: #FFF0ED;
		color:#E75722
	}
</style>

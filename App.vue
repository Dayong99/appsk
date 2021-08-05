 
<script>
  import {
    getRsaText,
    getStarCover
  } from "@/api/CommonServer.js"
  import {
    refreshUserToken,
    getUserInfo,
  } from "@/api/UserServer.js"
  import {
    getSigninInfo,
  } from "@/api/HanbiServer.js"
  import {
    getMessageNoReadCount,
  } from "@/api/MessageServer.js"
  export default {
    onLaunch() {
      // 检查token
      let token = uni.getStorageSync('TOKEN');
      if (!!token) {
        // // #ifdef H5
        // if (location.pathname != '/' || location.hash != '#/') {
        //   uni.redirectTo({
        //     url: '/pages/index/index'
        //   })
        // }
		
		const mobile = uni.getStorageSync('mobile');
		const password = uni.getStorageSync('password');
		// if(mobile&&password){
		// 	uni.redirectTo({
		// 	  url: '/pages/index/index'
		// 	})
		// }else{
		// 	uni.redirectTo({
		// 	  url: '/pages/login/login'
		// 	})
		// }
        // #endif
        // 启动封面
        // getStarCover().then(coverRes => {
        //   // 保存启动封面
        //   this.$store.commit('common/setStarCoverData', coverRes.data.Data)
        //   // 取得rsa加密文本
        //   return getRsaText(`${token},${Math.floor(new Date().getTime() / 1000)}`)
        // }).then(rsaRes => {
        //   // 刷新token值 
        //   return refreshUserToken(rsaRes.data)
        // }).then(accountRes => {

        //   // #ifndef APP-PLUS
        //   // 置空导航标题
        //   uni.setNavigationBarTitle({
        //     title: ''
        //   });
        //   // 充白导航背景色
        //   uni.setNavigationBarColor({
        //     frontColor: '#ffffff',
        //     backgroundColor: '#ffffff'
        //   });
        //   // #endif

        //   // 保存账户信息和新token值
        //   this.$store.commit('user/setAccountInfoData', accountRes.data.Data);
        //   uni.setStorageSync('TOKEN', accountRes.data.Data.AccessToken);
        //   // 获得登录用户信息
        //   return getUserInfo(accountRes.data.Data.UserID);
        // }).then(userinfoRes => {
        //   // 保存登录用户信息
        //   this.$store.commit('user/setUserInfoData', userinfoRes.data.Data);
        //   // 获取未读消息数
        //   return getMessageNoReadCount()
        // }).then(mesRes => {
        //   // 保存未读消息数
        //   this.$store.commit('setNewsCountData', mesRes.data.Data)
        //   // 获取签到信息
        //   return getSigninInfo()
        // }).then(signinRes => {
        //   // 保存签到信息
        //   this.$store.commit('setSigninInfoData', signinRes.data.Data)
        //   return true
        // }).then(res => {
        //   console.log('app.vue', res);

        //   // #ifndef APP-PLUS 
        //   // 导航标题

        //   // #endif

        // }).catch(err => {
        //   console.log(err, false);
        //   // 登录问题
        //   if (err.data !== 401) {
        //     uni.redirectTo({
        //       url: '/pages/login/login'
        //     })
        //   }
        // })
		// uni.subscribePush({ //开启推送；
		// 	provider: "unipush",
		// 	success: function(res) {
		// 		console.log("success:" + JSON.stringify(res));
		// 		res.clientid
		// 		uni.redirectTo({
		// 		  url: '/pages/login/login?cid='+res.clientid
		// 		})
		// 	}
		// });
			// setTimeout(function(){
			// 	if(plus){
			// 		var pinf = plus.push.getClientInfo();
			// 		var cid = pinf.clientid;//客户端标识 
			// 		uni.redirectTo({
			// 		  url: '/pages/login/login?cid='+cid
			// 		})
					 //监听系统通知栏消息点击事件
					 // plus.push.addEventListener('click', function(msg){
						//  console.log(msg)
						// 	uni.navigateTo({
						// 		url:'/pages/index/index?msg='+msg+'&current=1'
						// 	}) 
					 // }, false);
					 //监听接收透传消息事件  
					 // plus.push.addEventListener('receive', function(msg){  
						//  console.log(msg)
						//  console.log("kkkkkkkkkkkkk")
						//  uni.navigateTo({
						//  	url:'/pages/index/index?msg='+msg+'&current=1'
						//  })
						 //处理透传消息的业务逻辑代码  
			// 			 if(msg.type=='receive'){
			// 				var options = {cover:false};
			// 				plus.push.createMessage(msg,'LocalMSG',options);
			// 			 }
			// 		 }, false);
			// 	}
			// },4000);
			// 开启推送
			// 
			// let osname = plus.os.name
			// console.log(osname)
			// if (osname == 'Android') {
			// 	uni.onPush({
			// 		provider: "unipush",
			// 		success: function() {
			// 			console.log("监听透传成功");
			// 		},
			// 		callback: function(data) {
			// 			console.log("接收到透传数据：" + JSON.stringify(data));
			// 			plus.push.createMessage(data.data, {});
			// 		}
			// 	});
			// }
			// // 监听在线消息事件
			// if (osname == 'iOS') {
			// 	plus.push.addEventListener('receive', function(msg) {
			// 		plus.push.createMessage(msg.content, "LocalMSG", {
			// 			cover: false
			// 		});
			// 		setTimeout(() => {
			// 			plus.push.clear();
			// 		}, 3000)
			// 	}, false);
			// }
			// plus.push.addEventListener(
			// 	"click",
			//   //这里写业务逻辑
			// 	function(data) {
			// 		console.log(data);
			// 	},
			// 	false
			// );
			// plus.push.addEventListener('receive',function(res){
			// 		let options = {cover:false};
			// 		console.log(res)
			// 		console.log(res.content)
			// 		plus.push.createMessage(res.content,res.payload,options);
			// },false)
      }
    },
    onShow() {
	  
    },
    onHide() {
      console.log('App Hide')
    }
  }
</script>

<style>
  /* 每个页面公共css */
  @import "/style/common.css";
  @import "/style/relation.css";
  /* HTML富文本解析器样式 */
  @import "/components/gaoyia-parse/parse.css";

  /* 页面底色 */
/*   page {
    background: #E8E8E8;
  } */
  
  
</style>

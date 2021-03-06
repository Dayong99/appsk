/**
 * ==========
 * 用户状态数据
 * ==========
 */
const user = {
  namespaced: true,

  state: {
    // 用户关注用户列表数据 this.$store.state.user.userAtteUserList
    userAtteUserList: [],
    // 用户的粉丝列表 this.$store.state.user.userFansList
    userFansList: [],
    // 用户拉黑名单列表数据
    userBlackList: [],
    // 用户信息数据
    userInfo: {},
    // 缓存用户信息数据
    tempUserInfo: {},
    // 账户信息数据
    accountInfo: uni.getStorageSync('userinfo'),
    // 用户点赞过动态列表
    userTopList: [], 
    // 用户发布所有类型列表
    userPublishList: [], 
	userPersonList:uni.getStorageSync('userperson')
    //
  },
  getters: { 
    // 用户关注用户列表对象  this.$store.getters['user/getUserAtteUserListData']
    getUserAtteUserListData: state => state.userAtteUserList,
    // 用户的粉丝列表  this.$store.getters['user/getUserFansListData']
    getUserFansListData: state => state.userFansList,
    // 用户拉黑名单列表数据  this.$store.getters['user/getUserBlackListData']
    getUserBlackListData: state => state.userBlackList,
    // 用户信息数据对象 this.$store.getters['user/getUserInfoData']
    getUserInfoData: state => state.userInfo,   
    // 账户信息数据对象
    getAccountInfoData: state => state.accountInfo,
    // 临时用户信息数据
    getTempUserInfoData: state => state.tempUserInfo,
    // 用户点赞过动态列表对象  this.$store.getters['user/getUserTopListData']
    getUserTopListData: state => state.userTopList,
    // 用户发布所有类型列表对象
    getUserPublishListData: state => state.userPublishList,
    //
  },
  mutations: {
    ///视频列表
    setUserAtteUserListData(state, data) {
		// data.forEach(a=>{
		// 	a.videoFile=this.$store.state.baseUrl+"/sys/common/static/"+a.videoFile
		// })
      state.userAtteUserList = data
    }, 
    //文章列表
    setUserFansListData(state, data) {	
      state.userFansList = data
    }, 
    // 修改用户拉黑名单列表数据 this.$store.commit('user/setUserBlackListData', [...])
    setUserBlackListData(state, data) {
      state.userBlackList = data
    }, 
    // 修改用户信息数据对象  this.$store.commit('user/setUserInfoData', {...})
    setUserInfoData(state, data) {
      state.userInfo = data
    },
    // 修改临时用户信息数据对象 this.$store.commit('user/setTempUserInfoData', {...})
    setTempUserInfoData(state, data) {
      state.tempUserInfo = data
    },
    // 修改账户信息数据对象 this.$store.commit('user/setAccountInfoData', {...})
	
	// ???用户信息
    setAccountInfoData(state, data) {
	  uni.setStorageSync('userinfo', data);	
      state.accountInfo = data
    },
	
	// 个人管理者判断
    setAccountInfoMainBgPicData(state, data) {
		 uni.setStorageSync('userperson', data);	
        state.userPersonList = data
    }, 
    // 修改用户点赞过动态列表  this.$store.commit('user/setUserTopListData', [...])
    setUserTopListData(state, data) {
      state.userTopList = data
    },
    // 修改用户发布所有类型列表 this.$store.commit('user/setUserPublishListData', [...])
    setUserPublishListData(state, data) {
      state.userPublishList = data
    },
    //
  }
}

export default user

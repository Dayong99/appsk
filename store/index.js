import Vue from 'vue'
import Vuex from 'vuex'
// 模块
import album from './module/album.js'
import common from './module/common.js'
import huiba from './module/huiba.js'
import interact from './module/interact.js'
import org from './module/org.js'
import shop from './module/shop.js'
import topic from './module/topic.js'
import trend from './module/trend.js'
import user from './module/user.js'
import video from './module/video.js'
import word from './module/word.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		commContent: '',
		signinInfo: {},
		signinDate: [],
		signinList: [],
		signinShopList: [],
		hanbiRule: [],
		newsCount: {},

		baseUrl: 'http://47.118.53.33:9999', //线上
		// baseUrl:'http://192.168.1.19:9999', //本地-牛俊峰
		// baseUrl:'http://192.168.1.191:9999',//本地-董曾伟
		// baseUrl:'http://192.168.1.130:9999',//本地-朱珍波
		// baseUrl:'http://47.110.243.20:9999'
		// baseUrl:'http://192.168.1.192:9999'//本地-陈绘龙
	},
	getters: {
		getCommContentData: state => state.commContent,
		getSigninInfoData: state => state.signinInfo,
		getSigninStatusData: state => state.signinInfo.issignin,
		getSigninDateData: state => state.signinDate,
		getSigninListData: state => state.signinList,
		getSigninShopListData: state => state.signinShopList,
		getNewsCountData: state => state.newsCount,
		getHanbiRuleData: state => state.hanbiRule,
		getNewsTotalData(state) {
			let {
				RemindCount,
				CommentCount,
				TopCount,
				NoticeCount,
				TopicCount
			} = state.newsCount
			return RemindCount + CommentCount + TopCount + NoticeCount + TopicCount
		},
		//
	},
	mutations: {
		// 修改内容 this.$store.commit('setCommContentData', '')
		setCommContentData(state, data) {
			state.commContent = data
		},
		// 修改信息 this.$store.commit('setSigninInfoData', {...})
		setSigninInfoData(state, data) {
			state.signinInfo = data
		},
		// 修改记录 this.$store.commit('setSigninDateData', {...})
		setSigninDateData(state, data) {
			state.signinDate = data
		},
		// 修改记录 this.$store.commit('setSigninListData', [...])
		setSigninListData(state, data) {
			state.signinList = data
		},
		// 修改商品列表 this.$store.commit('setSigninShopListData', {...})
		setSigninShopListData(state, data) {
			state.signinShopList = data
		},
		// 修改规则列表 this.$store.commit('setHanbiRuleData', {...})
		setHanbiRuleData(state, data) {
			state.hanbiRule = data
		},
		// 修改消息数对象数据 this.$store.commit('setNewsCountData', {...})
		setNewsCountData(state, data) {
			state.newsCount = data
		},
		//
	},
	modules: {
		album,
		common,
		huiba,
		interact,
		org,
		shop,
		topic,
		trend,
		user,
		video,
		word
	}
})

export default store

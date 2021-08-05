/**
 * ==========
 * 文章状态数据
 * ==========
 */
const word = {
  namespaced: true,

  state: {
    // 文章列表数据 this.$store.state.word.wordList
    wordList: [],
    // 文章基本信息数据
    wordInfo: [],
	wordInfoList:[],
    // 文章内容数据
    wordContent: "",
	historyes:[]
    //
  },
  getters: {
    // 文章列表数组对象  this.$store.getters['word/getWordListData']
    getWordListData: state => state.wordList,
    // 文章基本信息数据对象  this.$store.getters['word/getWordInfoData']
    getWordInfoData: state => state.wordInfo,
	
	getWordInfoDataList: state => state.wordInfoList, 
	
	gethistoryes: state => state.historyes,
    // 文章列表数组对象  this.$store.getters['word/getWordContentData']
    getWordContentData: state => state.wordContent,
    //
  },
  mutations: {
    // 修改文章列表数组对象 this.$store.commit('word/setWordListData', [...])
	// 历史磅单页面1
    setWordListData(state, data) {
      state.wordList = data
    },
	// 历史磅单页面2
    setWordInfoData(state, data) {
      state.wordInfo = data
    },
	// 历史磅单页面3
	setWordInfoDataList(state, data) {
	  state.wordInfoList = data
	},
	
	
	// 历史磅查询页面
	historyelist(state, data) {
	  state.historyes = data
	},
    // 修改文章列表数组对象  文章详情页面
    setWordContentData(state, data) {
      state.wordContent = data
    },
    //
  } 

}

export default word

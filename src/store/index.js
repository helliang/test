import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({

})
store.registerModule('$vux', {
	state: {//设置属性
		isShowFooter: false,
		headerTitle: '',
		btnStatus: true,
		isShowHeader: true
	},
	getters: {

	},
	mutations: {
		updateLoadingStatus(state, payload) {
			state.isShowFooter = payload.isShowFooter
		},
		getHeaderTitle(state, obj) {
			state.headerTitle = obj.headerTitle
		},
		updateReturnStatus(state, payload) {
			state.btnStatus = payload.btnStatus
		},
		updateHeadStatus(state, obj) {
			state.isShowHeader = obj.isShowHeader;
		}
	},
	actions: {
		
	}
})

export default store

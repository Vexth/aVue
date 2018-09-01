import { uniqueObj } from '@/utils'

const homepage = {
  state: {
    homePageList: [],
    pageId: null,
    attachList: [],
    delete_module: null,
    isPrimary: false,
    selected: null,
    clickSelected: null,
  },
  mutations: {
    CLICK_SELECTED: (state, item) => {
      state.clickSelected = item
    },
    IS_PRIMARY: (state, item) => {
      state.isPrimary = item
    },
    SELECTED: (state, item) => {
      state.selected = item
    },
    ADD_PAGE_ID: (state, item) => {
      state.pageId = item
    },
    ADD_HOME_PAGE_LIST: (state, item) => {
      const list = sessionStorage.getItem('homePageList')
      if (list !== null && list.length !== 0) {
        state.homePageList = JSON.parse(list)
      }
      state.homePageList.push(item)
    },
    MODIFY_HOME_PAGE_LIST: (state, item) => {
      let data = item.data.map(res => JSON.parse(res))
      let type = item['type']
      sessionHomePageList(state.homePageList, type, data)
    },
    ANNOUCEMENT_LIST: (state, item) => {
      let type = item['type']
      let data = item.data
      sessionHomePageList(state.homePageList, type, data)
    },
    TITLE: (state, item) => {
      let type = item['type']
      delete item['type']
      sessionHomePageList(state.homePageList, type, item)
    },
    SEARCH: (state, item) => {
      sessionStorage.setItem('homePageList', JSON.stringify(state.homePageList))
    },
    VIDEO_LIST: (state, item) => {
      let type = item['type']
      sessionHomePageList(state.homePageList, type, item)
    },
    COMMODITY_LIST: (state, item) => {
      let type = item['type']
      let data = item.data
      sessionHomePageList(state.homePageList, type, data)
    },
    ATTACH_LIST: (state, item) => {
      state.attachList = [...state.homePageList, item]
      sessionStorage.setItem('attach', JSON.stringify(state.attachList))
    },
    DELETE_MODULE: (state, item) => {
      state.delete_module = item
    },
  },
  actions: {
    addPageId({ commit }, item) {
      commit('ADD_PAGE_ID', item)
    },
    addHomePageList({ commit }, item) {
      commit('ADD_HOME_PAGE_LIST', item)
    },
    modifyHomePageList({ commit }, item) {
      commit('MODIFY_HOME_PAGE_LIST', item)
    },
    announcementList({ commit }, item) {
      commit('ANNOUCEMENT_LIST', item)
    },
    Title({ commit }, item) {
      commit('TITLE', item)
    },
    Search({ commit }, item) {
      commit('SEARCH', item)
    },
    videoList({ commit }, item) {
      commit('VIDEO_LIST', item)
    },
    commodityList({ commit }, item) {
      commit('COMMODITY_LIST', item)
    },
    attachList({ commit }, item) {
      commit('ATTACH_LIST', item)
    },
  }
}

function sessionHomePageList(item, type, data) {
  item.map(res => {
    if (res.type === type) {
      res.data = data
    }
    return res
  })
  const list = uniqueObj(item, 'type')
  sessionStorage.setItem('homePageList', JSON.stringify(list))
}

export default homepage
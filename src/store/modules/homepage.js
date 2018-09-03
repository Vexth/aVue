const homepage = {
  state: {
    data_list: {},
  },
  mutations: {
    DATA_LIST: (state, item) => {
      state.data_list = item
    },
    ADD_DATA_LIST: (state, item) => {
      state.data_list[item['type']] = item
      sessionStorage.setItem('data_list', JSON.stringify(state.data_list))
    },
  },
  actions: {
    AddDataList({ commit }, item) {
      commit('ADD_DATA_LIST', item)
    }
  }
}

export default homepage
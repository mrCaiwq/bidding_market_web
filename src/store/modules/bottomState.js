const state = {
  isShow: true,
}

const mutations = {
  changeIsShow(state, val) {
    state.isShow = val
  }
}

const actions = {
  change({
    commit
  }, msg) {
    commit('changeIsShow', msg)
  }
}

export default {
  state,
  mutations,
  actions
}

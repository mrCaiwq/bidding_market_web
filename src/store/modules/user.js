import { login, register, info, myBidding } from '../../api/user'

const state = {
  token: ''
}

const mutations = {}

const actions = {
  userRegister({ commit }, msg) {
    return register(msg).then(data => {
      return data
    })
  },
  userLogin({ commit }, msg) {
    return login(msg).then(data => {
      return data
    })
  },
  getUserInfo({ commit }, msg) {
    return info(msg).then(data => {
      return data
    })
  },
  getMyBidding({ commit }, msg) {
    return myBidding(msg).then(data => {
      return data
    })
  }
}

export default {
  state,
  mutations,
  actions
}

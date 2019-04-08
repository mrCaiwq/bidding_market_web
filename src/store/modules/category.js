import {
  category,
  searchProduct
} from '@/api/category.js'

const state = {

}

const mutations = {

}

const actions = {
  getCategory({
    commit
  }, msg) {
    return category(msg).then(data => {
      return data
    })
  },
  getCategoryProduct({
    commit
  }, msg) {
    return searchProduct(msg).then(data => {
      return data
    })
  }
}

export default {
  state,
  mutations,
  actions
}

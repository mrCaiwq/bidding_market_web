import {
  product,
  bidding,
  productDetail,
  myPublish,
  createProduct
} from '@/api/product.js'

const state = {}

const mutations = {}

const actions = {
  getProduct({
    commit
  }, msg) {
    return product(msg).then(data => {
      return data
    })
  },
  postBidding({
    commit
  }, msg) {
    return bidding(msg).then(data => {
      return data
    })
  },
  getDetail({
    commit
  }, msg) {
    return productDetail(msg).then(data => {
      return data
    })
  },
  getMyPublish({
    commit
  }, msg) {
    return myPublish(msg).then(data => {
      return data
    })
  },
  createPublish({
    commit
  }, msg) {
    return createProduct(msg).then(data => {
      return data
    })
  }
}

export default {
  state,
  mutations,
  actions
}

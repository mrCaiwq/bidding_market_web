import {
  fetch
} from '../utils/http'

export function product() {
  return fetch({
    url: '/products/',
    method: 'get'
  })
}

export function productDetail(id) {
  return fetch({
    url: `/products/${id}/detail`,
    method: 'get'
  })
}

export function bidding(data) {
  return fetch({
    url: '/biddings/',
    method: 'post',
    data: data
  })
}

export function myPublish() {
  return fetch({
    url: '/products/my',
    method: 'get',
  })
}

export function createProduct(data) {
  return fetch({
    url: '/products/',
    headers: {
      "Content-Type": "mltipart/form-data"
    },
    method: 'post',
    data: data
  })
}

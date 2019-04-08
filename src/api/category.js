import {
  fetch
} from '../utils/http'

export function category() {
  return fetch({
    url: '/categories/',
    method: 'get'
  })
}

export function searchProduct(id) {
  return fetch({
    url: `/categories/${id}/products`,
    method: 'get'
  })
}

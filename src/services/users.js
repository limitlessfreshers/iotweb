import { request } from '../utils'

export async function query (params) {
  return request('http://139.59.95.113:8080/allUser', {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request('http://139.59.95.113:8080/addUser', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request('http://139.59.95.113:8080/deleteUser', {
    method: 'post',
    data: params
  })
}

// export async function update (params) {
//
//   return request('http://139.59.95.113:8080/editZone', {
//     method: 'post',
//     data: params
//   })
// }

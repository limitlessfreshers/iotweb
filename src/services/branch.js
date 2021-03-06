import { request } from '../utils'
import {BASE_URL, CLIENT_ID} from '../CommonMethods/api'

export async function query (params) {
  return request(BASE_URL+'/allBranch?clientId='+CLIENT_ID, {
    method: 'get',
    data: params
  })
}

export async function create (params) {
  return request(BASE_URL+'/addBranch', {
    method: 'post',
    data: params
  })
}

export async function remove (params) {
  return request(BASE_URL+'/deleteBranch', {
    method: 'delete',
    data: params
  })
}

export async function update (params) {

  return request(BASE_URL+'/editBranch', {
    method: 'post',
    data: params
  })
}

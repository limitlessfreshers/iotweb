import { create, remove, update, query } from '../services/device'
import { parse } from 'qs'

export default {

  namespace: 'device',

  state: {
    list: [],
    loading: false,
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `Total ${total} Record`,
      current: 1,
      total: null
    }
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/device') {
          dispatch({
            type: 'query',
            payload: location.query
          })
        }
      })
    }
  },

  effects: {

    *query ({ payload }, { call, put }) {
      //console.log('here',payload)
      yield put({ type: 'showLoading' })
      const data = yield call(query, parse(payload))
      if (data) {

        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: data.page
          }

        })

      }
    },
    *'delete' ({ payload }, { call, put }) {
      yield put({ type: 'showLoading' })
      const data = yield call(remove, { id: payload })
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              total: data.page.total,
              current: data.page.current
            }
          }
        })
      }
    },
    *create ({ payload }, { call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })
      // console.log('====',payload)
      const data = yield call(create, payload)
      const data2 = yield call(query, parse(payload))
      if (data && data.success) {
        //console.log('====',data2)
        yield put({ type: 'showLoading' })
        const data = yield call(query, parse(payload))
        if (data) {

          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }

          })

        }
      }
    },
    *update ({ payload }, { select, call, put }) {
      yield put({ type: 'hideModal' })
      yield put({ type: 'showLoading' })

      const id = yield select(({ device }) => device.currentItem._id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data && data.success) {
        yield put({ type: 'showLoading' })
        const data = yield call(query, parse(payload))
        if (data) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data,
              pagination: data.page
            }
          })
        }
      }
    }
  },

  reducers: {
    showLoading (state) {
      return { ...state, loading: true }
    },
    querySuccess (state, action) {

      const {list, pagination} = action.payload
      return { ...state,
        list,
        loading: false,
        pagination: {
          ...state.pagination,
          ...pagination
        }}
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    }
  }

}

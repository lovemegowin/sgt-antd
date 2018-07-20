import { routerRedux } from 'dva/router';
import { getMpDetail } from '../services/api';

export default {
  namespace: 'marketDetail',

  state: {
    status: {},
  },

  effects: {
    *getMpInfoDetail({ payload }, { call, put }) {
      const response = yield call(getMpDetail, payload);
      yield put({
        type: 'getMpDetail',
        payload: response,
      });
    },
  },
  reducers: {
    getMpDetail(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

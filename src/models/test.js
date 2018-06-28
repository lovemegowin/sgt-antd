import { routerRedux } from 'dva/router';
import {checkScanStatus, fakeAccountLogin, getAuth, getMpInfo} from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'test',

  state: {
    status: undefined,
  },

  effects: {
    *getMpInfoList({ payload }, { call, put }){
      const response = yield call(getMpInfo,payload);
      yield put ({
        type:'getMpInfo',
        payload:response
      })
    },
  },


  reducers: {
    getMpInfo(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },
};

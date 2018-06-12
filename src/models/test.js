import { routerRedux } from 'dva/router';
import {checkScanStatus, fakeAccountLogin, getAuth} from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'test',

  state: {
    status: undefined,
  },

  effects: {
    * login({payload}, {call, put}) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
  },

  reducers: {
    getQrImg(state, { payload }) {
      payload.qrImg = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${payload.qrCodeTicket}`;
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        qrImg:payload.qrImg,
        qrTicket:payload.qrCodeTicket
      };
    },
  },
};

import { routerRedux } from 'dva/router';
import {
  checkScanStatus,
  fakeAccountLogin,
  getAuth,
  loginNotify,
  getMenu,
  getUserInfo,
} from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
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
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
    *loginNew({ payload }, { call, put }) {
      const delay = timeout => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout);
        });
      };
      let responseScan = {};
      let count = 0;
      let tag = true;
      const response = yield call(getAuth, payload);
      yield put({
        type: 'getQrImg',
        payload: response,
      });
      while (tag) {
        yield call(delay, 2000);
        responseScan = yield call(checkScanStatus, response.qrCodeTicket);
        count++;
        if (responseScan.code === '0') {
          setAuthority(responseScan.response.access_token);
          // yield put(routerRedux.push('/dashboard/test'));
          yield put({
            type: 'scanSuccess',
            payload: responseScan,
          });
          return (tag = false);
        }
        if (count >= 5) {
          if (responseScan.code !== '0') {
            yield put({
              type: 'scanError',
              payload: responseScan,
            });
          }
          return (tag = false);
        }
      }
    },
    *choseMerchant({ payload }, { call, put }) {
      setAuthority('Bearer ' + payload);
      yield call(loginNotify);
      localStorage.menu = yield call(getMenu);
      localStorage.userInfo = yield call(getUserInfo);
      // Login successfully
      yield put(routerRedux.push('/dashboard/test'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    getQrImg(state, { payload }) {
      payload.qrImg = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${payload.qrCodeTicket}`;
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        qrImg: payload.qrImg,
        qrTicket: payload.qrCodeTicket,
        showMask: false,
      };
    },
    scanSuccess(state, { payload }) {
      localStorage.agentEmpList = JSON.stringify(payload.response.empList);
      return {
        ...state,
        status: payload.code,
        empList: payload.response.empList,
        showMask: false,
      };
    },
    scanError(state, { payload }) {
      return {
        ...state,
        status: payload.code,
        showMask: true,
      };
    },
  },
};

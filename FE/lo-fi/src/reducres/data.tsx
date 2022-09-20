import axios from "../api/axios";
import requests from "../api/requests";
import { handleActions } from "redux-actions";
import { Dispatch } from 'redux';

// 데이터 버튼을 누를 때 마다 데이터를 가져올지 미리 데이터를 다 받아놓고 변경만 해야되는지 고민
const getDataAPI = async (type: string) => {
  if (type === "animal") {
    return axios.get(requests.animal)
  } else if (type === "person") {
    return axios.get(requests.person)
  } else if (type === "lostItem") {
    return axios.get(requests.lostItem)
  } else if (type === "takeItem") {
    return axios.get(requests.takeItem)
  }
}

// 액션 타입 지정/ 데이터 전송, 성공, 실패
const GET_DATA_PENDING = 'data/GET_DATA_PENDING';
const GET_DATA_SUCCESS = 'data/GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'data/GET_DATA_FAILURE';

export const getData = (category: string) => (dispatch: Dispatch) => {
  // 요청을 시작했다는 것을 알림
  dispatch({type: GET_DATA_PENDING})

  // 요청을 시작한다.
  return getDataAPI(category).then(
    res => {
      // 요청을 성곻했을 때, 응답내용을 payload로 보낸다.
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: res
      })
    }
  ).catch(err => {
    dispatch({
      type: GET_DATA_FAILURE,
      payload: err
    });
    // 이 함수가 실행 된 다음에 다시한번 catch 할 수 있도록 한다.
    throw(err);
  })
}

// 초기값 설정
const initialState = {
  pending: false,
  error: false,
  data: [{}],
}

// 액션에 따른 state 변경
export default handleActions({
  [GET_DATA_PENDING]: (state, action) => {
    return {
      ...state,
      pending: true,
      error: false
    };
  },
  [GET_DATA_SUCCESS]: (state, action) => {
    const resData = action.payload.data;
    return {
      ...state,
      pending: false,
      data: resData
    };
  },
  [GET_DATA_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  },
}, initialState)


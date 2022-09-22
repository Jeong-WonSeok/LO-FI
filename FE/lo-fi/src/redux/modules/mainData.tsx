import axios from "../../api/axios";
import test_axios from 'axios'
import requests from "../../api/requests";
import { createAction, handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import { data } from "jquery";

// 데이터 버튼을 누를 때 마다 데이터를 가져올지 미리 데이터를 다 받아놓고 변경만 해야되는지 고민
const getDataAPI = async (type: string) => {
  if (type === "animal") {
    return axios.get(requests.animal)
  } else if (type === "person") {
    return axios.get(requests.person)
  } else if (type === "lostItem") {
    const res = await test_axios.get(`/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd?serviceKey=${process.env.REACT_APP_LOST_ITEM_KEY}`)
    return res.data.response.body.items.item
  } else if (type === "takeItem") {
    const res = await test_axios.get(`/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd?serviceKey=${process.env.REACT_APP_LOST_ITEM_KEY}`)
    return res.data.response.body.items.item
    // return axios.get(requests.takeItem)
  } else {
    console.log('잘못된 입력입니다.')
  }
}

// 액션 타입 지정/ 데이터 전송, 성공, 실패
const GET_DATA_PENDING = 'mainData/GET_DATA_PENDING';
const GET_DATA_SUCCESS = 'mainData/GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'mainData/GET_DATA_FAILURE';
const INCRESE = 'mainData/INCRESE'

export const increse = createAction(INCRESE, (count:number) => count)

// 액션 생성 함수
export const getData = (category: string) => async (dispatch: Dispatch) => {
  // 요청을 시작했다는 것을 알림
  dispatch({type: GET_DATA_PENDING})

  // 요청을 시작한다.
  return await getDataAPI(category).then(
    res => {
      console.log('데이터 요청 성공')
      // 요청을 성곻했을 때, 응답내용을 payload로 보낸다.
      dispatch({
        type: GET_DATA_SUCCESS,
        payload: res,
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
// 초기값 타입 설정
export interface initialState {
  pending: Boolean,
  error: Boolean,
  data: Array<Object>,
  count: number
}
// 초기값 설정
const initialState: initialState = {
  pending: false,
  error: false,
  data: [],
  count: 0,
}

// 액션에 따른 state 변경 / 이게 리듀서인가?
export default handleActions({
  [GET_DATA_PENDING]: (state) => {
    // 반환해줄 데이터
    return {
      ...state,
      pending: true,
      error: false
    };
  },
  [GET_DATA_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      pending: false,
      data: state.data.concat(payload)
    };
  },
  [GET_DATA_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  },
  [INCRESE]: (state, action) => {
    return {
      ...state,
      count: state.count + 1
    }
  }
}, initialState)


import axios from "../../api/axios";
import test_axios from 'axios'
import requests from "../../api/requests";
import { createAction, handleActions } from "redux-actions";
import { Dispatch } from 'redux';
import { data } from "jquery";
import Category from "../../components/Category";

// 데이터 버튼을 누를 때 마다 데이터를 가져올지 미리 데이터를 다 받아놓고 변경만 해야되는지 고민
const getDataAPI = async (type: string) => {
  if (type === "animal") {
    return axios.get(requests.animal)
  } else if (type === "person") {
    return axios.get(requests.person)
  } else if (type === "article") {
    return axios.get(requests.article)
    const res = await test_axios.get(`/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd?serviceKey=${process.env.REACT_APP_LOST_ITEM_KEY}`)
    return res.data.response.body.items.item
  } else if (type === "found") {
    return axios.get(requests.found)
    const res = await test_axios.get(`/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd?serviceKey=${process.env.REACT_APP_LOST_ITEM_KEY}`)
    return res.data.response.body.items.item
    // return axios.get(requests.takeItem)
  } else {
    console.log('입력값', type)
    console.log('잘못된 입력입니다.')
  }
}

const getSearchAPI = async (type: string, searchText: string) => {
  const params = {
    category: type,
    keyword: searchText
  }
  return axios.get(requests.searchDetail, {params})
}


// 액션 타입 지정/ 데이터 전송, 성공, 실패
const GET_DATA_PENDING = 'mainData/GET_DATA_PENDING';
const GET_DATA_SUCCESS = 'mainData/GET_DATA_SUCCESS';
const GET_DATA_FAILURE = 'mainData/GET_DATA_FAILURE';
const SEARCH_DATA_PENDING = 'mainData/SEARCH_DATA_PENDING';
const SEARCH_DATA_SUCCESS = 'mainData/SEARCH_DATA_SUCCESS';
const SEARCH_DATA_FAILURE = 'mainData/SEARCH_DATA_FAILURE';
const SEARCH_STOP = 'mainData/SEARCH_STOP';

// 액션 생성 함수
export const getData = (category: string) => async (dispatch: Dispatch) => {
  // 요청을 시작했다는 것을 알림
  dispatch({type: GET_DATA_PENDING, payload: category})

  // 요청을 시작한다.
  return await getDataAPI(category).then(
    res => {
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

// 데이터 검색
export const searchData = (category: string, searchText: string) => async (dispatch: Dispatch) => {
  // 요청을 시작했다는 것을 알림
  dispatch({type: SEARCH_DATA_PENDING, payload: category})

  // 요청을 시작한다.
  return await getSearchAPI(category, searchText).then(
    res => {
      // 요청을 성곻했을 때, 응답내용을 payload로 보낸다.
      dispatch({
        type: SEARCH_DATA_SUCCESS,
        payload: res,
      })
    }
  ).catch(err => {
    dispatch({
      type: SEARCH_DATA_FAILURE,
      payload: err
    });
    // 이 함수가 실행 된 다음에 다시한번 catch 할 수 있도록 한다.
    throw(err);
  })
}

// 검색 취소
export const stopSearch = ()  => async (dispatch: Dispatch) => {
  dispatch({type: SEARCH_STOP})
}

// 초기값 타입 설정
export interface initialState {
  pending: Boolean,
  error: Boolean,
  search: Boolean,
  category: string,
  data: Array<Object>,
  search_data: Array<Object>,
}
// 초기값 설정
const initialState: initialState = {
  pending: false,
  error: false,
  search: false,
  category: "article",
  data: [],
  search_data: []
}

// 액션에 따른 state 변경 / 이게 리듀서인가?
export default handleActions({
  [GET_DATA_PENDING]: (state, action) => {
    // 반환해줄 데이터
    return {
      ...state,
      pending: true,
      error: false,
      category: String(action.payload)
    }
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
  [SEARCH_DATA_PENDING]: (state, {payload}) => {
    // 반환해줄 데이터
    return {
      ...state,
      search: true,
      pending: true,
      error: false,
      category: String(payload)
    };
  },
  [SEARCH_DATA_SUCCESS]: (state, {payload}) => {
    return {
      ...state,
      pending: false,
      search_data: state.data.concat(payload)
    };
  },
  [SEARCH_DATA_FAILURE]: (state, action) => {
    return {
      ...state,
      pending: false,
      error: true
    };
  },
  [SEARCH_STOP]: (state) => {
    return {
      ...state,
      search: false,
    };
  },
}, initialState)


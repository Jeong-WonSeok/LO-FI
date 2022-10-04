import { combineReducers } from "redux";
import user from './user';
import mainData, {initialState} from './mainData';
import { configureStore } from "@reduxjs/toolkit";

// 타입 오류를 위해서 state의 타입을 가져온다.
export interface rootState {
  mainData: initialState;
}

const rootReducer = combineReducers({
  user,
  mainData
})

// 리덕스에서 관리하는 상태에 대한 타입
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
})

// usedispatch 사용시 에러 발생을 잡아주기 위한 타입 설정
export default store;
export type AppDispatch = typeof store.dispatch;
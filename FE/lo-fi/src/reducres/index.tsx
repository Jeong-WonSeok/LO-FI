import { combineReducers } from "redux";
import user from './user';
import data from './data';

const rootReducer = combineReducers({
  user,
  data
})

export default rootReducer;

// 리덕스에서 관리하는 상태에 대한 타입
export type RootState = ReturnType<typeof rootReducer>;
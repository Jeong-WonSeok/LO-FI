import { combineReducers } from "redux";
import user from './user'

const rootReducer = combineReducers({
  user
})

export default rootReducer;

// 타입오류를 잡기위한 코드
export type RootState = ReturnType<typeof rootReducer>;
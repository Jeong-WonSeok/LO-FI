import { combineReducers } from "redux";

const rootReducer = combineReducers({

})

export default rootReducer;

// 타입오류를 잡기위한 코드
export type RootState = ReturnType<typeof rootReducer>;
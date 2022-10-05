const LOGIN = "user/LOGIN";
const LOGOUT = 'user/LOGOUT';

export const toLogin = () => ({ type : LOGIN});
export const toLogout = () => ({type : LOGOUT});

const initialState = {
 email : '',
 id : 0,
}

const user = (state = initialState, action:any) => {
  switch (action.type) {
    case LOGIN:
      return {
        email : action.email,
        id : action.id
      }
    case LOGOUT:
      return {
        email : '',
        id : 0
      }
    default:
      return state;
  }
}

export default user;
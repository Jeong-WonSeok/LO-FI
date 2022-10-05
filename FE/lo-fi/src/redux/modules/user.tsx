import { getAllJSDocTagsOfKind } from "typescript";

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



// const user = (state = initialState2, action: {type: string}) => {
//   switch (action.type) {
//     case "login":

//       return {
//         id : state.id ,
//         email : state.email
//       }
//     case "signup":
//       return state
//     case "logout":
//       return {
//         id : state.id = 0,
//         email : state.email = ''
//       }
//     default:
//       return state;
//   }
// }

export default user;

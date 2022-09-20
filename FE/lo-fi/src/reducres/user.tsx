const initialState = null;

const user = (state = initialState, action: {type: string}) => {
  switch (action.type) {
    case "login":
      
      return 
    case "signup":
      return 
    case "logout":
      return 
    default:
      return state;
  }
}

export default user;
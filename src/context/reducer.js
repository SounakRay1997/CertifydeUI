let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";

console.log(user)
console.log(token)

export const initialState = {
  userDetails: "" || user,
  token: "" || token,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        userDetails: action.payload.user,
        token: action.payload.auth_token,
      };
    case "LOGOUT":
      return {
        ...initialState,
        userDetails: "",
        token: ""
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
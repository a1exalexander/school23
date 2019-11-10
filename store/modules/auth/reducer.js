import { actionType } from "constant";

const initState = {
  loading: false,
  hasError: false,
  user: {
    id: 1,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: ""
      }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  }
};

const reducer = (state = { auth: {...initState } }, action) => {

  switch (action.type) {
    case actionType.AUTH_REQUEST:
      return {
        ...state.auth,
        loading: true,
        hasError: false,
      };
    case actionType.AUTH_SUCCESS:
      return {
        ...state.auth,
        loading: false,
        hasError: false,
        user: { ...action.payload },
      };
    case actionType.AUTH_FAILURE:
      return {
        ...state.auth,
        loading: false,
        hasError: true,
      }
    default:
      return state.auth;
  }
};

export default reducer;

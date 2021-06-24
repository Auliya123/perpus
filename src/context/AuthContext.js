import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        message: action.payload.message,
        token: action.payload.apikey_account,
      };
    default:
      return state;
  }
};

const login = (dispatch) => async ({ email, password }) => {
  const response = await bookApi.post("/login", { email, password });
  dispatch({ type: "login", payload: response.data });
  console.log(`response.data`, response.data);
  if (response.data.apikey_account) {
    navigate("Drawer");
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login },
  { token: null, message: null }
);

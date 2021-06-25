import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const tryLocalLogin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "login", payload: token });
    navigate("Drawer");
  } else {
    navigate("Login");
  }
};

const login = (dispatch) => async ({ email, password }) => {
  const response = await bookApi.post("/login", { email, password });
  dispatch({ type: "login", payload: response.data });
  if (response.data.apikey_account) {
    await AsyncStorage.setItem("token", response.data.apikey_account);
    navigate("Drawer");
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, tryLocalLogin },
  { token: null, message: null }
);

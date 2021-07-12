import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  console.log(`action.payload`, action.payload);
  switch (action.type) {
    case "login":
      return {
        message: action.payload.data.message,
        token: action.payload.data.apikey_account,
        userId: action.payload.data.usr_id,
        email: action.payload.email,
      };
    case "logout":
      return { token: null, message: "", email: "", userId: null };
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
  dispatch({ type: "login", payload: { data: response.data, email } });
  console.log(`response.data`, response.data);
  if (response.data.apikey_account) {
    await AsyncStorage.setItem("token", response.data.apikey_account);
    navigate("Drawer");
  }
};

const logout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "logout" });
  navigate("Login");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, tryLocalLogin, logout },
  { token: null, message: null, email: null, userId: null }
);

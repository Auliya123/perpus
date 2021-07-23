import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";
import { navigate } from "../navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authReducer = (state, action) => {
  console.log(`action.payload`, action.payload);
  console.log("state", state);
  switch (action.type) {
    case "login":
      return {
        ...action.payload,
      };
    case "logout":
      return { token: null, message: "", email: "", data: null, name: "" };
    case "get_name":
      return { ...state, name: action.payload.name };
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

const getName = (dispatch) => async (userId) => {
  console.log(userId);
  const getName = await bookApi.get(`/usr/view/${userId}`);
  console.log(`getName`, getName);
  console.log(`getName.data`, getName.data);
  const name = getName.data.data.name;
  dispatch({ type: "get_name", payload: { name } });
};

const logout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "logout" });
  navigate("Login");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { login, tryLocalLogin, logout, getName },
  { token: null, message: null, email: null, userId: null }
);

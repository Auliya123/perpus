import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";

const returnReducer = (state, action) => {
  switch (action.type) {
    case "fetch_return":
      return action.payload;
    case "fetch_return_detail":
      return { ...action.payload, message: "" };
    case "return_book":
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

const fetchReturn = (dispatch) => async (page) => {
  const response = await bookApi.get(`/borrow/index/1`);
  const data = response.data.data;
  console.log(`data fetch`, data);

  const pinjam = data.filter((x) => x.status === "N");
  const kembali = data.filter((x) => x.status === "F");

  dispatch({ type: "fetch_return", payload: { pinjam, kembali } });
};

const fetchReturnDetail = (dispatch) => async (id) => {
  const response = await bookApi.get(`/borrow/view/${id}`);
  console.log(`response.data`, response.data);
  dispatch({ type: "fetch_return_detail", payload: response.data });
  return response.data;
};

const returnBook = (dispatch) => async (
  data,
  password,
  email,
  userId,
  callback
) => {
  console.log(`email`, email);
  console.log(`password`, password);
  console.log(`id`, data);
  const verify = await bookApi.post("/verified", {
    email: email,
    password: password,
  });

  console.log(`verify`, verify);
  if (verify.data.status === true) {
    const response = await bookApi.post(`/return/${data}`);
    console.log(`response.data pengembelaian`, response.data);
    dispatch({
      type: "return_book",
      payload: { message: response.data.message },
    });
    if (callback && response.data.status === true) {
      callback();
    }
  } else {
    dispatch({
      type: "return_book",
      payload: { message: "Anda Gagal Verifikasi Data" },
    });
  }
};

export const { Provider, Context } = createDataContext(
  returnReducer,
  { fetchReturn, fetchReturnDetail, returnBook },
  []
);

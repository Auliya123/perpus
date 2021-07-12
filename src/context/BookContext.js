import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";

const bookReducer = (state, action) => {
  switch (action.type) {
    case "fetch_books":
      return action.payload;
    case "fetch_detail_book":
      console.log("hello");
      return { book: action.payload };
    case "add_blogpost":
      return [
        ...state,
        {
          id_buku: action.payload.id,
          qty: action.payload.buku,
        },
      ];
    default:
      return state;
  }
};

const fetchBooks = (dispatch) => async () => {
  const response = await bookApi.get("/book/index");
  dispatch({ type: "fetch_books", payload: response.data });
};

const fetchDetailBook = (dispatch) => async (id) => {
  const response = await bookApi.get(`/book/view/${id}`);
  dispatch({ type: "fetch_detail_book", payload: response.data });
  console.log(response.data);
};

export const { Provider, Context } = createDataContext(
  bookReducer,
  { fetchBooks, fetchDetailBook },
  []
);

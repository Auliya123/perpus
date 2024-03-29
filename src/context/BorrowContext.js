import React, { useContext } from "react";
import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";
import { Alert } from "react-native";

const borrowReducer = (state, action) => {
  console.log(`state`, state);
  switch (action.type) {
    case "addCart":
      return {
        cartItems: action.payload.cartItems,
      };
    case "checkout": {
      return {
        cartItems: action.payload.cartItems,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        total: action.payload.total,
      };
    }
    case "peminjaman": {
      return {
        cartItems: [],
        message: action.payload.message,
      };
    }
    case "getUser":
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};

const addCart = (dispatch) => (product, items, callback) => {
  console.log(`items`, items);
  const cartItems = items.slice();

  console.log("product", product);

  console.log(`coba`);

  let alreadyExists = false;

  cartItems.forEach((x) => {
    console.log(`x`, x);
    if (x.book_id === product.book_id) {
      alreadyExists = true;
      x.qty++;
    }
  });

  if (!alreadyExists) {
    console.log("belum exist");
    cartItems.push({
      book_id: product.id,
      author: product.author,
      price: product.price,
      name: product.name,
      qty: 1,
    });
  }

  dispatch({
    type: "addCart",
    payload: { cartItems },
  });

  console.log(`cartItems`, cartItems);
  if (callback) {
    callback();
  }
};

const deleteCart = (dispatch) => (product, items, type, callback) => {
  console.log(`items`, items);
  let cartItems = items.slice();

  console.log("product", product);

  let alreadyExists = false;

  if (type === "deleteOne") {
    cartItems.forEach((x) => {
      console.log(`x`, x);
      if (x.book_id === product.book_id) {
        alreadyExists = true;
        if (product.qty <= 1) {
          Alert.alert("Hapus", "Apakah Anda yakin untuk menghapus?", [
            {
              text: "Tidak",
              onPress: () => {},
            },
            {
              text: "Ya",
              onPress: deleteBook,
            },
          ]);
        } else {
          x.qty--;
          dispatchAction();
        }
      }
    });
  }

  function deleteBook() {
    console.log("hello");
    console.log(cartItems);
    cartItems = items.slice().filter((x) => x.book_id !== product.book_id);
    console.log("cart", cartItems);
    dispatchAction();
  }

  function dispatchAction() {
    dispatch({
      type: "addCart",
      payload: { cartItems },
    });
  }

  // console.log(`cartItems`, cartItems);

  if (type === "deleteAll") {
    deleteBook();
  }

  console.log(`cartItems`, cartItems);
  if (callback) {
    callback();
  }
};

const getUser = (dispatch) => async (id) => {
  console.log("hello");
  const response = await bookApi.get(`/usr/view/${id}`);
  console.log(`response.data`, response.data);
  dispatch({ type: "getUser", payload: response.data });
};

const checkout = (dispatch) => (
  cartItems,
  startDate,
  endDate,
  total,
  callback
) => {
  dispatch({
    type: "checkout",
    payload: { cartItems, startDate, endDate, total },
  });

  console.log(`cartItems`, cartItems);
  if (callback) {
    callback();
  }
};

const peminjaman = (dispatch) => async (
  data,
  password,
  email,
  userId,
  callback,
  callbackError
) => {
  const verify = await bookApi.post("/verified", {
    email: email,
    password: password,
  });

  console.log(verify);
  console.log(`data.cartItems`, data.cartItems);

  if (verify.data.status === true) {
    const response = await bookApi.post("/borrow/create", {
      borrow: {
        start_date: data.startDate,
        end_date: data.endDate.toString(),
        usr_id: userId,
        status: "N",
        total: data.total,
      },
      borrowd: data.cartItems,
    });

    console.log(`response.data`, response.data);
    dispatch({
      type: "peminjaman",
      payload: { message: response.data.message },
    });
    if (callback && response.data.status === true) {
      callback();
    } else if (callbackError && response.data.status === false) {
      callbackError();
    }
  } else {
    dispatch({
      type: "FailedBorrow",
      payload: { message: response.data.message },
    });
  }
};

export const { Provider, Context } = createDataContext(
  borrowReducer,
  { addCart, checkout, getUser, peminjaman, deleteCart },
  { cartItems: [] }
);

import createDataContext from "./createDataContext";
import bookApi from "../api/bookApi";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "update_profile":
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

const updateProfile = (dispatch) => async (
  data,
  password,
  email,
  id,
  callback
) => {
  console.log(`data`, data);
  console.log(`email`, email);
  console.log(`password`, password);
  console.log(`id`, id);
  console.log(`callback`, callback);
  const verify = await bookApi.post("/verified", {
    email: email,
    password: password,
  });
  const pwd = data.data.password ? data.data.password : password;
  console.log(pwd);

  console.log(`verify`, verify);
  if (verify.data.status === true) {
    console.log("Update Profile");
    console.log(`data.data.email`, data.data.email);
    const response = await bookApi.put(`/usr/update/${id}`, {
      email: data.data.email,
      name: data.data.name,
      Mobile: data.data.mobile,
      Address: data.data.address,
      Password: pwd,
    });
    console.log(`response.data profil`, response);
    dispatch({
      type: "update_profile",
      payload: { message: response.data.message },
    });
    if (callback && response.data.status === true) {
      console.log("callback terpanggil");
      callback();
    }
  } else {
    dispatch({
      type: "update_profile",
      payload: { message: "Anda Gagal Verifikasi Data" },
    });
  }
};

export const { Provider, Context } = createDataContext(
  profileReducer,
  { updateProfile },
  []
);

import React, { useContext, useEffect } from "react";
import { Context as BorrowContext } from "../context/BorrowContext";
import VerifyInput from "../components/VerifyInput";
import { Alert, View, TextInput, StyleSheet } from "react-native";

const VerifyBorrowScreen = ({ navigation }) => {
  const { state, peminjaman } = useContext(BorrowContext);

  console.log(state);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      }),
    [navigation]
  );

  return (
    <>
      <VerifyInput
        data={state}
        buttonTitle="Proses Peminjaman"
        onSubmit={peminjaman}
        callback={() => navigation.navigate("SuccessfulBorrow")}
        message={state.message}
        callbackError={() => navigation.navigate("FailedBorrow")}
      />
    </>
  );
};

export default VerifyBorrowScreen;

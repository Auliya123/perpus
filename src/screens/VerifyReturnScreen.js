import React, { useContext, useEffect } from "react";
import { Context as ReturnContext } from "../context/ReturnContext";
import VerifyInput from "../components/VerifyInput";

const VerifyReturnScreen = ({ route, navigation }) => {
  const { returnBook, state } = useContext(ReturnContext);
  const { id } = route.params;

  console.log(`state`, state);

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
        data={id}
        buttonTitle="Proses Peminjaman"
        onSubmit={returnBook}
        message={state}
        callback={() => navigation.navigate("SuccessfulReturn")}
      />
    </>
  );
};

export default VerifyReturnScreen;

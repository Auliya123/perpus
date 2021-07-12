import React, { useContext } from "react";
import { Context as BorrowContext } from "../context/BorrowContext";
import VerifyInput from "../components/VerifyInput";

const VerifyBorrowScreen = ({ navigation }) => {
  const { state, peminjaman } = useContext(BorrowContext);

  return (
    <>
      <VerifyInput
        data={state}
        buttonTitle="Proses Peminjaman"
        onSubmit={peminjaman}
        callback={() => navigation.navigate("SuccessfulBorrow")}
        message={state.message}
      />
    </>
  );
};

export default VerifyBorrowScreen;

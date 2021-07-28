import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Context as BorrowContext } from "../context/BorrowContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import FailedMessage from "../components/FailedMessage";

const FailedBorrowScreen = ({ navigation }) => {
  const { state } = useContext(BorrowContext);
  console.log(`state mind`, state);
  return (
    <FailedMessage
      message={state.message}
      onSubmit={() => navigation.navigate("Home")}
      buttonTitle="Kembali ke Beranda"
    />
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#39A6A3",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    marginTop: 50,
  },
});

export default FailedBorrowScreen;

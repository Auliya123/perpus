import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import SuccessfulMessage from "../components/SuccessfulMessage";

const SuccessfulReturnScreen = ({ navigation }) => {
  return (
    <>
      <SuccessfulMessage
        message="Buku Berhasil Dikembalikan"
        onSubmit={() => navigation.navigate("Home")}
        buttonTitle="Kembali ke Beranda"
      />
    </>
  );
};

export default SuccessfulReturnScreen;

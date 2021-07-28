import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import SuccessfulMessage from "../components/SuccessfulMessage";

const SuccessfulProfileScreen = ({ navigation }) => {
  return (
    <>
      <SuccessfulMessage
        message="Profil Berhasil Diubah"
        onSubmit={() => navigation.navigate("Home")}
        buttonTitle="Kembali ke Beranda"
      />
    </>
  );
};

export default SuccessfulProfileScreen;

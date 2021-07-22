import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "./Spacer";
import { Input, Button } from "react-native-elements";
import { Context as ReturnContext } from "../context/ReturnContext";
import { Context as AuthContext } from "../context/AuthContext";

const VerifyInput = ({ data, buttonTitle, onSubmit, callback, message }) => {
  const {
    state: { email, userId, name },
  } = useContext(AuthContext);
  const [password, setPassword] = useState("");

  // console.log(`message`, message);

  console.log(`data`, data);

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.header}>Hai, {name}</Text>
      <Text style={styles.subheader}>
        Masukkan kata sandi untuk melanjutkan
      </Text>
      <Spacer />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={true}
      />
      <Button
        title={buttonTitle}
        onPress={() => onSubmit(data, password, email, userId, callback)}
        buttonStyle={{ backgroundColor: "orange" }}
      />
      <Text> {message ? message.message : null}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  subheader: {
    textAlign: "center",
    color: "gray",
    fontSize: 17,
  },
});

export default VerifyInput;

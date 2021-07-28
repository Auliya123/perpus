import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "./Spacer";
import { Input, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

const VerifyInput = ({
  data,
  buttonTitle,
  onSubmit,
  callback,
  message,
  callbackError,
}) => {
  const { state } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [isTextSecure, setIsTextSecure] = useState(true);

  // console.log(`message`, message);

  console.log(`data`, state);

  return (
    <SafeAreaView style={styles.body}>
      <Text style={styles.header}>Hai, {state.name}</Text>
      <Text style={styles.subheader}>
        Masukkan kata sandi untuk melanjutkan
      </Text>
      <Spacer />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        secureTextEntry={isTextSecure}
        rightIcon={
          <TouchableOpacity onPress={() => setIsTextSecure((prev) => !prev)}>
            <Ionicons
              size={25}
              name={isTextSecure ? "eye-off-outline" : "eye-outline"}
            />
          </TouchableOpacity>
        }
      />
      <Button
        title={buttonTitle}
        onPress={() =>
          onSubmit(
            data,
            password,
            state.email,
            state.data.usr_id,
            callback,
            callbackError
          )
        }
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

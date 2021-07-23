import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context } from "../context/AuthContext";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const {
    state: { data },
    login,
  } = useContext(Context);
  const [isTextSecure, setIsTextSecure] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loaded] = useFonts({
    Dancing: require("../../assets/fonts/dancingScript.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Spacer>
        <Text style={styles.title}>bits library</Text>
      </Spacer>
      <Input
        placeholder="Email/Username"
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        value={password}
        onChangeText={(newPassword) => setPassword(newPassword)}
        placeholder="Password"
        secureTextEntry={isTextSecure}
        autoCapitalize="none"
        autoCorrect={false}
        rightIcon={
          <TouchableOpacity onPress={() => setIsTextSecure((prev) => !prev)}>
            <Ionicons
              size={25}
              name={isTextSecure ? "eye-off-outline" : "eye-outline"}
            />
          </TouchableOpacity>
        }
      />
      {data ? (
        <Text
          style={
            data.message === "Logged In"
              ? styles.successfulMessage
              : styles.errorMessage
          }
        >
          {data.message}
        </Text>
      ) : null}
      <Spacer />
      <Spacer>
        <Button
          title="Masuk"
          onPress={() => login({ email, password })}
          buttonStyle={styles.button}
        />
      </Spacer>
    </View>
  );
};

LoginScreen.navigationOptions = {
  headerShow: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    color: "#39A6A3",
    fontFamily: "Dancing",
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#39A6A3",
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginBottom: 10,
    marginTop: -10,
  },
  successfulMessage: {
    fontSize: 16,
    color: "#39A6A3",
    marginLeft: 15,
    marginBottom: 10,
    marginTop: -10,
  },
});

export default LoginScreen;

import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context } from "../context/AuthContext";

const LoginScreen = () => {
  const {
    state: { message },
    login,
  } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Bits library</Text>
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
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
      <Spacer>
        <Button title="Masuk" onPress={() => login({ email, password })} />
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
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
});

export default LoginScreen;

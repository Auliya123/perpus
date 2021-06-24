import React from "react";
import { View, Text, Button } from "react-native";
// import { navigate } from "../navigationRef";

const SigninScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Sign in</Text>
      <Button
        title="Home"
        onPress={() => navigation.navigate("Drawer", { screen: "Home" })}
      />
    </View>
  );
};

export default SigninScreen;

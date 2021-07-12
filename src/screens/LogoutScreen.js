import React, { useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const LogoutScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 48 }}>Account Screen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={logout} />
      </Spacer>
    </SafeAreaView>
  );
};

LogoutScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};

const styles = StyleSheet.create({});

export default LogoutScreen;

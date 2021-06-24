import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { setNavigator, navigationRef } from "./src/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";

function Drawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="List" component={ListScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  );
}

function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer ref={setNavigator}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Drawer" component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

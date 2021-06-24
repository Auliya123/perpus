import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import ListScreen from "./src/screens/ListScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { setNavigator, navigationRef } from "./src/navigationRef";

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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Drawer" component={Drawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return <App />;
};

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { setNavigator, navigationRef } from "./src/navigationRef";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as BookProvider } from "./src/context/BookContext";
import { Provider as BorrowProvider } from "./src/context/BorrowContext";
import { Provider as ReturnProvider } from "./src/context/ReturnContext";
import { Provider as ProfileProvider } from "./src/context/ProfileContext";
import LoadingScreen from "./src/screens/LoadingScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import VerifyBorrowScreen from "./src/screens/VerifyBorrowScreen";
import ReturnDetailScreen from "./src/screens/ReturnDetailScreen";
import VerifyReturnScreen from "./src/screens/VerifyReturnScreen";
import SuccessfulReturnScreen from "./src/screens/SuccessfulReturnScreen";
import VerifyProfileScreen from "./src/screens/VerifyProfileScreen";
import SuccessfulBorrowScreen from "./src/screens/SuccessfulBorrowScreen";
import ListBorrowScreen from "./src/screens/ListBorrowScreen";

function Drawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="ListBorrow" component={ListBorrowScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
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
        {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Drawer" component={Drawer} />
        <Stack.Screen name="HomeDetail" component={BookDetailScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="VerifyBorrow" component={VerifyBorrowScreen} />
        <Stack.Screen
          name="SuccessfulBorrow"
          component={SuccessfulBorrowScreen}
        />
        <Stack.Screen name="ReturnDetail" component={ReturnDetailScreen} />
        <Stack.Screen name="VerifyReturn" component={VerifyReturnScreen} />
        <Stack.Screen
          name="SuccessfulReturn"
          component={SuccessfulReturnScreen}
        />
        <Stack.Screen name="VerifyProfile" component={VerifyProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <BookProvider>
        <BorrowProvider>
          <ReturnProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </ReturnProvider>
        </BorrowProvider>
      </BookProvider>
    </AuthProvider>
  );
};

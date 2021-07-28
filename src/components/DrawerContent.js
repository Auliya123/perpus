import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";

export default function DrawerContent(props) {
  const { state, logout } = useContext(AuthContext);
  console.log(`state`, state);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/50/abott@adorable.png",
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{state.name}</Title>
                <Caption style={styles.caption}>{state.email}</Caption>
              </View>
            </View>
          </View>
        </View>

        <Drawer.Section>
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            )}
            label="Beranda"
            onPress={() => {
              props.navigation.navigate("Home");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="book-outline" color={color} size={size} />
            )}
            label="Daftar Pinjaman"
            onPress={() => {
              props.navigation.navigate("ListBorrow");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Ionicons name="settings-outline" color={color} size={size} />
            )}
            label="Pengaturan Akun"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.buttomDrawerSection}>
        <DrawerItem
          label="Sign Out"
          icon={({ color, size }) => (
            <Ionicons name="exit-outline" color={color} size={size} />
          )}
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  buttomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
});

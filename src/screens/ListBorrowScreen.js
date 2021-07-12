import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Card, Divider } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Context as ReturnContext } from "../context/ReturnContext";
import { Context as AuthContext } from "../context/AuthContext";

import Moment from "moment";
import Spacer from "../components/Spacer";

const ListBorrowScreen = ({ navigation }) => {
  const { state, fetchReturn } = useContext(ReturnContext);
  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    fetchReturn();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchReturn();
    });
    return willFocusSubscription;
  }, []);

  console.log(`state`, state);

  function BorrowScreen() {
    return (
      <View style={styles.table}>
        <FlatList
          data={state.pinjam}
          renderItem={({ item }) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ReturnDetail", { id: item.id })
                  }
                >
                  <View style={styles.content}>
                    <Text>
                      {Moment(item.start_date).format("DD MMM YYYY")} -
                      {Moment(item.end_date).format("DD MMM YYYY")}{" "}
                    </Text>
                    {item.end_date <= Moment().format() ? (
                      <View style={styles.lateText}>
                        <Text
                          style={{
                            color: "red",
                          }}
                        >
                          Terlambat
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <Divider />
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
        />
      </View>
    );
  }
  function ReturnScreen() {
    return (
      <View style={styles.table}>
        <FlatList
          data={state.kembali}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.content}>
                  {Moment(item.start_date).format("DD MMM YYYY")} -
                  {Moment(item.end_date).format("DD MMM YYYY")}
                </Text>
                <Divider />
              </>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
        />
      </View>
    );
  }

  return (
    <>
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          iconStyle: { color: "#fff" },
          onPress: () => navigation.goBack(),
        }}
        centerComponent={{
          text: "Daftar Pinjaman",
          style: { color: "#fff" },
        }}
        containerStyle={{
          backgroundColor: "#39A6A3",
          justifyContent: "center",
        }}
      />
      <Tab.Navigator>
        <Tab.Screen name="Sedang Dipinjam" component={BorrowScreen} />
        <Tab.Screen name="Sudah Dikembalikan" component={ReturnScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  table: {
    paddingHorizontal: 20,
    flex: 1,
  },
  content: {
    margin: 15,
    flexDirection: "row",
    alignItems: "baseline",
  },
  lateText: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
  },
});

export default ListBorrowScreen;

import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  ActivityIndicator,
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
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  // const getData = async () => {
  //   console.log("getData");
  //   const apiURL =
  //     "https://jsonplaceholder.typicode.com/photos?_limit=10&_page=" +
  //     pageCurrent;
  //   fetch(apiURL)
  //     .then((res) => res.json())
  //     .then((resJSON) => {
  //       setData(data.concat(resJSON));
  //       setIsLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   console.log("useEffect");
  //   setIsLoading(true);
  //   fetchReturn(pageCurrent);
  //   setData(data.concat(state));
  //   setIsLoading(false);
  //   return () => {};
  // }, [pageCurrent]);

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    fetchReturn();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchReturn();
    });
    return willFocusSubscription;
  }, []);

  console.log(`page`, state);
  // console.log("dataa", data);

  // const renderItem = ({ item }) => {
  //   return (
  //     <View style={styles.content}>
  //       <Text style={styles.itemText}>
  //         {Moment(item.start_date).format("DD MMM YYYY")}
  //       </Text>
  //     </View>
  //   );
  // };

  const renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  // const handleLoadMore = () => {
  //   console.log(`handleMore`);
  //   setPageCurrent(pageCurrent + 1);
  //   setIsLoading(true);
  // };

  function BorrowScreen() {
    return (
      <View style={styles.table}>
        <FlatList
          data={state.pinjam}
          // renderItem={renderItem}
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
          ListFooterComponent={renderFooter}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={1}
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
    margin: 30,
    flexDirection: "row",
    alignItems: "baseline",
  },
  lateText: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
  },
  itemRow: {
    borderBottomColor: "#ccc",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: "center",
  },
});

export default ListBorrowScreen;

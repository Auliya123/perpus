import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { Header, Card } from "react-native-elements";
import { Context as BookContext } from "../context/BookContext";
import { Context as AuthContext } from "../context/AuthContext";
import Spacer from "../components/Spacer";
import { checkConnected } from "../../netInfo";
import NumberFormat from "react-number-format";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  const { state, fetchBooks } = useContext(BookContext);
  const {
    state: { data },
    getName,
  } = useContext(AuthContext);

  const [connectStatus, setConnectStatus] = useState(false);

  checkConnected().then((res) => {
    setConnectStatus(res);
  });

  useEffect(() => {
    fetchBooks();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchBooks();
    });
    return willFocusSubscription;
  }, []);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      }),
    [navigation]
  );

  useEffect(() => {
    getName(data.usr_id);

    const willFocusSubscription = navigation.addListener("focus", () => {
      getName(data.usr_id);
    });
    return willFocusSubscription;
  }, [data]);

  return (
    <>
      <View>
        <Header
          leftComponent={{
            icon: "menu",
            color: "#fff",
            iconStyle: { color: "#fff" },
            onPress: () => navigation.openDrawer(),
          }}
          centerComponent={{ text: "Bits Library", style: { color: "#fff" } }}
          containerStyle={{
            backgroundColor: "#39A6A3",
            justifyContent: "center",
          }}
        />
        {!connectStatus ? (
          <Text
            style={{ backgroundColor: "#FF616D", color: "white", padding: 10 }}
          >
            Tidak ada koneksi internet
          </Text>
        ) : null}
      </View>
      <Image
        style={styles.Image}
        source={{
          uri:
            "https://images.unsplash.com/photo-1553729784-e91953dec042?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
        }}
      />
      <SafeAreaView style={styles.body}>
        <View>
          {state.data ? (
            <FlatList
              contentContainerStyle={styles.container}
              data={state.data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("HomeDetail", { id: item.id })
                    }
                  >
                    <Card containerStyle={styles.list}>
                      <Card.Divider />
                      <Card.Image style={styles.image}>
                        <Image
                          style={styles.image}
                          source={{
                            uri:
                              "https://images-na.ssl-images-amazon.com/images/I/51vSbWpF+dS._AC_SX184_.jpg",
                          }}
                        />
                      </Card.Image>
                      <Card.Title style={styles.title}>{item.name}</Card.Title>
                      <Card.FeaturedSubtitle style={styles.subtitle}>
                        <Text style={styles.grayText}>{item.author}</Text>
                      </Card.FeaturedSubtitle>
                      <Card.FeaturedSubtitle style={styles.subtitle}>
                        <NumberFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp. "}
                          renderText={(formattedValue) => (
                            <Text style={styles.greenText}>
                              {formattedValue}
                            </Text>
                          )}
                        />
                      </Card.FeaturedSubtitle>
                    </Card>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              horizontal={false}
            />
          ) : (
            <Text>Wait ya</Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    flex: 1,
    height: "100%",
  },
  Image: {
    height: 125,
    margin: 20,
    marginBottom: -30,
  },
  list: {
    width: 98,
    margin: 5,
    textAlign: "center",
    padding: 5,
    flex: 1,
  },
  container: {
    justifyContent: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
  },
  greenText: {
    fontWeight: "bold",
    color: "#39A6A3",
  },
  grayText: {
    color: "gray",
  },
  image: {
    height: 100,
    width: 98,
  },
});

export default HomeScreen;

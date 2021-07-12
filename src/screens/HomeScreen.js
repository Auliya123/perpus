import React, { useContext, useEffect } from "react";
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
import Spacer from "../components/Spacer";

const HomeScreen = ({ navigation }) => {
  const { state, fetchBooks } = useContext(BookContext);

  useEffect(() => {
    fetchBooks();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchBooks();
    });
    return willFocusSubscription;
  }, []);

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
      </View>
      <View style={styles.body}>
        <Image
          style={styles.Image}
          source={{
            uri:
              "https://images.unsplash.com/photo-1553729784-e91953dec042?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
          }}
        />
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
                      <Card.Title style={styles.title}>{item.name}</Card.Title>
                      <Card.FeaturedSubtitle style={styles.subtitle}>
                        <Text style={styles.grayText}>{item.author}</Text>
                        <Spacer />
                        <Spacer />
                        <Text style={styles.greenText}>{item.price}</Text>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    flex: 1,
  },
  Image: {
    height: 125,
  },
  list: {
    width: 98,
    margin: 5,
    textAlign: "center",
    padding: 5,
    height: 150,
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
    position: "absolute",
    marginTop: 100,
  },
  greenText: {
    fontWeight: "bold",
    color: "#39A6A3",
  },
  grayText: {
    color: "gray",
  },
});

export default HomeScreen;

import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Context as BookContext } from "../context/BookContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Context as BorrowContext } from "../context/BorrowContext";
import HeaderCustom from "../components/HeaderCustom";
import NumberFormat from "react-number-format";

const BookDetailScreen = ({ route, navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const { id } = route.params;
  const { state, fetchDetailBook } = useContext(BookContext);
  const contextValue = useContext(BorrowContext);
  const [oldContextValue, saveContextValue] = useState(contextValue);

  useEffect(() => {
    fetchDetailBook(id);
  }, []);

  console.log(`oldContextValue`, oldContextValue);

  function SinopsisScreen() {
    return (
      <View style={{ alignItems: "center", padding: 10 }}>
        <Text>{state.book.data.sinopsis}</Text>
      </View>
    );
  }

  function AboutScreen() {
    return (
      <View style={{ alignItems: "center", padding: 10 }}>
        <Text>ISBN: {state.book.data.isbn}</Text>
        <Text>ISBN13: {state.book.data.isbn_13}</Text>
        <Text>Genre: {state.book.data.genre}</Text>
        <Text>Bahasa: {state.book.data.language}</Text>
        <Text>Tanggal Terbit: {state.book.data.date_pub}</Text>
        <Text>Jumlah Halaman: {state.book.data.pages} halaman</Text>
      </View>
    );
  }

  return (
    <>
      {state.book ? (
        <>
          <HeaderCustom
            callback={() => navigation.goBack()}
            title={state.book.data.name}
          />
          <View style={styles.body}>
            <Text h3 style={styles.text}>
              {state.book.data.name}
            </Text>
            <Text style={styles.text}>{state.book.data.author}</Text>
            <NumberFormat
              value={state.book.data.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp. "}
              renderText={(formattedValue) => (
                <Text style={styles.text}>{formattedValue}</Text>
              )}
            />
          </View>
          <Tab.Navigator>
            <Tab.Screen name="Sinopsis" component={SinopsisScreen} />
            <Tab.Screen name="Tentang Buku" component={AboutScreen} />
          </Tab.Navigator>
          <SafeAreaView style={styles.body}>
            <Button
              color="orange"
              title="Pinjam Buku"
              onPress={() => {
                contextValue.addCart(
                  state.book.data,
                  oldContextValue.state.cartItems,
                  () => navigation.navigate("Checkout")
                );
              }}
            />
          </SafeAreaView>
        </>
      ) : (
        <Text>Wait ya</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
  },
  text: {
    textAlign: "center",
  },
});

export default BookDetailScreen;

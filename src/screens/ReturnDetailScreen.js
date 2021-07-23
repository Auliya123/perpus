import React, { useEffect, useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as ReturnContext } from "../context/ReturnContext";
import { Context as BookContext } from "../context/BookContext";
import { Context as BorrowContext } from "../context/BorrowContext";
import Moment from "moment";
import { Button, Divider } from "react-native-elements";
import HeaderCustom from "../components/HeaderCustom";
import Spacer from "../components/Spacer";
import bookApi from "../api/bookApi";
import NumberFormat from "react-number-format";

const ReturnDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { state, fetchReturnDetail, reset } = useContext(ReturnContext);

  console.log(`state return detail`, state);

  useEffect(() => {
    console.log("useEffe");
    fetchReturnDetail(id);

    return () => {
      reset();
    };
  }, []);

  return (
    <View>
      <HeaderCustom
        callback={() => navigation.goBack()}
        title="Detail Pinjaman"
      />
      {state.data ? (
        <View style={styles.body}>
          <View>
            <View style={styles.tanggal}>
              <Text style={styles.greenText}>
                {Moment(state.data.borrow.start_date).format("DD MMMM YYYY")}
              </Text>
              <Text style={styles.greenText}>
                {Moment(state.data.borrow.end_date).format("DD MMMM YYYY")}
              </Text>
            </View>
            <View style={styles.tanggal}>
              <Text style={styles.detail}>Tanggal Pinjam</Text>
              <Text style={styles.detail}>Tanggal Kembali</Text>
            </View>
            <Spacer />
            <Divider />
            <Spacer />

            <FlatList
              data={state.bookDetail}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <>
                    <View style={styles.detailBook}>
                      <Text>{item.title}</Text>
                      <Text style={styles.detail}>Oleh: {item.author}</Text>
                    </View>
                  </>
                );
              }}
            />

            <Spacer />
            <Divider />
            <Spacer />
            <View style={styles.tanggal}>
              <Text>Biaya yang sudah dibayar</Text>
              <NumberFormat
                value={state.data.borrow.total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp. "}
                renderText={(formattedValue) => (
                  <Text style={styles.greenText}>{formattedValue}</Text>
                )}
              />
            </View>
          </View>
          <View style={styles.buttonElement}>
            <Button
              buttonStyle={styles.button}
              title="Kembalikan Buku"
              onPress={() => navigation.navigate("VerifyReturn", { id: id })}
            />
          </View>
        </View>
      ) : (
        <Text>Sabar</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    flexDirection: "column",
    position: "relative",
    height: "100%",
  },
  tanggal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detail: {
    color: "gray",
  },
  greenText: {
    color: "#39A6A3",
    fontWeight: "bold",
  },
  detailBook: {
    marginLeft: "25%",
  },
  button: {
    backgroundColor: "orange",
    marginTop: "130%",
  },
});

export default ReturnDetailScreen;

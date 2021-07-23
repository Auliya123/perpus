import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Context as BorrowContext } from "../context/BorrowContext";
import HeaderCustom from "../components/HeaderCustom";
import { Text, Button, Divider, CheckBox } from "react-native-elements";
import Spacer from "../components/Spacer";
import Moment from "moment";
import { extendMoment } from "moment-range";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import NumberFormat from "react-number-format";

const moment = extendMoment(Moment);

import { DatePicker } from "react-native-woodpicker";

const CheckoutScreen = ({ navigation }) => {
  // console.log();
  const { state, addCart, checkout, deleteCart } = useContext(BorrowContext);
  const [startDate, setStartDate] = useState(Moment().format());
  const [endDate, setEndDate] = useState(Moment().add(3, "days").toDate());
  const [checked, setChecked] = useState(false);

  const range = moment.range(startDate, endDate);
  const days = range.diff("days"); // 92
  console.log(`days`, days);

  console.log("end", endDate);

  const total = days
    ? state.cartItems.reduce((a, c) => a + c.price * c.qty * days, 0)
    : 0;

  console.log(`total`, total);

  // const handleTextEnd = () =>
  //   endDate ? endDate.toDateString() : "No value Selected";

  return (
    <>
      <HeaderCustom callback={() => navigation.goBack()} title="Pinjam Buku" />
      <View style={styles.body}>
        <Text style={styles.title}>Daftar buku yang akan dipinjam</Text>
        <FlatList
          data={state.cartItems}
          renderItem={({ item }) => {
            console.log(`item`, item);
            console.log(`state.cartItems`, state.cartItems);
            return (
              <View style={styles.detailBook}>
                <Image
                  source={{
                    uri:
                      "https://images-na.ssl-images-amazon.com/images/I/51vSbWpF+dS._AC_SX184_.jpg",
                  }}
                  style={styles.imageBook}
                />
                <View style={styles.detailBookText}>
                  <Text style={styles.bookName}>{item.name}</Text>
                  <Text>Oleh {item.author}</Text>
                  <SafeAreaView style={styles.counter}>
                    <Button
                      title="-"
                      buttonStyle={styles.buttonCounter}
                      type="outline"
                      onPress={() => {
                        deleteCart(item, state.cartItems, "deleteOne", null);
                      }}
                    />
                    <TextInput
                      value={item.qty.toString()}
                      style={styles.inputCounter}
                      keyboardType="numeric"
                    />
                    <Button
                      title="+"
                      buttonStyle={styles.buttonCounter}
                      onPress={() => {
                        addCart(item, state.cartItems, null);
                      }}
                      type="outline"
                    />
                    <Button
                      buttonStyle={styles.buttonTrash}
                      type="outline"
                      icon={<Icon name="trash" size={15} color="gray" />}
                      onPress={() => {
                        deleteCart(item, state.cartItems, "deleteAll", null);
                      }}
                    />
                  </SafeAreaView>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.book_id.toString()}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.addBook}>
            <FontAwesome name="plus" size={15} /> Tambah buku lainnya
          </Text>
        </TouchableOpacity>
        <View style={styles.dateArea}>
          <Text style={styles.subtitle}>Atur Tanggal</Text>
          <View style={styles.dateContainer}>
            <DatePicker
              value={startDate}
              title="Date Picker"
              isNullable
              containerStyle={styles.date}
              onDateChange={(date) => setStartDate(date)}
              text={Moment().format("ddd MMMM D YYYY")}
              disabled
              isNullable={false}
            />
            <Spacer />
            <Button
              title="-"
              type="outline"
              buttonStyle={{
                width: 28,
                height: 20,
              }}
              disabled
            />
            <Spacer />
            <DatePicker
              value={endDate}
              title="Date Picker"
              containerStyle={styles.date}
              onDateChange={(date) => setEndDate(date)}
              text={endDate.toDateString("ddd MMMM D YYYY")}
            />
          </View>
        </View>

        <Text style={styles.subtitle}>Detail Biaya</Text>
        <Spacer />
        <FlatList
          data={state.cartItems}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.detailBayar}>
                  <Text>{item.name}</Text>
                  <NumberFormat
                    value={item.price * item.qty}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                    renderText={(formattedValue) => (
                      <Text style={styles.text}>{formattedValue}</Text>
                    )}
                  />
                </View>
                <Text>{item.qty}pcs</Text>
              </>
            );
          }}
          keyExtractor={(item) => item.book_id.toString()}
        />
        <Divider />

        <View style={styles.detailBayar}>
          <View>
            <Text>Total Bayar</Text>
            <Text>{endDate ? days : 0} Hari</Text>
          </View>
          <View>
            <NumberFormat
              value={endDate ? total : 0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp. "}
              renderText={(formattedValue) => (
                <Text style={styles.text}>{formattedValue}</Text>
              )}
            />
          </View>
        </View>
        <CheckBox
          title="Dengan ini saya menyetujui untuk melakukan pengembalian sesuai tanggal yang telah ditentukan. Apabila melewati tanggal tersebut,saya bersedia membayar denda yang telah ditentukan"
          textStyle={{
            fontSize: 12,
            color: "gray",
            fontWeight: "normal",
          }}
          size={20}
          containerStyle={{ width: "90%", marginTop: 50 }}
          checked={checked}
          onPress={() => setChecked(true)}
          onLongPress={() => setChecked(false)}
        />
        <Spacer />
        <Spacer />

        <Button
          title="Lanjutkan peminjaman"
          disabled={checked === false ? true : false}
          onPress={() => {
            checkout(state.cartItems, startDate, endDate, total, () =>
              navigation.navigate("VerifyBorrow")
            );
          }}
          buttonStyle={{ backgroundColor: "orange" }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: "white",
    flex: 1,
    height: "100%",
  },
  title: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  bookName: {
    fontSize: 15,
    fontWeight: "bold",
  },
  detailBook: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  jumlah: {
    marginTop: 40,
  },
  counter: {
    flexDirection: "row",
  },
  buttonCounter: {
    width: 30,
    height: 20,
  },
  buttonTrash: {
    width: 30,
    height: 20,
    marginLeft: 10,
  },
  inputCounter: {
    textAlign: "center",
    width: 30,
    height: 20,
    backgroundColor: "white",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  date: {
    borderStyle: "solid",
    borderColor: "black",
    height: 50,
    width: 150,
  },
  detailBayar: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  addBook: {
    color: "orange",
    height: 30,
  },
  imageBook: {
    height: 150,
    width: 100,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  detailBookText: {
    flexDirection: "column",
  },
  dateArea: {
    marginVertical: 0,
  },
});

export default CheckoutScreen;

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Context as BorrowContext } from "../context/BorrowContext";
import HeaderCustom from "../components/HeaderCustom";
import { Text, Button, Divider, CheckBox } from "react-native-elements";
import Spacer from "../components/Spacer";
import Moment from "moment";
import { extendMoment } from "moment-range";
import Icon from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";

const moment = extendMoment(Moment);

import { DatePicker } from "react-native-woodpicker";

const CheckoutScreen = ({ navigation }) => {
  // console.log();
  const { state, addCart, checkout, deleteCart } = useContext(BorrowContext);
  const [startDate, setStartDate] = useState(Moment().format());
  const [endDate, setEndDate] = useState();
  const [checked, setChecked] = useState(false);

  const range = moment.range(startDate, endDate);
  const days = range.diff("days"); // 92
  console.log(`days`, days);

  const total = days
    ? state.cartItems.reduce((a, c) => a + c.price * c.qty * days, 0)
    : 0;

  console.log(`total`, state);

  const handleTextEnd = () =>
    endDate ? endDate.toDateString() : "No value Selected";

  return (
    <>
      <HeaderCustom callback={() => navigation.goBack()} title="Pinjam Buku" />
      <View style={styles.body}>
        <Text style={styles.title}>Daftar buku yang akan dipinjam</Text>
        <View style={styles.detailBook}>
          <FlatList
            data={state.cartItems}
            renderItem={({ item }) => {
              console.log(`item`, item);
              console.log(`state.cartItems`, state.cartItems);
              return (
                <SafeAreaView>
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
                </SafeAreaView>
              );
            }}
            keyExtractor={(item) => item.book_id.toString()}
          />
        </View>
        <Spacer />
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
            text={handleTextEnd()}
            minDate={Moment().format()}
            isNullable={false}
          />
        </View>
        <Text style={styles.subtitle}>Detail Biaya</Text>
        <Spacer />
        <View style={styles.detailBayar}>
          <FlatList
            data={state.cartItems}
            renderItem={({ item }) => {
              return (
                <>
                  <View>
                    <Text>{item.name}</Text>
                    <Text>{item.qty}pcs</Text>
                  </View>
                  <Text>{item.price}</Text>
                </>
              );
            }}
            keyExtractor={(item) => item.book_id.toString()}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>Add other book</Text>
        </TouchableOpacity>
        <Divider />
        <View style={styles.detailBayar}>
          <View>
            <Text>Total Bayar</Text>
            <Text>{endDate ? days : 0} Hari</Text>
          </View>
          <Text>{endDate ? total : 0}</Text>
        </View>
        <Spacer />
        <Spacer />
        <CheckBox
          title="Dengan ini saya menyetujui untuk melakukan pengembalian sesuai tanggal yang telah ditentukan. Apabila melewati tanggal tersebut,saya bersedia membayar denda yang telah ditentukan"
          textStyle={{
            fontSize: 12,
            color: "gray",
            fontWeight: "normal",
          }}
          size={20}
          containerStyle={{ width: "90%" }}
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
    marginLeft: "50%",
    flexDirection: "column",
    flex: 1,
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
    flexWrap: "nowrap",
    justifyContent: "space-between",
    maxWidth: "95%",
    flex: 1,
  },
});

export default CheckoutScreen;
import React from "react";
import { Header, Text, Button } from "react-native-elements";

export default function HeaderCustom({ callback, title }) {
  return (
    <>
      <Header
        leftComponent={{
          icon: "arrow-back",
          color: "#fff",
          iconStyle: { color: "#fff" },
          onPress: callback,
        }}
        centerComponent={{ text: title, style: { color: "#fff" } }}
        containerStyle={{
          backgroundColor: "#39A6A3",
          justifyContent: "center",
        }}
      />
    </>
  );
}

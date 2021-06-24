import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ children }) => {
  return <View style={StyleSheet.spacer}>{children}</View>;
};

const styles = StyleSheet.create({
  spacer: {
    margin: 5,
  },
});

export default Spacer;

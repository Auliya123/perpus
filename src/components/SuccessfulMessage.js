import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const SuccessfulMessage = ({ message, onSubmit, buttonTitle }) => {
  return (
    <SafeAreaView style={styles.body}>
      <Icon
        name="check-circle"
        size={120}
        color="white"
        style={{ textAlign: "center" }}
      />
      <Text h3 style={{ textAlign: "center", color: "white" }}>
        Yeay !
      </Text>
      <Text
        style={{
          fontSize: 17,
          textAlign: "center",
          color: "white",
        }}
      >
        {message}
      </Text>
      <Button
        title={buttonTitle}
        buttonStyle={styles.button}
        onPress={onSubmit}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#39A6A3",
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "orange",
    marginTop: 50,
  },
});

export default SuccessfulMessage;

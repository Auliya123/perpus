import React, { useContext } from "react";
import { View, Text } from "react-native";
import VerifyInput from "../components/VerifyInput";
import { Context as ProfileContext } from "../context/ProfileContext";

const VerifyProfileScreen = ({ route, navigation }) => {
  const { data, userId } = route.params;
  const { updateProfile } = useContext(ProfileContext);
  console.log(`data`, data);
  console.log(`userId`, userId);
  return (
    <>
      <VerifyInput
        data={{ userId: userId, data: data }}
        buttonTitle="Proses Perubahan"
        onSubmit={updateProfile}
        callback={() => navigation.navigate("SuccessfulReturn")}
      />
    </>
  );
};

export default VerifyProfileScreen;

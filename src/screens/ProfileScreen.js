import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCustom from "../components/HeaderCustom";
import { Input, Button, Text } from "react-native-elements";
import { useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import bookApi from "../api/bookApi";
import Spacer from "../components/Spacer";

const ProfileScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    alamat: "",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  console.log(`state`, state);

  useEffect(() => {
    async function fetchDetail() {
      const response = await bookApi.get(`/usr/view/${state.userId}`);
      const responseData = response.data.data;
      setData({
        name: responseData.name,
        mobile: responseData.mobile,
        email: responseData.email,
        address: responseData.address,
        password: null,
      });
    }
    fetchDetail();

    return () => {
      console.log("This will be logged on unmount");
    };
  }, []);

  console.log(`data`, data);

  const onSubmit = () => {
    if (password) {
      if (password === data.password) {
        navigation.navigate("VerifyProfile", {
          data,
          userId: state.userId,
        });
        setMessage("");
      } else {
        setMessage("Password tidak cocok");
      }
    } else {
      navigation.navigate("VerifyProfile", {
        data,
        userId: state.userId,
      });
      setMessage("");
    }
  };

  return (
    <>
      <HeaderCustom
        callback={() => navigation.navigate("Home")}
        title="Pengaturan"
      />
      <ScrollView style={styles.body}>
        {data ? (
          <>
            <View style={styles.profileInformation}>
              <Text style={styles.title}>Informasi Pribadi</Text>
              <Spacer />
              <View style={styles.inpuRow}>
                <Text style={styles.label}>Nama</Text>
                <Input
                  inputContainerStyle={styles.input}
                  value={data.name}
                  onChangeText={(newName) =>
                    setData({ ...data, name: newName })
                  }
                />
              </View>
              <View style={styles.inpuRow}>
                <Text style={styles.label}>No HP</Text>
                <Input
                  inputContainerStyle={styles.input}
                  value={data.mobile}
                  onChangeText={(newMobile) =>
                    setData({ ...data, mobile: newMobile })
                  }
                />
              </View>
              <View style={styles.inpuRow}>
                <Text style={styles.label}>Email</Text>
                <Input
                  inputContainerStyle={styles.input}
                  value={data.email}
                  onChangeText={(newEmail) =>
                    setData({ ...data, email: newEmail })
                  }
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inpuRow}>
                <Text style={styles.label}>Email</Text>
                <Input
                  inputContainerStyle={styles.input}
                  numberOfLines={2}
                  multiline={true}
                  value={data.address}
                  onChangeText={(newAddress) =>
                    setData({ ...data, address: newAddress })
                  }
                />
              </View>
            </View>
            <View style={styles.passwordArea} behavior="height">
              <Text style={styles.title}>Ubah Kata Sandi</Text>
              <Spacer />
              <Input
                label="Kata sandi baru"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Input
                label="Ulangi kata sandi baru"
                value={data.password}
                onChangeText={(value) => {
                  setData({ ...data, password: value });
                }}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              {message ? <Text>{message}</Text> : null}
            </View>
            <Spacer />
            <Button
              title="Simpan Perubahan"
              onPress={onSubmit}
              buttonStyle={styles.button}
            />
          </>
        ) : (
          <Text>Loading wait yaa</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  inpuRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  label: {
    color: "gray",
    fontSize: 17,
    width: "25%",
  },
  input: {
    fontSize: 18,
    width: "75%",
  },
  profileInformation: {
    flex: 0.5,
  },
  passwordArea: {
    flex: 0.5,
  },
  button: {
    backgroundColor: "orange",
    alignSelf: "flex-end",
    width: "100%",
  },
});

export default ProfileScreen;

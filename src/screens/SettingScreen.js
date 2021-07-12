import React, { useContext, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderCustom from "../components/HeaderCustom";
import { Input, Button, Text } from "react-native-elements";
import { useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import bookApi from "../api/bookApi";

const SettingScreen = ({ navigation }) => {
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
      } else {
        setMessage("Password tidak cocok");
      }
    } else {
      navigation.navigate("VerifyProfile", {
        data,
        userId: state.userId,
      });
    }
  };

  return (
    <View>
      <HeaderCustom
        callback={() => navigation.navigate("Home")}
        title="Pengaturan"
      />
      <View>
        <Text h4>Informasi Pribadi</Text>
        {data ? (
          <>
            <View>
              <Input
                label="Nama"
                value={data.name}
                onChangeText={(newName) => setData({ ...data, name: newName })}
              />
              <Input
                label="No HP"
                value={data.mobile}
                onChangeText={(newMobile) =>
                  setData({ ...data, mobile: newMobile })
                }
              />
              <Input
                label="Email"
                value={data.email}
                onChangeText={(newEmail) =>
                  setData({ ...data, email: newEmail })
                }
              />
              <Input
                label="Alamat"
                value={data.address}
                onChangeText={(newAddress) =>
                  setData({ ...data, address: newAddress })
                }
              />
            </View>
            <View>
              <Text h4>Ubah Kata Sandi</Text>
              <Input
                label="Kata sandi baru"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                }}
              />
              <Input
                label="Ulangi kata sandi baru"
                value={data.password}
                onChangeText={(value) => {
                  setData({ ...data, password: value });
                }}
              />
            </View>
            {message ? <Text>{message}</Text> : null}
            <Button title="Simpan Perubahan" onPress={onSubmit} />
          </>
        ) : (
          <Text>Loading wait yaa</Text>
        )}
      </View>
    </View>
  );
};

export default SettingScreen;

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import axios from "axios";
import { useUser } from "../context/Context";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const { updateUser } = useUser();
  const handleLogin = async () => {
    // Check if any field is empty
    if (!email || !password) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }
    try {
      const response = await axios.post("http://192.168.1.41:4000/api/login", {
        email: email,
        password: password,
      });
      console.log("TRying....");
      if (!response.data.userFound) {
        Alert.alert(
          "Alert",
          "Invalid Email or password..",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
        throw new Error("Error logging in");
      } else {
        updateUser({
          name: response.data.name,
          id: response.data.id,
          email: response.data.email,
          password: response.data.password,
          gender: response.data.gender,
          birthday: response.data.birthday,
        });
        console.log("FOUND USER LOGGING IN ...");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("An error occurred while logging in.");
    }
  };

  return (
    <View style={styles.container}>
      {/*title and form*/}
      <View className="h-full w-full absolute">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(100).springify()}
            style={styles.title}
          >
            Log In
          </Animated.Text>
        </View>
      </View>

      {/*forms*/}
      <View className="flex items-center">
        <Animated.View
          entering={FadeInDown.duration(100).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full"
        >
          <TextInput
            placeholder="Enter Your Email : "
            placeholderTextColor={"grey"}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="bg-black/5 p-5 rounded-2xl w-full"
        >
          <TextInput
            placeholder="Enter Your Password : "
            placeholderTextColor={"grey"}
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="w-full"
        >
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.titlebtn}>Log In</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            top: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "tomato" }}>
            Don't Have An Account ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ fontWeight: "bold", color: "green" }}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "midnightblue",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    bottom: 160,
    color: "white",
  },
  input: {
    width: 300,
    height: 35,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 20,
    bottom: 50,
  },
  button: {
    backgroundColor: "green",
    width: 300,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
  titlebtn: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});

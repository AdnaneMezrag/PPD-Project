import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import axios from "axios";
export default function Signup() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAdded, setUserAdded] = useState(false);

  const handleSignUp = async () => {
    // Check if any field is empty
    if (!username || !email || !password) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }

    try {
      const bd = new Date("1/1/2000");

      const response = await axios.post("http://192.168.135.60:4000/api/signup", {
        // ip config
        email: email,
        password: password,
        username: username,
        Dateofbirth: bd,
        age: 20,
        gender: "male",
      });
      setUserAdded(response.data.userAdded);

      if (response.data.userAdded) {
        Alert.alert(
          "Alert",
          "User Added successfully",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          "Alert",
          "A user with the email: '" + email + "' already exists",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("Error:", error.message); // Log the error message
    }

    // Here you can implement your sign up logic using the username, email, and password states
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      {/*title and form*/}
      <View className="h-full w-full absolute">
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            style={styles.title}
          >
            Sign Up
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
            placeholder="Enter Your UserName : "
            placeholderTextColor={"grey"}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(200).springify()}
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
          entering={FadeInDown.delay(300).springify()}
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
          entering={FadeInDown.delay(400).springify()}
          className="w-full"
        >
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.titlebtn}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(500).springify()}
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            top: 20,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "tomato" }}>
            Already Have An Account ?
          </Text>
          <TouchableOpacity
            onPress={() => {navigation.navigate("Login")}}
          >
            <Text style={{ fontWeight: "bold", color: "green" }}>Log In</Text>
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
    bottom: 140,
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

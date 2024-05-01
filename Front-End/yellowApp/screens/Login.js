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
  const [emailFocused, setEmailFocused] = useState(false); // Track email input focus
  const [passwordFocused, setPasswordFocused] = useState(false); // Track password input focus

  const handleLogin = async () => {
    // Check if any field is empty
    if (!email || !password) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }
    try {
      const response = await axios.post("https://blooming-beyond-66841.herokuapp.com/api/login", {
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
    // Here you can implement your login logic using the email and password states
    console.log("Email:", email);
    console.log("Password:", password);
    // Example: Authenticate user with email and password
    // authService.login(email, password)
    //   .then(response => {
    //     // Handle successful login
    //   })
    //   .catch(error => {
    //     // Handle login error
    //   });
  };

  return (
    <View style={styles.container}>
      {/*title and form*/}
      <View style={styles.formContainer}>
        <Animated.Text
          entering={FadeInUp.duration(100).springify()}
          style={styles.title}
        >
          Log In
        </Animated.Text>

        {/* Forms */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email : "
            placeholderTextColor={"grey"}
            style={[styles.input, emailFocused && styles.inputFocused]} // Apply focused style if email input is focused
            value={email}
            onChangeText={setEmail}
            onFocus={() => setEmailFocused(true)} // Set email focus to true on focus
            onBlur={() => setEmailFocused(false)} // Set email focus to false on blur
          />
          <TextInput
            placeholder="Password : "
            placeholderTextColor={"grey"}
            style={[styles.input, passwordFocused && styles.inputFocused]} // Apply focused style if password input is focused
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setPasswordFocused(true)} // Set password focus to true on focus
            onBlur={() => setPasswordFocused(false)} // Set password focus to false on blur
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.titlebtn}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't Have An Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Signup");
            }}
          >
            <Text style={[styles.footerText, styles.footerLink]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#8fcbbc",
  },
  formContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    bottom: 160,
    color: "white",
  },
  inputContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 35,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 20,
  },
  inputFocused: {
    borderWidth: 2, // Add border width when input is focused
    borderColor: "green", // Change border color when input is focused
  },
  button: {
    backgroundColor: "green",
    width: 300,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  titlebtn: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    fontWeight: "bold",
    color: "tomato",
  },
  footerLink: {
    marginLeft: 5,
    color: "green",
  },
});

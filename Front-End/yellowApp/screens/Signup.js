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
import { Picker } from "@react-native-picker/picker"; // Import Picker from '@react-native-picker/picker'
import DatePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useUser } from "../context/Context";

export default function Signup() {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("male"); // Default to male
  const [dob, setDob] = useState(new Date("1990-01-01"));
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [firstNameFocused, setFirstNameFocused] = useState(false); // Track email input focus
  const [lastNameFocused, setLastNameFocused] = useState(false); // Track email input focus
  const [dobFocused, setDobFocused] = useState(false); // Track email input focus
  const [idFocused, setIdFocused] = useState(false); // Track email input focus
  const [emailFocused, setEmailFocused] = useState(false); // Track email input focus
  const [passwordFocused, setPasswordFocused] = useState(false); // Track password input focus

  const handleDateChange = (event, dob) => {
    if (!dob) {
      Alert.alert("Warning", "Enter a data value");
      return;
    }

    const chosenDate = dob || date;
    setShowDatePicker(false);
    setDob(chosenDate);
  };

  const handleSignUp = async () => {
    // Check if any field is empty
    if (!firstName || !lastName || !dob || !email || !password) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }

    try {
      //    const bd = new Date("1/1/2000");

      const username = firstName + "" + lastName;

      const response = await axios.post(
        "https://ppd-project.onrender.com/api/signup",
        {
          // ip config
          email: email,
          password: password,
          username: username,
          Dateofbirth: dob,
          age: 20,
          gender: sex,
        }
      );
//      setUserAdded(response.data.userAdded);

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

    // Here you can implement your sign up logic using the states
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Sex:", sex);
    console.log("ID:", id);
    console.log("Email:", email);
    console.log("Password:", password);
      console.log("Date of birth:", dob.toDateString());
    // Example: Register new user
    // authService.register(firstName, lastName, sex, age, id, email, password)
    //   .then(response => {
    //     // Handle successful registration
    //   })
    //   .catch(error => {
    //     // Handle registration error
    //   });
  };

  return (
    <View style={styles.container}>
      {/*title and form*/}
      <View style={styles.formContainer}>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={styles.title}
        >
          Sign Up
        </Animated.Text>

        {/* Forms */}
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={sex}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setSex(itemValue)}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
          <TextInput
            placeholder="First Name"
            placeholderTextColor={"grey"}
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            onFocus={() => setFirstNameFocused(false)} // Set email focus to true on focus
            onBlur={() => setFirstNameFocused(false)} // Set email focus to false on blur
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={"grey"}
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            onFocus={() => setLastNameFocused(false)} // Set email focus to true on focus
            onBlur={() => setLastNameFocused(false)} // Set email focus to false on blur
          />
          {/* <DatePicker
            style={styles.input}
            value={dob}
            mode="date"
            placeholder="Select Date of Birth"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDob(date);
            }}
          /> */}

          <TextInput
            placeholder="Email"
            placeholderTextColor={"grey"}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)} // Set email focus to true on focus
            onBlur={() => setEmailFocused(false)} // Set email focus to false on blur
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"grey"}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setPasswordFocused(true)} // Set password focus to true on focus
            onBlur={() => setPasswordFocused(false)} // Set password focus to false on blur
          />

          <View style={styles.dateContainer}>
            <Text style={{ color: "gray" }}>Select Search Date: {""}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={{ color: "mediumseagreen" }}>
                {dob.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dob}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.titlebtn}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already Have An Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Login");
            }}
          >
            <Text style={[styles.footerText, styles.footerLink]}>Log In</Text>
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
    backgroundColor: "#8fcbbc",
  },
  formContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
});

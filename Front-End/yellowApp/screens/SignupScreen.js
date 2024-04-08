import React from "react";
import { Text, TextInput, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const Signup = () => {
  // just for styling purpose
  const [isFocused, setIsFocused] = useState(null);
  //for recieving userInput
  const [usrInput, chUser] = useState("");
  const [emailInput, chEmail] = useState("");
  const [passwordInput, chPassword] = useState("");

  return (
    <SafeAreaView>
      <View>
        <Image
          source={require("../assets/healthCheck.png")}
          style={{
            height: 120,
            width: 110,
            position: "absolute",
            top: "0%",
            left: "35%",

            borderRadius: 30,
          }}
        />
      </View>

      <View
        style={{
          gap: 15,
          position: "relative",
          top: "70%",
          height: 300,
          left: "0%",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "dodgerblue",
          borderWidth: 1,
          paddingBottom: 10,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 33,
            color: "dodgerblue",
          }}
        >
          {" "}
          Welcome{" "}
        </Text>
        <TextInput
          style={{
            height: 40,
            width: 280,
            textAlign: "center",
            borderColor: isFocused == "username" ? "red" : "dodgerblue",
            borderWidth: 1,
            color: isFocused == "username" ? "red" : "dodgerblue",
            padding: 1,
            textAlignVertical: "center",
          }}
          value={usrInput}
          onChangeText={chUser}
          placeholder="UserName"
          onFocus={() => setIsFocused("username")}
          onBlur={() => setIsFocused(null)}
        />
        <TextInput
          style={{
            height: 40,
            width: 280,
            textAlign: "center",
            borderColor: isFocused == "email" ? "red" : "dodgerblue",
            borderWidth: 1,
            color: isFocused == "email" ? "red" : "dodgerblue",
            padding: 1,
            textAlignVertical: "center",
          }}
          value={emailInput}
          onChangeText={chEmail}
          placeholder="E-mail"
          onFocus={() => setIsFocused("email")}
          onBlur={() => setIsFocused(null)}
        />
        <TextInput
          style={{
            height: 40,
            width: 280,
            textAlign: "center",
            borderColor: isFocused == "password" ? "red" : "dodgerblue",
            borderWidth: 1,
            color: isFocused == "password" ? "red" : "dodgerblue",
            padding: 1,
            textAlignVertical: "center",
          }}
          value={passwordInput}
          onChangeText={chPassword}
          placeholder="Password"
          secureTextEntry={true}
          onFocus={() => setIsFocused("password")}
          onBlur={() => setIsFocused(null)}
        />

        <Button
          title="Confirm"
          onPress={() => {
            //FETCHING AND SIGNING UP LOGIC HERE TODO....
            console.log(usrInput, emailInput, passwordInput);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signup;

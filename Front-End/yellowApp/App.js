import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import Login from "./screens/Login";
import { UserProvider } from "./context/Context";
const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
        <Tabs />
      </UserProvider>
    </NavigationContainer>
  );
};
export default App;

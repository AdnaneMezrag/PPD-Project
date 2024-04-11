import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import Login from "./screens/Login";
const App = () => {
  return (
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  );
};
export default App;

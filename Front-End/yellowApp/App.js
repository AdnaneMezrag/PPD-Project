import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import Signup from "./screens/Signup";
const App = () => {
  return (
    <NavigationContainer>
      <Signup />
    </NavigationContainer>
  );
};
export default App;

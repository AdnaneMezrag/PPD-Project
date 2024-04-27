import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import Login from "./screens/Login";
import { UserProvider } from "./context/Context";
import { createStackNavigator } from '@react-navigation/stack';
import Signup from "./screens/Signup";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <UserProvider>
      <Stack.Navigator>
          
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={Tabs} />
          
        </Stack.Navigator>
        
      </UserProvider>
      
    </NavigationContainer>
  );
};
export default App;

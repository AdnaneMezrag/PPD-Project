import * as React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//this button lets you navigate from one screen to another
// you give it navigation (tabs.js) folder and scans available screen names and goes to right one, screen names are
// the same as title of Tab.Screen in tabs.js

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}
export default GoToButton;
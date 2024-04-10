import * as React from 'react';
import { Button,Image,TouchableOpacity,Text,StyleSheet,Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';


//this button lets you navigate from one screen to another
// you give it navigation (tabs.js) folder and scans available screen names and goes to right one, screen names are
// the same as title of Tab.Screen in tabs.js

const windowWidth = Dimensions.get('window').width;

function GoToButton({ screenName,source }) {
  const navigation = useNavigation();
  
  return (
   <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={[styles.buttonContainer, styles.shadow]}>
   <Image source={source} style = {styles.image}></Image>
    <Text style = {styles.buttonText}>Go to {screenName}</Text>
    
    
   </TouchableOpacity>
  );
}
export default GoToButton;

const buttonWidth = windowWidth * 0.7;
const buttonHeight = buttonWidth * 0.4;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#4cb8c4',
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  image: {
    width: buttonHeight * 0.5,
    height: buttonHeight * 0.5,
    borderRadius: 20,
    marginBottom: 10,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

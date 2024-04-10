import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity,ScrollView} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MeScreen = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(false);
      
    const toggleDarkMode = () => {
     setDarkModeEnabled(!darkModeEnabled);
    };
      
    const toggleEmailNotifications = () => {
     setEmailNotificationsEnabled(!emailNotificationsEnabled);
    };
      
   const navigateToLanguagePage = () => {
   console.log('Navigating to language selection page');
   };

   const [selectedLanguage, setSelectedLanguage] = useState('English');

   const languages = ['English', 'Arabic', 'French'];

   const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const [name,setName] = useState("name");
  const [lastname,setLastame] = useState("lastname");
  const [age,setAge] = useState("age");
  const [id,setId] = useState("id");
  const [email,setEmail] = useState("email");


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Information</Text>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{lastname}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{age}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
      

      <View style={styles.container}>
        <Text style = {{fontSize: 25,fontWeight: 'bold',marginBottom: 10,color :'green',top : 70,justifyContent : 'center',alignSelf : 'center'}}>Preferences</Text>
      <TouchableOpacity style={styles.option} onPress={navigateToLanguagePage}>
        <Text style={styles.optionText}>Choose Language</Text>
        <Picker
        selectedValue={selectedLanguage}
        onValueChange={handleLanguageChange}
        style={styles.picker}
      >
        {languages.map((language, index) => (
          <Picker.Item key={index} label={language} value={language} />
        ))}
      </Picker>
      </TouchableOpacity>

      <View style={styles.option}>
        <Text style={styles.optionText}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={toggleDarkMode}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Email Notifications</Text>
        <Switch
          value={emailNotificationsEnabled}
          onValueChange={toggleEmailNotifications}
        />
      </View>
    </View>
    {/* Add padding to the bottom of the form container */}
    <View style={{ paddingBottom: 300 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'midnightblue',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color :'green',
    justifyContent : 'center',
    alignSelf : 'center',
    top : 30
  },
  userInfoContainer: {
    marginBottom: 20,
    top : 35
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color : 'white'
  },
  value: {
    fontSize: 18,
    color : 'grey'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor : 'grey',
    borderRadius : 15,
    width : 300,
    height : 35,
    top : 110
  },
  optionText: {
    fontSize: 18,
    color : 'white',
    fontWeight : 'bold',
    borderRadius : 10,
    
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default MeScreen;
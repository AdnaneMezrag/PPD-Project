import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useUser } from "../context/Context";
const MeScreen = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(false);
  const [editMode, setEditMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  const toggleEmailNotifications = () => {
    setEmailNotificationsEnabled(!emailNotificationsEnabled);
  };

  const navigateToLanguagePage = () => {
    console.log("Navigating to language selection page");
  };

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const languages = ["English", "Arabic", "French"];

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };
  const { user, updateUser } = useUser(); // exported user data and are ready to be used
  const [name, setName] = useState("John");
  const [lastname, setLastame] = useState("Doe");
  const [age, setAge] = useState("30");
  const [id, setId] = useState("123456");
  const [email, setEmail] = useState("john.doe@example.com");

  const handleEdit = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    setName(user.name);
    setLastame("NONE");
    //setBd(user.birthday);
    setId(user.id);
    setEmail(user.email);
  }, [user]); // rerender whenever the value of the user changes ...

  const handleSave = async () => {
    // Save changes here, for example, update the state variables
    setEditMode(false);

    try {
      const response = axios.put("https://ppd-project.onrender.com/api/signup/edit", {
        name: name,
        age: age,
        id: id,
        email: email,
      });

      updateUser({
        name: name,
        id: id,
        email: email,
        password: user.password,
        gender: user.gender,
        birthday: user.birthday,
      });

      console.log(name + " & " + age);
    } catch (error) {}
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Information</Text>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Name:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          ) : (
            <Text style={styles.value}>{name}</Text>
          )}
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Last Name:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={lastname}
              onChangeText={setLastame}
            />
          ) : (
            <Text style={styles.value}>{lastname}</Text>
          )}
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Age:</Text>
          {editMode ? (
            <TextInput style={styles.input} value={age} onChangeText={setAge} />
          ) : (
            <Text style={styles.value}>{age}</Text>
          )}
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>ID:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={id}
              // onChangeText={setId}
            />
          ) : (
            <Text style={styles.value}>{id}</Text>
          )}
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.label}>Email:</Text>
          {editMode ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          ) : (
            <Text style={styles.value}>{email}</Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={editMode ? handleSave : handleEdit}
      >
        <Text style={styles.editButtonText}>{editMode ? "Save" : "Edit"}</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 10,
            color: "green",
            top: 70,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          Preferences
        </Text>
        <TouchableOpacity
          style={styles.option}
          onPress={navigateToLanguagePage}
        >
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
          <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
        </View>

        <View style={styles.option}>
          <Text style={styles.optionText}>Email Notifications</Text>
          <Switch
            value={emailNotificationsEnabled}
            onValueChange={toggleEmailNotifications}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#8fcbbc",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
    justifyContent: "center",
    alignSelf: "center",
    top: 30,
  },
  userInfoContainer: {
    marginBottom: 20,
    top: 40,
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    color: "white",
  },
  value: {
    fontSize: 18,
    color: "grey",
  },
  input: {
    fontSize: 18,
    color: "grey",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editButton: {
    backgroundColor: "orange",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginVertical: 20,
    top: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "grey",
    borderRadius: 15,
    width: 300,
    height: 35,
    top: 100,
  },
  optionText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    borderRadius: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
});

export default MeScreen;

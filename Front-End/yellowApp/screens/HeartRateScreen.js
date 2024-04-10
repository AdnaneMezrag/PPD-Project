import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

const HeartRateScreen = () => {
  const [heartRate, setHeartRate] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");






  const handleSubmissionInBackEnd = async () => {
    // Check if any field is empty
    if (!heartRate || !sex || !age) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }



//=======================================Back-End=============================================
    try {
      
      const response = await fetch('http://192.168.135.60:4000/api/HeartRate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ heartRate}), // Include heart rate, sex, and age
      });

      if (!response.ok) {
        throw new Error('Failed to submit heart rate data');
      }

      const responseData = await response.json();
      Alert.alert("Heart Rate Result", responseData.message); // Display server response message
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert("Error", "Failed to submit heart rate data. Please try again.");
    }
  };
//=================================================================================================




  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/heartRate2.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Enter Heart Rate</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Heart Rate:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter heart rate"
          onChangeText={(text) => setHeartRate(text)}
          value={heartRate}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Sex:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              sex === "Male" ? styles.radioButtonSelected : null,
            ]}
            onPress={() => setSex("Male")}
          >
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              sex === "Female" ? styles.radioButtonSelected : null,
            ]}
            onPress={() => setSex("Female")}
          >
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          onChangeText={(text) => setAge(text)}
          value={age}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmissionInBackEnd}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* Add padding to the bottom of the form container */}
      <View style={{ paddingBottom: 300 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: "48%",
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#007bff",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
});

export default HeartRateScreen;

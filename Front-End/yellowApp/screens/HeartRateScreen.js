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

  const handleSubmission = () => {
    // Check if any field is empty
    if (!heartRate || !sex || !age) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }

    // Convert age to number
    const userAge = parseInt(age);

    // Perform heart rate comparison logic here
    // For demonstration purposes, I'm assuming normal heart rate ranges
    const normalHeartRateRange = {
      male: { min: 60, max: 100 },
      female: { min: 65, max: 105 },
    };

    let message;
    if (
      sex === "Male" &&
      (heartRate < normalHeartRateRange.male.min ||
        heartRate > normalHeartRateRange.male.max)
    ) {
      message =
        "Your heart rate is abnormal for your age and sex. Please consult a doctor as soon as possible.";
    } else if (
      sex === "Female" &&
      (heartRate < normalHeartRateRange.female.min ||
        heartRate > normalHeartRateRange.female.max)
    ) {
      message =
        "Your heart rate is abnormal for your age and sex. Please consult a doctor as soon as possible.";
    } else {
      message = "Your heart rate is normal and healthy.";
    }

    // Display result notification
    Alert.alert("Heart Rate Result", message);
  };

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

        <TouchableOpacity style={styles.button} onPress={handleSubmission}>
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

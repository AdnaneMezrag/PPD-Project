import React, { useState ,useEffect } from "react";
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
import { LineChart } from "react-native-chart-kit";
import GoBackArrow from "../components/GoBackArrow";
import axios from "axios";

const HeartRateScreen = () => {
  const [heartRate, setHeartRate] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [heartRateHistory, setHeartRateHistory] = useState([
    { time: "04-06", heartRate: 0 },
    { time: "04-09 ", heartRate: 0 },
    { time: "04-10 ", heartRate: 0 },
    { time: "04-12 ", heartRate: 0 },
    // Add more sample data as needed
  ]);

  useEffect(() => {
    
   const render = Rerender();

  }, [heartRateHistory]);

  const Rerender = async ()=>{

    try {
       const response = await axios.get("https://ppd-project.onrender.com/api/stat/HeartRate"
      );

      setHeartRateHistory(response.data);

    } catch (error) {
      console.log(error);
    }



  }

  const handleSubmissionInBackEnd = async () => {
    // Check if any field is empty
    if (!heartRate) {
      Alert.alert("Error", "Please enter all data.");
      return;
    }

    //=======================================Back-End=============================================
    //https://ppd-project.onrender.com/api/HeartRate
    try {
      const response = await fetch("https://ppd-project.onrender.com/api/HeartRate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ heartRate }), // Include heart rate, sex, and age
      });

      if (!response.ok) {
        throw new Error("Failed to submit heart rate data");
      }

      const responseData = await response.json();
      Alert.alert("Heart Rate Result", responseData.message); // Display server response message
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert(
        "Error",
        "Failed to submit heart rate data. Please try again."
      );
    }

    if (!heartRate) {
      Alert.alert("Error", "Please enter heart rate value.");
      return;
    }

    //this part adds new enteries to chart===============

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed) and pad with leading zero if needed
    const day = String(now.getDate()).padStart(2, "0"); // Get day of the month and pad with leading zero if needed
    const time = `${month}-${day}`; // Format as "MM-DD"

    const newEntry = { time, heartRate: parseInt(heartRate) };
    setHeartRateHistory([...heartRateHistory, newEntry]);
    setHeartRate(""); // Clear input field after submission
  };
  //=================================================================================================

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <GoBackArrow
        screenName="HomeTab"
        source={require("../assets/backArrow.png")}
      />

      <Image
        source={require("../assets/heartRate2.png")}
        style={styles.image}
      />

      <Text style={styles.title}>Heart Rate Tracker</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Heart Rate:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter heart rate"
          onChangeText={(text) => setHeartRate(text)}
          value={heartRate}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmissionInBackEnd}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {/* chart section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>Heart Rate History (last 4 entries)</Text>
        <LineChart
          data={{
            labels: heartRateHistory.slice(-4).map((entry) => entry.time),
            datasets: [
              {
                data: heartRateHistory
                  .slice(-4)
                  .map((entry) => entry.heartRate),
              },
            ],
          }}
          width={300}
          height={200}
          yAxisSuffix="bpm"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
            xLabelsOffset: -10, // Adjust the offset of X-axis labels
            xLabelRotation: -60, // Rotate X-axis labels by -60 degrees
            labelFontSize: 12, // Adjust the font size of X-axis labels
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      {/* end of chart section */}

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

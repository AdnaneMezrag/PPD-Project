import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import GoBackArrow from '../components/GoBackArrow';
const BloodSugarScreen = () => {
  const [bloodSugarLevel, setBloodSugarLevel] = useState('');
  //const [sex, setSex] = useState('');
  //const [age, setAge] = useState('');
  const [unit, setUnit] = useState('mg/dL');
  const [status, setStatus] = useState('');
  const [bloodSugarHistory, setBloodSugarHistory] = useState([
    { time: '04-06', bloodSugarLevel: 90 },
    { time: '04-09', bloodSugarLevel: 95 },
    { time: '04-10', bloodSugarLevel: 92 },
    { time: '04-12', bloodSugarLevel: 88 },
    // Add more sample data as needed
  ]);

  const handleSubmissionInBackEnd = async () => {
    // Check if any field is empty
    if (!bloodSugarLevel || !status) {
      Alert.alert('Error', 'Please enter all data.');
      return;
    }

    //======================================Back-End=================================================
    
    //https://ppd-project.onrender.com/api/HeartRate
    try {
      const response = await fetch("https://ppd-project.onrender.com/api/BloodSugar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bloodSugarLevel, status}), // Include heart rate, sex, and age
      });

      if (!response.ok) {
        throw new Error("Failed to submit blood sugar data");
      }

      const responseData = await response.json();
      Alert.alert("Blood Sugar Result", responseData.message); // Display server response message
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert(
        "Error",
        "Failed to submit blood sugar data. Please try again."
      );
    }

    if (!bloodSugarLevel) {
      Alert.alert("Error", "Please enter blood sugar value.");
      return;
    }

    //==========================================Back-End===================================================

    // Convert age to number
    // const userAge = parseInt(age);/////

    // Perform blood sugar level comparison logic here
    // For demonstration purposes, I'm assuming normal blood sugar level ranges


    
    // const normalBloodSugarRange = { 'mg/dL': { min: 70, max: 140 }};

    // let message;
    // const bloodSugarLevelInMgDl =  parseFloat(bloodSugarLevel);
    
    // if (bloodSugarLevelInMgDl < normalBloodSugarRange[unit].min || bloodSugarLevelInMgDl > normalBloodSugarRange[unit].max) {
    //   message = 'Your blood sugar level is abnormal. Please consult a doctor as soon as possible.';
    // } else {
    //   message = 'Your blood sugar level is normal.';
    // }



    //adds new chart enteries
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const time = `${month}-${day}`;

    const newEntry = { time, bloodSugarLevel: parseInt(bloodSugarLevel) };
    setBloodSugarHistory([...bloodSugarHistory, newEntry]);
    setBloodSugarLevel(''); // Clear input field after submission

    // Display result notification
    //Alert.alert('Blood Sugar Result', message);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
    <GoBackArrow screenName="HomeTab" source={require('../assets/backArrow.png')} />
      <Image source={require('../assets/bloodSugar.png')} style={styles.image} />

      <Text style={styles.title}>Blood Sugar Level Tracker</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Blood Sugar Level in mg/dL:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter blood sugar level"
          onChangeText={(text) => setBloodSugarLevel(text)}
          value={bloodSugarLevel}
          keyboardType="numeric"
        />

        

       

        <Text style={styles.label}>Status:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, status === 'Before Meal' ? styles.radioButtonSelected : null]}
            onPress={() => setStatus('Before Meal')}
          >
            <Text style={styles.radioText}>Before Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, status === 'After Meal' ? styles.radioButtonSelected : null]}
            onPress={() => setStatus('After Meal')}
          >
            <Text style={styles.radioText}>After Meal</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity style={styles.button} onPress={handleSubmissionInBackEnd}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>


{/* Blood Sugar History Chart */}
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.label}>Blood Sugar History (last 4 entries)</Text>
        <LineChart
          data={{
            labels: bloodSugarHistory.slice(-4).map((entry) => entry.time),
            datasets: [
              {
                data: bloodSugarHistory.slice(-4).map((entry) => entry.bloodSugarLevel),
              },
            ],
          }}
          width={300}
          height={200}
          yAxisSuffix="mg/dL"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            xLabelsOffset: -10, 
            xLabelRotation: -60, 
            labelFontSize: 12, 
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Add padding to the bottom of the form container */}
      <View style={{ paddingBottom: 300 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '48%',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#007bff',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
});

export default BloodSugarScreen;

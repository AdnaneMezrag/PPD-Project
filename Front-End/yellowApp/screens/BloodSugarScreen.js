import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView,Alert } from 'react-native';

const BloodSugarScreen = () => {
  const [bloodSugarLevel, setBloodSugarLevel] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [unit, setUnit] = useState('mg/dL');
  const [status, setStatus] = useState('');

  const handleSubmission = () => {
    // Check if any field is empty
    if (!bloodSugarLevel || !sex || !age || !status) {
      Alert.alert('Error', 'Please enter all data.');
      return;
    }

    // Convert age to number
    const userAge = parseInt(age);

    // Perform blood sugar level comparison logic here
    // For demonstration purposes, I'm assuming normal blood sugar level ranges
    const normalBloodSugarRange = { 'mg/dL': { min: 70, max: 140 }, 'mmol/L': { min: 3.9, max: 7.8 } };

    let message;
    const bloodSugarLevelInMgDl = unit === 'mmol/L' ? parseFloat(bloodSugarLevel) * 18 : parseFloat(bloodSugarLevel);
    
    if (bloodSugarLevelInMgDl < normalBloodSugarRange[unit].min || bloodSugarLevelInMgDl > normalBloodSugarRange[unit].max) {
      message = 'Your blood sugar level is abnormal. Please consult a doctor as soon as possible.';
    } else {
      message = 'Your blood sugar level is normal.';
    }

    // Display result notification
    Alert.alert('Blood Sugar Result', message);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/bloodSugar.png')} style={styles.image} />

      <Text style={styles.title}>Enter Blood Sugar Level</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Blood Sugar Level:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter blood sugar level"
          onChangeText={(text) => setBloodSugarLevel(text)}
          value={bloodSugarLevel}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Unit of Measurement:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, unit === 'mg/dL' ? styles.radioButtonSelected : null]}
            onPress={() => setUnit('mg/dL')}
          >
            <Text style={styles.radioText}>mg/dL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, unit === 'mmol/L' ? styles.radioButtonSelected : null]}
            onPress={() => setUnit('mmol/L')}
          >
            <Text style={styles.radioText}>mmol/L</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Sex:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[styles.radioButton, sex === 'Male' ? styles.radioButtonSelected : null]}
            onPress={() => setSex('Male')}
          >
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, sex === 'Female' ? styles.radioButtonSelected : null]}
            onPress={() => setSex('Female')}
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

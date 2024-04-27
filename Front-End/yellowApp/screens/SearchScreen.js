import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

const SearchScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedOption, setSelectedOption] = useState('bloodSugar'); // Initialize selectedOption state

    const handleDateChange = (event, selectedDate) => {
        if (!selectedDate) {
            Alert.alert('Error', 'Please select a date.');
            return;
          }
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setSelectedDate(currentDate);
    };

    const handleSearch = () => {
        // Implement search functionality here
        console.log('Selected Date:', selectedDate);
        console.log('Selected Option:', selectedOption);
        // Add logic to search database for selected date and option
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Select Search Date:</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
                </TouchableOpacity>
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}

            <View style={styles.radioContainer}>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="bloodSugar"
                        status={selectedOption === 'bloodSugar' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('bloodSugar')}
                    />
                    <Text>Blood Sugar</Text>
                </View>
                <View style={styles.radioButton}>
                    <RadioButton
                        value="heartRate"
                        status={selectedOption === 'heartRate' ? 'checked' : 'unchecked'}
                        onPress={() => setSelectedOption('heartRate')}
                    />
                    <Text>Heart Rate</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dateLabel: {
        fontSize: 18,
        marginRight: 10,
    },
    dateText: {
        fontSize: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    searchButton: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SearchScreen;


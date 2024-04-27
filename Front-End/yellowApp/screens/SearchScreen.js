import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { useUser } from "../context/Context";

const SearchScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState("bloodSugar"); // Initialize selectedOption state
  const [searchResult, updateSearchResult] = useState([
    { datetime: "2002-05-15", result: "good", currentheartrate: 90 },
    { datetime: "2022-08-15", result: "bad", currentheartrate: 130 },
    { datetime: "2012-05-15", result: "good", currentheartrate: 90 },
    { datetime: "2002-06-65", result: "bad", currentheartrate: 120 },
  ]);
  const { user, updateUser } = useUser(); // exported user data and are ready to be used
  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select a date.");
      return;
    }
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleSearch = async () => {
    // Implement search functionality here

    const id = user.id;
    const dateText = selectedDate;
    const year = dateText.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's zero-based
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const date = `${year}-${month}-${day}`;
    console.log(date);

    if (selectedOption === "heartRate") {
      const response = await axios.post(
        "http://192.168.1.41:4000/api/history/heart_rate_history",
        {
          idUser: id,
          date: date,
        }
      );

      const data = response.data;

      updateSearchResult(data.searched);
    } else if (selectedOption == "bloodSugar") {
      const response = await axios.post(
        "http://192.168.1.41:4000/api/history/blood_sugar_history",
        {
          idUser: id,
          date: date,
        }
      );

      const data = response.data;

      updateSearchResult(data.searched);
    } else {
      Alert.alert("Alert", "Must Choose An Option");

      return;
    }

    console.log("Selected Date:", selectedDate);
    console.log("Selected Option:", selectedOption);
    // Add logic to search database for selected date and option
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "dodgerblue",
          position: "absolute",
          top: "5%",
          width: "100%", // Corrected width property
          height: 200, // Example height
          alignItems: "center",
        }}
      >
        {searchResult.length === 0 ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                position: "relative",
                top: "15%",
                fontSize: 13,
              }}
            >
              {" "}
              No {selectedOption} entries on: {selectedDate.toDateString()}{" "}
            </Text>
          </View>
        ) : (
          <FlatList
            keyExtractor={(item) => {
              item.currentheartrate;
            }}
            data={searchResult}
            renderItem={({ item }) => {
              // if (searchResult.length === 0) {
              //   return (
              //     <View>
              //       <Text style={{ color: "white" }}>
              //         {" "}
              //         You Have No {selectedOption} entries on this day :{" "}
              //         {selectedDate.toDateString()}{" "}
              //       </Text>
              //     </View>
              //   );
              // }
              const subDate = new Date(item.datetime);
              console.log(subDate.toDateString());

              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      marginTop: 24,
                      padding: 30,
                      fontSize: 15,
                      backgroundColor: "white",
                    }}
                  >
                    {`${subDate.getFullYear()}-${
                      subDate.getMonth() + 1
                    }-${subDate.getDate()}`}
                  </Text>
                  <Text
                    style={{
                      marginTop: 24,
                      padding: 30,
                      fontSize: 15,
                      backgroundColor: "white",
                    }}
                  >
                    {item.currentheartrate}
                  </Text>
                  <Text
                    style={{
                      marginTop: 24,
                      padding: 30,
                      fontSize: 15,
                      backgroundColor: "white",
                    }}
                  >
                    {item.result}
                  </Text>
                </View>
              );
            }}
          />
        )}
      </View>

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
            status={selectedOption === "bloodSugar" ? "checked" : "unchecked"}
            onPress={() => setSelectedOption("bloodSugar")}
          />
          <Text>Blood Sugar</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="heartRate"
            status={selectedOption === "heartRate" ? "checked" : "unchecked"}
            onPress={() => setSelectedOption("heartRate")}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    marginBottom: 20,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SearchScreen;

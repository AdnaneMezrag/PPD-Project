import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import GoToButton from '../components/GoToButton'


const HomeScreen=({navigation}) => {
    return(
        <View style={styles.container}>
            
            <GoToButton screenName="HeartRate" source={require('../assets/heartRate2.png')}/>
            <GoToButton screenName="BloodSugar" source={require('../assets/bloodSugar.png')}/>
            <GoToButton screenName="Search" source={require('../assets/search.png')}/>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});
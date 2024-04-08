import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import GoToButton from '../components/GoToButton'


const HomeScreen=({navigation}) => {
    return(
        <View style={styles.container}>
            <Text> Home Screen</Text>
            <GoToButton screenName="HeartRate"/>
            <GoToButton screenName="BloodSugar"/>
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
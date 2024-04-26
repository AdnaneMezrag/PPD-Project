import * as React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoBackArrow = ({ screenName, source }) => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity onPress={() => navigation.navigate(screenName)} style={styles.container}>
            <Image source={source} style={styles.image} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 15,
        left: 15,
        padding: 5,
    },
    image: {
        width: 24, // Adjust the size of the arrow image
        height: 24, // Adjust the size of the arrow image
        resizeMode: 'contain',
    },
});

export default GoBackArrow;

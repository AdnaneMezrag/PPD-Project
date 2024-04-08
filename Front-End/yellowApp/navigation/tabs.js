import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View, Text, Button,Image, TouchableOpacity, StyleSheet} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import MeScreen from '../screens/MeScreen';
import FloatingButton from '../components/FloatingButton';


const Tab = createBottomTabNavigator();


const CustomTabBarButton = ({ children, onPress}) => (
    <TouchableOpacity
    style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
    }}
    onPress={onPress}
    >
        <View style = {{
            width: 70,
            height: 70,
            borderRadius: 35, //basically a circle because 35 is 50% of 70
            backgroundColor: '#e32f45'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const Tabs = () => {
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation : 0,
                backgroundColor: '#ffffff',
                borderRadius: 15,
                height: 90,
                ...styles.shadow
            }
        }}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems: 'center', justifyContent: 'center', top : 10}}>
                        <Image
                        source={require('../assets/home.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94'
                        }}
                        />
                        <Text
                        style={{color:focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                        HOME
                        </Text>
                    </View>
                ),
            }}/> 
            
             
            <Tab.Screen name="Me" component={MeScreen} options={{
                tabBarIcon: ({focused}) =>(
                    <View style={{alignItems: 'center', justifyContent: 'center', top : 10}}>
                        <Image
                        source={require('../assets/mePage2.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#e32f45' : '#748c94'
                        }}
                        />
                        <Text
                        style={{color:focused ? '#e32f45' : '#748c94', fontSize: 12}}>
                        Me
                        </Text>
                    </View>
                ),
            }}/>
            
        </Tab.Navigator>

    );
}

export default Tabs;

const styles = StyleSheet.create({
    shadow:{
        shadowColor: 'black',
        shadowOffset:{
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    }
})
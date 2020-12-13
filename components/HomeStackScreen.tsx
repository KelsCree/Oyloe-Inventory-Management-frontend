import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  HomeScreen from './HomeScreen'
import {brownPalette} from '../assets/ColorPalette'

export const HomeStackScreen = () =>{
    const HomeStack = createStackNavigator()
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontFamily: 'Futura',
                    fontSize: 24,
                    fontWeight: '600',
                    color: brownPalette.brown9
                },
                headerStyle: {
                    backgroundColor: brownPalette.brown3
                }
        }}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    )
} 
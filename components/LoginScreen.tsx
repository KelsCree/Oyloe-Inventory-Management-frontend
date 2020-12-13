import * as React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Input, Button } from 'react-native-elements'
import {  NavigationScreenProp } from 'react-navigation'
import { brownPalette } from '../assets/ColorPalette'




export interface LoginScreenProps {
    navigation: NavigationScreenProp<any,any>;
}
export default function LoginScreen({ navigation }:{ navigation:any }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                    <Image source={require('../assets/images/OIMSLogo.png')}
                    style={styles.image} />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Username'
                    placeholderTextColor={brownPalette.brown7}
                    leftIcon={{ type: 'font-awesome',
                        name: 'chevron-right',
                        color: brownPalette.brownBase }}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry={ true }
                    placeholderTextColor={ brownPalette.brown7 }
                    leftIcon={{ type: 'font-awesome',
                        name: 'chevron-right',
                        color: brownPalette.brownBase }}
                />
                <View style={ styles.buttonContainer }>
                    <Button 
                        buttonStyle={ styles.buttonStyle }
                        titleStyle={ styles.buttonTitleStyle }
                        title="Login"
                        onPress={ () => navigation.navigate('Home') }
                    />
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center',
        backgroundColor: brownPalette.brown1,         
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 30,
        // borderWidth:1,
        width: 340,
        shadowColor: brownPalette.brown10,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 3,
            width: 3
        }
    },

    buttonStyle: {
        backgroundColor: brownPalette.brownBase,
        borderRadius: 6 ,
        width: 340,
        height: 50, 
        marginVertical: 10 
    },

    buttonTitleStyle: {
        fontFamily: 'Futura', 
        color: brownPalette.brown10, 
        fontSize: 24, 
        fontWeight: '800',
    },

    input: {
        width: 340
    },

    imageContainer: {
        flex: 1,
        paddingTop: 50,
    }, 

    image: {
        height: 250,
        width: 250
    },

    inputContainer: {
        flex: 1,
        width: 340,
        justifyContent: 'flex-start'
    }
    
})
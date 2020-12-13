import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Button, Input } from 'react-native-elements'
import {  NavigationScreenProp } from 'react-navigation'
import { brownPalette } from '../assets/ColorPalette'
import { Product } from '../types'
import DropDownPicker from 'react-native-dropdown-picker'
import   { Feather } from '@expo/vector-icons/'



//reminder to ask Bryan what the export interface does
export interface HomeScreenProps {
    navigation: NavigationScreenProp<any,any>;
    products: Product[]
}

export const DeliveryFormScreen:React.FC<HomeScreenProps> = ({navigation, products}) => {

    const [selectedProduct, setSelectedProduct] = useState('CyberMul')
    const [quantity, setQuantity] = useState('')


    const addProductToDelivery = () => {
        if (selectedProduct !== '') {
                navigation.navigate('Delivery', {
                    product: {
                        name: selectedProduct,
                        quantity: quantity
                    }
                })
                setSelectedProduct('CyberMul')
                setQuantity('')
        // } else {
        //     return null
        // } the else may not be necessary to include
    }

    const getProductOptions = (products:Product[]) => {
        return products.map(product => {
            return {label: product.name, value: product.name}
        })
    }

    


    
    return (
            <SafeAreaView style={styles.container}> 
                <Text 
                    style={styles.titleStyle}
                >
                    Product Info
                </Text>
                <View style={styles.pickerContainer}>
                    <DropDownPicker 
                        items={getProductOptions(products)}
                        style={styles.dropDownPickerStyle}
                        defaultValue={selectedProduct}
                        dropDownStyle={styles.pickerDropDownStyle}
                        containerStyle={styles.dropDownPickerContainerStyle}        
                        selectedLabelStyle= {styles.dropDownPickerSelectedLabelStyle}
                        itemStyle={styles.dropDownPickerItemStyle}
                        labelStyle={styles.dropDownPickerLabelStyle}
                        onChangeItem={item => {
                            return setSelectedProduct(item.value)}}
                    />
                </View>  
                <View style={styles.textInputContainer}>
                    <Input 
                        containerStyle={styles.textBox} 
                        label={'Quantity'}
                        labelStyle={{color: brownPalette.brown9,
                                    fontFamily:'Futura',
                                    fontWeight: '800',
                                    fontSize:18}}
                        leftIcon={<Feather name='hash' size={15} color={brownPalette.brown10} />}
                        onChangeText={text => setQuantity(text)} >
                    </Input>
                </View> 
                <View style={styles.buttonContainer}>
                    <Button 
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.buttonTitleStyle}
                        title='Add Product to Ticket'
                        onPress={addProductToDelivery}
                    />                  
                </View>   
                
            </SafeAreaView>
                
                
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: brownPalette.brown1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    titleStyle: {
        fontFamily:'Futura', 
        fontSize: 42, 
        marginVertical:40,
        marginLeft:40,
        textDecorationLine: 'underline',
        color: brownPalette.brown9, 
        alignSelf: 'flex-start'
    },

    textInputContainer: {        
        width: 400,
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: -1
    },

    textBox: {
        borderRadius: 6,
        backgroundColor: brownPalette.brown2,
        width: 320,
        alignSelf: 'center',
        padding: 10,
        shadowColor: brownPalette.brown10,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 3,
            width: 3
        },
        borderWidth: 1,
        borderColor: brownPalette.brown6,
        fontFamily: 'Futura'
    },

    buttonContainer: {
        flex:1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        shadowColor: brownPalette.brown10,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 3,
            width: 3
        }
    },

    buttonTitleStyle: {
        color: brownPalette.brown10,
        fontSize: 24,
        fontWeight: '800',
        fontFamily: 'Futura'
    },

    buttonStyle: {
        backgroundColor: brownPalette.brownBase,
        borderRadius: 6 ,
        width: 340,
        height: 50, 
        paddingVertical:10, 
        marginVertical: 10
    },

    pickerContainer:{
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 40,
        width: '100%', 
    },

    dropDownPickerStyle: {
        backgroundColor: brownPalette.brown2,
    },

    pickerDropDownStyle: {
        backgroundColor: brownPalette.brown4, 
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderTopColor: brownPalette.brown7 
    },

    dropDownPickerItemStyle: { 
        justifyContent: 'flex-start',
        
    },

    dropDownPickerContainerStyle: {
        height:100, 
        width: 320, 
        alignSelf: 'center', 
        shadowColor: brownPalette.brown10, 
        shadowOffset:{width: 3, height: 3},
        shadowOpacity: 0.5,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: brownPalette.brown6
    },
    
    dropDownPickerLabelStyle: {
        textAlign: 'left', 
        color: brownPalette.brown10, 
        fontSize: 24,
        fontFamily: 'Futura',
        
    },

    dropDownPickerSelectedLabelStyle: {
        backgroundColor: brownPalette.brown2,
        fontFamily: 'Futura',

    }
});
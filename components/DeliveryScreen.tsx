import * as React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import {  NavigationScreenProp } from 'react-navigation'
import { Product } from '../types'
import { useState, useEffect } from 'react'
import { brownPalette } from '../assets/ColorPalette'

const baseURL = "https://oyloe-inventory-management.herokuapp.com"

export interface DeliveryScreenProps {
    navigation: NavigationScreenProp<any,any>;
    route: any
    products: Product[]
}

const DeliveryScreen:React.FC<DeliveryScreenProps> = ({navigation,route}) => {

    const [productsDelivered, setProductsDelivered] = useState([{
        name: '',
        quantity: ''
    }])
    let params = route.params
    useEffect(() => {
        console.log({params})
        if (params != undefined || params != route.params) {
            const {product} = route.params
            setProductsDelivered([...productsDelivered, {name: product.name, quantity: product.quantity}])
            params = route.params
        } 
        
    }, [route.params])

    const displayProductsDelivered = () => {
        console.log({productsDelivered})
        return productsDelivered.map((product,index) => {
                return <Text key={index}>{product.name} {product.quantity}</Text>
        })
    }
    //submits to delivery collection BE, updates Inventory collection BE,  and redirects to home}
    const handleDeliverySubmit = () => {
        fetch(`${baseURL}/deliveries`, {
            method: 'POST',
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({productsDelivered})
        })        
    }
    return(
        <View style={styles.container}>
            {displayProductsDelivered()}
            <Button 
                buttonStyle={styles.buttons}
                title="Add Product to Ticket"
                titleStyle={{fontFamily: 'Futura', color: brownPalette.brown10}}
                onPress={() => navigation.navigate('DeliveryFormScreen')}
            />    
            <Button 
                buttonStyle={styles.buttons}
                titleStyle={{fontFamily: 'Futura', color: brownPalette.brown10}}
                title="Submit Delivery Ticket"
                onPress={handleDeliverySubmit}  
            />    

        </View>
    )

    
}

const styles= StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent:'center',
        backgroundColor: brownPalette.brown1

    },
    titleText: {
        fontSize: 28, 
        textAlign: 'center',
        flex: 1,
        padding: 20


    },
    buttons: {
        backgroundColor: brownPalette.brownBase,
        borderRadius: 12,
        width: 200, 
        padding:4, 
        margin:10}
})
    
export default DeliveryScreen
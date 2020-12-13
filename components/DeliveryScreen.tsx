import * as React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import { Button, Card, ListItem } from 'react-native-elements'
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
        if (params != undefined || params != route.params) {
            const { product } = route.params
            setProductsDelivered([...productsDelivered, {name: product.name, quantity: product.quantity}])
            params = route.params
        } 
        
    }, [route.params])

    const displayProductsDelivered = () => {
        return productsDelivered.slice(1).map((product,index) => {
            return <ListItem 
                key={index} 
                containerStyle={{backgroundColor:brownPalette.brown2,borderRadius: 6}} 
                topDivider={true}
                bottomDivider={true}
                >
                    <ListItem.Content style={{backgroundColor: brownPalette.brown2}}>
                        <ListItem.Title 
                            style={styles.listItemStyle}>{product.name}
                        </ListItem.Title>
                        <ListItem.Subtitle 
                            style={{fontStyle: 'italic', color: brownPalette.brown9, marginLeft: 20, fontFamily: 'Futura'}}
                        >
                            Quantity: {product.quantity}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
        })
    }

    const displayLogo = () => {
        return <Image 
                    source={require('../assets/images/OIMSLogo.png')}
                    style={styles.image} />
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
        setProductsDelivered([{ name:'', quantity: ''}])
        navigation.navigate('Home')       
    }
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Delivery Ticket</Text>
            <View style={{flex:1}}>
                {productsDelivered.length > 1 
                    ? <Card 
                        containerStyle={styles.cardContainerStyle}
                        >
                        {displayProductsDelivered()}
                    </Card>
                    : displayLogo()
                }
                
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title="Add Product to Ticket"
                    titleStyle={styles.buttonTitleStyle}
                    onPress={() => navigation.navigate('DeliveryForm')}
                />    
                <Button 
                    buttonStyle={styles.buttonStyle}
                    titleStyle={styles.buttonTitleStyle}
                    title="Submit Delivery Ticket"
                    onPress={handleDeliverySubmit}  
                />  
            </View>
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
        fontFamily: 'Futura', 
        fontSize: 38, 
        color: brownPalette.brown9, 
        marginTop: 50, 
        marginLeft: 40,
        alignSelf: 'flex-start',
        textDecorationLine: 'underline'
    },

    listItemStyle: {
        fontSize: 24, 
        color: brownPalette.brown8, 
        fontFamily: 'Futura', 
        marginLeft: 20, 
        backgroundColor: brownPalette.brown2
    },
    buttonStyle: {
        backgroundColor: brownPalette.brownBase,
        borderRadius: 6 ,
        width: 340,
        height: 50, 
        paddingVertical:10, 
        marginVertical: 10
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 30,
        shadowColor: brownPalette.brown10,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 3,
            width: 3
        }
    },
    buttonTitleStyle: {
        fontFamily: 'Futura', 
        color: brownPalette.brown10, 
        fontSize: 24, 
        fontWeight: '800'
    },
    imageContainer: {
        flex: 1,
        paddingTop: 50, 

    }, 
    image: {
        height: 250,
        width: 250,
        alignSelf: 'center',
        marginTop: 100,
        backgroundColor: brownPalette.brown1
    },

    cardContainerStyle: {
        padding:0, 
        width: 400,  
        borderWidth:0,
        shadowOffset: {
            width: 3, 
            height: 3
        },
        shadowOpacity: 0.5,
        shadowColor: brownPalette.brown10,
        borderRadius: 6
    }
})
    
export default DeliveryScreen

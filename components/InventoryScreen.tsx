import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, StyleSheet} from 'react-native'
import { Button} from 'react-native-elements'
import {  NavigationScreenProp } from 'react-navigation'
import {Product} from '../types'
import { TextInput, ScrollView} from 'react-native-gesture-handler'
import { brownPalette } from '../assets/ColorPalette'


export interface InventoryProps {
    navigation: NavigationScreenProp<any,any>;
    products: Product[]
}

const InventoryScreen: React.FC <InventoryProps> = ({ navigation,products }) => {    

    const [inventory, setInventory] = React.useState<Product[]>([{
        _id: "",
        name: "",
        description: "",
        package: '',
        weight: 1,
        quantity: 0
    }])

    const [currentQuantities, setCurrentQuantities] = useState([''])

    useEffect(() => {        
        setInventory(products as Product[])
    },[])

    const renderInventory = ( inventory:Product[]) => (
        inventory.map((product:Product) => (
            <View style={styles.item} key={product._id}>
                <View style={styles.productInfoContainer}>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <View style={styles.countContainer}>
                    <View style={styles.currentCountContainer}>
                        <Text style={styles.currentCount}>Current Count: </Text>
                        <TextInput 
                            style={styles.input}                            
                        />
                    </View>    
                    <Text style={styles.previousCount}>Previous Count: {product.quantity}</Text>            
                </View>
            </View>
            )
        )
    );
        
    return (
        <SafeAreaView style={styles.container} >
            <ScrollView>
                {renderInventory(inventory)}
            </ScrollView>
            <Button 
                buttonStyle={styles.buttonStyle}
                title="Submit Daily Inventory"
                titleStyle={styles.buttonTitleStyle}
                containerStyle={styles.buttonContainerStyle}
                onPress={() => navigation.navigate('Home')}
            />              
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: brownPalette.brown1,
        
    },
    item: {
        backgroundColor: brownPalette.brown4,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 25,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: 6,
        height: 187,
        shadowOffset: {width:3, height: 3},
        shadowOpacity: 0.5,
        shadowColor: brownPalette.brown10
        

    },
    productInfoContainer: {
        
    },
    name: {
        fontSize: 34,
        fontFamily: 'Futura',
        color: brownPalette.brown10,
        alignSelf: 'flex-start'

    },
    input: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: brownPalette.brown8,
        backgroundColor: brownPalette.brown2,
        height:30,
        width:40,
        textAlign: 'center',
        alignSelf: 'flex-end',       
    },
    buttonContainerStyle : {
        borderRadius: 6, 
        width: 345, 
        alignSelf: 'center', 
        marginVertical: 12,
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
        paddingVertical:10, 
        marginBottom: 25,
        
    },
    buttonTitleStyle: {
        color: brownPalette.brown10, 
        fontFamily: 'Futura', 
        fontSize: 24, 
        fontWeight: '800'
    },
    description: {
        fontSize:20,
        fontFamily:'Futura', 
        color: brownPalette.brown8,
        alignSelf: 'flex-start'
    },
    countContainer: {
        alignSelf: 'flex-end'
    },
    currentCountContainer: {
        flexDirection: 'row',
        
    },
    currentCount: {
        fontSize:20,
        fontFamily:'Futura', 
        color: brownPalette.brown8
    },
    previousCount: {
        fontSize:20,
        fontFamily:'Futura', 
        color: brownPalette.brown8
    }
});

export default InventoryScreen
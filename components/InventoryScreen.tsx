import * as React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, FlatList, StyleSheet} from 'react-native'
import {  NavigationScreenProp } from 'react-navigation'
import {Product} from '../types'
import { TextInput } from 'react-native-gesture-handler'

export interface InventoryScreenProps {
    navigation: NavigationScreenProp<any,any>;
    products: Product[]
}

const InventoryScreen: React.FC <InventoryScreenProps> = ({ navigation, products }) => {
    

    const [inventory, setInventory] = React.useState<Product[]>([{
        id: "z",
        name: "",
        description: "",
        package: '',
        weight: 1,
        quantity: 0
    }])


    useEffect(() => setInventory(products as Product[]),[])

        const renderItem = ({ item }) => (
            <Item name={item.name} quantity={item.quantity} key={item.id} />
        );

    const Item = ({ name ,quantity }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{name}</Text>
            <TextInput style={styles.textInput} placeholder={quantity} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={inventory}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    return item.id}
                }
            />
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#888',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10

    },
    name: {
        fontSize: 32,
    },
    textInput: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        width: 40
        
    },
});

export default InventoryScreen
import React, { useState,useEffect } from 'react';
import { View, TextInput, ScrollView, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header({allProducts }) {
    const [searchProduct, setSearchProduct] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigation = useNavigation();
    
    useEffect(() => {
        setFilteredProducts(allProducts);
    }, [allProducts]);

    const handleSearch = (text) => {
        setSearchProduct(text);
        if (text.trim() === '') {
            setFilteredProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(product => product.category.toLowerCase().includes(text.toLowerCase()));
            setFilteredProducts(filteredProducts);
        }
    };
    
    const handleDetailsPress = (item) => {
        navigation.navigate('details', { id: item.id });
    };

    return (
        <ScrollView>
        <View>
            <View style={styles.navContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchProduct}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList style={styles.container}
                data={filteredProducts}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: 150 }}>{item.title}</Text>
                        <View style={styles.productDetails}>
                            <Text>${item.price}</Text>
                            <Text>{item.category}</Text>
                        </View>
                        <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
                           <Text style={styles.button}>Details</Text>
                        </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.button}>Add to cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
      marginTop:35
    },
    navContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:30,
        backgroundColor:'black'
    },
    searchInput: {
        marginBottom:8,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        width: '80%',
        marginTop:10,
        marginLeft:10,
        backgroundColor:'white'
    },
    productContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 3,
        marginLeft:20,
        marginBottom:7,
        marginTop:7
    },
    productImage: {
        width:170,
        height:250,
        marginBottom: 10,
    },
    productTitle: {
        fontWeight: 'bold',
        marginBottom: 5
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 5,
        textAlign:'center',
        borderRadius: 5
    },
});

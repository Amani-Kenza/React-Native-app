import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetails = ({ route }) => {
    const { id } = route.params;
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProductDetails(data);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        }
    }, [id]);

    return (
        <View style={styles.container}>
            {productDetails ? (
                <View style={styles.productContainer}>
                    <Image source={{ uri: productDetails.image }} style={styles.image} />
                    <View style={styles.detailsContainer}>
                        <Text style={styles.title}>{productDetails.title}</Text>
                        <Text style={styles.description}>{productDetails.description}</Text>
                        <Text style={styles.price}>${productDetails.price}</Text>
                        <View style={styles.additionalInfo}>
                            <Text style={styles.rating}>Rate: {productDetails.rating.rate}</Text>
                            <Text style={styles.rating}>Note: {productDetails.rating.count}</Text>
                            <Text style={styles.category}>Category: {productDetails.category}</Text>
                        </View>
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
    },
    productContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    description: {
        marginBottom: 8,
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    additionalInfo: {
        flexDirection: 'row',
    },
    rating: {
        marginRight: 16,
    },
    category: {},
});

export default ProductDetails;

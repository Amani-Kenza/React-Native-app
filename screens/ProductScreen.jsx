import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../components/header';

const Products = ({navigation}) => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products');
                if (!res.ok) {
                    throw new Error('Failed to fetch data from the API');
                }
                const data = await res.json();
                setAllProducts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setAllProducts([]);
            }
        };

        fetchData();
    }, []);

    return (
        <View>
            <Header allProducts={allProducts} navigation={navigation}/>
        </View>
    );
};

export default Products;

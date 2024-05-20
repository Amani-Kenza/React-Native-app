import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { useNavigation } from '@react-navigation/native';
import addProduct from '../api/CrudOperations/addProduct';
import deleteProduct from '../api/CrudOperations/deleteProduct';
import updateProduct from '../api/CrudOperations/deleteProduct';

export default function Dashboard() {
    const [formState, setFormState] = useState({
        formType: '', // 'add', 'remove', 'update'
        successMessage: '',
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
    });

    const navigation = useNavigation();
    //function to load products
    const loadProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error loading the products:', error);
        }
    };
    // function to show each crud operations
    const toggleForm = (formType) => {
        setFormState(prevState => ({
            ...prevState,
            formType,
            successMessage: '',
            id: '',
            title: '',
            price: '',
            description: '',
            category: '',
            image: ''
        }));
    };

    const handleFormSubmit = async () => {
        const { formType, id, title, price, description, category, image } = formState;
        try {
            if (formType === 'add') {
                await addProduct(title, parseFloat(price), description, category, image);
                setFormState(prevState => ({ ...prevState, successMessage: 'Product added successfully!' }));
            } else if (formType === 'remove') {
                await deleteProduct(parseInt(id));
                setFormState(prevState => ({ ...prevState, successMessage: 'Product deleted successfully!' }));
            } else if (formType === 'update') {
                await updateProduct(id, { title, price: parseFloat(price), description, category, image });
                setFormState(prevState => ({ ...prevState, successMessage: 'Product updated successfully!' }));
            }
            loadProducts();
        } catch (error) {
            console.error(`Error ${formType} product:`, error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);
    //function to update the user input
    const handleChange = (name, value) => {
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };
    // function to sign Out
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out successfully');
            navigation.navigate('account');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const { formType, successMessage, id, title, price, description, category, image } = formState;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignOut}>
                <Text style={styles.logout}>Log out</Text>
            </TouchableOpacity>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => toggleForm('add')} style={styles.navigationItem}>
                    <Text style={styles.navigationText}>Add Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleForm('update')} style={styles.navigationItem}>
                    <Text style={styles.navigationText}>Update Product</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleForm('remove')} style={styles.navigationItem}>
                    <Text style={styles.navigationText}>Remove Product</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {formType && (
                    <View style={styles.formContainer}>
                        {formType !== 'add' && (
                            <TextInput
                                placeholder='ProductId'
                                value={id}
                                onChangeText={(text) => handleChange('id', text)}
                                required
                                style={styles.input}
                            />
                        )}
                        {(formType === 'add' || formType === 'update') && (
                            <>
                                <TextInput
                                    placeholder='Title'
                                    value={title}
                                    onChangeText={(text) => handleChange('title', text)}
                                    required
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder='Price'
                                    value={price}
                                    onChangeText={(text) => handleChange('price', text)}
                                    required
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder='Description'
                                    value={description}
                                    onChangeText={(text) => handleChange('description', text)}
                                    required
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder='Category'
                                    value={category}
                                    onChangeText={(text) => handleChange('category', text)}
                                    required
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder='Image URL'
                                    value={image}
                                    onChangeText={(text) => handleChange('image', text)}
                                    style={styles.input}
                                />
                            </>
                        )}
                        <TouchableOpacity onPress={handleFormSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>{formType === 'add' ? 'Add' : formType === 'update' ? 'Update' : 'Remove'}</Text>
                        </TouchableOpacity>
                        {successMessage && <Text style={styles.successMessage}>{successMessage}</Text>}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    logout: {
        marginLeft: 'auto',
        marginBottom: 20,
        color: '#007AFF',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    navigationItem: {
        paddingVertical: 10,
    },
    navigationText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollContainer: {
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
        width: '80%',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    successMessage: {
        color: 'green',
        marginTop: 10,
    },
});
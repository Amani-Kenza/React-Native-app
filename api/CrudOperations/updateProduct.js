const updateProduct = async (id,updatedProductData) => {
    const url = `https://fakestoreapi.com/products/${id}`;

    const requestBody = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
    };

    try {
        const response = await fetch(url, requestBody);
        if (!response.ok) {
            throw new Error('Error when updating the product');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during the PUT request to update a product :', error);
        throw error;
    }
};

export default updateProduct;

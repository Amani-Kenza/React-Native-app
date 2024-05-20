const deleteProduct = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;

    const requestBody = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(url, requestBody);
        if (!response.ok) {
            throw new Error('Error when deleting the product');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during the DELETE request to delete a product:', error);
        throw error;
    }
};

export default deleteProduct;

const addProduct = async (title, price, description, category, image) => {
    const url = 'https://fakestoreapi.com/products';

    const requestBody = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            price,
            description,
            category,
            image
        }),
    };

    try {
        const response = await fetch(url, requestBody);
        if (!response.ok) {
            throw new Error('Error when adding product');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error during the POST request to add a product :', error);
        throw error;
    }
};

export default addProduct;

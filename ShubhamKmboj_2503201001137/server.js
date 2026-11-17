
const express = require('express');

const app = express();

app.use(express.json());

const PORT = 3000;


let products = [
    {
        id: 301,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: "Notebook",
        category: "Stationery",
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: "USB Keyboard",
        category: "Electronics",
        price: 999,
        quantity: 0,
        inStock: false
    }
];


// 1. GET all products

app.get('/api/products', (req, res) => {

    res.status(200).json(products);

});


// 2. POST a new product

app.post('/api/products', (req, res) => {

    const data = req.body;

    // Validation

    if (
        typeof data.price !== "number" ||
        typeof data.quantity !== "number" ||
        typeof data.inStock !== "boolean"
    ) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    // Create new product

    const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: data.name,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        inStock: data.inStock
    };

    products.push(newProduct);

    res.status(201).json(newProduct);

});


// 3. GET product by ID

app.get('/api/products/:id', (req, res) => {

    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);

});


// 4. PUT / Update product

app.put('/api/products/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const data = req.body;

    if (
        typeof data.price !== "number" ||
        typeof data.quantity !== "number" ||
        typeof data.inStock !== "boolean"
    ) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    products[index] = {
        id: id,
        name: data.name,
        category: data.category,
        price: data.price,
        quantity: data.quantity,
        inStock: data.inStock
    };

    res.status(200).json(products[index]);

});

// 5. DELETE a product

app.delete('/api/products/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);

    res.status(200).json({
        message: "Product deleted successfully"
    });

});

// Start server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const Product = require('../Model/products');
const User = require('../Model/users');

const createProduct = async (req, res) => {
    const { name, price, description, image } = req.body;
    try {
        const product = new Product({ name, price, description, image });
        await product.save();

        res.send('Product created successfully!');
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send({ product });
    } catch (err) {
        res.status(500).send('Product not found');
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).send('no Product found');
        }
        res.status(200).send({ products })
    }
    catch (err) {
        res.status(500).send('no Product found');
    }
}


const updateProductById = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, image } = req.body;
    try {
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        await product.save();
        res.status(200).send("Product updated Successfully");
    }
    catch (err) {
        res.status(500).send('Error in Product updation');
    }
}


const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send("Product deleted Successfully!");
    }
    catch (err) {
        res.status(500).send('Error in Product deletion');
    }
}


const createUser = async (req, res) => {
    const { name, email, mobile, address, password, age, sex, image } = req.body;
    try {
        const user = new User({ name, email, mobile, address, password, age, sex, image });
        await user.save();
        res.send('user created successfully!');
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
}


const findUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.status(200).send({ user });
    } catch (err) {
        res.status(500).send(`User Not found: ${err}`);
    }
}

module.exports = {
    createProduct, getProductById, getAllProducts, updateProductById, deleteProductById,
    createUser, findUserById
}

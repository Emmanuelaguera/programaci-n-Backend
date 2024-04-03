const Products = require("../dao/db/models/products.model");

exports.findAllProducts = async () => {
    return await Products.find().lean();
};

exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, search } = req.query;
        const pageParsed = parseInt(page);
        const limitParsed = parseInt(limit);
        const queryWithOptions = search ? { name: { '$regex': search, $options: 'i' } } : null;

        const products = await Products.find(queryWithOptions)
            .limit(limitParsed * 1)
            .skip((pageParsed - 1) * limit)
            .sort({ price: sort === 'asc' ? 1 : -1 });

        const count = await Products.countDocuments();
        const totalPages = Math.ceil(count / limitParsed);
        const prevPage = pageParsed > 1 ? (pageParsed - 1) : 0;
        const nextPage = pageParsed < totalPages ? (pageParsed + 1) : 0;
        const hasPrevPage = Boolean(prevPage);
        const hasNextPage = Boolean(nextPage);
        const prevLink = hasPrevPage ? `/api/products?limit=${limit}&page=${prevPage}` : '';
        const nextLink = hasNextPage ? `/api/products?limit=${limit}&page=${nextPage}` : '';

        res.json({
            status: 200,
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: pageParsed,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        });
    } catch (error) {
        res.status(500).json({ error: "Algo ha salido mal" });
    }
};

exports.getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Products.findById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Algo ha salido mal" });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    try {
        const product = new Products({ name, description, price, category, stock });
        const productSaved = await product.save();
        res.status(201).json(productSaved);
    } catch (error) {
        res.status(500).json({ error: "Algo ha salido mal" });
    }
};

exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, category, stock } = req.body;
    try {
        const updatedProduct = await Products.findByIdAndUpdate(productId, {
            name,
            price,
            category,
            stock,
        });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Algo ha salido mal" });
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await products.findByIdAndRemove(productId);
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ error: "Algo ha salido mal" });
    }
};


// const Carts = require("../dao/db/models/carts.model");
const Products = require("../dao/db/models/products.model");

exports.getCart = async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await Carts.findById(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Algo ha salido mal" });
  }
};

exports.createCart = async (req, res) => {
  try {
    const cart = new Carts({ products: [] });
    const cartSaved = await cart.save();
    res.status(201).json(cartSaved);
  } catch (error) {
    res.status(500).json({ error: "Algo ha salido mal" });
  }
};

exports.addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await Products.findById(pid);
    await Carts.updateOne({_id: cid}, { $push: { products: product } });
    res.json('Producto agregado');
  } catch (error) {
    res.status(500).json({ error: "Algo ha salido mal" });
  }
};

exports.removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const product = await Products.findById(pid);
    await Carts.updateOne({_id: cid}, { $pull: { products: product } });
    res.json('Producto removido');
  } catch (error) {
    res.status(500).json({ error: "Algo ha salido mal" });
  }
};

exports.deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndRemove(cartId);
    res.json(deletedCart);
  } catch (error) {
    res.status(500).json({ error: "Algo ha salido mal" });
  }
};


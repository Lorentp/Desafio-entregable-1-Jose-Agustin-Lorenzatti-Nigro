const express = require("express");
const router = express.Router();

const CartManager = require("../controllers/cart-manager");
const manager = new CartManager("./src/models/carts.json");

router.post("/", async (req, res) => {
  try {
    await manager.newCart();
    res.send({ status: "success", message: "Carrito creado" });
  } catch (error) {
    res.send("No se pudo crear el carrito");
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const carts = await manager.getCartsProducts(cid);
    res.json(carts);
  } catch (error) {
    res.send("Error del servidor");
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await manager.addProductCart(cid, pid);
    res.send("Producto agregado al carrito");
  } catch (error) {
    res.send("Error, no se pudo agregar el producto al carrito");
  }
});

module.exports = router;

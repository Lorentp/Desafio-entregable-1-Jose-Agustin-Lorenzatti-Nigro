const fs = require("fs").promises;

class CartManager {
  static lastId = 0;
  constructor(path) {
    this.carts = [];
    this.path = path;
  }

  async getCarts() {
    const res = await fs.readFile(this.path, "utf8");
    const resJSON = JSON.parse(res);
    return resJSON;
  }

  async saveFile(Carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.log("No se pudo guardar el archivo", error);
    }
  }

  async getCartProducts(id) {
    const carts = await this.getCarts;
    const cart = carts.find((cart) => cart.id == id);

    if (cart) {
      return cart.poducts;
    } else {
      console.log("carrito no encontrado");
    }
  }

  async newCart() {
    const id = ++CartManager.lastId;
    const newCart = { id, products: [] };
    this.carts = await this.getCarts();
    this.carts.push(newCart);
    await this.saveFile(this.carts);
    return newCart;
  }

  async addProductCart(cart_id, product_id) {
    const carts = await this.getCarts();
    const index = carts.findIndex((cart) => cart.id == cart_id);

    if (index !== -1) {
      const CartProducts = await this.getCartProducts(cart_id);
      const productIndex = CartProducts.findIndex(
        (product) => product.product_id == product_id
      );

      if (productIndex !== -1) {
        CartProducts[productIndex].quantity =
          CartProducts[productIndex].quantity + 1;
      } else {
        CartProducts.push({ product_id, quantity: 1 });
      }

      carts[index].products = CartProducts;

      await fs.writeFile(this.path, JSON.stringify(carts));
      console.log("Producto agregado al carrito");
    } else {
      console.log("No se encontro el carrito");
    }
  }
}

module.exports = CartManager;

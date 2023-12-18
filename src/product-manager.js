const fs = require("fs").promises;

class ProductManager {
  static lastId = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async readFile() {
    try {
      const res = await fs.readFile(this.path, "utf-8");
      const arrayProducts = JSON.parse(res);
      return arrayProducts;
    } catch (error) {
      console.log("No se pudo leer el archivo", error);
    }
  }

  async saveFile(arrayProducts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    } catch (error) {
      console.log("No se pudo guardar el archivo", error);
    }
  }

  async addProduct(newObj) {
    let { title, description, price, image, code, stock } = newObj;

    if (this.products.some((item) => item.code === code)) {
      console.log("Dos productos no pueden compartir el mismo codigo.");
      return;
    }

    const newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
      id: ++ProductManager.lastId,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      this.products.push({ ...newProduct });
    } else {
      console.log(
        "Todos los campos deben ser completados para continuar, intentalo nuevamente."
      );
      return;
    }

    await this.saveFile(this.products);
  }

  getProducts() {
    console.log(this.products);
  }

  async getProductsById(id) {
    try {
      const arrayProducts = await this.readFile();

      const product = arrayProducts.find((item) => item.id === id);

      if (!product) {
        console.alert("Lo sentimos, producto no encontrado");
      } else {
        console.log("Su producto es: ");
        return product;
      }
    } catch (error) {
      console.log("N se pudo leer el archivo", error);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const arrayProducts = await this.readFile();
      const index = arrayProducts.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProducts.splice(index, 1, updatedProduct);
        await this.saveFile(arrayProducts);
      } else {
        console.log("No se pudo encontrar el producto");
      }
    } catch (error) {
      console.log("No se pudo actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const oldArrayProducts = await this.readFile();
      const index = oldArrayProducts.findIndex((item) => item.id === id);

      if (index !== -1) {
        const arrayProducts = oldArrayProducts.splice(index, 1);

        await this.saveFile(arrayProducts);
      } else {
        console.log("No se pudo encontrar el producto");
      }
    } catch (error) {
      console.log("No se pudo eliminar el producto", error);
    }
  }
}

module.exports = ProductManager;

const fs = require("fs").promises;
const { uuid } = require("uuidv4");
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
      const res = await this.readFile(this.path, "utf8");

      await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
    } catch (error) {
      console.log("No se pudo guardar el archivo", error);
    }
  }

  async addProduct(
    newObj
  ) {
    let { title, description, price, image, code, stock, status = true, category } = newObj;
    try {
      const products = await this.readFile(this.path, "utf-8");
      const id = uuid();

      if (products.some((item) => item.code === code)) {
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
        status = true,
        category,
        id,
      };
      if (!Object.values(newProduct).includes(undefined)) {
        this.products.push({ ...newProduct });
      } else {
        console.log(
          "Todos los campos deben ser completados para continuar, intentalo nuevamente."
        );
      products.push(newProduct);
      return newObj
      await this.saveFile(products);
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const response = await fs.readFile(this.path, "utf8");
      const responseJSON = JSON.parse(response);
      return responseJSON;
    } catch (error) {
      console.log("Ha ocurrido un error", error);
    }
  }

  async getProductsById(id) {
    try {
      const arrayProducts = await this.readFile();
      const product = arrayProducts.find((item) => item.id === id);
      if (!product) {
        console.log("Lo sentimos, producto no encontrado");
      } else {
        console.log("Su producto es: ");
        return product;
      }
    } catch (error) {
      console.log("N se pudo leer el archivo", error);
    }
  }

  async updateProduct(id, { ...data }) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((item) => item.id == id);

      if (index !== -1) {
        products[index] = { id, ...data };
        await this.saveFile(products);
        return [index];
      } else {
        console.log("No se pudo encontrar el producto");
      }
    } catch (error) {
      console.log("No se pudo actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id == id);

      if (index !== -1) {
        products.splice(index, 1);

        await this.saveFile(products);
      } else {
        console.log("No se pudo encontrar el producto");
      }
    } catch (error) {
      console.log("No se pudo eliminar el producto", error);
    }
  }
}

module.exports = ProductManager;

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
        oldArrayProducts.splice(index, 1);
        const arrayProducts = JSON.stringify(oldArrayProducts, null, 2);
        await this.saveFile(arrayProducts);
      } else {
        console.log("No se pudo encontrar el producto");
      }
    } catch (error) {
      console.log("No se pudo eliminar el producto", error);
    }
  }
}

// TESTING

const manager = new ProductManager("./products.json");

manager.getProducts();

// Agregamos productos

const testedproduct1 = {
  title: "Product1",
  description: "Description1",
  price: "1",
  image: "no image",
  code: "abc123",
  stock: "10",
};

manager.addProduct(testedproduct1);

const testedproduct2 = {
  title: "Product2",
  description: "Description2",
  price: "2",
  image: "no image",
  code: "abc124",
  stock: "20",
};

manager.addProduct(testedproduct2);

//Llamamos al arreglo y tambien llamamos a un objeto por id

manager.getProducts();

async function testingGetProductsById() {
  const product = await manager.getProductsById(1);
  console.log(product);
}

testingGetProductsById();

//Actualizando producto

const testedproduct3 = {
  id: 1,
  title: "Product3",
  description: "Description3",
  price: "3",
  image: "no image",
  code: "abc124",
  stock: "30",
};

async function testingUdpateProduct() {
  await manager.updateProduct(1, testedproduct3);
}

testingUdpateProduct();

async function testingDeleteProduct() {
  await manager.deleteProduct(1);
}

testingDeleteProduct();

manager.getProducts();

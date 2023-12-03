class ProductManager {
  static lastId = 0;

  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, image, code, stock) {
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
  }

  getProducts() {
    console.log(this.products);
  }

  getProductsById(id) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      console.alert("Lo sentimos, producto no encontrado");
    } else {
      console.log("Su producto es: ", product);
    }
  }
}

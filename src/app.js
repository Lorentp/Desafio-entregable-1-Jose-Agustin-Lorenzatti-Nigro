const PORT = 8080;

const express = require("express");

const app = express();

const ProductManager = require("./product-manager");
const manager = new ProductManager("./src/products.json");

const productsJSON = "./src/products.json";

app.get("/", (req, res) => {
  res.send("Bienvenido a home");
});

app.get("/products/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let dataProducts = await manager.readFile(productsJSON);
    const product = dataProducts.find((item) => item.id == id);
    if (product) {
      res.send(product);
    } else {
      res.send("Producto no encontrado");
    }
  } catch (error) {
    res.send("Ha ocurrido un error", error);
  }
});

app.get("/products", async (req, res) => {
  try {
    let limit = await parseInt(req.query.limit);
    let dataProducts = await manager.readFile(productsJSON);
    if (limit) {
      const arrayProducts = dataProducts.slice(0, limit);
      res.send(arrayProducts);
    } else {
      res.send(dataProducts);
    }
  } catch (error) {
    res.send("Ha ocurrido un error", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

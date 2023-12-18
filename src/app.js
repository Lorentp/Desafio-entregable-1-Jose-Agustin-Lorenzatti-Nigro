const PORT = 8080;

const express = require("express");

const app = express();

const ProductManager = require("./product-manager");
const manager = new ProductManager("./products.json");

const productsJSON = "./products.json";

app.get("/", (req, res) => {
  res.send("Bienvenido a home");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/tienda", (req, res) => {
  let data = manager.readFile(productsJSON);

  res.send(data);
});
/*
app.get("/products", async (req, res) => {
  try {
    let id = req.params.id;
    const product = misProductos.find((item) => item.id == id);
    if (product) {
      res.send(product);
    } else {
      res.send("producto no encontrado");
    }
  } catch (error) {
    res.send("Ha ocurrido un error");
  }
});

app.get("/product", async (req, res) => {
  try {
    let limit = await parseInt(req.query.limit);
    if (limit) {
      const arrayProducts = myProducts.slice(0, limit);
      res.send(products);
    } else {
      res.send(arrayProducts);
    }
  } catch (error) {
    res.send("Ha ocurrido un error");
  }
});
*/

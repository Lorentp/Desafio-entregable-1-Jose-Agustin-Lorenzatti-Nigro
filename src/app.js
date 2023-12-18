const PORT = 8080;

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ProductManager = require("./product-manager");
const manager = new ProductManager("./src/products.json");

const productsJSON = "./src/products.json";

app.get("/", (req, res) => {
  res.send("Bienvenido a home");
});

app.get("/products/:pid", async (req, res) => {
  try {
    let pid = parseInt(req.params.pid);
    let product = await manager.getProductsById(pid);
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
    let arrayProducts = await manager.readFile(productsJSON);
    if (limit) {
      const arrayProductsLimit = arrayProducts.slice(0, limit);
      res.send(arrayProductsLimit);
    } else {
      res.send(arrayProducts);
    }
  } catch (error) {
    res.send("Ha ocurrido un error", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

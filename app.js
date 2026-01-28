import express from "express";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/categories", require("./routes/category.routes"));
app.use("/products", require("./routes/product.routes"));

app.get("/", (_, res) => res.redirect("/products"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

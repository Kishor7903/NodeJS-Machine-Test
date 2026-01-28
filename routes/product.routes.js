import express from "express";
import db from "../config/db.js";

let router = express.Router()

const PAGE_SIZE = 10;

// This router will list all the products but with 10 products in each page
router.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * PAGE_SIZE;

    const dataQuery = `
    SELECT p.ProductId, p.ProductName,
           c.CategoryId, c.CategoryName
    FROM Product p
    JOIN Category c ON p.CategoryId = c.CategoryId
    LIMIT ? OFFSET ?
  `;

    const countQuery = `SELECT COUNT(*) AS total FROM Product`;

    db.get(countQuery, [], (_, count) => {
        db.all(dataQuery, [PAGE_SIZE, offset], (_, products) => {
            res.render("products", {
                products,
                currentPage: page,
                totalPages: Math.ceil(count.total / PAGE_SIZE),
            });
        });
    });
});

// This is a add product form
router.get("/add", (_, res) => {
    db.all("SELECT * FROM Category", [], (_, categories) => {
        res.render("add-product", { categories });
    });
});

// This route will add a new product in the database
router.post("/add", (req, res) => {
    db.run(
        "INSERT INTO Product (ProductName, CategoryId) VALUES (?,?)",
        [req.body.ProductName, req.body.CategoryId],
        () => res.redirect("/products")
    );
});

// This route will delete a existing product from database
router.get("/delete/:id", (req, res) => {
    db.run("DELETE FROM Product WHERE ProductId=?", [req.params.id], () =>
        res.redirect("/products")
    );
});

// This route will get an existing product to be edited
router.get("/edit/:id", (req, res) => {
    db.get(
        "SELECT * FROM Product WHERE ProductId=?",
        [req.params.id],
        (_, product) => {
            db.all("SELECT * FROM Category", [], (_, categories) => {
                res.render("edit-product", { product, categories });
            });
        }
    );
});

// This route will update the existing product 
router.post("/edit/:id", (req, res) => {
    db.run(
        "UPDATE Product SET ProductName=?, CategoryId=? WHERE ProductId=?",
        [req.body.ProductName, req.body.CategoryId, req.params.id],
        () => res.redirect("/products")
    );
});

export default router;

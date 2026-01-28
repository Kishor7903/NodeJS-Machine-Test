import express from "express";
import db from "../config/db.js";

let router = express.Router()

// This route will list all the categories from the database
router.get("/", (_, res) => {
    db.all("SELECT * FROM Category", [], (_, rows) => {
        res.render("categories", { categories: rows });
    });
});

// This is add category form 
router.get("/add", (_, res) => {
    res.render("add-category");
});

// This route will add a new category 
router.post("/add", (req, res) => {
    db.run(
        "INSERT INTO Category (CategoryName) VALUES (?)",
        [req.body.CategoryName],
        () => res.redirect("/categories")
    );
});

// This route will delete a category from database using its id
router.get("/delete/:id", (req, res) => {
    db.run("DELETE FROM Category WHERE CategoryId=?", [req.params.id], () =>
        res.redirect("/categories")
    );
});

// This route will get an existing category
router.get("/edit/:id", (req, res) => {
    db.get(
        "SELECT * FROM Category WHERE CategoryId=?",
        [req.params.id],
        (_, category) => {
            res.render("edit-category", { category });
        }
    );
});

// This route will update the existing category
router.post("/edit/:id", (req, res) => {
    db.run(
        "UPDATE Category SET CategoryName=? WHERE CategoryId=?",
        [req.body.CategoryName, req.params.id],
        () => res.redirect("/categories")
    );
});

export default router;

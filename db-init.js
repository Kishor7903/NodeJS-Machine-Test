const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS Category (
      CategoryId INTEGER PRIMARY KEY,
      CategoryName TEXT NOT NULL
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS Product (
      ProductId INTEGER PRIMARY KEY,
      ProductName TEXT NOT NULL,
      CategoryId INTEGER,
      FOREIGN KEY (CategoryId) REFERENCES Category(CategoryId)
    )
  `);
});

db.close();
console.log("Database Initialized Successfully");

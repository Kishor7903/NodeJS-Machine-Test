import sqlite from "sqlite3";

let sqlite3 = sqlite.verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to SQLite DB");
});

export default db;
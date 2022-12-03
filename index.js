import mysql from "mysql2/promise";
import express from "express";
import bodyParser from "body-parser";

const production = true;
const dataBaseConfig = {
  host: "jackmarket.kz",
  port: "3306",
  user: "kaspiver0",
  password: "password",
  database: "verificator",
};
const dataBaseConfigProduction = {
  host: "127.0.0.1",
  port: "3306",
  user: "kaspiver0",
  password: "password",
  database: "verificator",
};

const app = express();
app.get("/stores", async (req, res) => {
  try {
    const conn = await mysql.createConnection(
      production ? dataBaseConfigProduction : dataBaseConfig
    );
    const stores = (await conn.query(`SELECT * FROM stores`))[0];
    res.send(stores);
    await conn.end();
  } catch (e) {
    res.status(500).json({ message: "Error! " + e });
  }
});

app.listen(6969, () => {
  console.log("Go to http://localhost:3000/stores so you can see the data.");
});

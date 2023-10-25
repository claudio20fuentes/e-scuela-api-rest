const express = require("express");
require("dotenv").config();
const cors = require("cors");
const databaseInit = require("./config/databaseInit");

const app = express();
const PORT = process.env.PORT || 3004;

const corsOptions = require("./config/corsOptions");
const sequelize = require("./config/db");
const startDatabase = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const router = require("./V1/routes");
app.use("/api/v1", router);

//probando extension thunder client
app.get("/", (req, res) => {
  res.json({ message: "todo ok" });
});

app.listen(PORT, () => {
  testConnection();
  console.log(`Server listening on port ${PORT}`);
});

// TODO: REINICIA Y POBLA LA BD. USAR CON PRECAUCIÓN

// databaseInit();

async function testConnection() {
  try {
    startDatabase();
    await sequelize.authenticate();
    console.log("Conexión exitosa.");
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}
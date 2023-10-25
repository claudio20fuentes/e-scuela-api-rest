const express = require("express");
require("dotenv").config();
const cors = require("cors");

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

(async () => {
  try {
    await sequelize.sync({ force: true }); // Opción force: true solo para desarrollo
    console.log("Los modelos han sido sincronizados con la base de datos.");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
})();

async function testConnection() {
  try {
    startDatabase();
    await sequelize.authenticate();
    console.log("Conexión exitosa.");
  } catch (error) {
    console.error("Error al conectar:", error);
  }
}

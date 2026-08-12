const express = require("express");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", userRoutes);

sequelize.sync().then(() => {

    console.log("Banco de dados sincronizado");

    app.listen(PORT, () => {

        console.log(`Servidor rodando em http://localhost:${PORT}`);

    });

});

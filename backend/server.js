require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/api/users", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connexion Mongo DB OK");
  })
  .catch((err) => console.log(err));
app.listen(process.env.PORT);

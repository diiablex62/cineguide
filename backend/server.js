require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const userRoutes = require("./routes/users");
const serieRoutes = require("./routes/serie");
const saisonRoutes = require("./routes/saison");
const episodeRoutes = require("./routes/episode");

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
app.use("/api/series", serieRoutes);
app.use("/api/saisons", saisonRoutes);
app.use("/api/episodes", episodeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to db & listening on port: ${port}`);
    });
  })
  .catch((err) => console.log(err));

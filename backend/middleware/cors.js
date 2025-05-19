const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

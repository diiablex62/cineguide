const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CLIENT_URL.split(",");
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

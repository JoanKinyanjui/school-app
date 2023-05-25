const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error(error);
  });

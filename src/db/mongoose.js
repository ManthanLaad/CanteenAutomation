const config = require("config");
const mongoose = require("mongoose");

mongoose
  .connect(config.get("MongoDB_URL"), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful");
    // Rename the collection
    // let db = mongoose.connection.db;
    // db.collection("menu").rename("menus");
  })
  .catch((e) => console.log(`Database Connection Failed :${e}`));

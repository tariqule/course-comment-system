// Load the module dependencies
const config = require("./config");
const mongoose = require("mongoose");

// Define the Mongoose configuration method
module.exports = function () {
  // Use Mongoose to connect to MongoDB
  const db = mongoose
    .connect(
      "mongodb+srv://tariq:kCjHLblpqtSjGLTO@cluster0.o7wcr.mongodb.net/schoolDb?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      }
    )
    .then(() => console.log("DB Connected!"))
    .catch((err) => {
      console.log("Error: " + err);
    });

  // Load the 'User' model
  require("../app/models/user.server.model");
  require("../app/models/comments.server.model");
  // Return the Mongoose connection instance
  return db;
};

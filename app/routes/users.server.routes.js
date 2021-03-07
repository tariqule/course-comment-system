// Load the 'users' controller
const users = require("../controllers/users.server.controller");

// Define the routes module' method
module.exports = function (app) {
  app.route("/display").get(users.display);
  // Set up the 'students' base routes
  app.route("/users").post(users.create).get(users.list);

  app.post("/signin", users.loginUser);
  app.post("/submitComment", users.submitComment);

  app.route("/users/:userId").get(users.read).put(users.update);

  // app.route("/comments/:userId").get(users.read).put(users.update);

  app.param("userId", users.userByID);

  app.route("/read_user").post(users.userByUsername);

  app.route("/delete_user").get(users.showDeletePage);
  //
  app.route("/delete").delete(users.deleteByUserName);
};

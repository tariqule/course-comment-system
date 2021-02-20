// Load the 'users' controller
const users = require("../controllers/users.server.controller");

// Define the routes module' method
module.exports = function (app) {
  app.route("/display").get(users.display);
  // Set up the 'students' base routes
  app.route("/users").post(users.create).get(users.list);

  app.post("/signin", users.loginUser);
  app.post("/submitComment", users.submitComment);
  // Set up the 'students' parameterized routes
  app.route("/users/:userId").get(users.read).put(users.update);
  // Set up the 'userId' parameter middleware
  //All param callbacks will be called before any handler of
  //any route in which the param occurs, and they will each
  //be called only once in a request - response cycle,
  //even if the parameter is matched in multiple routes
  app.param("userId", users.userByID);
  //
  //update from edit .ejs page
  //app.route('/edit').post(users.updateByUsername);
  //display the document in edit_ejs page
  app.route("/read_user").post(users.userByUsername);

  app.route("/delete_user").get(users.showDeletePage);
  //
  app.route("/delete").delete(users.deleteByUserName);
};

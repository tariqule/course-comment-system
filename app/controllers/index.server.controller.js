const Comment = require("mongoose").model("Comment");

// Create a new 'render' controller method
exports.render = function (req, res) {
  // If the session's 'lastVisit' property is set, print it out in the console
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  // Set the session's 'lastVisit' property
  req.session.lastVisit = new Date();

  // Use the 'response' object to render the 'index' view with a 'title' property
  res.render("index", {
    title: "Course Evaluation",
  });
};

exports.renderAddUser = function (req, res) {
  res.render("signup", {
    title: "Sign up",
  });
};

//Display login page
exports.displayLoginPage = function (req, res) {
  res.render("login", {
    title: "Login",
  });
};

exports.renderReadUser = function (req, res) {
  // Use the 'response' object to render the 'read_user' view with a 'title' property
  res.render("read_user", {
    title: "Read user by username",
  });
};

exports.viewAllComments = function (req, res) {
  const userSession = req.session.user;
  // Use the 'response' object to render the 'read_user' view with a 'title' property
  Comment.find({}, (err, obj) => {
    console.log(obj);
    res.render("viewAllComments", {
      title: "Read user by username",
      email: userSession?.email || "User Not Logged in.",
      comments: obj,
    });
  });

  // const userSession = req.session.user;
};

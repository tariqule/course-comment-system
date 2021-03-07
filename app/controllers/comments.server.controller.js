// Load the 'User' Mongoose model
const Comments = require("mongoose").model("Comments");

// 'create' controller method to create a new user
exports.create = function (req, res, next) {
  // Create a new instance of the 'User' Mongoose model
  const Comments = new Comments(req.body);

  // Use the 'User' instance's 'save' method to save a new user document
  Comments.save((err) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      //redirect to the thankyou
      res.redirect("/thankyou");
    }
  });
};

//BEFORE THIS WAS IN INDEX.SERVER
exports.viewAllComments = function (req, res) {
  var username = req.body.username;

  const userSession = req.session.user;

  console.log("username in session: " + session.username);
  //show the display.ejs page and pass username to it
  Comments.find({}, (err, obj) => {
    res.render("viewAllComments", {
      title: "Read user by username",
      email: userSession?.email || "User Not Logged in.",
      comments: obj,
    });
  });
};

exports.commentsByStudent = function (req, res, next) {
  var email = req.session.email;

  Student.findOne({ email: email }, (err, student) => {
    if (err) {
      return getErrorMessage(err);
    }
    //
    req.id = student._id;
    console.log(req.id);
  }).then(function () {
    //find the posts from this author
    Comment.find(
      {
        student: req.id,
      },
      (err, comments) => {
        if (err) {
          return getErrorMessage(err);
        }
        //res.json(comments);
        res.render("comments", {
          comments: comments,
          email: email,
        });
      }
    );
  });
};

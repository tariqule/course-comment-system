// Load the 'Student' Mongoose model
const Student = require("mongoose").model("User");
const Comment = require("mongoose").model("Comment");

// 'create' controller method to create a new student
exports.create = function (req, res, next) {
  // Create a new instance of the 'User' Mongoose model
  const user = new Student(req.body);

  console.log(JSON.stringify(user));
  // Use the 'User' instance's 'save' method to save a new student document
  try {
    user.save((err) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        //redirect to the homepage
        res.redirect("/");
      }
    });
  } catch (err) {
    console.error(err);
  }
};

//login
exports.displayInfo = function (req, res) {
  //get user input using request object
  var username = req.body.username;
  //make a reference to the session object
  var session = req.session;

  console.log(session);
  //store the username in session object
  session.username = username;
  console.log("username in session: " + session.username);
  //show the display.ejs page and pass username to it
  res.render("thankyou", {
    username: username,
    email: session.email,
    comment: session.comment,
  });
}; //end of function

// 'list' controller method to display all students in raw json format
exports.list = function (req, res, next) {
  // Use the 'Student' static 'find' method to retrieve the list of students
  Student.find({}, (err, users) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      res.json(users);
    }
  });
};

// 'display' controller method to display all students in friendly format
exports.display = function (req, res, next) {
  // Use the 'Student' static 'find' method to retrieve the list of students
  Student.find({}, (err, users) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      res.render("listall", {
        title: "List All StudentsStudents",
        users: users,
      });
    }
  });
};
//
// 'display' controller method to display all students in friendly format
exports.showDeletePage = function (req, res) {
  // Use the 'response' object to show the delete_studentpage
  res.render("delete_user", {
    title: "Delete user",
  });
};

// 'read' controller method to display a student
exports.read = function (req, res) {
  // Use the 'response' object to send a JSON response
  res.json(req.user);
};

// 'update' controller method to update a student based on id
exports.update = function (req, res, next) {
  req.user = req.body; //read the student from request's body
  console.log(req.user);

  // Use the 'Student' static 'findByIdAndUpdate' method to update a specific student
  Student.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      //res.json(student);
      res.redirect("/users"); //display all students
    }
  });
};

//update a student by studentname
exports.updateByUsername = function (req, res, next) {
  req.user = req.body; //read the student from request's body
  console.log(req.user);
  //initialize findOneAndUpdate method arguments
  var query = { username: req.user.username };
  var update = req.body;
  var options = { new: true };

  // Use the 'User' static 'findOneAndUpdate' method to update a specific user by user name
  Student.findOneAndUpdate(query, update, options, (err, user) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      //res.json(student);
      res.redirect("/users"); //display all students
    }
  });
};

// 'delete' controller method to delete a student
exports.delete = function (req, res, next) {
  // Use the 'User' instance's 'remove' method to delete student document
  req.user.remove((err) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      res.json(req.user);
    }
  });
};

//delete student by username
exports.deleteByUserName = function (req, res, next) {
  //
  console.log(req.body.username);
  Student.findOneAndRemove(
    {
      username: req.body.username,
    },
    function (err, user) {
      if (err) throw err;

      console.log("Success");
    }
  );

  res.redirect("/display");
};
// 'userByID' controller method to find a student by its id or username
//  the code is using the email field instead of id
exports.userByID = function (req, res, next, username) {
  // Use the 'User' static 'findOne' method to retrieve a specific user

  console.log(req.body.username + "jbkugvj");
  Student.findOne(
    {
      username: username, //using the username instead of id
    },
    (err, user) => {
      if (err) {
        // Call the next middleware with an error message
        console.log(err + "DDcs");
        // return next(err);
      } else {
        // Set the 'req.user' property
        req.user = user;
        console.log(user);
        // Call the next middleware
        // next();
      }
    }
  );
};

// 'userByUsername' controller method to find a student by its username
// and display the result in edit.ejs file
exports.userByUsername = function (req, res, next) {
  req.user = req.body; //read the user from request's body
  // Use the 'User' static 'findOne' method to retrieve a specific user
  var username = req.body.username;
  console.log(username);
  Student.findOne(
    {
      username: username, //finding a document by username
    },
    (err, user) => {
      if (err) {
        // Call the next middleware with an error message
        return next(err);
      } else {
        // Set the 'req.user' property
        req.user = user;
        //parse it to a JSON object
        var jsonUser = JSON.parse(JSON.stringify(user));
        console.log(jsonUser);
        //display edit page and pass user properties to it
        res.render("edit", { title: "Edit user", user: jsonUser });

        // Call the next middleware
        next();
      }
    }
  );
};

exports.loginUser = async function (req, res, next) {
  console.log(req.body);
  const findUser = await Student.findOne({ username: req.body.username });
  console.log(findUser);

  req.session.user = findUser;

  if (findUser.username) {
    res.render("submitComments", { username: findUser?.username });
  } else {
    res.render("login", { error: "Invalid User Credentials" });
  }
};

exports.findAllComments = async function (req, res, next) {};

exports.submitComment = async function (req, res, next) {
  console.log(req.body);

  console.log(req.session);

  const userSession = req.session.user;
  // const findUser = Student.findOne(
  //   { username: req.session.username },
  //   function (err, obj) {
  //     console.log(err);
  //     console.log(obj + "-------");
  //   }
  // );

  // console.log(findUser.email + "====hello");

  // const email = findUser.email;
  // console.log(req.body);

  const comment = new Comment({
    courseCode: req.body.courseCode,
    courseName: req.body.courseName,
    program: req.body.program,
    semester: req.body.semester,
    comment: req.body.comment,
    user: userSession,
  });

  // console.log(comment);
  try {
    comment.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        Comment.find({ user: userSession._id }, (err, comment) => {
          console.log(comment + "jbkbjkjbkkj");
          res.render("viewComments", {
            email: userSession.email || "no email",
            comments: comment,
          });
        });
      }
    });
  } catch (error) {
    console.log("ERROR: => " + error);
  }
};

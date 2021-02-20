// Load the 'User' Mongoose model
const Comments = require('mongoose').model('Comments');

// 'create' controller method to create a new user
exports.create = function(req, res, next) {
    // Create a new instance of the 'User' Mongoose model
    const Comments = new Comments(req.body);

    // Use the 'User' instance's 'save' method to save a new user document
    Comments.save((err) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {

            //redirect to the thankyou
            res.redirect('/thankyou');
        }
    });
};
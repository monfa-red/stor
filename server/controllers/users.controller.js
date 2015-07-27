/**
 * Module dependencie
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');





 module.exports = {

    /**
     * CRUD
     */
    create: function(req, res) {
        newUser = new User(req.body);
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                // res.redirect()
            };
            // if succesfull
            res.json(newUser)

        })     
    },
    read: function(req, res) {

    },
    update: function(req, res) {

    },
    delete: function(req, res) {

    },

    /**
     * List users
     * Just a test!
     */
    list: function(req, res) {
        User
            .find(function(err, result) {
                if (err) {
                    // log the error --REMOVE-THIS--
                    console.log(err);
                    res.redirect('/error-page');
                }
                // if succesfull
                res.json(result);
            })
     }

 }
const db = require("../models");

exports.getUser = async function(req, res, next) {
  try {
    let user = await db.User.find({_id: req.params.id})
    return res.status(200).json(message);
  } catch(err) {
    return next(err);
  }
}

exports.deleteUser = async function(req, res, next) {
  try {
    let foundUser = await db.User.findById(req.params.id);
    await foundUser.remove();
    return res.status(200).json(foundUser);
  } catch(err){
    return next(err);
  }
}

exports.editUser = async function(req, res, next) {
  try {
    let newUser = await db.User.findById({_id: req.params.id});
    newUser = Object.assign(newUser, req.body);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch(err) {
    if(err.code === 11000){
      err.message = "Sorry, that username and/or email is taken."
    }
    return next(err);
  }
}
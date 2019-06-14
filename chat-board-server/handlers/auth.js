const db = require("../models");
const jwt = require("jsonwebtoken");
const cloudinary = require("../middleware/cloudinary");

exports.signin = async function(req, res, next) {
  try{
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign(
        {
          id,
          username,
          profileImageUrl
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password pair1."
      })
    }
  } catch(err) {
    return next({
      status: 400,
      message: "Invalid Email/Password pair2."
    })
  }
}

exports.signup = async function(req, res, next) {
  try {
    // explisitly set profileimage to undefined (otherwise it will be "null") for apply default image if user don't provide an avatar picture
    req.body.profileImageUrl = undefined;
    if (!process.env.SECRET_KEY) throw new Error("JWT Secret is undefined. Check your environment.");
    req.body.profileImageUrl === 'null' ? null : req.body.profileImageUrl;
    req.file && await cloudinary.v2.uploader.upload(req.file.path, function(err, result){
      if(err){
        throw new Error("Cloudinary error!")
      }
      req.body.profileImageUrl = result.secure_url;
    })
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    },
      process.env.SECRET_KEY,
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch(err){
    if(err.code === 11000){
      err.message = "Sorry, that username and/or email is taken."
    }
    return next({
      status: 400,
      message: err.message
    });
  }
}

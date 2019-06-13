const express = require("express");
const router = express.Router({mergeParams: true});
const { getUser, deleteUser, editUser } = require("../handlers/users");

router.route("/")
  .get(getUser)
  .delete(deleteUser)
  .put(editUser);

module.exports = router
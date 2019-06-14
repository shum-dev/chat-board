const express = require("express");
const router = express.Router();
const { signup, signin } = require("../handlers/auth");
const upload = require("../middleware/multer");


router.post("/signup", upload.single("profileImageUrl"), signup);
router.post("/signin", signin);

module.exports = router;
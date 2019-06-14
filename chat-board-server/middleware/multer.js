var multer = require("multer");

var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function(req, file, cb) {
  var fileTypes = /jpg|jpeg|png|gif/i;
  if(!fileTypes.test(file.originalname) && !fileTypes.test(file.mimetype)){
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

var upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits:{fileSize: 6000000}
});

module.exports = upload;

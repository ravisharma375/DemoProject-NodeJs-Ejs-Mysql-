const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(path.dirname(process.mainModule.filename), "../", "/public/uploads/Category"),
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 10485760 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");
function checkFileType(file, cb) {
  // Allowed ext
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb("Error:Please Upload Valid File!", false);
  }
}
//multer end
async function uploadfile(req, res, next) {
  await upload(req, res, err => {
    if (err) {
      console.log(err);
      if (err.code == "LIMIT_FILE_SIZE") {
        // res.json({
        //   error: true,
        //   message: "Image is too large",
        // });
        return err.code;
      } else {
        return err;
        // req.err = err;
        // res.json({ error: true, message: err, responseData: "" });
      }
    } else {
      return req.file;
    }
  });
}

module.exports = upload;

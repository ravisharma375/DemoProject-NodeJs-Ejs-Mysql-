const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../lib/local_auth");
const multer = require("multer");
const path = require("path");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

const { checkAuth } = require("../lib/check_auth");
const adminController = require("../routes/adminController");
const categoryController = require("../api/category/categoryController");
const bankController = require("../api/bank/bankController");
const voucherController = require("../api/voucher/voucherController");
//File Upload Program
const storage = multer.diskStorage({
  destination: path.join(path.dirname(process.mainModule.filename), "../", "/public/uploads"),
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
module.exports = upload;
//multer end
async function uploadfile(req, res, next) {
  await upload(req, res, err => {
    if (err) {
      console.log(err);
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.json({
          error: true,
          message: "Image is too large",
        });
      } else {
        return res.json({ error: true, message: err, responseData: "" });
      }
    } else {
      return next();
    }
  });
}

//End
router.get("/", adminController.dashbord);
// router.get("/", csrfProtection, adminController.login);
// router.get("/Login", csrfProtection, adminController.login);
// router.get("/Logout", csrfProtection, adminController.Logout);
// router.post(
//   "/Login",
//   csrfProtection,
//   passport.authenticate("local", {
//     failureRedirect: "/Login?err",
//     failureFlash: true,
//   }),
//   function(req, res) {
//     const { user } = req;
//     console.log("user");
//     if (user.role === "admin") {
//       sendResponse(0, user.id, res);
//     }
//     // res.redirect("/");
//   },
// );
// const routes = [
//   {
//     path: "/Admin_Dashboard",
//   },
// ];
// function sendResponse(roleIndex, userId, res) {
//   res.redirect(routes[roleIndex].path);
// }
// Admin Api calling
router.get("/Admin_Dashboard", csrfProtection, auth.ensureAdminAuthenticated, adminController.dashbord);
router.get("/Admin_voucher", adminController.voucher);
router.get("/Admin_AddVoucher", adminController.AddVoucher);
router.get("/Admin_ReceiptVoucher", adminController.receiptvoucher);
router.get("/Admin_AddReceiptVoucher", adminController.AddReceiptVoucher);
router.get("/Admin_MyAccount", adminController.myaccount);
router.get("/Admin_AddAccount", adminController.addAccount);
router.get("/Admin_BankAccount", adminController.bankaccount);
router.get("/Admin_AddBankAccount",adminController.addBankAccount);
router.post("/Admin_AddSubCategory", categoryController.createSubCategory);
router.post("/Admin_AddNewBank", bankController.createBank);
router.post("/Admin_AddBankHead", bankController.createBankHead);
router.post("/Admin_AddVoucher", uploadfile, voucherController.paymentVoucher);
router.post("/Admin_AddReceiptVoucher", uploadfile, voucherController.ReceiptVoucher);

module.exports = router;

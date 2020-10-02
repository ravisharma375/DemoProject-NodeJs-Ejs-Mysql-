const {
  Category,
  SubCategory,
  BankAccount,
  AccountHead,
  PaymentVoucher,
  ReceiptVoucher,
} = require("../config/database");
const moment = require("moment");

// exports.login = async (req, res) => {
//   res.render("index", {
//     loggedOut: "no",
//     title: "Login",
//     csrfToken: req.csrfToken(),
//   });
// };
// exports.Logout = async (req, res) => {
//   req.logout();
//   res.render("index", {
//     title: "Login",
//     csrfToken: req.csrfToken(),
//   });
// };
exports.dashbord = async (req, res) => {
  res.render("layout", {
    page: "dashboard",
    title: "Dashboard",
  });
};

exports.voucher = async (req, res) => {
  const payVoucher = await PaymentVoucher.findAll();
  res.render("layout", {
    page: "voucher/voucher",
    title: "Payment Vouchers",
    payVoucher,
  });
};
exports.AddVoucher = async (req, res) => {
  const category = await Category.findAll({
    where: {
      IsActive: true,
    },
  });
  const subcategory = await SubCategory.findAll({
    where: {
      IsActive: true,
    },
  });
  const accounthead = await AccountHead.findAll();
  const bankAccount = await BankAccount.findAll();
  res.render("layout", {
    page: "voucher/add_voucher",
    title: "Add New Payment Voucher",
    category,
    subcategory,
    accounthead,
    bankAccount,
  });
};

//
exports.receiptvoucher = async (req, res) => {
  const receiptVoucher = await ReceiptVoucher.findAll();
  res.render("layout", {
    page: "voucher/receiptvoucher",
    title: "Receipt Vouchers",
    receiptVoucher,
  });
};
exports.AddReceiptVoucher = async (req, res) => {
  const category = await Category.findAll({
    where: {
      IsActive: true,
    },
  });
  const subcategory = await SubCategory.findAll({
    where: {
      IsActive: true,
    },
  });
  const accounthead = await AccountHead.findAll();
  const bankAccount = await BankAccount.findAll();
  res.render("layout", {
    page: "voucher/add_receiptvoucher",
    title: "Add New Receipt Voucher",
    category,
    subcategory,
    accounthead,
    bankAccount,
  });
};
exports.myaccount = async (req, res) => {
  const accountData = await AccountHead.findAll();
  res.render("layout", {
    page: "manage/myaccount",
    title: "My Account",
    accountData,
  });
};
exports.addAccount = async (req, res) => {
  const accountData = await AccountHead.findAll();
  const subcategory = await SubCategory.findAll({
    where: {
      IsActive: true,
    },
  });
  res.render("layout", {
    page: "manage/add_myaccount",
    title: "Add Account",
    accountData,
    subcategory,
  });
};
exports.bankaccount = async (req, res) => {
  const bankAccount = await BankAccount.findAll();
  res.render("layout", {
    page: "manage/bankaccount",
    title: "Bank Account",
    bankAccount,
  });
};
exports.addBankAccount = async (req, res) => {
  res.render("layout", {
    page: "manage/add_bankaccount",
    title: "Add Bank Account",
  });
};

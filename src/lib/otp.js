const moment = require("moment");

function generateOTP() {
  // Generate a random 6 digit number
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = moment()
    .add(15, "minutes")
    .format();

  return { otp, otpExpiry };
}

module.exports = { generateOTP };

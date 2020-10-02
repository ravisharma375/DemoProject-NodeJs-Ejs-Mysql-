const {
  PaymentVoucher,
  PayVoucherSubData,
  ReceiptVoucher,
  ReceiptVoucherSubData,
  sequelize,
} = require("../../config/database");
const fs = require("fs");
class voucherService {
  static async createPaymentVoucher(body, data) {
    try {
      const newVoucher = await sequelize.transaction(async t => {
        const paymentCreated = await PaymentVoucher.create(data, { transaction: t });
        let i,
          arlen = body.Details.length;
        for (i = 0; i < arlen; i++) {
          await PayVoucherSubData.create(
            {
              PayVoucherId: paymentCreated.getDataValue("id"),
              Details: body.Details[i],
              Debit: body.Debit[i],
              Credit: body.Credit[i],
              IsActive: true,
            },
            {
              transaction: t,
            },
          );
        }
        if (paymentCreated) {
          return true;
        }
        return false;
      });
      return newVoucher;
    } catch (error) {
      const del = fs.unlinkSync(`./public/uploads/${data.AttachmentPath}`);
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
  static async createReceiptVoucher(body, data) {
    try {
      const newVoucher = await sequelize.transaction(async t => {
        const receiptCreated = await ReceiptVoucher.create(data, { transaction: t });
        let i,
          arlen = body.Details.length;
        for (i = 0; i < arlen; i++) {
          await ReceiptVoucherSubData.create(
            {
              ReceiptVoucherId: receiptCreated.getDataValue("id"),
              Details: body.Details[i],
              Debit: body.Debit[i],
              Credit: body.Credit[i],
              IsActive: true,
            },
            {
              transaction: t,
            },
          );
        }
        if (receiptCreated) {
          return true;
        }
        return false;
      });
      return newVoucher;
    } catch (error) {
      const del = fs.unlinkSync(`./public/uploads/${data.AttachmentPath}`);
      console.log(error);
      throw new Error("Internal Server Error");
    }
  }
}
module.exports = voucherService;

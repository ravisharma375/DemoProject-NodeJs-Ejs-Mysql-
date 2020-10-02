const HttpStatus = require("http-status");
const Joi = require("@hapi/joi");
const { HttpError } = require("../../lib/http_error");
const voucherService = require("./voucherService");
class voucherController {
  static async paymentVoucher(req, res) {
    const { body } = req;
    const paySchema = Joi.object({
      DD: Joi.string().required(),
      MM: Joi.string().required(),
      YYYY: Joi.string().required(),
      paidTo: Joi.string().required(),
      paymentAmount: Joi.number().required(),
      paymentMethod: Joi.string().required(),
      bankAccountToBeCr: Joi.number().required(),
      bankAccountHead: Joi.array().items(Joi.string().required()),
      Details: Joi.array().items(Joi.string().required()),
      Debit: Joi.array().items(Joi.number().required()),
      Credit: Joi.array().items(Joi.number().required()),
      Narration: Joi.string().required(),
    });
    try {
      if (
        !(
          Array.isArray(body.bankAccountHead) &&
          Array.isArray(body.Details) &&
          Array.isArray(body.Debit) &&
          Array.isArray(body.Credit)
        )
      ) {
        body.bankAccountHead = [body.bankAccountHead];
        body.Details = [body.Details];
        body.Debit = [body.Debit];
        body.Credit = [body.Credit];
      }
      const { error } = paySchema.validate(body);
      if (error) {
        return res.status(HttpStatus.CREATED).send(new HttpError(error.name, error.message));
      }

      if (req.file == undefined) {
        return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Please Upload Valid File! "));
      }
      console.log(body);
      const FileName = req.file.filename;
      const data = {
        PaymentDate: `${body.DD}/${body.MM}/${body.YYYY}`,
        PaidTo: body.paidTo,
        Amount: body.paymentAmount,
        PaymentMethod: body.paymentMethod,
        BankAccountToBeCredited: body.bankAccountToBeCr,
        Narration: body.Narration,
        AttachmentPath: FileName,
        IsActive: true,
      };
      const getData = await voucherService.createPaymentVoucher(body, data);
      if (getData) {
        return res.status(HttpStatus.CREATED).send({ status: "Success", message: "Voucher created successfully." });
      }
      return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Already Exist!"));
    } catch (error) {
      return res.status(HttpStatus.CREATED).json(new HttpError("Error", "Internal Server Error"));
    }
  }
  static async ReceiptVoucher(req, res) {
    const { body } = req;
    const paySchema = Joi.object({
      DD: Joi.string().required(),
      MM: Joi.string().required(),
      YYYY: Joi.string().required(),
      receivedFrom: Joi.string().required(),
      receiptAmount: Joi.number().required(),
      receiptMethod: Joi.string().required(),
      bankAccountToBeDr: Joi.number().required(),
      bankAccountHead: Joi.array().items(Joi.string().required()),
      Details: Joi.array().items(Joi.string().required()),
      Debit: Joi.array().items(Joi.number().required()),
      Credit: Joi.array().items(Joi.number().required()),
      Narration: Joi.string().required(),
    });
    try {
      if (
        !(
          Array.isArray(body.bankAccountHead) &&
          Array.isArray(body.Details) &&
          Array.isArray(body.Debit) &&
          Array.isArray(body.Credit)
        )
      ) {
        body.bankAccountHead = [body.bankAccountHead];
        body.Details = [body.Details];
        body.Debit = [body.Debit];
        body.Credit = [body.Credit];
      }
      const { error } = paySchema.validate(body);
      if (error) {
        return res.status(HttpStatus.CREATED).send(new HttpError(error.name, error.message));
      }

      if (req.file == undefined) {
        return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Please Upload Valid File! "));
      }
      console.log(body);
      const FileName = req.file.filename;
      const data = {
        ReceiptDate: `${body.DD}/${body.MM}/${body.YYYY}`,
        ReceivedFrom: body.receivedFrom,
        Amount: body.receiptAmount,
        ReceiptMethod: body.receiptMethod,
        BankAccountToBeDebited: body.bankAccountToBeDr,
        Narration: body.Narration,
        AttachmentPath: FileName,
        IsActive: true,
      };
      const getData = await voucherService.createReceiptVoucher(body, data);
      if (getData) {
        return res.status(HttpStatus.CREATED).send({ status: "Success", message: "Voucher created successfully." });
      }
      return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Already Exist!"));
    } catch (error) {
      return res.status(HttpStatus.CREATED).json(new HttpError("Error", "Internal Server Error"));
    }
  }
}
module.exports = voucherController;

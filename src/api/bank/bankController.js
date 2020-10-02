const HttpStatus = require("http-status");
const Joi = require("@hapi/joi");
const { HttpError } = require("../../lib/http_error");
const bankService = require("./bankService");

class bankController {
  static async createBank(req, res) {
    const { body } = req;
    console.log(body);
    const bankSchema = Joi.object({
      BankAccountNumber: Joi.string().required(),
      BankName: Joi.string().required(),
      BranchName: Joi.string().required(),
      TypeOfAccount: Joi.string().required(),
      IFSC_Code: Joi.string().required(),
      OpeningBalance: Joi.string().required(),
      Date_of_Opening_Balance: Joi.date().required(),
      Default_Bank_Account: Joi.string().required(),
      Type_of_Balance: Joi.string().required(),
    });
    try {
      const { error } = bankSchema.validate(body);
      if (error) {
        return res.status(HttpStatus.CREATED).send(new HttpError(error.name, error.message));
      }
      const getData = await bankService.createAccount(body);
      if (getData) {
        return res.status(HttpStatus.CREATED).send({ status: "Success", message: "Account created successfully." });
      }
      return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Already Exist!"));
    } catch (error) {
      return res.status(HttpStatus.CREATED).json(new HttpError("Error", "Internal Server Error"));
    }
  }
  static async createBankHead(req, res) {
    const { body } = req;
    console.log(body);
    const bankHeadSchema = Joi.object({
      AccountName: Joi.string().required(),
      OpeningBalance: Joi.string().required(),
      Date_of_Opening_Balance: Joi.date().required(),
      DebitOrCredit: Joi.string().required(),
      Category: Joi.string().required(),
      Default_Bank_Account: Joi.string().required(),
      AccountStatus: Joi.string().required(),
    });
    try {
      const { error } = bankHeadSchema.validate(body);
      if (error) {
        return res.status(HttpStatus.CREATED).send(new HttpError(error.name, error.message));
      }
      const getData = await bankService.createAccountHead(body);
      if (getData) {
        return res
          .status(HttpStatus.CREATED)
          .send({ status: "Success", message: "Account Head created successfully." });
      }
      return res.status(HttpStatus.CREATED).json(new HttpError("Bad Request", "Already Exist!"));
    } catch (error) {
      return res.status(HttpStatus.CREATED).json(new HttpError("Error", "Internal Server Error"));
    }
  }
}
module.exports = bankController;

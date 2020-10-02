const { BankAccount, AccountHead } = require("../../config/database");
class bankService {
  static async createAccount(body) {
    try {
      const findAccount = await BankAccount.findOne({
        where: {
          AccountNumber: body.BankAccountNumber,
        },
      });
      if (findAccount) {
        return false;
      }
      const createAccount = await BankAccount.create({
        AccountNumber: body.BankAccountNumber,
        BankName: body.BankName,
        BranchName: body.BranchName,
        AccountType: body.TypeOfAccount,
        IFSC_CODE: body.IFSC_Code,
        OpeningBalance: body.OpeningBalance,
        OpeningBalanceDate: body.Date_of_Opening_Balance,
        DefaultAccount: body.Default_Bank_Account,
        TypeOfBalance: body.Type_of_Balance,
        IsActive: true,
      });
      if (!createAccount) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
  static async createAccountHead(body) {
    try {
      const findAccount = await AccountHead.findOne({
        where: {
          AccountName: body.AccountName,
          DebitOrCredit: body.DebitOrCredit,
        },
      });
      if (findAccount) {
        return false;
      }
      const createAccountHead = await AccountHead.create({
        AccountName: body.AccountName,
        OpeningBalance: body.OpeningBalance,
        OpeningBalanceDate: body.Date_of_Opening_Balance,
        DebitOrCredit: body.DebitOrCredit,
        Category: body.Category,
        DefaultAccount: body.Default_Bank_Account,
        IsActive: body.AccountStatus,
      });
      if (!createAccountHead) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
}
module.exports = bankService;

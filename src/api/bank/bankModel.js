module.exports = function(sequelize, DataTypes) {
  const BankAccount = sequelize.define("BankAccount", {
    BankID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    AccountNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    BankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BranchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AccountType: {
      type: DataTypes.ENUM({
        values: ["saving", "current", "overdraft"],
      }),
      allowNull: false,
    },
    IFSC_CODE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OpeningBalance: {
      type: DataTypes.STRING,
    },
    OpeningBalanceDate: {
      type: DataTypes.STRING,
    },
    DefaultAccount: {
      type: DataTypes.ENUM({
        values: ["yes", "no"],
      }),
      allowNull: false,
    },
    TypeOfBalance: {
      type: DataTypes.ENUM({
        values: ["debit", "credit"],
      }),
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });

  const AccountHead = sequelize.define("AccountHead", {
    HeadID: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    AccountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OpeningBalance: {
      type: DataTypes.STRING,
    },
    OpeningBalanceDate: {
      type: DataTypes.STRING,
    },
    DebitOrCredit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DefaultAccount: {
      type: DataTypes.ENUM({
        values: ["yes", "no"],
      }),
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });

  return { BankAccount, AccountHead };
};

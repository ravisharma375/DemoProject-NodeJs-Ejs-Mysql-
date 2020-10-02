module.exports = function(sequelize, DataTypes) {
  const PaymentVoucher = sequelize.define("PaymentVoucher", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    PaymentDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaidTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    PaymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BankAccountToBeCredited: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaidAmount: {
      type: DataTypes.DECIMAL,
    },
    Narration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AttachmentPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });
 
  const PayVoucherSubData = sequelize.define("PayVoucherSubData", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    PayVoucherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Debit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });

  const ReceiptVoucher = sequelize.define("ReceiptVoucher", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ReceiptDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReceivedFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    ReceiptMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BankAccountToBeDebited: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReceiptAmount: {
      type: DataTypes.DECIMAL,
    },
    Narration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AttachmentPath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });

  const ReceiptVoucherSubData = sequelize.define("ReceiptVoucherSubData", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ReceiptVoucherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Debit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    Credit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      unique: false,
      allowNull: false,
    },
  });
  return { PaymentVoucher, PayVoucherSubData, ReceiptVoucher, ReceiptVoucherSubData };
};

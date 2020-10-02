const bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  const Admin = sequelize.define(
    "admins",
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: "admin",
      },
    },
    {
      updatedAt: "UpdatedAt",
      createdAt: "CreatedAt",
    },
  );
  // console.log(bcrypt.hashSync("password", bcrypt.genSaltSync(10), null));
  Admin.hashPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };

  Admin.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

    // Admin.create({
    //   username: "admin",
    //   password: Admin.hashPassword("admin123"),
    //   email: "testadmin@gmail.com",

    // })
  return Admin;
};

module.exports = function(sequelize, DataTypes) {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
      },
    },
    {
      updatedAt: "UpdatedAt",
      createdAt: "CreatedAt",
    },
  );

  const SubCategory = sequelize.define(
    "SubCategory",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      SubcategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IsActive: {
        type: DataTypes.BOOLEAN,
        unique: false,
        allowNull: false,
      },
    },
    {
      updatedAt: "UpdatedAt",
      createdAt: "CreatedAt",
    },
  );

  return { Category, SubCategory };
};

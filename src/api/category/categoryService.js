const categoryController = require("./categoryController");
const { Category, SubCategory } = require("../../config/database");
class categoryService {
  static async createCategory(Name) {
    try {
      const findCategory = await Category.findOne({
        where: {
          categoryName: Name,
        },
      });
      if (findCategory) {
        return false;
      }
      const createCategory = await Category.create({
        categoryName: Name,
        IsActive: true,
      });
      if (!createCategory) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
  static async createSubCategory(body) {
    try {
      const findSubCategory = await SubCategory.findOne({
        where: {
          SubcategoryName: body.subCategoryName,
          categoryId: body.subCategoryId,
        },
      });
      if (findSubCategory) {
        return false;
      }
      const createSubCategory = await SubCategory.create({
        SubcategoryName: body.subCategoryName,
        categoryId: body.subCategoryId,
        IsActive: body.status,
      });
      if (!createSubCategory) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  }
}
module.exports = categoryService;
